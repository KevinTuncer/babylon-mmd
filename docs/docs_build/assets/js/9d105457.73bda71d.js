"use strict";(self.webpackChunkbabylon_mmd_docs=self.webpackChunkbabylon_mmd_docs||[]).push([[633],{3905:(e,t,r)=>{r.d(t,{Zo:()=>i,kt:()=>m});var A=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var A=Object.getOwnPropertySymbols(e);t&&(A=A.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,A)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,A,n=function(e,t){if(null==e)return{};var r,A,n={},l=Object.keys(e);for(A=0;A<l.length;A++)r=l[A],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(A=0;A<l.length;A++)r=l[A],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var d=A.createContext({}),s=function(e){var t=A.useContext(d),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},i=function(e){var t=s(e.components);return A.createElement(d.Provider,{value:t},e.children)},c="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return A.createElement(A.Fragment,{},t)}},p=A.forwardRef((function(e,t){var r=e.components,n=e.mdxType,l=e.originalType,d=e.parentName,i=o(e,["components","mdxType","originalType","parentName"]),c=s(r),p=n,m=c["".concat(d,".").concat(p)]||c[p]||u[p]||l;return r?A.createElement(m,a(a({ref:t},i),{},{components:r})):A.createElement(m,a({ref:t},i))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var l=r.length,a=new Array(l);a[0]=p;var o={};for(var d in t)hasOwnProperty.call(t,d)&&(o[d]=t[d]);o.originalType=e,o[c]="string"==typeof e?e:n,a[1]=o;for(var s=2;s<l;s++)a[s]=r[s];return A.createElement.apply(null,a)}return A.createElement.apply(null,r)}p.displayName="MDXCreateElement"},3696:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>d,contentTitle:()=>a,default:()=>u,frontMatter:()=>l,metadata:()=>o,toc:()=>s});var A=r(7462),n=(r(7294),r(3905));const l={},a="Load MMD Model",o={unversionedId:"quick-start/load-mmd-model/index",id:"quick-start/load-mmd-model/index",title:"Load MMD Model",description:"Learn how to load models in PMX format.",source:"@site/docs/quick-start/1-load-mmd-model/index.md",sourceDirName:"quick-start/1-load-mmd-model",slug:"/quick-start/load-mmd-model/",permalink:"/babylon-mmd/docs_build/docs/quick-start/load-mmd-model/",draft:!1,editUrl:"https://github.com/noname0310/babylon-mmd/tree/main/docs/babylon-mmd-docs/docs/quick-start/1-load-mmd-model/index.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Create Basic Scene",permalink:"/babylon-mmd/docs_build/docs/quick-start/create-basic-scene/"},next:{title:"Load Animation",permalink:"/babylon-mmd/docs_build/docs/quick-start/load-animation/"}},d={},s=[{value:"Download MMD Model: &quot;YYB Hatsune Miku_10th&quot;",id:"download-mmd-model-yyb-hatsune-miku_10th",level:2},{value:"Load PMX Model",id:"load-pmx-model",level:2}],i={toc:s},c="wrapper";function u(e){let{components:t,...l}=e;return(0,n.kt)(c,(0,A.Z)({},i,l,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"load-mmd-model"},"Load MMD Model"),(0,n.kt)("p",null,"Learn how to load models in PMX format."),(0,n.kt)("h2",{id:"download-mmd-model-yyb-hatsune-miku_10th"},'Download MMD Model: "YYB Hatsune Miku_10th"'),(0,n.kt)("p",null,"If you have a pmx model you want, you can use it."),(0,n.kt)("p",null,'In this tutorial, we will use the "YYB Hatsune Miku_10th" model.'),(0,n.kt)("p",null,"You can download it from ",(0,n.kt)("a",{parentName:"p",href:"https://www.deviantart.com/sanmuyyb/art/YYB-Hatsune-Miku-10th-DL-702119716"},"here"),"."),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"Zip preview",src:r(8343).Z,width:"820",height:"493"})),(0,n.kt)("p",null,'Unzip the downloaded zip file and copy the "YYB Hatsune Miku_10th" folder to the "res" folder.'),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"Vscode file structure",src:r(5037).Z,width:"326",height:"334"})),(0,n.kt)("p",null,"Your file structure should look like this."),(0,n.kt)("h2",{id:"load-pmx-model"},"Load PMX Model"),(0,n.kt)("p",null,"For load pmx model, we need to import side effects."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript",metastring:'title="src/sceneBuilder.ts"',title:'"src/sceneBuilder.ts"'},'import "babylon-mmd/Loader/pmxLoader";\n')),(0,n.kt)("p",null,"Then, load the model using the ",(0,n.kt)("inlineCode",{parentName:"p"},"SceneLoader"),"."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript",metastring:'title="src/sceneBuilder.ts"',title:'"src/sceneBuilder.ts"'},'const mmdMesh = await SceneLoader.ImportMeshAsync("", "res/YYB Hatsune Miku_10th/YYB Hatsune Miku_10th_v1.02.pmx", undefined, scene)\n    .then((result) => result.meshes[0] as Mesh);\nmmdMesh.receiveShadows = true;\nshadowGenerator.addShadowCaster(mmdMesh);\n')),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("inlineCode",{parentName:"p"},"SceneLoader.ImportMeshAsync")," - Load the model using the ",(0,n.kt)("inlineCode",{parentName:"p"},"SceneLoader")," (All other loading methods are supported, but this example uses ",(0,n.kt)("inlineCode",{parentName:"p"},"ImportMeshAsync"),")."),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},'""')," - this parameter is not used in PMX loading."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},'"res/YYB Hatsune Miku_10th/YYB Hatsune Miku_10th_v1.02.pmx"')," - the path to the model file."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"undefined")," - If you pass a File object, you can load the model from the File object."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"scene")," - the scene to load the model into."))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"An importMeshAsync call in pmx file guarantees that result.meshes length is always 1.")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Below is the shadow setting I won't explain in detail."))),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"Result",src:r(8214).Z,width:"1332",height:"819"})))}u.isMDXComponent=!0},5037:(e,t,r)=>{r.d(t,{Z:()=>A});const A="data:image/png;base64,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"},8214:(e,t,r)=>{r.d(t,{Z:()=>A});const A=r.p+"assets/images/image-2-189b506b1ea54eef95279ba08d46d807.png"},8343:(e,t,r)=>{r.d(t,{Z:()=>A});const A=r.p+"assets/images/image-66fd1e669049392c38a80899c672e0cd.png"}}]);