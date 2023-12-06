import { Material } from "@babylonjs/core/Materials/material";
import type { Texture } from "@babylonjs/core/Materials/Textures/texture";
import type { ISize } from "@babylonjs/core/Maths/math.size";
import { Observable } from "@babylonjs/core/Misc/observable";
import type { Nullable } from "@babylonjs/core/types";

/**
 * Material transparency mode
 *
 * Constants are same as Babylon.js MaterialTransparencyMode
 */
export enum TransparencyMode {
    Opaque = Material.MATERIAL_OPAQUE,
    AlphaTest = Material.MATERIAL_ALPHATEST,
    AlphaBlend = Material.MATERIAL_ALPHABLEND
}

class TextureContainer {
    public texture: Nullable<WebGLTexture>;
    public readonly onLoadObservable: Observable<void>;

    public constructor() {
        this.texture = null;

        this.onLoadObservable = new Observable();
    }

    public awaitLoad(): Promise<TextureContainer> {
        return new Promise(resolve => {
            if (this.texture !== null) {
                resolve(this);
            } else {
                this.onLoadObservable.addOnce(() => resolve(this));
            }
        });
    }
}

/**
 * Geometry that has uvs and indices
 */
export interface IndexedUvGeometry {
    uvs: Float32Array;
    indices: Uint16Array | Uint32Array;
    subMeshIndexCounts: Int32Array;
}

class IndexedUvSubmesh {
    public readonly uvs: Float32Array;
    public readonly indices: Uint16Array | Uint32Array;
    public readonly subMeshIndexOffset: number;
    public readonly indexCount: number;

    public constructor(
        uvs: Float32Array,
        indices: Uint16Array | Uint32Array,
        subMeshIndexOffset: number,
        indexCount: number
    ) {
        this.uvs = uvs;
        this.indices = indices;
        this.subMeshIndexOffset = subMeshIndexOffset;
        this.indexCount = indexCount;
    }
}

/**
 * Texture alpha checker
 *
 * This class is used to check if the texture has alpha on geometry
 */
export class TextureAlphaChecker {
    private readonly _resolution: number;
    private readonly _textureCache: Map<ArrayBuffer, TextureContainer>;

    private _context: Nullable<WebGL2RenderingContext>;

    private _vertexShader: Nullable<WebGLShader>;
    private _fragmentShader: Nullable<WebGLShader>;
    private _program: Nullable<WebGLProgram>;
    private _programUvLocation: Nullable<number>;

    private readonly _uvBufferMap: Map<Float32Array, WebGLBuffer>;
    private readonly _indexBufferMap: Map<Uint16Array | Uint32Array, WebGLBuffer>;
    private readonly _subMeshes: IndexedUvSubmesh[];

    private _currentTexture: Nullable<WebGLTexture>;
    private _currentSubmesh: Nullable<IndexedUvSubmesh>;

    /**
     * Create a texture alpha checker
     * @param uvs Geometry uvs
     * @param indices Geometry indices
     * @param resolution Resolution of the canvas used to check the texture
     */
    public constructor(geometries: IndexedUvGeometry[], resolution = 512) {
        this._resolution = resolution;
        this._textureCache = new Map();

        this._context = this._createRenderingContext();

        this._vertexShader = null;
        this._fragmentShader = null;
        this._program = null;
        this._programUvLocation = null;

        this._uvBufferMap = new Map();
        this._indexBufferMap = new Map();
        const geometryBuffers: IndexedUvSubmesh[] = this._subMeshes = [];
        for (let i = 0; i < geometries.length; ++i) {
            const geometry = geometries[i];
            const uvs = geometry.uvs;
            const indices = geometry.indices;

            const subMeshIndexCounts = geometry.subMeshIndexCounts;
            let subMeshIndexOffset = 0;
            for (let j = 0; j < subMeshIndexCounts.length; ++j) {
                const indexCount = subMeshIndexCounts[j];
                geometryBuffers.push(
                    new IndexedUvSubmesh(
                        uvs,
                        indices,
                        subMeshIndexOffset,
                        indexCount
                    )
                );
                subMeshIndexOffset += indexCount;
            }
        }

        this._currentTexture = null;
        this._currentSubmesh = null;

        if (this._prepareContext() === false) {
            this.dispose();
        }
    }

