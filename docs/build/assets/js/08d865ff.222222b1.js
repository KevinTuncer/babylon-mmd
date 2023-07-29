"use strict";(self.webpackChunkbabylon_mmd_docs=self.webpackChunkbabylon_mmd_docs||[]).push([[121],{3905:(A,t,e)=>{e.d(t,{Zo:()=>p,kt:()=>u});var n=e(7294);function a(A,t,e){return t in A?Object.defineProperty(A,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):A[t]=e,A}function r(A,t){var e=Object.keys(A);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(A);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(A,t).enumerable}))),e.push.apply(e,n)}return e}function i(A){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?r(Object(e),!0).forEach((function(t){a(A,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(A,Object.getOwnPropertyDescriptors(e)):r(Object(e)).forEach((function(t){Object.defineProperty(A,t,Object.getOwnPropertyDescriptor(e,t))}))}return A}function s(A,t){if(null==A)return{};var e,n,a=function(A,t){if(null==A)return{};var e,n,a={},r=Object.keys(A);for(n=0;n<r.length;n++)e=r[n],t.indexOf(e)>=0||(a[e]=A[e]);return a}(A,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(A);for(n=0;n<r.length;n++)e=r[n],t.indexOf(e)>=0||Object.prototype.propertyIsEnumerable.call(A,e)&&(a[e]=A[e])}return a}var o=n.createContext({}),d=function(A){var t=n.useContext(o),e=t;return A&&(e="function"==typeof A?A(t):i(i({},t),A)),e},p=function(A){var t=d(A.components);return n.createElement(o.Provider,{value:t},A.children)},l="mdxType",m={inlineCode:"code",wrapper:function(A){var t=A.children;return n.createElement(n.Fragment,{},t)}},c=n.forwardRef((function(A,t){var e=A.components,a=A.mdxType,r=A.originalType,o=A.parentName,p=s(A,["components","mdxType","originalType","parentName"]),l=d(e),c=a,u=l["".concat(o,".").concat(c)]||l[c]||m[c]||r;return e?n.createElement(u,i(i({ref:t},p),{},{components:e})):n.createElement(u,i({ref:t},p))}));function u(A,t){var e=arguments,a=t&&t.mdxType;if("string"==typeof A||a){var r=e.length,i=new Array(r);i[0]=c;var s={};for(var o in t)hasOwnProperty.call(t,o)&&(s[o]=t[o]);s.originalType=A,s[l]="string"==typeof A?A:a,i[1]=s;for(var d=2;d<r;d++)i[d]=e[d];return n.createElement.apply(null,i)}return n.createElement.apply(null,e)}c.displayName="MDXCreateElement"},9414:(A,t,e)=>{e.r(t),e.d(t,{assets:()=>o,contentTitle:()=>i,default:()=>m,frontMatter:()=>r,metadata:()=>s,toc:()=>d});var n=e(7462),a=(e(7294),e(3905));const r={},i="Bake Physics Animation (External)",s={unversionedId:"deep-usage/bake-physics-animation/index",id:"deep-usage/bake-physics-animation/index",title:"Bake Physics Animation (External)",description:"Use NexGiMa to bake physics animation.",source:"@site/docs/1-deep-usage/3-bake-physics-animation/index.md",sourceDirName:"1-deep-usage/3-bake-physics-animation",slug:"/deep-usage/bake-physics-animation/",permalink:"/babylon-mmd/docs/deep-usage/bake-physics-animation/",draft:!1,editUrl:"https://github.com/noname0310/babylon-mmd/tree/main/docs/babylon-mmd-docs/docs/1-deep-usage/3-bake-physics-animation/index.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Load BPMX Model",permalink:"/babylon-mmd/docs/deep-usage/load-bpmx-model/"},next:{title:"Convert VMD animation into BVMD",permalink:"/babylon-mmd/docs/deep-usage/convert-vmd-animation-into-bvmd/"}},o={},d=[{value:"Download Animation: &quot;\u30d4\u30c1\u30ab\u30fc\u30c8\u30c9\u30ed\u30c3\u30d7\u30b9&quot;",id:"download-animation-\u30d4\u30c1\u30ab\u30fc\u30c8\u30c9\u30ed\u30c3\u30d7\u30b9",level:2},{value:"Use NexGiMa to Bake Physics Animation",id:"use-nexgima-to-bake-physics-animation",level:2}],p={toc:d},l="wrapper";function m(A){let{components:t,...r}=A;return(0,a.kt)(l,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"bake-physics-animation-external"},"Bake Physics Animation (External)"),(0,a.kt)("p",null,"Use ",(0,a.kt)("a",{parentName:"p",href:"https://sites.google.com/view/nexgima/Home"},"NexGiMa")," to bake physics animation."),(0,a.kt)("h2",{id:"download-animation-\u30d4\u30c1\u30ab\u30fc\u30c8\u30c9\u30ed\u30c3\u30d7\u30b9"},'Download Animation: "\u30d4\u30c1\u30ab\u30fc\u30c8\u30c9\u30ed\u30c3\u30d7\u30b9"'),(0,a.kt)("p",null,'If you already have a desired motion, feel free to use it. In this tutorial, we will use "\u30d4\u30c1\u30ab\u30fc\u30c8\u30c9\u30ed\u30c3\u30d7\u30b9" by \u3058\u3085\u3093\u3053\u3060 and Akira-K'),(0,a.kt)("p",null,"You can download the motion from ",(0,a.kt)("strong",{parentName:"p"},(0,a.kt)("a",{parentName:"strong",href:"https://bowlroll.net/file/133877"},"here")),"."),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"zip file",src:e(9922).Z,width:"820",height:"493"})),(0,a.kt)("p",null,"Compressed files distributed by the Japanese often have encoding problems. Compression programs such as ",(0,a.kt)("a",{parentName:"p",href:"https://en.bandisoft.com/bandizip/"},"Bandizip")," can solve this problem by changing the codepage."),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"zip file encode fixed",src:e(6451).Z,width:"820",height:"493"})),(0,a.kt)("p",null,"And We'll use 10 million's camera motion."),(0,a.kt)("p",null,"You can download the camera motion from ",(0,a.kt)("strong",{parentName:"p"},(0,a.kt)("a",{parentName:"strong",href:"https://www.nicovideo.jp/watch/sm36273873"},"here")),"."),(0,a.kt)("p",null,(0,a.kt)("em",{parentName:"p"},"Check the video description for the download link.")),(0,a.kt)("p",null,"unzip camera motion file as same as the motion file."),(0,a.kt)("h2",{id:"use-nexgima-to-bake-physics-animation"},"Use NexGiMa to Bake Physics Animation"),(0,a.kt)("p",null,"Download NexGiMa from ",(0,a.kt)("strong",{parentName:"p"},(0,a.kt)("a",{parentName:"strong",href:"https://sites.google.com/view/nexgima/Home"},"here"))," and open it."),(0,a.kt)("admonition",{type:"tip"},(0,a.kt)("p",{parentName:"admonition"},"NexGiMa is an MMD compatible program that supports baking physics animation.")),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"nexgima open",src:e(6563).Z,width:"1906",height:"1073"})),(0,a.kt)("p",null,"drag and drop the model file",(0,a.kt)("em",{parentName:"p"},"(YYB Piano dress Miku/YYB Piano dress Miku.pmx)")," into NexGiMa."),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"nexgima model load",src:e(9836).Z,width:"1906",height:"1073"})),(0,a.kt)("p",null,"drag and drop the motion file",(0,a.kt)("em",{parentName:"p"},"(\u30d4\u30c1\u30ab\u30fc\u30c8\u30c9\u30ed\u30c3\u30d7\u30b9\u30e2\u30fc\u30b7\u30e7\u30f3\u914d\u5e03\u7528 2/Tda\u5f0f\u521d\u97f3\u30df\u30af.vmd)")," into NexGiMa."),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"nexgima motion load",src:e(4410).Z,width:"1906",height:"1073"})),(0,a.kt)("p",null,'click the "\u30ad\u30fc\u713c\u304d\u3053\u307f..." button to open the bake options window.'),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"bake window open menu",src:e(1715).Z,width:"548",height:"144"})),(0,a.kt)("p",null,'check the "\u7269\u7406\u713c\u304d\u8fbc\u307f" option and click the "OK" button.'),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"bake options",src:e(2345).Z,width:"406",height:"331"})),(0,a.kt)("p",null,"After baking, there is a physics animation. You can select all of these and export the animation."),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"bake result",src:e(5551).Z,width:"1906",height:"1073"})),(0,a.kt)("p",null,'Select the display frame for export the keyframes. then click the "\u7bc4\u56f2\u9078\u629e" for select all keyframes in the display frame.'),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"select keyframes",src:e(9353).Z,width:"785",height:"724"})),(0,a.kt)("p",null,'Click the "\u30e2\u30fc\u30b7\u30e7\u30f3\u3092\u4fdd\u5b58\u3059\u308b..." button to export the keyframes.'),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"export keyframes",src:e(6973).Z,width:"320",height:"416"})),(0,a.kt)("p",null,'Save is as "pizzicato_drops_yyb_piano_miku_phys".'),(0,a.kt)("admonition",{type:"tip"},(0,a.kt)("p",{parentName:"admonition"},"Baked physics animations are only valid for the model you baked. so it is recommended to save the animation with the model name.")),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"save window",src:e(3407).Z,width:"1099",height:"741"})),(0,a.kt)("admonition",{type:"danger"},(0,a.kt)("p",{parentName:"admonition"},"NexGiMa has a bug that does not properly convert bone name in certain Chinese characters. Therefore, for some models, the bone name needs to be modified."),(0,a.kt)("p",{parentName:"admonition"},"The model we use as an example also has this problem, and we will try to use the animation retargeting function to solve it.")))}m.isMDXComponent=!0},6451:(A,t,e)=>{e.d(t,{Z:()=>n});const n=e.p+"assets/images/image-1-a80d2a1c8c648417233e7dfe54b69350.png"},3407:(A,t,e)=>{e.d(t,{Z:()=>n});const n=e.p+"assets/images/image-10-36692b172a702c8dea62f7bdd17e5fa4.png"},6563:(A,t,e)=>{e.d(t,{Z:()=>n});const n=e.p+"assets/images/image-2-8116d88c90cace64fc77f1fe12ccfb0b.png"},9836:(A,t,e)=>{e.d(t,{Z:()=>n});const n=e.p+"assets/images/image-3-680d58fb9da92e6d66c433177d03dbd1.png"},4410:(A,t,e)=>{e.d(t,{Z:()=>n});const n=e.p+"assets/images/image-4-2bc925106c604f7539e025d5ec353cda.png"},1715:(A,t,e)=>{e.d(t,{Z:()=>n});const n="data:image/png;base64,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"},2345:(A,t,e)=>{e.d(t,{Z:()=>n});const n="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZYAAAFLCAYAAAD1WKpnAAAgAElEQVR4nO3dfWxU54Hv8d+8YIMTYzMZXHChMXW3uVFLku2Si2hLyE1aQV+SxhXNlZqqEBTddrf0ltxGbFaqGnITKZSkgWxXW0WpKBeJW4kgoNukLKhpStKG7d4UUry5JKtLbDdgStcdG9wAHjwz9w8y08PhvI6fmTMv349k2XPOc57zeAzPb57nOXMmdu9NNxVkEUsmlWhrU3zaNMVaWhRLJAQAQFEhl1M+m1Xh4kXlzp1TYXLysv3JXOHPuZK8+mpNv+Ya3d7Xp3kLFui9CxaoI5WqdpsBADXsTCajkwMDOjEwoJ/v3avzf/yjJsfHS/tj99xwQ0GSWlMpLfz4x3XXqlVKz5kTWYMBAPVj5Pe/14+3b1f/K6/owsiIVCgo8eH3vGdD8uqrdeOtt+q+v/1btV19ddTtBADUibarr9ZHPvYxvT00pD8MDyuXzSpeSCTUes01+tyXvxx1+wAAdepT99yj1y9c0O4331Qy3tamT/b1aTbTXwCAMs2bN09PPvmkjh07pnispUXzFiyIuk0AgDqXTqc1OTmpeGzaNM1///ujbg8AoM6l02nlcjnFY/G4OrmkGAAwRW1tbcrn84rno24JAKChlBUsDz/8sA4dOlT2SZctW3bFtr6+Pt9z7t+/v+xzAgCudMONN+mll1923f/Syy/rxpv+MnB927ZtU7xQKPiXtOno6NCvf/3r0McVpd6detuyZYva29vV3t6un/3sZ6Wft2zZ4njOH/3oR9qyZYuWLVt2WbA9/PDDymQyV9TpVI8k7dq1S319ferr6/MsBwCN7h/+4Xtas2aNY7i89PLLWrNmjb73vb8PVWeoEcvg4KAOHTqkM2fO6ODBg+rr69OyZct8RxtF/f39pUDYtWuX1q1bp1deeUXj4+P6xCc+of7+fg0NDWndunWSpEOHDqm9vV3z58/XwYMH9cILL0iSNm7cqCVLlpTqXbVqlR555BFJ0rp16zQ+Pq4DBw64tuO9732v7rjjDq1fv14PPPCAZs6cGeJZAIDGccvSpdq6desV4VIMla1bt+qWpUtD1Rl4xHLo0CEtXbpUmzZt0sDAgI4fP67169dr48aN2rNnT6A6/vSnP+nYsWPKZDL61a9+JUnavXu3JOmrX/2q9u7dqzfffLNUfsmSJRofH9fbb7+tzZs36/bbb9fQ0JCefvpprV69ulSup6dHmzdvvuxcx44d02uvvebYjiVLlmjNmjVasmSJxsbGdPPNN5d+R2u9ANAM7OEylVBZvXq1kkFHLEuWLNHbb79detze3n7ZqCGo66+/XqOjo1qxYoXa29slSU888cQV5Q4cOKAlS5Zo2bJlOnz4sBYsWKDe3l698MIL2rx5s2677TbP8/T392vWrFnKZDKlqTcnhw8fviyUbrrpptC/EwDUO2u4SCorVIrKmgrbtWuXFixYoNWrV6uvr0/z58/X/v37L1vfsH9JKq3L9Pb2avny5RofH9cjjzyi8fHx0s8HDhzQ+Ph4KbQOHjyo8fFxHT16VHv27NE3v/lNnT171nGdxtpOSbr77ru1ffv2K36P/v5+rV69Wu3t7Tp8+LDmz5+v1atXe06fAQCCSQadCtu1a5fuv/9+LVq0SB0dHZo1a5ZuuukmLV68WHPnzlVPT4+WL19eWh9xcv3112vJkiWlhfYg+vv7tXbtWh0+fFiS9JGPfERvvfWWbr75Zi1cuFDr1q3TunXrLlvn2bBhgzZs2KCenh49/fTT6u/v18KFCyVdCp177rlHjz/+uBYsWKAPfehDWrlypQ4dOqQHH3xQqVRKixcvLms0BgD1yjr9JansqbBt27YpducnP1nY8e46RxjFK6m8gsTJoUOHtGnTJt1xxx36xje+4VpufHxcmUxGt956qx5//HEtX75c0qVgePXVV7Vo0SL19PSUyvf19WnPnj26//77de2115baNTg4qDvvvFM7duzQwoULtXXrVs2cOVO33Xabbr31Vh09erRUxw033KBvf/vbev311/XQQw+F+r0AoF45ramUu87ygx/8QPHwFxtfcv3112toaCj0cTt37tTmzZtLV4D19/frgQce0IEDB0rTYq+88ooymYzefPPN0rRZUU9Pj1auXHlZqBQVrzizhl1PT4927NihtWvXKpPJ6OzZs2pvb9cjjzxSmkssHnv77bdr5cqVhAqApuEWIG5XiwURz5fxPhZJ6u7uLq1lBDU4OKjBwcHSVVypVEpPPfWUVq1adVm53bt36+zZs7ruuut0/Phx7dq1y3P6bOvWrcpkMtq5c6fjKGjhwoXauHGjJGnx4sW67777NDg4WAqg/v5+feUrX/EcQQFAoykUCvr61/+766ikGC5r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"},5551:(A,t,e)=>{e.d(t,{Z:()=>n});const n=e.p+"assets/images/image-7-4ec9286ae2e6687782320140f873e063.png"},9353:(A,t,e)=>{e.d(t,{Z:()=>n});const n=e.p+"assets/images/image-8-29c4c6287eb145d2220360c5824e11f2.png"},6973:(A,t,e)=>{e.d(t,{Z:()=>n});const n=e.p+"assets/images/image-9-f75551c3e521639591ec05b91469dc6f.png"},9922:(A,t,e)=>{e.d(t,{Z:()=>n});const n=e.p+"assets/images/image-de0f786f0dc6e87a762f358d181d8b5e.png"}}]);