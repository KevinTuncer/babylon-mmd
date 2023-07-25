"use strict";(self.webpackChunkbabylon_mmd_docs=self.webpackChunkbabylon_mmd_docs||[]).push([[471],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>h});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=a.createContext({}),d=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=d(e.components);return a.createElement(l.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},p=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),m=d(n),p=o,h=m["".concat(l,".").concat(p)]||m[p]||u[p]||r;return n?a.createElement(h,i(i({ref:t},c),{},{components:n})):a.createElement(h,i({ref:t},c))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,i=new Array(r);i[0]=p;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[m]="string"==typeof e?e:o,i[1]=s;for(var d=2;d<r;d++)i[d]=n[d];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},3898:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>u,frontMatter:()=>r,metadata:()=>s,toc:()=>d});var a=n(7462),o=(n(7294),n(3905));const r={slug:"introduction",title:"The reason I made the mmd loader",authors:["noname0310"]},i=void 0,s={permalink:"/babylon-mmd/docs_bulid/blog/introduction",editUrl:"https://github.com/noname0310/babylon-mmd/tree/main/docs/babylon-mmd-docs/blog/2023-07-25-first-post/index.md",source:"@site/blog/2023-07-25-first-post/index.md",title:"The reason I made the mmd loader",description:"Hello, this is the first post I've written since I started making a document.",date:"2023-07-25T00:00:00.000Z",formattedDate:"July 25, 2023",tags:[],readingTime:2.25,hasTruncateMarker:!1,authors:[{name:"noname0310",title:"Maintainer of babylon-mmd",url:"https://github.com/noname0310",imageURL:"https://avatars.githubusercontent.com/u/48761044?v=4",key:"noname0310"}],frontMatter:{slug:"introduction",title:"The reason I made the mmd loader",authors:["noname0310"]}},l={authorsImageUrls:[void 0]},d=[{value:"What is MMD?",id:"what-is-mmd",level:2},{value:"Advantages of Browser-based MMD",id:"advantages-of-browser-based-mmd",level:2},{value:"Why Babylon.js?",id:"why-babylonjs",level:2},{value:"Conclusion",id:"conclusion",level:2}],c={toc:d},m="wrapper";function u(e){let{components:t,...n}=e;return(0,o.kt)(m,(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Hello, this is the first post I've written since I started making a document."),(0,o.kt)("h2",{id:"what-is-mmd"},"What is MMD?"),(0,o.kt)("p",null,"MikuMikuDance (MMD) is a free 3D animation software developed by a Japanese programmer named Yu Higuchi. It was initially released in 2007 and gained popularity quickly within the anime and virtual idol communities. ",(0,o.kt)("strong",{parentName:"p"},"MMD allows users to create and animate 3D models, primarily focusing on humanoid characters"),", using a straightforward and intuitive interface."),(0,o.kt)("p",null,"MMD still has a large community, and all the ",(0,o.kt)("strong",{parentName:"p"},"high-quality 3D models and motion assets created from them")," are stored in MMD's custom formats, PMX(Polygon Model eXtended) and VMD(Vocaloid Motion Data). These assets are often shared on the Internet, and many people use them to create videos and images."),(0,o.kt)("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/ygmWoJViHJw",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0}),(0,o.kt)("h2",{id:"advantages-of-browser-based-mmd"},"Advantages of Browser-based MMD"),(0,o.kt)("p",null,"Generally, these assets consist of 3D models that perform dances synchronized to specific songs. In essence, they are consumable content. ",(0,o.kt)("strong",{parentName:"p"},"People typically don't want to download a 3D application just to view a brief 3-minute or so piece of content"),", which they watch once and then move on from."),(0,o.kt)("p",null,"Hence, the advantage lies in the ability to ",(0,o.kt)("strong",{parentName:"p"},"play MMD directly in the browser. No additional software installation is required"),", and with Babylon.js, it is possible to achieve outstanding visual effects."),(0,o.kt)("p",null,"Playing MMD in the browser allows users to experience seamless and clean creations, as real-time rendering takes place directly in their browser without any loss in quality, resulting in an immersive and captivating experience for the users."),(0,o.kt)("h2",{id:"why-babylonjs"},"Why Babylon.js?"),(0,o.kt)("p",null,"I have been using the ",(0,o.kt)("a",{parentName:"p",href:"https://threejs.org/docs/#examples/en/loaders/MMDLoader"},"MMDLoader")," of Three.js for quite a long time and have discovered several flaws and missing features in it. Initially, I thought I could resolve these issues simply by redefining some functions, but as I attempted to make modifications, I realized it was not feasible."),(0,o.kt)("p",null,"As a result, in early 2023, I made the decision to create my own MMD loader, and my choice was ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/BabylonJS/Babylon.js"},"Babylon.js"),". ",(0,o.kt)("strong",{parentName:"p"},"Babylon.js boasts exceptional code quality")," and, starting from version 6.0, it supports Havok Physics. Moreover, it provides essential elements required to implement MMD on the web, such as GPU skinning using textures, optimized morph targets, and material plugins. The completeness of these features seemed remarkably high."),(0,o.kt)("h2",{id:"conclusion"},"Conclusion"),(0,o.kt)("p",null,"If you have read this far, you might have sensed that I am truly passionate about this specific topic. As a result, the babylon-mmd has the best code quality I can do and is over-engineered to provide some optimization."),(0,o.kt)("p",null,"It's all for MMD in the web browser. If you, the reader, also create and share your creations using babylon-mmd, it would be wonderful."),(0,o.kt)("p",null,"Now, I'll wrap up this post. Thank you."))}u.isMDXComponent=!0}}]);