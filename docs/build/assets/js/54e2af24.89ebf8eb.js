"use strict";(self.webpackChunkbabylon_mmd_docs=self.webpackChunkbabylon_mmd_docs||[]).push([[377],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>b});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),l=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=l(e.components);return r.createElement(s.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,d=c(e,["components","mdxType","originalType","parentName"]),p=l(n),u=a,b=p["".concat(s,".").concat(u)]||p[u]||m[u]||i;return n?r.createElement(b,o(o({ref:t},d),{},{components:n})):r.createElement(b,o({ref:t},d))}));function b(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=u;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c[p]="string"==typeof e?e:a,o[1]=c;for(var l=2;l<i;l++)o[l]=n[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},3629:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>m,frontMatter:()=>i,metadata:()=>c,toc:()=>l});var r=n(7462),a=(n(7294),n(3905));const i={},o="Create Basic Scene",c={unversionedId:"quick-start/create-basic-scene/index",id:"quick-start/create-basic-scene/index",title:"Create Basic Scene",description:"First, you need a basic scene before you load the MMD.",source:"@site/docs/quick-start/0-create-basic-scene/index.md",sourceDirName:"quick-start/0-create-basic-scene",slug:"/quick-start/create-basic-scene/",permalink:"/babylon-mmd/build/docs/quick-start/create-basic-scene/",draft:!1,editUrl:"https://github.com/noname0310/babylon-mmd/tree/main/docs/babylon-mmd-docs/docs/quick-start/0-create-basic-scene/index.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Quick Start",permalink:"/babylon-mmd/build/docs/category/quick-start"},next:{title:"Load MMD Model",permalink:"/babylon-mmd/build/docs/quick-start/load-mmd-model/"}},s={},l=[{value:"Clone the <code>babylon-mmd-viwewer</code> repository",id:"clone-the-babylon-mmd-viwewer-repository",level:2}],d={toc:l},p="wrapper";function m(e){let{components:t,...i}=e;return(0,a.kt)(p,(0,r.Z)({},d,i,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"create-basic-scene"},"Create Basic Scene"),(0,a.kt)("p",null,"First, you need a basic scene before you load the MMD."),(0,a.kt)("p",null,"In this tutorial, we will do basic scene setting using minimal code."),(0,a.kt)("h2",{id:"clone-the-babylon-mmd-viwewer-repository"},"Clone the ",(0,a.kt)("inlineCode",{parentName:"h2"},"babylon-mmd-viwewer")," repository"),(0,a.kt)("p",null,"Project setups can vary widely depending on personal preferences. However, for starters, I recommend the ",(0,a.kt)("strong",{parentName:"p"},(0,a.kt)("a",{parentName:"strong",href:"https://github.com/noname0310/babylon-mmd-viewer.git"},"babylon-mmd-viewer"))," repository as a template for using babylon-mmd"),(0,a.kt)("p",null,"Clone the repository using git:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"git clone https://github.com/noname0310/babylon-mmd-viewer.git\n")),(0,a.kt)("p",null,"When you open a cloned repository in vscode, src requires these four sources(other files can be deleted):"),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"vscode explorer files",src:n(4793).Z,width:"137",height:"135"})),(0,a.kt)("p",null,"Let's first run the project in watch mode."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"npm i\nnpm start\n")),(0,a.kt)("p",null,"It's okay if there's still an error Let's open ",(0,a.kt)("a",{parentName:"p",href:"https://localhost:20310"},"https://localhost:20310")," in the browser and write the code."),(0,a.kt)("p",null,"Start with the blank template."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript",metastring:'title="src/sceneBuilder.ts"',title:'"src/sceneBuilder.ts"'},'import type { Engine } from "@babylonjs/core";\nimport { Scene, Vector3 } from "@babylonjs/core";\n\nimport type { ISceneBuilder } from "./baseRuntime";\nimport { MmdCamera } from "babylon-mmd";\n\nexport class SceneBuilder implements ISceneBuilder {\n    public async build(_canvas: HTMLCanvasElement, engine: Engine): Promise<Scene> {\n        const scene = new Scene(engine);\n\n        const camera = new MmdCamera("mmdCamera", new Vector3(0, 10, 0), scene);\n        \n        return scene;\n    }\n}\n')),(0,a.kt)("p",null,"add light, shadow, and ground."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript",metastring:'title="src/sceneBuilder.ts"',title:'"src/sceneBuilder.ts"'},'const hemisphericLight = new HemisphericLight("HemisphericLight", new Vector3(0, 1, 0), scene);\nhemisphericLight.intensity = 0.4;\nhemisphericLight.specular.set(0, 0, 0);\nhemisphericLight.groundColor.set(1, 1, 1);\n\nconst directionalLight = new DirectionalLight("DirectionalLight", new Vector3(0.5, -1, 1), scene);\ndirectionalLight.intensity = 0.8;\ndirectionalLight.shadowMaxZ = 20;\ndirectionalLight.shadowMinZ = -15;\n\nconst shadowGenerator = new ShadowGenerator(2048, directionalLight, true, camera);\nshadowGenerator.bias = 0.01;\n\nconst ground = MeshBuilder.CreateGround("ground1", { width: 60, height: 60, subdivisions: 2, updatable: false }, scene);\nground.receiveShadows = true;\nshadowGenerator.addShadowCaster(ground);\n')),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"now we have ground",src:n(2804).Z,width:"1296",height:"819"})))}m.isMDXComponent=!0},2804:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/image-1-69cd5407dea6b08c60f7b21d47a15dcf.png"},4793:(e,t,n)=>{n.d(t,{Z:()=>r});const r="data:image/png;base64,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"}}]);