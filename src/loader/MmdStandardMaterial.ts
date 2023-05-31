import type { Scene, Texture } from "@babylonjs/core";
import { Color3, StandardMaterial } from "@babylonjs/core";

import type { MmdPluginMaterialSphereTextureBlendMode } from "./MmdPluginMaterial";
import { MmdPluginMaterial } from "./MmdPluginMaterial";

export class MmdStandardMaterial extends StandardMaterial {
    private readonly _pluginMaterial: MmdPluginMaterial;

    private _renderOutline = false;
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

    public get sphereTexture(): Texture | null {
        return this._pluginMaterial.sphereTexture;
    }

    public set sphereTexture(value: Texture | null) {
        this._pluginMaterial.sphereTexture = value;
    }

    public get sphereTextureBlendMode(): MmdPluginMaterialSphereTextureBlendMode {
        return this._pluginMaterial.sphereTextureBlendMode;
    }

    public set sphereTextureBlendMode(value: MmdPluginMaterialSphereTextureBlendMode) {
        this._pluginMaterial.sphereTextureBlendMode = value;
    }

    public get toonTexture(): Texture | null {
        return this._pluginMaterial.toonTexture;
    }

    public set toonTexture(value: Texture | null) {
        this._pluginMaterial.toonTexture = value;
    }

    public get ignoreDiffuseWhenToonTextureIsNull(): boolean {
        return this._pluginMaterial.ignoreDiffuseWhenToonTextureIsNull;
    }

    public set ignoreDiffuseWhenToonTextureIsNull(value: boolean) {
        this._pluginMaterial.ignoreDiffuseWhenToonTextureIsNull = value;
    }

    public get renderOutline(): boolean {
        return this._renderOutline;
    }

    public set renderOutline(value: boolean) {
        // Lazy Load the component
        if (value) {
            this.getScene().getMmdOutlineRenderer();
        }
        this._renderOutline = value;
    }
}
