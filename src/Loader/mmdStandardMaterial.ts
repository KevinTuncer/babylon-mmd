import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import type { Texture } from "@babylonjs/core/Materials/Textures/texture";
import type { Color4 } from "@babylonjs/core/Maths/math.color";
import { Color3 } from "@babylonjs/core/Maths/math.color";
import type { Scene } from "@babylonjs/core/scene";
import type { Nullable } from "@babylonjs/core/types";

import type { MmdPluginMaterialSphereTextureBlendMode } from "./mmdPluginMaterial";
import { MmdPluginMaterial } from "./mmdPluginMaterial";

export class MmdStandardMaterial extends StandardMaterial {
    private readonly _pluginMaterial: MmdPluginMaterial;

    public renderOutline = false;
    public outlineWidth = 0.01;
    public outlineColor: Color3 = new Color3(0, 0, 0);
    public outlineAlpha = 1.0;

    public constructor(name: string, scene?: Scene) {
        super(name, scene);
        this.specularColor = new Color3(0, 0, 0);

        const pluginMaterial = this._pluginMaterial = new MmdPluginMaterial(this);
        pluginMaterial.isEnabled = true;
        pluginMaterial.ignoreDiffuseWhenToonTextureIsNull = true;
    }

    public get sphereTexture(): Nullable<Texture> {
        return this._pluginMaterial.sphereTexture;
    }

    public set sphereTexture(value: Nullable<Texture>) {
        this._pluginMaterial.sphereTexture = value;
    }

    public get sphereTextureBlendMode(): MmdPluginMaterialSphereTextureBlendMode {
        return this._pluginMaterial.sphereTextureBlendMode;
    }

    public set sphereTextureBlendMode(value: MmdPluginMaterialSphereTextureBlendMode) {
        this._pluginMaterial.sphereTextureBlendMode = value;
    }

    public get toonTexture(): Nullable<Texture> {
        return this._pluginMaterial.toonTexture;
    }

    public set toonTexture(value: Nullable<Texture>) {
        this._pluginMaterial.toonTexture = value;
    }

    public get ignoreDiffuseWhenToonTextureIsNull(): boolean {
        return this._pluginMaterial.ignoreDiffuseWhenToonTextureIsNull;
    }

    public set ignoreDiffuseWhenToonTextureIsNull(value: boolean) {
        this._pluginMaterial.ignoreDiffuseWhenToonTextureIsNull = value;
    }

    public get textureColor(): Color4 {
        this._pluginMaterial.useTextureColor = true;
        return this._pluginMaterial.textureColor;
    }

    public set textureColor(value: Color4) {
        this._pluginMaterial.useTextureColor = true;
        this._pluginMaterial.textureColor = value;
    }

    public get sphereTextureColor(): Color4 {
        this._pluginMaterial.useSphereTextureColor = true;
        return this._pluginMaterial.sphereTextureColor;
    }

    public set sphereTextureColor(value: Color4) {
        this._pluginMaterial.useSphereTextureColor = true;
        this._pluginMaterial.sphereTextureColor = value;
    }

    public get toonTextureColor(): Color4 {
        this._pluginMaterial.useToonTextureColor = true;
        return this._pluginMaterial.toonTextureColor;
    }

    public set toonTextureColor(value: Color4) {
        this._pluginMaterial.useToonTextureColor = true;
        this._pluginMaterial.toonTextureColor = value;
    }
}
