"use strict";(self.webpackChunkbabylon_mmd=self.webpackChunkbabylon_mmd||[]).push([[305],{3155:(e,t,r)=>{var a=r(7008),n=r(854),o=r(1137),i=r(1597);a.w.prototype._createDepthStencilCubeTexture=function(e,t){const r=new n.h(this,12);if(r.isCube=!0,1===this.webGLVersion)return o.V.Error("Depth cube texture is not supported by WebGL 1."),r;const a={bilinearFiltering:!1,comparisonFunction:0,generateStencil:!1,...t},i=this._gl;this._bindTextureDirectly(i.TEXTURE_CUBE_MAP,r,!0),this._setupDepthStencilTexture(r,e,a.bilinearFiltering,a.comparisonFunction);for(let t=0;t<6;t++)a.generateStencil?i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,i.DEPTH24_STENCIL8,e,e,0,i.DEPTH_STENCIL,i.UNSIGNED_INT_24_8,null):i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,i.DEPTH_COMPONENT24,e,e,0,i.DEPTH_COMPONENT,i.UNSIGNED_INT,null);return this._bindTextureDirectly(i.TEXTURE_CUBE_MAP,null),this._internalTexturesCache.push(r),r},a.w.prototype._setCubeMapTextureParams=function(e,t,r){const a=this._gl;a.texParameteri(a.TEXTURE_CUBE_MAP,a.TEXTURE_MAG_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_CUBE_MAP,a.TEXTURE_MIN_FILTER,t?a.LINEAR_MIPMAP_LINEAR:a.LINEAR),a.texParameteri(a.TEXTURE_CUBE_MAP,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_CUBE_MAP,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),e.samplingMode=t?3:2,t&&this.getCaps().textureMaxLevel&&void 0!==r&&r>0&&(a.texParameteri(a.TEXTURE_CUBE_MAP,a.TEXTURE_MAX_LEVEL,r),e._maxLodLevel=r),this._bindTextureDirectly(a.TEXTURE_CUBE_MAP,null)},a.w.prototype.createCubeTexture=function(e,t,r,a,n=null,s=null,l,u=null,f=!1,c=0,_=0,d=null,p,h=!1,A=null){const E=this._gl;return this.createCubeTextureBase(e,t,r,!!a,n,s,l,u,f,c,_,d,(e=>this._bindTextureDirectly(E.TEXTURE_CUBE_MAP,e,!0)),((e,t)=>{const r=this.needPOTTextures?(0,i.R)(t[0].width,this._caps.maxCubemapTextureSize):t[0].width,s=r,u=[E.TEXTURE_CUBE_MAP_POSITIVE_X,E.TEXTURE_CUBE_MAP_POSITIVE_Y,E.TEXTURE_CUBE_MAP_POSITIVE_Z,E.TEXTURE_CUBE_MAP_NEGATIVE_X,E.TEXTURE_CUBE_MAP_NEGATIVE_Y,E.TEXTURE_CUBE_MAP_NEGATIVE_Z];this._bindTextureDirectly(E.TEXTURE_CUBE_MAP,e,!0),this._unpackFlipY(!1);const f=l?this._getInternalFormat(l,e._useSRGBBuffer):e._useSRGBBuffer?this._glSRGBExtensionValues.SRGB8_ALPHA8:E.RGBA;let c=l?this._getInternalFormat(l):E.RGBA;e._useSRGBBuffer&&1===this.webGLVersion&&(c=f);for(let e=0;e<u.length;e++)if(t[e].width!==r||t[e].height!==s){if(this._prepareWorkingCanvas(),!this._workingCanvas||!this._workingContext)return void o.V.Warn("Cannot create canvas to resize texture.");this._workingCanvas.width=r,this._workingCanvas.height=s,this._workingContext.drawImage(t[e],0,0,t[e].width,t[e].height,0,0,r,s),E.texImage2D(u[e],0,f,c,E.UNSIGNED_BYTE,this._workingCanvas)}else E.texImage2D(u[e],0,f,c,E.UNSIGNED_BYTE,t[e]);a||E.generateMipmap(E.TEXTURE_CUBE_MAP),this._setCubeMapTextureParams(e,!a),e.width=r,e.height=s,e.isReady=!0,l&&(e.format=l),e.onLoadedObservable.notifyObservers(e),e.onLoadedObservable.clear(),n&&n()}),!!h,A)},a.w.prototype.generateMipMapsForCubemap=function(e,t=!0){if(e.generateMipMaps){const r=this._gl;this._bindTextureDirectly(r.TEXTURE_CUBE_MAP,e,!0),r.generateMipmap(r.TEXTURE_CUBE_MAP),t&&this._bindTextureDirectly(r.TEXTURE_CUBE_MAP,null)}}},2305:(e,t,r)=>{r.r(t),r.d(t,{_DDSTextureLoader:()=>y});var a=r(7517),n=r(4867),o=r(1137),i=r(6755),s=r(1947),l=r(854),u=r(655),f=r(8688),c=r(9931),_=r(8454);c.$.prototype._partialLoadFile=function(e,t,r,a,n=null){this._loadFile(e,(e=>{r[t]=e,r._internalCount++,6===r._internalCount&&a(r)}),void 0,void 0,!0,((e,t)=>{n&&e&&n(e.status+" "+e.statusText,t)}))},c.$.prototype._cascadeLoadFiles=function(e,t,r,a=null){const n=[];n._internalCount=0;for(let e=0;e<6;e++)this._partialLoadFile(r[e],e,n,t,a)},c.$.prototype._cascadeLoadImgs=function(e,t,r,a,n=null,o){const i=[];i._internalCount=0;for(let s=0;s<6;s++)this._partialLoadImg(a[s],s,i,e,t,r,n,o)},c.$.prototype._partialLoadImg=function(e,t,r,a,n,o,i=null,s){const l=(0,f.z)();(0,u.W$)(e,(e=>{r[t]=e,r._internalCount++,a&&a.removePendingData(l),6===r._internalCount&&o&&o(n,r)}),((e,t)=>{a&&a.removePendingData(l),i&&i(e,t)}),a?a.offlineProvider:null,s),a&&a.addPendingData(l)},c.$.prototype.createCubeTextureBase=function(e,t,r,a,n=null,i=null,s,u=null,f=!1,c=0,d=0,p=null,h=null,A=null,E=!1,C=null){const T=p||new l.h(this,7);T.isCube=!0,T.url=e,T.generateMipMaps=!a,T._lodGenerationScale=c,T._lodGenerationOffset=d,T._useSRGBBuffer=!!E&&this._caps.supportSRGBBuffers&&(this.version>1||this.isWebGPU||!!a),T!==p&&(T.label=e.substring(0,60)),this._doNotHandleContextLost||(T._extension=u,T._files=r,T._buffer=C);const m=e;this._transformTextureUrl&&!p&&(e=this._transformTextureUrl(e));const y=e.split("?")[0],b=y.lastIndexOf("."),w=u||(b>-1?y.substring(b).toLowerCase():""),B=(0,_.gT)(w),g=(l,_)=>{e===m?i&&l&&i(l.status+" "+l.statusText,_):(o.V.Warn(`Failed to load ${e}, falling back to the ${m}`),this.createCubeTextureBase(m,t,r,!!a,n,i,s,u,f,c,d,T,h,A,E,C))};if(B)B.then((a=>{const s=e=>{h&&h(T,e),a.loadCubeData(e,T,f,n,i)};C?s(C):r&&6===r.length?a.supportCascades?this._cascadeLoadFiles(t,(e=>s(e.map((e=>new Uint8Array(e))))),r,i):i?i("Textures type does not support cascades."):o.V.Warn("Texture loader does not support cascades."):this._loadFile(e,(e=>s(new Uint8Array(e))),void 0,void 0,!0,g)}));else{if(!r||0===r.length)throw new Error("Cannot load cubemap because files were not defined, or the correct loader was not found.");this._cascadeLoadImgs(t,T,((e,t)=>{A&&A(e,t)}),r,i)}return this._internalTexturesCache.push(T),T},r(3155);const d=131072,p=131072;function h(e){return e.charCodeAt(0)+(e.charCodeAt(1)<<8)+(e.charCodeAt(2)<<16)+(e.charCodeAt(3)<<24)}const A=h("DXT1"),E=h("DXT3"),C=h("DXT5"),T=h("DX10");class m{static GetDDSInfo(e){const t=new Int32Array(e.buffer,e.byteOffset,31),r=new Int32Array(e.buffer,e.byteOffset,35);let a=1;t[2]&d&&(a=Math.max(1,t[7]));const n=t[21],o=n===T?r[32]:0;let i=0;switch(n){case 113:i=2;break;case 116:i=1;break;case T:if(10===o){i=2;break}if(2===o){i=1;break}}return{width:t[4],height:t[3],mipmapCount:a,isFourCC:4==(4&t[20]),isRGB:64==(64&t[20]),isLuminance:(t[20]&p)===p,isCube:512==(512&t[28]),isCompressed:n===A||n===E||n===C,dxgiFormat:o,textureType:i}}static _GetHalfFloatAsFloatRGBAArrayBuffer(e,t,r,a,n,o){const i=new Float32Array(a),l=new Uint16Array(n,r);let u=0;for(let r=0;r<t;r++)for(let t=0;t<e;t++){const a=4*(t+r*e);i[u]=(0,s.SX)(l[a]),i[u+1]=(0,s.SX)(l[a+1]),i[u+2]=(0,s.SX)(l[a+2]),m.StoreLODInAlphaChannel?i[u+3]=o:i[u+3]=(0,s.SX)(l[a+3]),u+=4}return i}static _GetHalfFloatRGBAArrayBuffer(e,t,r,a,n,o){if(m.StoreLODInAlphaChannel){const i=new Uint16Array(a),l=new Uint16Array(n,r);let u=0;for(let r=0;r<t;r++)for(let t=0;t<e;t++){const a=4*(t+r*e);i[u]=l[a],i[u+1]=l[a+1],i[u+2]=l[a+2],i[u+3]=(0,s.LZ)(o),u+=4}return i}return new Uint16Array(n,r,a)}static _GetFloatRGBAArrayBuffer(e,t,r,a,n,o){if(m.StoreLODInAlphaChannel){const i=new Float32Array(a),s=new Float32Array(n,r);let l=0;for(let r=0;r<t;r++)for(let t=0;t<e;t++){const a=4*(t+r*e);i[l]=s[a],i[l+1]=s[a+1],i[l+2]=s[a+2],i[l+3]=o,l+=4}return i}return new Float32Array(n,r,a)}static _GetFloatAsHalfFloatRGBAArrayBuffer(e,t,r,a,n,o){const i=new Uint16Array(a),l=new Float32Array(n,r);let u=0;for(let r=0;r<t;r++)for(let t=0;t<e;t++)i[u]=(0,s.LZ)(l[u]),i[u+1]=(0,s.LZ)(l[u+1]),i[u+2]=(0,s.LZ)(l[u+2]),m.StoreLODInAlphaChannel?i[u+3]=(0,s.LZ)(o):i[u+3]=(0,s.LZ)(l[u+3]),u+=4;return i}static _GetFloatAsUIntRGBAArrayBuffer(e,t,r,a,o,i){const s=new Uint8Array(a),l=new Float32Array(o,r);let u=0;for(let r=0;r<t;r++)for(let t=0;t<e;t++){const a=4*(t+r*e);s[u]=255*(0,n.OQ)(l[a]),s[u+1]=255*(0,n.OQ)(l[a+1]),s[u+2]=255*(0,n.OQ)(l[a+2]),m.StoreLODInAlphaChannel?s[u+3]=i:s[u+3]=255*(0,n.OQ)(l[a+3]),u+=4}return s}static _GetHalfFloatAsUIntRGBAArrayBuffer(e,t,r,a,o,i){const l=new Uint8Array(a),u=new Uint16Array(o,r);let f=0;for(let r=0;r<t;r++)for(let t=0;t<e;t++){const a=4*(t+r*e);l[f]=255*(0,n.OQ)((0,s.SX)(u[a])),l[f+1]=255*(0,n.OQ)((0,s.SX)(u[a+1])),l[f+2]=255*(0,n.OQ)((0,s.SX)(u[a+2])),m.StoreLODInAlphaChannel?l[f+3]=i:l[f+3]=255*(0,n.OQ)((0,s.SX)(u[a+3])),f+=4}return l}static _GetRGBAArrayBuffer(e,t,r,a,n,o,i,s,l){const u=new Uint8Array(a),f=new Uint8Array(n,r);let c=0;for(let r=0;r<t;r++)for(let t=0;t<e;t++){const a=4*(t+r*e);u[c]=f[a+o],u[c+1]=f[a+i],u[c+2]=f[a+s],u[c+3]=f[a+l],c+=4}return u}static _ExtractLongWordOrder(e){return 0===e||255===e||-16777216===e?0:1+m._ExtractLongWordOrder(e>>8)}static _GetRGBArrayBuffer(e,t,r,a,n,o,i,s){const l=new Uint8Array(a),u=new Uint8Array(n,r);let f=0;for(let r=0;r<t;r++)for(let t=0;t<e;t++){const a=3*(t+r*e);l[f]=u[a+o],l[f+1]=u[a+i],l[f+2]=u[a+s],f+=3}return l}static _GetLuminanceArrayBuffer(e,t,r,a,n){const o=new Uint8Array(a),i=new Uint8Array(n,r);let s=0;for(let r=0;r<t;r++)for(let t=0;t<e;t++){const a=t+r*e;o[s]=i[a],s++}return o}static UploadDDSLevels(e,t,r,a,n,s,l=-1,u,f=!0){let c=null;a.sphericalPolynomial&&(c=[]);const _=!!e.getCaps().s3tc;t.generateMipMaps=n;const p=new Int32Array(r.buffer,r.byteOffset,31);let h,y,b,w,B,g,x,P=0,F=0,R=1;if(542327876!==p[0])return void o.V.Error("Invalid magic number in DDS header");if(!a.isFourCC&&!a.isRGB&&!a.isLuminance)return void o.V.Error("Unsupported format, must contain a FourCC, RGB or LUMINANCE code");if(a.isCompressed&&!_)return void o.V.Error("Compressed textures are not supported on this platform.");let U=p[22];w=p[1]+4;let G=!1;if(a.isFourCC)switch(h=p[21],h){case A:R=8,F=33777;break;case E:R=16,F=33778;break;case C:R=16,F=33779;break;case 113:G=!0,U=64;break;case 116:G=!0,U=128;break;case T:{w+=20;let e=!1;switch(a.dxgiFormat){case 10:G=!0,U=64,e=!0;break;case 2:G=!0,U=128,e=!0;break;case 88:a.isRGB=!0,a.isFourCC=!1,U=32,e=!0}if(e)break}default:return void o.V.Error(["Unsupported FourCC code:",(M=h,String.fromCharCode(255&M,M>>8&255,M>>16&255,M>>24&255))])}var M;const D=m._ExtractLongWordOrder(p[23]),L=m._ExtractLongWordOrder(p[24]),I=m._ExtractLongWordOrder(p[25]),S=m._ExtractLongWordOrder(p[26]);G&&(F=e._getRGBABufferInternalSizedFormat(a.textureType)),g=1,p[2]&d&&!1!==n&&(g=Math.max(1,p[7]));const O=u||0,v=e.getCaps();for(let n=O;n<s;n++){for(y=p[4],b=p[3],x=0;x<g;++x){if(-1===l||l===x){const o=-1===l?x:0;if(!a.isCompressed&&a.isFourCC){t.format=5,P=y*b*4;let a=null;if(e._badOS||e._badDesktopOS||!v.textureHalfFloat&&!v.textureFloat)128===U?(a=m._GetFloatAsUIntRGBAArrayBuffer(y,b,r.byteOffset+w,P,r.buffer,o),c&&0==o&&c.push(m._GetFloatRGBAArrayBuffer(y,b,r.byteOffset+w,P,r.buffer,o))):64===U&&(a=m._GetHalfFloatAsUIntRGBAArrayBuffer(y,b,r.byteOffset+w,P,r.buffer,o),c&&0==o&&c.push(m._GetHalfFloatAsFloatRGBAArrayBuffer(y,b,r.byteOffset+w,P,r.buffer,o))),t.type=0;else{const e=v.textureFloat&&(f&&v.textureFloatLinearFiltering||!f),n=v.textureHalfFloat&&(f&&v.textureHalfFloatLinearFiltering||!f),i=(128===U||64===U&&!n)&&e?1:(64===U||128===U&&!e)&&n?2:0;let s,l=null;if(128===U)switch(i){case 1:s=m._GetFloatRGBAArrayBuffer,l=null;break;case 2:s=m._GetFloatAsHalfFloatRGBAArrayBuffer,l=m._GetFloatRGBAArrayBuffer;break;case 0:s=m._GetFloatAsUIntRGBAArrayBuffer,l=m._GetFloatRGBAArrayBuffer}else switch(i){case 1:s=m._GetHalfFloatAsFloatRGBAArrayBuffer,l=null;break;case 2:s=m._GetHalfFloatRGBAArrayBuffer,l=m._GetHalfFloatAsFloatRGBAArrayBuffer;break;case 0:s=m._GetHalfFloatAsUIntRGBAArrayBuffer,l=m._GetHalfFloatAsFloatRGBAArrayBuffer}t.type=i,a=s(y,b,r.byteOffset+w,P,r.buffer,o),c&&0==o&&c.push(l?l(y,b,r.byteOffset+w,P,r.buffer,o):a)}a&&e._uploadDataToTextureDirectly(t,a,n,o)}else if(a.isRGB)t.type=0,24===U?(t.format=4,P=y*b*3,B=m._GetRGBArrayBuffer(y,b,r.byteOffset+w,P,r.buffer,D,L,I),e._uploadDataToTextureDirectly(t,B,n,o)):(t.format=5,P=y*b*4,B=m._GetRGBAArrayBuffer(y,b,r.byteOffset+w,P,r.buffer,D,L,I,S),e._uploadDataToTextureDirectly(t,B,n,o));else if(a.isLuminance){const a=e._getUnpackAlignement(),i=y;P=Math.floor((y+a-1)/a)*a*(b-1)+i,B=m._GetLuminanceArrayBuffer(y,b,r.byteOffset+w,P,r.buffer),t.format=1,t.type=0,e._uploadDataToTextureDirectly(t,B,n,o)}else P=Math.max(4,y)/4*Math.max(4,b)/4*R,B=new Uint8Array(r.buffer,r.byteOffset+w,P),t.type=0,e._uploadCompressedDataToTextureDirectly(t,F,y,b,B,n,o)}w+=U?y*b*(U/8):P,y*=.5,b*=.5,y=Math.max(1,y),b=Math.max(1,b)}if(void 0!==u)break}c&&c.length>0?a.sphericalPolynomial=i.d.ConvertCubeMapToSphericalPolynomial({size:p[4],right:c[0],left:c[1],up:c[2],down:c[3],front:c[4],back:c[5],format:5,type:1,gammaSpace:!1}):a.sphericalPolynomial=void 0}}m.StoreLODInAlphaChannel=!1;class y{constructor(){this.supportCascades=!0}loadCubeData(e,t,r,n){const o=t.getEngine();let i,s=!1,l=1e3;if(Array.isArray(e))for(let r=0;r<e.length;r++){const a=e[r];i=m.GetDDSInfo(a),t.width=i.width,t.height=i.height,s=(i.isRGB||i.isLuminance||i.mipmapCount>1)&&t.generateMipMaps,o._unpackFlipY(i.isCompressed),m.UploadDDSLevels(o,t,a,i,s,6,-1,r),i.isFourCC||1!==i.mipmapCount?l=i.mipmapCount-1:o.generateMipMapsForCubemap(t)}else{const n=e;i=m.GetDDSInfo(n),t.width=i.width,t.height=i.height,r&&(i.sphericalPolynomial=new a.Q),s=(i.isRGB||i.isLuminance||i.mipmapCount>1)&&t.generateMipMaps,o._unpackFlipY(i.isCompressed),m.UploadDDSLevels(o,t,n,i,s,6),i.isFourCC||1!==i.mipmapCount?l=i.mipmapCount-1:o.generateMipMapsForCubemap(t,!1)}o._setCubeMapTextureParams(t,s,l),t.isReady=!0,t.onLoadedObservable.notifyObservers(t),t.onLoadedObservable.clear(),n&&n({isDDS:!0,width:t.width,info:i,data:e,texture:t})}loadData(e,t,r){const a=m.GetDDSInfo(e),n=(a.isRGB||a.isLuminance||a.mipmapCount>1)&&t.generateMipMaps&&Math.max(a.width,a.height)>>a.mipmapCount-1==1;r(a.width,a.height,n,a.isFourCC,(()=>{m.UploadDDSLevels(t.getEngine(),t,e,a,n,1)}))}}},6755:(e,t,r)=>{r.d(t,{d:()=>u});var a=r(9923),n=r(4867),o=r(7517),i=r(5559),s=r(6041);class l{constructor(e,t,r,a){this.name=e,this.worldAxisForNormal=t,this.worldAxisForFileX=r,this.worldAxisForFileY=a}}class u{static ConvertCubeMapTextureToSphericalPolynomial(e){if(!e.isCube)return null;e.getScene()?.getEngine().flushFramebuffer();const t=e.getSize().width,r=e.readPixels(0,void 0,void 0,!1),a=e.readPixels(1,void 0,void 0,!1);let n,o;e.isRenderTarget?(n=e.readPixels(3,void 0,void 0,!1),o=e.readPixels(2,void 0,void 0,!1)):(n=e.readPixels(2,void 0,void 0,!1),o=e.readPixels(3,void 0,void 0,!1));const i=e.readPixels(4,void 0,void 0,!1),s=e.readPixels(5,void 0,void 0,!1),l=e.gammaSpace;let u=0;return 1!=e.textureType&&2!=e.textureType||(u=1),new Promise((e=>{Promise.all([a,r,n,o,i,s]).then((([r,a,n,o,i,s])=>{const f={size:t,right:a,left:r,up:n,down:o,front:i,back:s,format:5,type:u,gammaSpace:l};e(this.ConvertCubeMapToSphericalPolynomial(f))}))}))}static _AreaElement(e,t){return Math.atan2(e*t,Math.sqrt(e*e+t*t+1))}static ConvertCubeMapToSphericalPolynomial(e){const t=new o.O;let r=0;const a=2/e.size,l=a,u=.5*a,f=u-1;for(let o=0;o<6;o++){const c=this._FileFaces[o],_=e[c.name];let d=f;const p=5===e.format?4:3;for(let o=0;o<e.size;o++){let h=f;for(let l=0;l<e.size;l++){const f=c.worldAxisForFileX.scale(h).add(c.worldAxisForFileY.scale(d)).add(c.worldAxisForNormal);f.normalize();const A=this._AreaElement(h-u,d-u)-this._AreaElement(h-u,d+u)-this._AreaElement(h+u,d-u)+this._AreaElement(h+u,d+u);let E=_[o*e.size*p+l*p+0],C=_[o*e.size*p+l*p+1],T=_[o*e.size*p+l*p+2];isNaN(E)&&(E=0),isNaN(C)&&(C=0),isNaN(T)&&(T=0),0===e.type&&(E/=255,C/=255,T/=255),e.gammaSpace&&(E=Math.pow((0,n.OQ)(E),i.tk),C=Math.pow((0,n.OQ)(C),i.tk),T=Math.pow((0,n.OQ)(T),i.tk));const m=this.MAX_HDRI_VALUE;if(this.PRESERVE_CLAMPED_COLORS){const e=Math.max(E,C,T);if(e>m){const t=m/e;E*=t,C*=t,T*=t}}else E=(0,n.OQ)(E,0,m),C=(0,n.OQ)(C,0,m),T=(0,n.OQ)(T,0,m);const y=new s.v9(E,C,T);t.addLight(f,y,A),r+=A,h+=a}d+=l}}const c=4*Math.PI*6/6/r;return t.scaleInPlace(c),t.convertIncidentRadianceToIrradiance(),t.convertIrradianceToLambertianRadiance(),o.Q.FromHarmonics(t)}}u._FileFaces=[new l("right",new a.Pq(1,0,0),new a.Pq(0,0,-1),new a.Pq(0,-1,0)),new l("left",new a.Pq(-1,0,0),new a.Pq(0,0,1),new a.Pq(0,-1,0)),new l("up",new a.Pq(0,1,0),new a.Pq(1,0,0),new a.Pq(0,0,1)),new l("down",new a.Pq(0,-1,0),new a.Pq(1,0,0),new a.Pq(0,0,-1)),new l("front",new a.Pq(0,0,1),new a.Pq(1,0,0),new a.Pq(0,-1,0)),new l("back",new a.Pq(0,0,-1),new a.Pq(-1,0,0),new a.Pq(0,-1,0))],u.MAX_HDRI_VALUE=4096,u.PRESERVE_CLAMPED_COLORS=!1}}]);