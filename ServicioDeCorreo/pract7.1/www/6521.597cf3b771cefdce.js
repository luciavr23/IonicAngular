"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[6521],{333:(E,a,i)=>{i.d(a,{c:()=>c,g:()=>p,h:()=>d,o:()=>_});var r=i(467);const d=(o,t)=>null!==t.closest(o),c=(o,t)=>"string"==typeof o&&o.length>0?Object.assign({"ion-color":!0,[`ion-color-${o}`]:!0},t):t,p=o=>{const t={};return(o=>void 0!==o?(Array.isArray(o)?o:o.split(" ")).filter(e=>null!=e).map(e=>e.trim()).filter(e=>""!==e):[])(o).forEach(e=>t[e]=!0),t},h=/^[a-z][a-z0-9+\-.]*:/,_=function(){var o=(0,r.A)(function*(t,e,l,s){if(null!=t&&"#"!==t[0]&&!h.test(t)){const n=document.querySelector("ion-router");if(n)return null!=e&&e.preventDefault(),n.push(t,l,s)}return!1});return function(e,l,s,n){return o.apply(this,arguments)}}()},6521:(E,a,i)=>{i.r(a),i.d(a,{ion_input_password_toggle:()=>e});var r=i(4261),d=i(4929),c=i(333),u=i(3992),p=i(9483);const e=(()=>{let l=class{constructor(s){(0,r.r)(this,s),this.togglePasswordVisibility=()=>{const{inputElRef:n}=this;n&&(n.type="text"===n.type?"password":"text")},this.color=void 0,this.showIcon=void 0,this.hideIcon=void 0,this.type="password"}onTypeChange(s){"text"===s||"password"===s||(0,d.p)(`ion-input-password-toggle only supports inputs of type "text" or "password". Input of type "${s}" is not compatible.`,this.el)}connectedCallback(){const{el:s}=this,n=this.inputElRef=s.closest("ion-input");n?this.type=n.type:(0,d.p)("No ancestor ion-input found for ion-input-password-toggle. This component must be slotted inside of an ion-input.",s)}disconnectedCallback(){this.inputElRef=null}render(){var s,n;const{color:f,type:P}=this,g=(0,p.b)(this),b=null!==(s=this.showIcon)&&void 0!==s?s:u.x,I=null!==(n=this.hideIcon)&&void 0!==n?n:u.y,y="text"===P;return(0,r.h)(r.f,{key:"d9811e25bfeb2aa197352bb9be852e9e420739d5",class:(0,c.c)(f,{[g]:!0})},(0,r.h)("ion-button",{key:"1eaea1442b248fb2b8d61538b27274e647a07804",mode:g,color:f,fill:"clear",shape:"round","aria-checked":y?"true":"false","aria-label":"show password",role:"switch",type:"button",onPointerDown:C=>{C.preventDefault()},onClick:this.togglePasswordVisibility},(0,r.h)("ion-icon",{key:"9c88de8f4631d9bde222ce2edf6950d639e04773",slot:"icon-only","aria-hidden":"true",icon:y?I:b})))}get el(){return(0,r.i)(this)}static get watchers(){return{type:["onTypeChange"]}}};return l.style={ios:"",md:""},l})()}}]);