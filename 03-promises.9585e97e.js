function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},n={},r=t.parcelRequired7c6;null==r&&((r=function(e){if(e in o)return o[e].exports;if(e in n){var t=n[e];delete n[e];var r={id:e,exports:{}};return o[e]=r,t.call(r.exports,r,r.exports),r.exports}var l=new Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,t){n[e]=t},t.parcelRequired7c6=r);var l=r("eWCmQ");const u={form:document.querySelector(".form"),delay:document.querySelector('[name="delay"]'),step:document.querySelector('[name="step"]'),amount:document.querySelector('[name="amount"]')};function i(e,t){const o=Math.random()>.3;return new Promise(((n,r)=>{setTimeout((()=>{o&&n({position:e,delay:t}),r({position:e,delay:t})}),t)}))}u.delay.value=500,u.step.value=100,u.amount.value=5,u.form.addEventListener("submit",(function(t){t.preventDefault();let o=Number(u.form.elements.delay.value);const n=Number(u.form.elements.step.value),r=u.form.elements.amount.value;let a=1;for(a=1;a<=r;a+=1)o+=n,i(a,o).then((({position:t,delay:o})=>{e(l).Notify.success(`✅ Fulfilled promise ${t} in ${o}ms`)})).catch((({position:t,delay:o})=>{e(l).Notify.failure(`❌ Rejected promise ${t} in ${o}ms`)}))}));
//# sourceMappingURL=03-promises.9585e97e.js.map