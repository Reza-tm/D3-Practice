import{j as l}from"./jsx-runtime-6eef64cc.js";import{i as $,u as A,l as C,m as b}from"./motion-4b54135b.js";import{r as D}from"./index-c013ead5.js";import"./_commonjsHelpers-725317a4.js";class M extends Map{constructor(a,n=F){if(super(),Object.defineProperties(this,{_intern:{value:new Map},_key:{value:n}}),a!=null)for(const[t,r]of a)this.set(t,r)}get(a){return super.get(k(this,a))}has(a){return super.has(k(this,a))}set(a,n){return super.set(R(this,a),n)}delete(a){return super.delete(T(this,a))}}function k({_intern:e,_key:a},n){const t=a(n);return e.has(t)?e.get(t):n}function R({_intern:e,_key:a},n){const t=a(n);return e.has(t)?e.get(t):(e.set(t,n),n)}function T({_intern:e,_key:a},n){const t=a(n);return e.has(t)&&(n=e.get(t),e.delete(t)),n}function F(e){return e!==null&&typeof e=="object"?e.valueOf():e}function S(e,a){let n;if(a===void 0)for(const t of e)t!=null&&(n<t||n===void 0&&t>=t)&&(n=t);else{let t=-1;for(let r of e)(r=a(r,++t,e))!=null&&(n<r||n===void 0&&r>=r)&&(n=r)}return n}function Y(e,a,n){e=+e,a=+a,n=(r=arguments.length)<2?(a=e,e=0,1):r<3?1:+n;for(var t=-1,r=Math.max(0,Math.ceil((a-e)/n))|0,i=new Array(r);++t<r;)i[t]=e+t*n;return i}const v=Symbol("implicit");function H(){var e=new M,a=[],n=[],t=v;function r(i){let c=e.get(i);if(c===void 0){if(t!==v)return t;e.set(i,c=a.push(i)-1)}return n[c%n.length]}return r.domain=function(i){if(!arguments.length)return a.slice();a=[],e=new M;for(const c of i)e.has(c)||e.set(c,a.push(c)-1);return r},r.range=function(i){return arguments.length?(n=Array.from(i),r):n.slice()},r.unknown=function(i){return arguments.length?(t=i,r):t},r.copy=function(){return H(a,n).unknown(t)},$.apply(r,arguments),r}function O(){var e=H().unknown(void 0),a=e.domain,n=e.range,t=0,r=1,i,c,u=!1,h=0,d=0,x=.5;delete e.unknown;function m(){var o=a().length,y=r<t,f=y?r:t,s=y?t:r;i=(s-f)/Math.max(1,o-h+d*2),u&&(i=Math.floor(i)),f+=(s-f-i*(o-h))*x,c=i*(1-h),u&&(f=Math.round(f),c=Math.round(c));var g=Y(o).map(function(w){return f+i*w});return n(y?g.reverse():g)}return e.domain=function(o){return arguments.length?(a(o),m()):a()},e.range=function(o){return arguments.length?([t,r]=o,t=+t,r=+r,m()):[t,r]},e.rangeRound=function(o){return[t,r]=o,t=+t,r=+r,u=!0,m()},e.bandwidth=function(){return c},e.step=function(){return i},e.round=function(o){return arguments.length?(u=!!o,m()):u},e.padding=function(o){return arguments.length?(h=Math.min(1,d=+o),m()):h},e.paddingInner=function(o){return arguments.length?(h=Math.min(1,o),m()):h},e.paddingOuter=function(o){return arguments.length?(d=+o,m()):d},e.align=function(o){return arguments.length?(x=Math.max(0,Math.min(1,o)),m()):x},e.copy=function(){return O(a(),[t,r]).round(u).paddingInner(h).paddingOuter(d).align(x)},$.apply(m(),arguments)}const z=[{date:new Date(2021,0,1),income:2e4,expenses:11220},{date:new Date(2021,1,1),income:3e4,expenses:18e3},{date:new Date(2021,2,1),income:12e3,expenses:1e3},{date:new Date(2021,3,1),income:8e3,expenses:7e3},{date:new Date(2021,4,1),income:23e3,expenses:2e4},{date:new Date(2021,5,1),income:5e3,expenses:2e3},{date:new Date(2021,6,1),income:4e3,expenses:3900},{date:new Date(2021,7,1),income:24e3,expenses:3900},{date:new Date(2021,8,1),income:8e3,expenses:2e4},{date:new Date(2021,9,1),income:2e3,expenses:5e3},{date:new Date(2021,10,1),income:27e3,expenses:3e4},{date:new Date(2021,11,1),income:15e3,expenses:12900}];function P(e){return Math.abs(e)>999?Math.sign(e)*+(Math.abs(e)/1e3).toFixed(1)+"k":Math.sign(e)*Math.abs(e)}const p={top:20,bottom:40,left:60,right:20},W=()=>{const[e,a]=D.useState([]),[n,t]=D.useState(!0),[r,i]=A(),c=i.width-p.right;D.useEffect(()=>{const g=z.sort((w,I)=>w.date.getTime()-I.date.getTime()).map(w=>({...w,month:w.date.toLocaleString("default",{month:"short"})}));a(g)},[]);const u=O().domain(e.map(s=>s.month)).range([p.left,c]).padding(.2),h=S(e.flatMap(s=>[s.expenses,s.income]))||0,d=C().domain([0,h]).range([i.height-p.bottom,p.top]),x=s=>S([i.height-d(s)-p.bottom,0]),m=s=>s.expenses>s.income,o=e.length*.2,y="w-3 h-3 rounded-full",f="flex gap-2 items-center";return l.jsxs("div",{className:`bg-white w-[${window.innerWidth}px] h-[500px] rounded-lg m-3 gap-5 p-4 flex flex-col justify-between`,children:[l.jsx("p",{className:"font-semibold spacing tracking-wider",children:"Acitvity"}),l.jsx("div",{ref:r,className:"h-full",children:i.height&&l.jsxs("svg",{viewBox:`0 0 ${i.width} ${i.height}`,className:"text-gray-600",children:[d.ticks(4).map((s,g)=>l.jsxs("g",{children:[l.jsx("text",{alignmentBaseline:"central",y:d(s),fill:"currentColor",fontSize:12,children:P(s)}),l.jsx("line",{x:100,y:200,y1:d(s),y2:d(s),x1:p.left,x2:c,stroke:"#EBEBEB"})]},`${g}-y-axis`)),l.jsx(b.g,{children:e.map((s,g)=>l.jsx("g",{className:"text-gray-400",transform:`translate(${u(s.month)||0+p.left})`,children:l.jsxs("g",{children:[l.jsx(b.rect,{initial:{height:0,width:u.bandwidth(),attrY:i.height-p.bottom,opacity:0},transition:{delay:n?g*.2:0,type:"spring",width:{delay:n?o:0,duration:.4}},animate:{height:x(s.income),attrY:d(s.income),opacity:1,width:u.bandwidth()/2},fill:"#292728"}),l.jsx(b.rect,{initial:{opacity:0},animate:{opacity:1},onAnimationComplete:()=>t(!1),transition:{type:"spring",delay:n?o+.5:0,duration:1},height:x(s.expenses),y:d(s.expenses),x:u.bandwidth()/2,fill:"#EBEBEB",width:u.bandwidth()/2})]})}))}),e.map((s,g)=>l.jsx(b.text,{initial:{fill:"#4b5563"},animate:{x:m(s)?[-1,1,-1,1]:0,fill:m(s)?"#f87171":"#4b5563"},transition:{x:{repeat:1/0,duration:.2,repeatDelay:2,repeatType:"loop",delay:o*1.5},fill:{delay:o*1.5}},x:(u(s.month)||0)+u.bandwidth()/2,fontSize:12,y:i.height-10,textAnchor:"middle",children:s.month},`x-axis-${g}`))]})}),l.jsxs("div",{className:"flex w-full gap-6 justify-center",children:[l.jsxs("div",{className:f,children:[l.jsx("div",{className:`${y}  bg-[#292728]`}),l.jsx("p",{className:"text-gray-400",children:"Income"})]}),l.jsxs("div",{className:f,children:[l.jsx("div",{className:`${y} bg-[#EBEBEB]`}),l.jsx("p",{className:"text-gray-400",children:"Spent"})]})]})]})},J={title:"Charts/Histogram",component:W,parameters:{layout:"fullscreen",options:{showPanel:!1}}},j={};var B,E,N;j.parameters={...j.parameters,docs:{...(B=j.parameters)==null?void 0:B.docs,source:{originalSource:"{}",...(N=(E=j.parameters)==null?void 0:E.docs)==null?void 0:N.source}}};const K=["Histogram"];export{j as Histogram,K as __namedExportsOrder,J as default};
//# sourceMappingURL=Histogram.stories-9a137253.js.map
