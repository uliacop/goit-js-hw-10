import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{i as n}from"./assets/vendor-77e16229.js";const a=document.querySelector(".form");a.addEventListener("submit",u);function u(s){s.preventDefault();const t=s.target,i=t.elements.delay,l=t.elements.state,o=i.value,c=l.value;i.value="",new Promise((e,m)=>{setTimeout(()=>{c==="fulfilled"?e(o):m(o)},o)}).then(e=>{r("fulfilled",e)}).catch(e=>{r("rejected",e)}),l.forEach(e=>e.checked=!1)}function r(s,t){s==="fulfilled"?n.success({title:"Success",message:`✅ Fulfilled promise in ${t}ms`,position:"topRight"}):n.error({title:"Error",message:`❌ Rejected promise in ${t}ms`,position:"topRight"})}
//# sourceMappingURL=commonHelpers2.js.map