    private _createRenderingContext(): Nullable<WebGL2RenderingContext> {
        const canvas = document.createElement("canvas");
        canvas.width = this._resolution;
        canvas.height = this._resolution;

        // document.body.appendChild(canvas);

        const context = canvas.getContext("webgl2", {
            alpha: false,
            antialias: false,
            depth: false,
            premultipliedAlpha: false,
            preserveDrawingBuffer: false
        });

        return context;
    }

    private _prepareContext(): boolean {
        if (this._context === null) return false;
        const context = this._context;

        context.clearColor(0, 0, 0, 0);

        const vertexShader = this._vertexShader = context.createShader(context.VERTEX_SHADER);
        if (vertexShader === null) return false;
        const vertexShaderSource = /* glsl */`
            precision highp float;
            attribute vec2 uv;
            varying vec2 vUv;

            void main() {
                vUv = uv;
                gl_Position = vec4(uv * 2.0 - 1.0, 0.0, 1.0);
            }
        `;
        context.shaderSource(vertexShader, vertexShaderSource);
        context.compileShader(vertexShader);
        if (!context.getShaderParameter(vertexShader, context.COMPILE_STATUS)) {
            console.error(context.getShaderInfoLog(vertexShader));
            return false;
        }

        const fragmentShader = this._fragmentShader = context.createShader(context.FRAGMENT_SHADER);
        if (fragmentShader === null) return false;
        /**
         * centerAlpha | right1Alpha | right2Alpha
         * bottom1Alpha | right1Bottom1Alpha | right2Bottom1Alpha
         * bottom2Alpha | right1Bottom2Alpha | right2Bottom2Alpha
         */
        const fragmentShaderSource = /* glsl */`
            precision highp float;
            uniform sampler2D texture;
            varying vec2 vUv;

            void main() {
                vec2 onePixel = vec2(1.0 / ${this._resolution.toFixed(1)});

                float minAlpha = 1.0;
                for (int i = 0; i < 2; ++i) {
                    for (int j = 0; j < 2; ++j) {
                        float alpha = texture2D(texture, vUv + vec2(onePixel.x * float(i), onePixel.y * float(j))).a;
                        minAlpha = min(minAlpha, alpha);
                    }
                }
                gl_FragColor = vec4(vec3(1.0) - minAlpha, 1.0);
            }
        `;
        context.shaderSource(fragmentShader, fragmentShaderSource);
        context.compileShader(fragmentShader);
        if (!context.getShaderParameter(fragmentShader, context.COMPILE_STATUS)) {
            console.error(context.getShaderInfoLog(fragmentShader));
            return false;
        }

        const program = this._program = context.createProgram();
        if (program === null) return false;
        context.attachShader(program, vertexShader);
        context.attachShader(program, fragmentShader);
        context.linkProgram(program);
        if (!context.getProgramParameter(program, context.LINK_STATUS)) {
            console.error(context.getProgramInfoLog(program));
            return false;
        }

        context.useProgram(program);

        const uvLocation = this._programUvLocation = context.getAttribLocation(program, "uv");
        context.enableVertexAttribArray(uvLocation);

        const textureLocation = context.getUniformLocation(program, "texture");
        context.activeTexture(context.TEXTURE0);
        context.uniform1i(textureLocation, 0);

        return true;
    }

