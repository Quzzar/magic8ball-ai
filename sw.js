if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let t={};const c=e=>s(e,o),f={module:{uri:o},exports:t,require:c};i[o]=Promise.all(n.map((e=>f[e]||c(e)))).then((e=>(r(...e),t)))}}define(["./workbox-27b29e6f"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-473564c5.css",revision:null},{url:"assets/index-4f5e0291.js",revision:null},{url:"index.html",revision:"ee9a5217563b8a91ffba8bf91bb29bb0"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"apple-icon-180.png",revision:"1572e358c35e433bdda38cd05edf38b6"},{url:"maskable_icon.png",revision:"7721f693aea62ae056494633cc6dc57f"},{url:"maskable_icon-512.png",revision:"8def01c6d94724c73e4ece97f4aabfda"},{url:"manifest.webmanifest",revision:"a4b36622126ec8bcf99f9d6faf560ef6"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
