"use strict";(self.webpackChunkbabylon_mmd_docs=self.webpackChunkbabylon_mmd_docs||[]).push([[738],{8801:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>d,contentTitle:()=>r,default:()=>c,frontMatter:()=>i,metadata:()=>l,toc:()=>m});var n=a(7462),o=(a(7294),a(3905)),s=a(3913);const i={slug:"introduction",title:"The reason I made the mmd loader",authors:["noname0310"]},r=void 0,l={permalink:"/babylon-mmd/docs_build/blog/introduction",editUrl:"https://github.com/noname0310/babylon-mmd/tree/main/docs/babylon-mmd-docs/blog/2023-07-25-first-post/index.mdx",source:"@site/blog/2023-07-25-first-post/index.mdx",title:"The reason I made the mmd loader",description:"Hello, this is the first post I've written since I started making a document.",date:"2023-07-25T00:00:00.000Z",formattedDate:"July 25, 2023",tags:[],readingTime:2.225,hasTruncateMarker:!1,authors:[{name:"noname0310",title:"Maintainer of babylon-mmd",url:"https://github.com/noname0310",imageURL:"https://avatars.githubusercontent.com/u/48761044?v=4",key:"noname0310"}],frontMatter:{slug:"introduction",title:"The reason I made the mmd loader",authors:["noname0310"]}},d={authorsImageUrls:[void 0]},m=[{value:"What is MMD?",id:"what-is-mmd",level:2},{value:"Advantages of Browser-based MMD",id:"advantages-of-browser-based-mmd",level:2},{value:"Why Babylon.js?",id:"why-babylonjs",level:2},{value:"Conclusion",id:"conclusion",level:2}],u={toc:m},h="wrapper";function c(e){let{components:t,...a}=e;return(0,o.kt)(h,(0,n.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Hello, this is the first post I've written since I started making a document."),(0,o.kt)("h2",{id:"what-is-mmd"},"What is MMD?"),(0,o.kt)("p",null,"MikuMikuDance (MMD) is a free 3D animation software developed by a Japanese programmer named Yu Higuchi. It was initially released in 2007 and gained popularity quickly within the anime and virtual idol communities. ",(0,o.kt)("strong",{parentName:"p"},"MMD allows users to create and animate 3D models, primarily focusing on humanoid characters"),", using a straightforward and intuitive interface."),(0,o.kt)("p",null,"MMD still has a large community, and all the ",(0,o.kt)("strong",{parentName:"p"},"high-quality 3D models and motion assets created from them")," are stored in MMD's custom formats, PMX(Polygon Model eXtended) and VMD(Vocaloid Motion Data). These assets are often shared on the Internet, and many people use them to create videos and images."),(0,o.kt)(s.Z,{videoId:"ygmWoJViHJw",opts:{width:"100%"},mdxType:"YouTube"}),(0,o.kt)("h2",{id:"advantages-of-browser-based-mmd"},"Advantages of Browser-based MMD"),(0,o.kt)("p",null,"Generally, these assets consist of 3D models that perform dances synchronized to specific songs. In essence, they are consumable content. ",(0,o.kt)("strong",{parentName:"p"},"People typically don't want to download a 3D application just to view a brief 3-minute or so piece of content"),", which they watch once and then move on from."),(0,o.kt)("p",null,"Hence, the advantage lies in the ability to ",(0,o.kt)("strong",{parentName:"p"},"play MMD directly in the browser. No additional software installation is required"),", and with Babylon.js, it is possible to achieve outstanding visual effects."),(0,o.kt)("p",null,"Playing MMD in the browser allows users to experience seamless and clean creations, as real-time rendering takes place directly in their browser without any loss in quality, resulting in an immersive and captivating experience for the users."),(0,o.kt)("h2",{id:"why-babylonjs"},"Why Babylon.js?"),(0,o.kt)("p",null,"I have been using the ",(0,o.kt)("a",{parentName:"p",href:"https://threejs.org/docs/#examples/en/loaders/MMDLoader"},"MMDLoader")," of Three.js for quite a long time and have discovered several flaws and missing features in it. Initially, I thought I could resolve these issues simply by redefining some functions, but as I attempted to make modifications, I realized it was not feasible."),(0,o.kt)("p",null,"As a result, in early 2023, I made the decision to create my own MMD loader, and my choice was ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/BabylonJS/Babylon.js"},"Babylon.js"),". ",(0,o.kt)("strong",{parentName:"p"},"Babylon.js boasts exceptional code quality")," and, starting from version 6.0, it supports Havok Physics. Moreover, it provides essential elements required to implement MMD on the web, such as GPU skinning using textures, optimized morph targets, and material plugins. The completeness of these features seemed remarkably high."),(0,o.kt)("h2",{id:"conclusion"},"Conclusion"),(0,o.kt)("p",null,"If you have read this far, you might have sensed that I am truly passionate about this specific topic. As a result, the babylon-mmd has the best code quality I can do and is over-engineered to provide some optimization."),(0,o.kt)("p",null,"It's all for MMD in the web browser. If you, the reader, also create and share your creations using babylon-mmd, it would be wonderful."),(0,o.kt)("p",null,"Now, I'll wrap up this post. Thank you."))}c.isMDXComponent=!0}}]);