    private async _getWebGlTexture(textureBuffer: ArrayBuffer, fallbackTexture: Nullable<Texture>): Promise<Nullable<WebGLTexture>> {
        const context = this._context;
        if (context === null) return null;

        const cachedWebGlTexture = this._textureCache.get(textureBuffer);
        if (cachedWebGlTexture !== undefined) {
            await cachedWebGlTexture.awaitLoad();
            return cachedWebGlTexture.texture;
        }

        const textureContainer = new TextureContainer();
        this._textureCache.set(textureBuffer, textureContainer);

        let imageOrPixelsBuffer: Nullable<HTMLImageElement | ArrayBufferView> = null;
        let textureSize: ISize;
        let blobCreated = false;

        imageOrPixelsBuffer = await new Promise<Nullable<HTMLImageElement>>((resolve) => {
            const image = new Image();
            image.onload = (): void => {
                blobCreated = true;
                resolve(image);
            };
            image.onerror = (): void => {
                URL.revokeObjectURL(image.src);
                resolve(null);
            };
            image.src = URL.createObjectURL(new Blob([textureBuffer]));
        });
        if (imageOrPixelsBuffer !== null) {
            textureSize = {
                width: imageOrPixelsBuffer.width,
                height: imageOrPixelsBuffer.height
            };
        } else if (fallbackTexture !== null) {
            if (!fallbackTexture.isReady()) {
                await new Promise<void>((resolve) => {
                    fallbackTexture.onLoadObservable.addOnce(() => {
                        resolve();
                    });
                });
            }
            textureSize = fallbackTexture.getSize();
            imageOrPixelsBuffer = await fallbackTexture.readPixels(
                0, // faceIndex
                0, // level
                undefined, // buffer
                false, // flushRenderer
                false, // noDataConversion
                0, // x
                0, // y
                textureSize.width, // width
                textureSize.height // height
            );
        }
        if (imageOrPixelsBuffer === null) return null;

        const webGlTexture = context.createTexture();
        if (webGlTexture === null) return null;

        context.bindTexture(context.TEXTURE_2D, webGlTexture);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.NEAREST);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.NEAREST);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE);
        context.pixelStorei(context.UNPACK_FLIP_Y_WEBGL, imageOrPixelsBuffer instanceof HTMLImageElement ? 1 : 0);
        context.texImage2D(
            context.TEXTURE_2D,
            0, // level
            context.RGBA, // internalFormat
            textureSize!.width, // width
            textureSize!.height, // height
            0, // border
            context.RGBA, // format
            context.UNSIGNED_BYTE, // type
            imageOrPixelsBuffer as any // HTMLImageElement or pixels ArrayBuffer
        );
        if (blobCreated) URL.revokeObjectURL((imageOrPixelsBuffer as HTMLImageElement).src);

        textureContainer.texture = webGlTexture;
        textureContainer.onLoadObservable.notifyObservers();

        return webGlTexture;
    }

    private _getWebGLBuffer(
        uvs: Float32Array,
        indices: Uint16Array | Uint32Array
    ): [Nullable<WebGLBuffer>, Nullable<WebGLBuffer>] {
        const context = this._context;
        if (context === null) return [null, null];

        let uvBuffer = this._uvBufferMap.get(uvs) ?? null;
        let indexBuffer = this._indexBufferMap.get(indices) ?? null;

        if (uvBuffer !== null && indexBuffer !== null) {
            return [uvBuffer, indexBuffer];
        }

        if (uvBuffer === null) {
            uvBuffer = context.createBuffer();
            if (uvBuffer === null) return [null, null];
            this._uvBufferMap.set(uvs, uvBuffer);

            context.bindBuffer(context.ARRAY_BUFFER, uvBuffer);
            context.bufferData(context.ARRAY_BUFFER, uvs, context.STATIC_DRAW);
            context.vertexAttribPointer(this._programUvLocation!, 2, context.FLOAT, false, 0, 0);
        }

        if (indexBuffer === null) {
            indexBuffer = context.createBuffer();
            if (indexBuffer === null) return [null, null];
            this._indexBufferMap.set(indices, indexBuffer);

            context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, indexBuffer);
            context.bufferData(context.ELEMENT_ARRAY_BUFFER, indices, context.STATIC_DRAW);
        }

        return [uvBuffer, indexBuffer];
    }

    /**
     * Check if the texture has alpha on geometry
     *
     * "Does the textures on the geometry have alpha" is simply to make sure that a portion of the textures (the part that is rendered) have alpha
     * @param textureBuffer Texture array buffer
     * @param fallbackTexture When the texture is unsupported format, dependent on babylon.js Texture Loaders
     * @param startOffset start offset of the indices
     * @param length length of the indices
     * @param alphaThreshold alpha threshold
     * @param alphaBlendThreshold alpha blend threshold
     * @returns Transparency mode
     */
    public async textureHasAlphaOnGeometry(
        textureBuffer: ArrayBuffer,
        fallbackTexture: Nullable<Texture>,
        subMeshIndex: number,
        alphaThreshold: number,
        alphaBlendThreshold: number
    ): Promise<TransparencyMode> {
        const context = this._context;
        if (context === null) return TransparencyMode.Opaque;
        const program = this._program;
        if (program === null) return TransparencyMode.Opaque;

        const webGlTexture = await this._getWebGlTexture(textureBuffer, fallbackTexture);
        if (webGlTexture === null) return TransparencyMode.Opaque;

        if (this._currentTexture !== webGlTexture) {
            context.bindTexture(context.TEXTURE_2D, webGlTexture);
            this._currentTexture = webGlTexture;
        }

        const subMesh = this._subMeshes[subMeshIndex];
        const [uvBuffer, indexBuffer] = this._getWebGLBuffer(subMesh.uvs, subMesh.indices);
        if (uvBuffer === null || indexBuffer === null) return TransparencyMode.Opaque;

        if (this._currentSubmesh !== subMesh) {
            context.bindBuffer(context.ARRAY_BUFFER, uvBuffer);
            context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, indexBuffer);
            this._currentSubmesh = subMesh;
        }

        context.clear(context.COLOR_BUFFER_BIT);
        context.drawElements(
            context.TRIANGLES,
            subMesh.indexCount,
            subMesh.indices.BYTES_PER_ELEMENT === 2
                ? context.UNSIGNED_SHORT
                : context.UNSIGNED_INT,
            subMesh.subMeshIndexOffset * subMesh.indices.BYTES_PER_ELEMENT
        );

        const resolution = this._resolution;
        const resultPixelsBufferView = new Uint8Array(resolution * resolution * 4);
        context.readPixels(
            0, // x
            0, // y
            resolution, // width
            resolution, // height
            context.RGBA, // format
            context.UNSIGNED_BYTE, // type
            resultPixelsBufferView // pixels
        );

        let maxValue = 0;
        let averageMidddleAlpha = 0;
        let averageMidddleAlphaCount = 0;

        for (let i = 0; i < resolution; i += 2) {
            for (let j = 0; j < resolution; j += 2) {
                const index = (i * resolution + j) * 4;
                const r = resultPixelsBufferView[index];
                maxValue = Math.max(maxValue, r);
                if (0 < r && r < 255) {
                    averageMidddleAlpha += r;
                    averageMidddleAlphaCount += 1;
                }
            }
        }

        if (averageMidddleAlphaCount !== 0) {
            averageMidddleAlpha /= averageMidddleAlphaCount;
        }

        // const div = document.createElement("div");
        // div.innerText = fallbackTexture?.name + " " + maxValue;
        // const debugCanvas = document.createElement("canvas");
        // debugCanvas.width = resolution / 2;
        // debugCanvas.height = resolution / 2;
        // debugCanvas.style.outline = "1px solid red";

        // div.appendChild(debugCanvas);
        // document.body.appendChild(div);

        // const debugContext = debugCanvas.getContext("2d");
        // for (let i = 0; i < resolution; i += 2) {
        //     for (let j = 0; j < resolution; j += 2) {
        //         const index = (i * resolution + j) * 4;
        //         const r = resultPixelsBufferView[index + 0];
        //         const g = resultPixelsBufferView[index + 1];
        //         const b = resultPixelsBufferView[index + 2];
        //         debugContext!.fillStyle = `rgba(${r}, ${g}, ${b}, 1.0)`;
        //         debugContext!.fillRect(i / 2, j / 2, 1, 1);
        //     }
        // }

        if (maxValue < alphaThreshold) {
            return TransparencyMode.Opaque;
        }

        if (averageMidddleAlpha + alphaBlendThreshold < maxValue) {
            return TransparencyMode.AlphaTest;
        } else {
            return TransparencyMode.AlphaBlend;
        }
    }

    /**
     * Dispose this object
     */
    public dispose(): void {
        const context = this._context;
        if (context === null) return;

        context.bindBuffer(context.ARRAY_BUFFER, null);
        context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, null);
        context.bindTexture(context.TEXTURE_2D, null);
        context.useProgram(null);

        for (const uvBuffer of this._uvBufferMap.values()) {
            context.deleteBuffer(uvBuffer);
        }
        for (const indexBuffer of this._indexBufferMap.values()) {
            context.deleteBuffer(indexBuffer);
        }
        for (const textureContainer of this._textureCache.values()) {
            context.deleteTexture(textureContainer.texture);
        }
        context.deleteProgram(this._program);
        context.deleteShader(this._vertexShader);
        context.deleteShader(this._fragmentShader);

        this._context = null;
        this._vertexShader = null;
        this._fragmentShader = null;
        this._program = null;
        this._uvBufferMap.clear();
        this._indexBufferMap.clear();
    }
}
