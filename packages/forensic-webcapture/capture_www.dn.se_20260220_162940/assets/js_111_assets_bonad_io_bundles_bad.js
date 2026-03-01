window.badTimestamp="2/20/2026, 9:30:09 AM";window.badVersion="bonnier-ad-delivery/2.11.2-f6d00f4";(function(){"use strict";const z=globalThis,G=z.ShadowRoot&&(z.ShadyCSS===void 0||z.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Y=Symbol(),lt=new WeakMap;let dt=class{constructor(t,n,i){if(this._$cssResult$=!0,i!==Y)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=n}get styleSheet(){let t=this.o;const n=this.t;if(G&&t===void 0){const i=n!==void 0&&n.length===1;i&&(t=lt.get(n)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&lt.set(n,t))}return t}toString(){return this.cssText}};const pe=e=>new dt(typeof e=="string"?e:e+"",void 0,Y),ct=(e,...t)=>{const n=e.length===1?e[0]:t.reduce(((i,o,s)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+e[s+1]),e[0]);return new dt(n,e,Y)},ge=(e,t)=>{if(G)e.adoptedStyleSheets=t.map((n=>n instanceof CSSStyleSheet?n:n.styleSheet));else for(const n of t){const i=document.createElement("style"),o=z.litNonce;o!==void 0&&i.setAttribute("nonce",o),i.textContent=n.cssText,e.appendChild(i)}},ht=G?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let n="";for(const i of t.cssRules)n+=i.cssText;return pe(n)})(e):e;const{is:ue,defineProperty:me,getOwnPropertyDescriptor:fe,getOwnPropertyNames:we,getOwnPropertySymbols:be,getPrototypeOf:ye}=Object,W=globalThis,pt=W.trustedTypes,_e=pt?pt.emptyScript:"",ve=W.reactiveElementPolyfillSupport,P=(e,t)=>e,J={toAttribute(e,t){switch(t){case Boolean:e=e?_e:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},gt=(e,t)=>!ue(e,t),ut={attribute:!0,type:String,converter:J,reflect:!1,hasChanged:gt};Symbol.metadata??=Symbol("metadata"),W.litPropertyMetadata??=new WeakMap;let E=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,n=ut){if(n.state&&(n.attribute=!1),this._$Ei(),this.elementProperties.set(t,n),!n.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,n);o!==void 0&&me(this.prototype,t,o)}}static getPropertyDescriptor(t,n,i){const{get:o,set:s}=fe(this.prototype,t)??{get(){return this[n]},set(a){this[n]=a}};return{get(){return o?.call(this)},set(a){const r=o?.call(this);s.call(this,a),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ut}static _$Ei(){if(this.hasOwnProperty(P("elementProperties")))return;const t=ye(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(P("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(P("properties"))){const n=this.properties,i=[...we(n),...be(n)];for(const o of i)this.createProperty(o,n[o])}const t=this[Symbol.metadata];if(t!==null){const n=litPropertyMetadata.get(t);if(n!==void 0)for(const[i,o]of n)this.elementProperties.set(i,o)}this._$Eh=new Map;for(const[n,i]of this.elementProperties){const o=this._$Eu(n,i);o!==void 0&&this._$Eh.set(o,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const n=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const o of i)n.unshift(ht(o))}else t!==void 0&&n.push(ht(t));return n}static _$Eu(t,n){const i=n.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$Eg=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$ES(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$E_??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$E_?.delete(t)}_$ES(){const t=new Map,n=this.constructor.elementProperties;for(const i of n.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ge(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$E_?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$E_?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,n,i){this._$AK(t,i)}_$EO(t,n){const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(o!==void 0&&i.reflect===!0){const s=(i.converter?.toAttribute!==void 0?i.converter:J).toAttribute(n,i.type);this._$Em=t,s==null?this.removeAttribute(o):this.setAttribute(o,s),this._$Em=null}}_$AK(t,n){const i=this.constructor,o=i._$Eh.get(t);if(o!==void 0&&this._$Em!==o){const s=i.getPropertyOptions(o),a=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:J;this._$Em=o,this[o]=a.fromAttribute(n,s.type),this._$Em=null}}requestUpdate(t,n,i,o=!1,s){if(t!==void 0){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??gt)(o?s:this[t],n))return;this.C(t,n,i)}this.isUpdatePending===!1&&(this._$Eg=this._$EP())}C(t,n,i){this._$AL.has(t)||this._$AL.set(t,n),i.reflect===!0&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$EP(){this.isUpdatePending=!0;try{await this._$Eg}catch(n){Promise.reject(n)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[o,s]of this._$Ep)this[o]=s;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[o,s]of i)s.wrapped!==!0||this._$AL.has(o)||this[o]===void 0||this.C(o,this[o],s)}let t=!1;const n=this._$AL;try{t=this.shouldUpdate(n),t?(this.willUpdate(n),this._$E_?.forEach((i=>i.hostUpdate?.())),this.update(n)):this._$ET()}catch(i){throw t=!1,this._$ET(),i}t&&this._$AE(n)}willUpdate(t){}_$AE(t){this._$E_?.forEach((n=>n.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$ET(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Eg}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach((n=>this._$EO(n,this[n]))),this._$ET()}updated(t){}firstUpdated(t){}};E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[P("elementProperties")]=new Map,E[P("finalized")]=new Map,ve?.({ReactiveElement:E}),(W.reactiveElementVersions??=[]).push("2.0.2");const K=globalThis,q=K.trustedTypes,mt=q?q.createPolicy("lit-html",{createHTML:e=>e}):void 0,X="$lit$",_=`lit$${(Math.random()+"").slice(9)}$`,Q="?"+_,xe=`<${Q}>`,C=document,V=()=>C.createComment(""),k=e=>e===null||typeof e!="object"&&typeof e!="function",ft=Array.isArray,wt=e=>ft(e)||typeof e?.[Symbol.iterator]=="function",tt=`[ 	
\f\r]`,R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,bt=/-->/g,yt=/>/g,$=RegExp(`>|${tt}(?:([^\\s"'>=/]+)(${tt}*=${tt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),_t=/'/g,vt=/"/g,xt=/^(?:script|style|textarea|title)$/i,Ct=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),et=Ct(1),ri=Ct(2),L=Symbol.for("lit-noChange"),f=Symbol.for("lit-nothing"),$t=new WeakMap,S=C.createTreeWalker(C,129);function St(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return mt!==void 0?mt.createHTML(t):t}const At=(e,t)=>{const n=e.length-1,i=[];let o,s=t===2?"<svg>":"",a=R;for(let r=0;r<n;r++){const l=e[r];let h,d,c=-1,g=0;for(;g<l.length&&(a.lastIndex=g,d=a.exec(l),d!==null);)g=a.lastIndex,a===R?d[1]==="!--"?a=bt:d[1]!==void 0?a=yt:d[2]!==void 0?(xt.test(d[2])&&(o=RegExp("</"+d[2],"g")),a=$):d[3]!==void 0&&(a=$):a===$?d[0]===">"?(a=o??R,c=-1):d[1]===void 0?c=-2:(c=a.lastIndex-d[2].length,h=d[1],a=d[3]===void 0?$:d[3]==='"'?vt:_t):a===vt||a===_t?a=$:a===bt||a===yt?a=R:(a=$,o=void 0);const p=a===$&&e[r+1].startsWith("/>")?" ":"";s+=a===R?l+xe:c>=0?(i.push(h),l.slice(0,c)+X+l.slice(c)+_+p):l+_+(c===-2?r:p)}return[St(e,s+(e[n]||"<?>")+(t===2?"</svg>":"")),i]};class D{constructor({strings:t,_$litType$:n},i){let o;this.parts=[];let s=0,a=0;const r=t.length-1,l=this.parts,[h,d]=At(t,n);if(this.el=D.createElement(h,i),S.currentNode=this.el.content,n===2){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(o=S.nextNode())!==null&&l.length<r;){if(o.nodeType===1){if(o.hasAttributes())for(const c of o.getAttributeNames())if(c.endsWith(X)){const g=d[a++],p=o.getAttribute(c).split(_),m=/([.?@])?(.*)/.exec(g);l.push({type:1,index:s,name:m[2],strings:p,ctor:m[1]==="."?Lt:m[1]==="?"?It:m[1]==="@"?Nt:M}),o.removeAttribute(c)}else c.startsWith(_)&&(l.push({type:6,index:s}),o.removeAttribute(c));if(xt.test(o.tagName)){const c=o.textContent.split(_),g=c.length-1;if(g>0){o.textContent=q?q.emptyScript:"";for(let p=0;p<g;p++)o.append(c[p],V()),S.nextNode(),l.push({type:2,index:++s});o.append(c[g],V())}}}else if(o.nodeType===8)if(o.data===Q)l.push({type:2,index:s});else{let c=-1;for(;(c=o.data.indexOf(_,c+1))!==-1;)l.push({type:7,index:s}),c+=_.length-1}s++}}static createElement(t,n){const i=C.createElement("template");return i.innerHTML=t,i}}function A(e,t,n=e,i){if(t===L)return t;let o=i!==void 0?n._$Co?.[i]:n._$Cl;const s=k(t)?void 0:t._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),s===void 0?o=void 0:(o=new s(e),o._$AT(e,n,i)),i!==void 0?(n._$Co??=[])[i]=o:n._$Cl=o),o!==void 0&&(t=A(e,o._$AS(e,t.values),o,i)),t}class Et{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:n},parts:i}=this._$AD,o=(t?.creationScope??C).importNode(n,!0);S.currentNode=o;let s=S.nextNode(),a=0,r=0,l=i[0];for(;l!==void 0;){if(a===l.index){let h;l.type===2?h=new I(s,s.nextSibling,this,t):l.type===1?h=new l.ctor(s,l.name,l.strings,this,t):l.type===6&&(h=new Ht(s,this,t)),this._$AV.push(h),l=i[++r]}a!==l?.index&&(s=S.nextNode(),a++)}return S.currentNode=C,o}p(t){let n=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,n),n+=i.strings.length-2):i._$AI(t[n])),n++}}class I{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,i,o){this.type=2,this._$AH=f,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=A(this,t,n),k(t)?t===f||t==null||t===""?(this._$AH!==f&&this._$AR(),this._$AH=f):t!==this._$AH&&t!==L&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):wt(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==f&&k(this._$AH)?this._$AA.nextSibling.data=t:this.$(C.createTextNode(t)),this._$AH=t}g(t){const{values:n,_$litType$:i}=t,o=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=D.createElement(St(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(n);else{const s=new Et(o,this),a=s.u(this.options);s.p(n),this.$(a),this._$AH=s}}_$AC(t){let n=$t.get(t.strings);return n===void 0&&$t.set(t.strings,n=new D(t)),n}T(t){ft(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let i,o=0;for(const s of t)o===n.length?n.push(i=new I(this.k(V()),this.k(V()),this,this.options)):i=n[o],i._$AI(s),o++;o<n.length&&(this._$AR(i&&i._$AB.nextSibling,o),n.length=o)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class M{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,i,o,s){this.type=1,this._$AH=f,this._$AN=void 0,this.element=t,this.name=n,this._$AM=o,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=f}_$AI(t,n=this,i,o){const s=this.strings;let a=!1;if(s===void 0)t=A(this,t,n,0),a=!k(t)||t!==this._$AH&&t!==L,a&&(this._$AH=t);else{const r=t;let l,h;for(t=s[0],l=0;l<s.length-1;l++)h=A(this,r[i+l],n,l),h===L&&(h=this._$AH[l]),a||=!k(h)||h!==this._$AH[l],h===f?t=f:t!==f&&(t+=(h??"")+s[l+1]),this._$AH[l]=h}a&&!o&&this.O(t)}O(t){t===f?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Lt extends M{constructor(){super(...arguments),this.type=3}O(t){this.element[this.name]=t===f?void 0:t}}class It extends M{constructor(){super(...arguments),this.type=4}O(t){this.element.toggleAttribute(this.name,!!t&&t!==f)}}class Nt extends M{constructor(t,n,i,o,s){super(t,n,i,o,s),this.type=5}_$AI(t,n=this){if((t=A(this,t,n,0)??f)===L)return;const i=this._$AH,o=t===f&&i!==f||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==f&&(i===f||o);o&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Ht{constructor(t,n,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){A(this,t)}}const li={j:X,P:_,A:Q,C:1,M:At,L:Et,R:wt,V:A,D:I,I:M,H:It,N:Nt,U:Lt,B:Ht},Ce=K.litHtmlPolyfillSupport;Ce?.(D,I),(K.litHtmlVersions??=[]).push("3.1.0");const $e=(e,t,n)=>{const i=n?.renderBefore??t;let o=i._$litPart$;if(o===void 0){const s=n?.renderBefore??null;i._$litPart$=o=new I(t.insertBefore(V(),s),s,void 0,n??{})}return o._$AI(e),o};class N extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=$e(n,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return L}}N._$litElement$=!0,N.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:N});const Se=globalThis.litElementPolyfillSupport;Se?.({LitElement:N});const di={_$AK:(e,t,n)=>{e._$AK(t,n)},_$AL:e=>e._$AL};(globalThis.litElementVersions??=[]).push("4.0.2");const ci=!1,v={COLLAPSE:"bad:collapse",CLAS_SLOT_RENDER_ENDED:"bad:clas:slotRenderEnded",SLOT_RENDER_ENDED:"bad:slotRenderEnded"};function H(){return window.Didomi?.getCurrentUserStatus?window.Didomi.getCurrentUserStatus():window.Didomi?.getUserStatus?window.Didomi.getUserStatus():void 0}function Ae(){return window.Didomi?.getUserStatus?window.Didomi.getUserStatus():void 0}function x(e,t,n){return e.vendors?.[t]!==void 0?e.vendors[t].enabled:e.vendors.global?.enabled.includes(n||t)}function B(e,t){return e!==void 0?e.vendors.legitimate_interest.enabled.includes(t):!1}function O(e,t,n){return n.every(i=>{const o=e.purposes?.[i]!==void 0?e.purposes[i].enabled:e.purposes?.global?.enabled.includes(i),s=t!==void 0?t.purposes?.legitimate_interest.enabled.includes(i):!1;return o||s})}function Tt(){const e=Ae();if(!e)return!1;const t=B(e,"google"),n=B(e,"c:bonniernews"),i=B(e,"c:bn-tailsweep-bonniernews"),o=B(e,"c:bn-netdoktor-bonniernews"),s=B(e,"c:bn-netdoktorpro-bonniernews"),a=O({},e,["select_basic_ads","measure_ad_performance","market_research","improve_products"]);return t&&(n||i||o||s)&&a}function Pt(){let e=H();if(!e)return!1;const t=x(e,"google"),n=x(e,"bonniernews","c:bonniernews"),i=x(e,"bn-tailsweep-bonniernews","c:bn-tailsweep-bonniernews"),o=x(e,"bn-netdoktor-bonniernews","c:bn-netdoktor-bonniernews"),s=x(e,"bn-netdoktorpro-bonniernews","c:bn-netdoktorpro-bonniernews"),a=O(e,{},["select_basic_ads","measure_ad_performance","market_research","improve_products"]),r=t&&(n||i||o||s)&&a;return window.googletag=window.googletag||{cmd:[]},!r&&Tt()?googletag.cmd.push(()=>{googletag.setConfig({targeting:{limitedAds:"1"}})}):googletag.cmd.push(()=>{googletag.setConfig({targeting:{limitedAds:"0"}})}),r||Tt()}function Ee(){const e=H();if(!e)return!1;const t=x(e,"googleanalytics","c:googleanalytics"),n=x(e,"bonniernews-reynolds","c:bonniernews-reynolds");return t&&n}function hi(){const e=H();return e?O(e,void 0,["create_ads_profile","select_personalized_ads"]):!0}function Le(){if(!document.querySelector("script[src*='rubiconproject.com/prebid']"))return!1;const t=H();return x(t,"rubicon")}function Ie(){const e=H();return e?O(e,void 0,["politiska-piej7XVH"]):!1}const Ne=["cookies","select_basic_ads","create_ads_profile","select_personalized_ads","create_content_profile","select_personalized_content","measure_ad_performance","market_research","improve_products","measure_content_performance","device_characteristics","geolocation_data"];function He(){const e=H();return e?O(e,void 0,Ne):!1}function b(e){try{if(!window||!window.top||!window.top.document||!window.top.document.cookie)return null}catch(i){return console.warn("Could not access cookies on window:",i),null}const t=window.top.document.cookie.split(";");let n;return t.forEach(i=>{i.substring(0,i.indexOf("=")).trim()===e&&(n=i.substring(i.indexOf("=")+1))}),n?decodeURIComponent(n.trim()):null}const Te=new URLSearchParams(window.location.search).get("badDebug")==="true",Vt=b("badDebug")!==null;function Pe(){!Vt&&b("badDebug")===null&&(document.cookie="badDebug=true;path=/;max-age=1800")}function u(e,...t){if(Te||Vt){Pe();const n=`BAD DEBUG: ${e} %c${Ve(t).join(" ")}`,i=` %c${performance.now().toFixed(2)}ms`;console.log(n+i,"color:rgb(255, 71, 71)","color: orange")}}function Ve(e){return e.map(t=>typeof t=="object"?JSON.stringify(t,null,2):Array.isArray(t)?t.join(", "):t)}const ke=["pageType","device","categories"],Re=["bongeo","bontarg","isLoggedIn","bi","isPayingCustomer"],nt=[];let De;function Me(){return kt(ke)}function Be(){return kt(Re)}function kt(e){return e.reduce((t,n)=>(googletag.getConfig("targeting").targeting[n]?.length>0&&(t[n]=googletag.getConfig("targeting").targeting[n]),t),{})}function Oe(e){return e.getBoundingClientRect().top<window.innerHeight&&e.getBoundingClientRect().top+e.getBoundingClientRect().height>0}function Ue(){const e=Me(),t=Be(),n=Ie()?window.Bad.getGeoTargeting():null;n&&(t.politicalGeo=Object.values(n).flat()),window.pbjs.mergeConfig({ortb2:{site:{ext:{data:e}},user:{ext:{data:t}}}})}function je(e){e.ortb2Imp={ext:{data:{slotName:e.getSlotElementId().split("-").shift(),slotNameNo:e.getSlotElementId().split("-").pop()}}}}function Rt(e,t,n){window.pbjs=window.pbjs||{cmd:[]},window.pbjs.cmd.push(()=>{Ue(),je(e);const i=1500;let o=!1;const s=setTimeout(()=>{u("Prebid auction timed out for slot:"+e.getSlotElementId()+"after "+i+"ms"),o=!0,n()},i);window.pbjs.rp.requestBids({gptSlotObjects:[e],data:t,callback:()=>{u("Prebid auction completed for slot:"+e.getSlotElementId()),clearTimeout(s),o||(e.setConfig({targeting:{demandmanager:"1"}}),n())}})})}function ze(e,t,n){const i=document.getElementById(e.getSlotElementId());Oe(i)?Rt(e,t,n):(nt.push({slot:e,data:t,cb:n}),De=setTimeout(()=>{for(;nt.length;){const{slot:o,data:s,cb:a}=nt.shift();Rt(o,s,a)}},10))}function We(e,t){const n=e.slot,i=n.getSlotElementId();googletag.destroySlots([n]),u(`Rendering political ad in slot ${n.getSlotElementId()}`),e.setAttribute("style","display: flex;");const o=document.createElement("iframe");o.width="100%",o.height="100%",o.style.border="none",o.setAttribute("scrolling","no"),o.setAttribute("frameborder","0"),o.setAttribute("aria-label","Advertisment"),o.setAttribute("title","Political"),e._getContainerDiv().appendChild(o);const a=o.contentDocument||o.contentWindow.document;window.pbjs.renderAd(a,t.adId),u(`Political ad rendered in slot ${e._getContainerId()}`),document.getElementById(i).dispatchEvent(new CustomEvent(v.SLOT_RENDER_ENDED,{bubbles:!0,detail:{isEmpty:!1,slotName:i.split("-")[0],slotNumber:i.split("-")[1],size:[t.width,t.height],isPoliticalAd:!0}}))}function qe(e,t){return e.reduce((n,i)=>(n[t(i)?0:1].push(i),n),[[],[]])}const Dt={};function Ze(){document.head.querySelectorAll("meta[name^='bad:']").forEach(e=>{const t=e.name.replace("bad:","");Dt[t]=e.content})}function U(){const e={pageType:"section",hostname:window.location.hostname};return Ze(),{...e,...Dt}}const Fe=[...new Set([6141670212,6150604282,6220022817,6220022820,6220391675,6220392935,6223284198,6258419440,6275895264,6384730251,6387689999,6406534270,6418158188,6421336938,6422867924,6426385101,6480860321,6489656133,6510904501,6513763571,6545574601,6581621744,6334257780,6204484938,6204485178,6208071786,6208260957,6258460297,6265324705,6393196962,6393591577,6394248131,6428664394,6477293407,6494384108,6696548522,6233069936,6366316697,6143047876,6141088030,6150604285,6204482787,6204485664,6210477557,6219702205,6220392932,6223211955,6223284201,6256636557,6258460759,6139650636,6266023583,6275895267,6366317246,6417563959,6422867921,6478163919,6492491645,6493810726,6510903583,6513762947,6695520934,6334257783,6393196971,6393591034,6394247975,6428662684,6717591091,6703515820,6475097691,6401451105,6856435142,6844233303,6842056494,6789420442,6840610032,6842904922])],y={};let Mt=[...document.querySelectorAll("article")].length;function Bt(e,t){return Mt!==[...document.querySelectorAll("article")].length&&(Mt=[...document.querySelectorAll("article")].length,it()),y[e]||(y[e]={slotNameNumber:0,slotNameNumberTargeting:0}),y[e].slotNameNumber++,t?(t>=y[e].slotNameNumberTargeting&&Ot(),y[e].slotNameNumberTargeting=t,y[e]):(y[e].slotNameNumberTargeting++,y[e])}function Ot(){Pt()&&(window.googletag=window.googletag||{cmd:[]},window.googletag.cmd.push(()=>{window.googletag.pubads().refresh([],{changeCorrelator:!0})}))}function it(){for(const e in y)y[e].slotNameNumberTargeting=0,Ot()}window.Bad={...window.Bad||{},resetSlotNumberTargeting:it};function Ut(){return window.location.search.includes("google_preview")}Ut()&&(document.cookie="bad-freq-rmp=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;");function jt(){Ut()||(window.bamData.frequencyCookie?.expire?document.cookie=`bad-freq-rmp=1; max-age=${window.bamData.frequencyCookie.expire*60*60}; path=/`:document.cookie="bad-freq-rmp=1; max-age=14400; path=/")}function zt(){return!!b("bad-freq-rmp")}const Ge=[{key:"bn_event",value:"plusallt"}];function Ye(){const e=new URLSearchParams(location.search);for(const t of Ge)if(e.get(t.key)===t.value)return!1;return!0}function Je(){return`
    b-a-d[slotname="rich_media_premium"], b-a-d[slotname="mob_rich_media_premium"] {
      height: 100svh !important;
      overflow: hidden;
    }

    b-a-d[slotname="rich_media_premium"] .ad-info_button,
    b-a-d[slotname="mob_rich_media_premium"] .ad-info_button {
      display: none;
    }
  `}function Ke(e){const t=document.createElement("div");if(t.id="rmp-container",t.slot="rmp-container",!document.querySelector("style[data-rmp-css]")){const n=document.createElement("style");n.dataset.rmpCss="",n.innerHTML=Je(),document.head.appendChild(n)}e.append(t)}const ot=U(),Wt="8b38f539-3ae1-4df4-af53-b2c9013bbe59",Xe=["adnuntius","mkadnuntius"],Qe="adn-political",st=new IntersectionObserver(e=>{e.filter(t=>t.isIntersecting||t.intersectionRatio>0).forEach(t=>{t.target.connectedCallback(),st.unobserve(t.target)})},{rootMargin:"500%"}),qt=new IntersectionObserver(e=>{e.filter(t=>t.isIntersecting||t.intersectionRatio>0).forEach(t=>{u("Rendering political ad",t.target.slotName,t.target.slotNumber),We(t.target,t.target._getPoliticalAd()),qt.unobserve(t.target)})},{rootMargin:"30%"});function Zt(e){const[t,n]=e.split("x",2).map(i=>parseInt(i,10));return[t,n]}async function tn(){let n=0;for(;window.bamData?.stale&&n<100;)await new Promise(i=>setTimeout(i,10)),n++}let en=class extends N{static styles=ct`
    :host {
      display: flex;
      justify-content: center;
      transition: max-height 0.2s ease-in;
    }

    :host([eager][slotname*="rich_media_premium"]) {
      display: none !important;
    }

    .rmp-wrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      align-items: center;
    }

    /* If the bad-element has the attribute 'hidebanner' then we don't want to show it by-default */

    :host([hidebanner]) .rmp-banner {
      display: none !important;
    }

    .rmp-banner {
      flex-shrink: 0;
      width: 100%;
      background-color: var(--banner-background-color, inherit);
      color: var(--banner-color, inherit);
      font: inherit;
      border: none;
      padding: 8px 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      height: 50px;
    }

    ::slotted([slot="rmp-container"]) {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
    }

    .banner-content {
      display: grid;
      /* Default to two columns (logo + banner text) */
      grid-template-columns: auto auto;
      width: 100%;
      align-items: center;
    }

    .banner-content.with-admarker {
      /* When admarker slot is present we use three columns */
      grid-template-columns: 1fr 1fr 1fr;
    }

    .logo-section {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    .admarker-section {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .bannertext-section {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    ::slotted([slot="logo"]) {
      display: flex;
      align-items: center;
    }

    ::slotted([slot="admarker"]) {
      display: flex;
      align-items: center;
    }

    ::slotted([slot="bannertext"]) {
      display: flex;
      align-items: center;
    }
  `;static properties={slot:{state:!0},slotName:{type:String},slotNumber:{type:Number},slotSizes:{type:Array,converter:{fromAttribute:t=>{const i=t.split(/,\s*/g).map(a=>a.split("x").map(Number)),[o,s]=qe(i,a=>a.length===2&&!a.some(isNaN)&&a.every(r=>r>0));return s.length>0&&console.error("Invalid slot sizes: ",...s),o},toAttribute:t=>t.map(([n,i])=>`${n}x${i}`).join(",")}},impressionViewed:{type:Boolean,state:!0},targetingTags:{attribute:"targeting-tags",converter:{fromAttribute:t=>t.split(/\s*,\s*/g),toAttribute:t=>t.join(",")}},targetingTa:{type:String,attribute:"targeting-ta"},targetingCategory:{type:Array,attribute:"targeting-category",converter:{fromAttribute:t=>t.split(/\s*,\s*/g),toAttribute:t=>t.join(",")}}};constructor(){super()}connectedCallback(){super.connectedCallback();const t=this.hasAttribute("eager"),n=window.getComputedStyle(this).getPropertyValue("--ignore-eager-load")!=="",i=typeof this.checkVisibility=="function"?!this.checkVisibility():this.offsetParent===null;if(i&&!t)return st.observe(this);if(i&&t&&n)return st.observe(this);const{slotNameNumber:o,slotNameNumberTargeting:s}=Bt(this.slotName,this.slotNumber);if(this.id=`${this.slotName}-${o}`,this.slotNumber=s,this.pos=`${this.slotName}${this.slotNumber}`,window.bamData.adsEnabled===!1){this.dispatchEvent(new CustomEvent(v.COLLAPSE,{bubbles:!0,detail:{slot:this.slot}}));return}const a=window.bamData.slotNameConfig[this.slotName];if(!a)return this.disconnectedCallback();let r;!!this.slotSizes?r=this.slotSizes:(r=a.slots[this.slotNumber-1]?.sizes||a.slots[0].sizes,!["panorama_top","mob_storyline"].includes(this.slotName)&&!r.includes("fluid")&&!(this.slotName.includes("outsider")&&window.bamData.path.includes("/bp/"))&&r.push("fluid"));const h=(a.slots[this.slotNumber-1]?.prebidEnabled??!0)&&window.bamData.prebidConfig?.prebidEnabled;if(this.slotName==="rich_media_premium"||this.slotName==="mob_rich_media_premium"){if(!Ye()){this.remove();return}if(this.parentElement===document.body&&(this.rmpSlotOwnId=!0),zt()){this.rmpSlotOwnId?(u("RMP ad already shown, hiding ad",this.slotName,this.slotNumber),this.style.display="none"):(u("RMP ad already shown, removing ad",this.slotName,this.slotNumber),this.remove());return}this.rmpSlotOwnId&&Ke(this)}else if(!this.querySelector(`#${this.id}`)){const d=document.createElement("div");d.id=this.id,this.appendChild(d)}googletag.cmd.push(async()=>{const d={_ta_:this.targetingTa,tags:this.targetingTags,category:this.targetingCategory};for(const c in d)Array.isArray(d[c])?d[c]=d[c].map(g=>typeof g=="string"?g:String(g)):typeof d[c]!="string"&&(d[c]=String(d[c])),d[c]==="undefined"&&delete d[c];await tn(),this.slot=googletag.defineSlot(window.bamData.path,r,this._getContainerId()).addService(googletag.pubads()),this.slot.setConfig({contentPause:!1,targeting:{...d,pos:this.pos,slotName:this.slotName,slotNameNo:this.slotNumber.toString(),reportKey:`${ot.device?.[0]||"u"}/${ot.pageType.substring(0,3)}/${this.slotName}/${this.slotNumber}/${ot.abTest||0}`}}),Le()&&h?ze(this.slot,this._buildPrebidData(),()=>{if(!!this._getPoliticalAd())return qt.observe(this);googletag.display(this._getContainerId())}):googletag.display(this._getContainerId()),this.setAttribute("impressionViewed",!1)}),this.addEventListener("bad:slotRenderEnded",this._slotRenderEnded.bind(this)),this.addEventListener("bad:impressionViewable",d=>{this.setAttribute("impressionViewed",!0)}),this.addEventListener(v.COLLAPSE,()=>{u("Slot collapsed",this.slotName,this.slotNumber),clearTimeout(this.timeoutRmpHandlerId),this.dataset.adEmpty="true",this.style.display="none"}),this.rmpSlotOwnId&&(this.timeoutRmpHandlerId=setTimeout(this._timeoutRmp.bind(this),parseInt("2000")))}_timeoutRmp(){this.disconnectedCallback(),this.dispatchEvent(new CustomEvent(v.COLLAPSE,{bubbles:!0,detail:{slot:this.slot}})),u("Slot timed out",this.slotName,this.slotNumber)}_getPoliticalAd(){const t=this._getContainerId(),n=window.pbjs.getEvents().find(s=>s.eventType==="auctionEnd"&&s.args?.adUnitCodes?.includes(t));if(!n?.args?.bidsReceived?.length)return null;const i=n.args.bidsReceived.reduce((s,a)=>s?.cpm&&s.cpm>a.cpm?s:a,{});return i.dealId===Qe&&Xe.includes(i.bidder)?i:null}_closeRmpWithAnimation(){this.style.maxHeight=this.scrollHeight+"px";const t=()=>{this.removeEventListener("transitionend",t),clearTimeout(n),this.remove(),window.scrollTo(0,0)},n=setTimeout(()=>{this.removeEventListener("transitionend",t),this.remove(),window.scrollTo(0,0)},300);this.addEventListener("transitionend",t),requestAnimationFrame(()=>{this.style.maxHeight="0px"})}_getContainerId(){return this.rmpSlotOwnId?"rmp-container":this.id}_getContainerDiv(){return this.querySelector(`div#${this.id}`)}_resize(){const t=this.querySelector("#rmp-container")??this.querySelector("div");if(!t||this?.getAttribute("style")?.includes("display: none !important"))return;const n={desktop:{width:1920,height:817},mob:{width:640,height:793}};let i,o;this.slotName==="rich_media_premium"?(i=window.visualViewport.width/n.desktop.width,o=(window.visualViewport.height-(this.getBoundingClientRect().y<100?this.getBoundingClientRect().y:50))/n.desktop.height):(i=window.visualViewport.width/n.mob.width,o=(window.visualViewport.height-this.getBoundingClientRect().y)/n.mob.height);let s=Math.min(o,i);s<0&&(s=Math.max(o,i)),this.style.display="flex",this.style.justifyContent="center",t.style.transformOrigin="top",t.style.transform=`scale(${s})`}_slotRenderEnded(t){const n=t.detail;if(n.isPoliticalAd)return;if(n.isBackfill&&(this.dataset.backfill="true"),this.slotName==="rich_media_premium"||this.slotName==="mob_rich_media_premium"){if(clearTimeout(this.timeoutRmpHandlerId),n.lineItemId===null&&new URLSearchParams(location.href).get("lineItemId")&&(n.lineItemId=Number(new URLSearchParams(location.href).get("lineItemId"))),!Fe.includes(n.lineItemId||n.sourceAgnosticLineItemId)&&!this.slot.getHtml().includes(Wt))this._resize(n),this.getBoundingClientRect().y>100&&setTimeout(this._resize(n),30),window.addEventListener("resize",this._resize.bind(this));else{this.style.display="flex",this.style.justifyContent="center";const s=window.visualViewport.width/n.size[0],a=window.visualViewport.height/n.size[1],r=Math.min(a,s,1),l=this.querySelector("#rmp-container");l&&(l.style.transform=`scale(${r})`,l.style.transformOrigin="center top")}jt()}else this.parentElement.style.display===""&&this.parentElement.style.justifyContent===""&&this.style.display===""&&this.style.justifyContent===""&&(this.style.display="flex",this.style.justifyContent="center");this._isBlockingPixel(this.id,n.size,n.campaignId,()=>{this.dispatchEvent(new CustomEvent(v.COLLAPSE,{bubbles:!0,detail:{slot:this.slot}}))}),this.dataset.advertiserId=n.advertiserId?.toString(),this.dataset.campaignId=n.campaignId?.toString(),this.dataset.creativeId=(n.creativeId||n.sourceAgnosticCreativeId)?.toString(),this.dataset.lineItemId=(n.lineItemId||n.sourceAgnosticLineItemId)?.toString();let[i,o]=typeof n.size=="string"?Zt(n.size):n.size;if((i===0||o===0)&&!this.slot.getHtml().includes(Wt)){const[s]=n.slot.getConfig("targeting").targeting.hb_size;s&&([i,o]=Zt(s),this.width=i,this.height=o);const a=this.querySelector("iframe");a.style.maxWidth="100%",a.style.width="100%"}if(i>1&&o>1&&this.slotName!=="rich_media_premium"&&this.slotName!=="mob_rich_media_premium"&&(this.slotName.includes("mob")||(this.style.height=o+"px")),i===0&&o===0&&!this.style.width){this.style.width="100%";const s=this.querySelector("div");s&&(this.slotName.includes("mob")?s.style.width="100svw":s.style.width="100%")}this.hasAttribute("eager")&&!n.isEmpty&&(this.setAttribute("eagerloaded","true"),this.removeAttribute("eager"))}disconnectedCallback(){if(super.disconnectedCallback(),googletag.cmd.push(()=>googletag.destroySlots([this.slot])),!this.rmpSlotOwnId){const t=this.querySelector(`#${this.id}`);t&&t.remove()}}render(){if(this.rmpSlotOwnId){const t=this._hasAdmarkerSlot();return et`
          <div class="rmp-wrapper">
              <button class="rmp-banner" @click="${this._closeRmpWithAnimation}">
                  <div class="banner-content ${t?"with-admarker":""}">
                      <div class="logo-section">
                          <slot name="logo"></slot>
                      </div>
                      ${t?et`
                          <div class="admarker-section">
                              <slot name="admarker"></slot>
                          </div>`:null}
                      <div class="bannertext-section">
                          <slot name="bannertext">
                              <span>Vidare till ${location.hostname.replace(/(www\.)?/,"")}</span>
                          </slot>
                      </div>
                  </div>
              </button>
              <slot name="rmp-container"></slot>
          </div>
      `}else return et`
          <div class="ad-wrapper">
              <slot></slot>
          </div>
      `}_hasAdmarkerSlot(){return!!this.querySelector('[slot="admarker"]')}_isBlockingPixel(t,n,i,o){if(!(!n||n[0]!==1&&n[1]!==1)&&i!=="2771767335"){if(!window.pbjs||!window.pbjs?.getAllWinningBids)return o();setTimeout(()=>{window.pbjs.getAllWinningBids().find(a=>a.adUnitCode===t)||o()},200)}}_buildPrebidData(){const t={xandrData:{categories:this.targeting?.categories},inventory:{categories:this.targeting?.categories}};if(!bamData.disablePersonalizedAds){const n=googletag.getConfig("targeting").targeting.bi;n?.length>0&&(t.inventory.segments=n,t.visitors={segment:n},t.mkv=n.map(i=>`segment=${i}`).join(","),t.dctr=`slotName=${this.slotName}|slotNameNo=${this.slotNumber}`)}return t}};const nn="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";function Ft(e){const t=new Date,n=nn.indexOf(e),i=new Date(t.setDate(t.getDate()-n));return`${i.getFullYear()}${Math.floor(i.getMonth()/2)}`}async function on(e,{hashFunction:t,toBase64Function:n,toHexFunction:i}){const o=await t(e),[s]=n(o),a=Ft(s),r=await t(e+a);return i(r)}function sn(e,{hashFunction:t,toBase64Function:n,toHexFunction:i}){if(t.constructor.name==="AsyncFunction")return on(e,{hashFunction:t,toBase64Function:n,toHexFunction:i});const o=t(e),[s]=n(o),a=Ft(s),r=t(e+a);return i(r)}const an=U();async function rn(e){return window.crypto.subtle.digest("SHA-256",new TextEncoder().encode(e)).then(t=>Array.from(new Uint8Array(t)))}function ln(e){return e.map(t=>t.toString(16).padStart(2,"0")).join("")}function dn(e){const t=e.map(n=>String.fromCharCode(n)).join("");return window.btoa(t)}function cn(e){if(!window.crypto)return e(new Error("No crypto"));const t=T("idtoken")||T("bnidtoken")||T("bnidtoken-lab")||Gt()||Yt()||an.ppid;if(!t)return e(null,null);try{sn(t,{hashFunction:rn,toBase64Function:dn,toHexFunction:ln}).then(n=>e(null,n))}catch(n){return e(n)}}function hn(){return T("idtoken")||T("bnidtoken")||T("bnidtoken-lab")||Gt()||Yt()}function T(e){try{const t=b(e);if(!t)return null;const[n,i,o]=t.split("."),s=JSON.parse(atob(i));return s.user.id||s.sub}catch{return null}}function Gt(){try{const e=window.localStorage.getItem("userInfo");return e?JSON.parse(decodeURIComponent(e)).userId.split(".").pop():null}catch{return null}}function Yt(){const e=b("whoami");try{return e?JSON.parse(atob(e)).id:null}catch{return null}}async function pn(e=5e3){const t=b("bnacid");if(!t)return;const n=`https://elmer.bonniernews.se/v1/segment/${t}?purpose=personalized-ads`,i={headers:{"x-bn-origin":`bad${window.location?.hostname!=="localhost"?`:${location.hostname}`:""}`},signal:AbortSignal.timeout(e)};try{return{bi:(await(await fetch(n,i)).json()).marketing_segments}}catch(o){return u(o+" - Elmer targeting failed"),Promise.reject(o)}}async function Jt(e=5e3){const t=[...document.querySelectorAll("article")];if(t.length>0){const n=t.filter(i=>i.dataset.uuid).at(-1).dataset.uuid.split(".").at(-1);if(n)try{return{categories:(await(await fetch(`https://assets.bonad.io/categories/${n.substring(0,3)}/${n}.json`,{signal:AbortSignal.timeout(e)})).json()).NITF,articleId:n}}catch(i){return u(i+" - Category targeting failed"),Promise.reject(i)}}}function Kt(e,t){if(window.navigator&&window.navigator.geolocation&&window.navigator.permissions)window.navigator.permissions.query({name:"geolocation"}).then(n=>{if(n.state==="granted")window.navigator.geolocation.getCurrentPosition(i=>{const{latitude:o,longitude:s}=i.coords;return e.searchParams.set("latitude",o),e.searchParams.set("longitude",s),t(e)});else return t(e)}).catch(()=>{t(e)});else return t(e)}async function gn(e=5e3){const t=new URL("https://bongeo.bonad.io");return new Promise((n,i)=>{Kt(t,async o=>{try{const a=await(await fetch(o,{signal:AbortSignal.timeout(e)})).json();n({bontarg:Object.values(a)})}catch(s){u(s+" - Bongeo targeting failed"),i(s)}})})}async function un(e=5e3){const t=new URL("https://context.bonad.io/v1/geo");return new Promise((n,i)=>{Kt(t,async o=>{try{const a=await(await fetch(o,{signal:AbortSignal.timeout(e)})).json();Xt.bongeo=a.bongeo||Object.values(a),n({bongeo:a.bongeo||Object.values(a)})}catch(s){u(s+" - Geo targeting failed"),i(s)}})})}let Xt={};window.Bad={...window.Bad??{},getGeoTargeting:()=>Xt};const mn={device:!0,paywall:!0,tags:!0,abTest:!0,category:!0,pageType:!0,AbTestAU:!0,theProgram:!0,app:!0,isNativeApp:!0,_ta_:!0,ad_demo:!0};function fn(e,t,n){return!n&&!mn[e]?{isValid:!1,errorMessage:`No user consent, so we do not allow ${e}`}:_n[e].validate(t)?{isValid:!0}:{isValid:!1,errorMessage:`Invalid value for ${e}`}}const wn=["desktop","mobile","tablet"],bn=["frontpage","article","section","post"],yn=["ios","android"],_n={device:{validate:e=>!!(typeof e=="string"&&wn.includes(e))},pageType:{validate:e=>!!(typeof e=="string"&&bn.includes(e))},_ta_:{validate:e=>typeof e=="string"},abTest:{validate:e=>!!Number.isInteger(Number(e))},AbTestAU:{validate:e=>typeof e=="string"},tags:{validate:e=>!!(typeof e=="string"&&e.split(",").every(t=>typeof t=="string"))},category:{validate:e=>!!(typeof e=="string"&&e.split(",").every(t=>typeof t=="string"))},isLoggedIn:{validate:e=>e.toLowerCase()==="true"||e.toLowerCase()==="false"},isPayingCustomer:{validate:e=>e.toLowerCase()==="true"||e.toLowerCase()==="false"},paywall:{validate:e=>e.toLowerCase()==="true"||e.toLowerCase()==="false"},accountLevel:{validate:e=>typeof e=="string"&&e==="Premium"},theProgram:{validate:e=>e.toLowerCase()==="true"||e.toLowerCase()==="false"},ppid:{validate:e=>typeof e=="string"},app:{validate:e=>!!(typeof e=="string"&&yn.includes(e))},isNativeApp:{validate:e=>e.toLowerCase()==="true"||e.toLowerCase()==="false"}};function vn(){const e=history.pushState;history.pushState=function(){let i=e.apply(this,arguments);return window.dispatchEvent(new Event("pushstate")),window.dispatchEvent(new Event("locationchange")),i};const t=history.replaceState;history.replaceState=function(){let i=t.apply(this,arguments);return window.dispatchEvent(new Event("replacestate")),window.dispatchEvent(new Event("locationchange")),i},window.addEventListener("popstate",()=>{window.dispatchEvent(new Event("locationchange"))})}function xn(e){if(window.navigation)return navigation.addEventListener("navigate",e);vn(),window.addEventListener("locationchange",e)}function Qt(e=new URL(window.location.href)){const t=U(),{device:n,hostname:i}=t,o=i+e.pathname,s=new URLSearchParams({url:o,device:n});return["undefined","unknown"].includes(s.get("device"))&&s.delete("device"),s}const Cn=["device","_ta_","pageType","articleId","tags","category","isLoggedIn","isPayingCustomer","accountLevel","abTest","AbTestAU","theProgram","ppid","app","paywall","isNativeApp"];function at(e){const t=U();for(const[n,i]of Object.entries(t))if(Cn.includes(n)){const o=fn(n,i,e);if(!o.isValid){console.warn(o.errorMessage);continue}u("Setting page targeting",n,i),googletag.setConfig({targeting:{[n]:i}})}}async function $n(){const e=He(),t=[],n=300;if(e&&Ee()){t.push(pn(n));const o=b("bnacid");o&&googletag.cmd.push(()=>{u("Setting clientId","rc",o),googletag.setConfig({targeting:{rc:o}})})}e&&(t.push(gn(n)),t.push(un(n))),t.push(Jt(n)),(await Promise.allSettled(t)).forEach(o=>{if(o.status==="rejected")u(o.reason);else{const s=o.value;if(!s){u("No targeting data found");return}googletag.cmd.push(()=>{u("Setting targetings",s);for(const[a,r]of Object.entries(s))googletag.setConfig({targeting:{[a]:r}})})}}),googletag.cmd.push(()=>{const o=location.hostname+location.pathname,s=o.replace(/-/g,"/").split("/").filter(Boolean);googletag.setConfig({targeting:{tcf:"1",url:o,urlParts:s,userConsent:e?"true":"false"}}),u("Setting page targetings",{url:o,urlParts:s,userConsent:e}),at(e),window.badUpdatePageTargetings=()=>at(e);const a=new URLSearchParams(location.search);for(const[r,l]of a.entries())u("Parsing query params to page targeting",r,l),googletag.setConfig({targeting:{[r]:l}});xn(async r=>{it();const l=new URL(r.destination?r.destination.url:window.location.href),h=l.hostname+l.pathname,d=Qt(l);window.bamData.stale=!0;const c=await fetch(`https://bam.bonad.io/?${d}`);window.bamData=await c.json(),window.bamData.stale=!1;const g=h.replace(/-/g,"/").split("/").filter(Boolean);googletag.setConfig({targeting:{url:h,urlParts:g}}),u("Page targeting on url update",{url:h,urlParts:g}),at(e);try{const p=await Jt(500);if(p)for(const[m,w]of Object.entries(p))googletag.setConfig({targeting:{[m]:w}})}catch(p){u(p)}})})}const Z=()=>{const e=new URLSearchParams(window.location.search);u("Activating developer console");const t=e.get("bauConsole")||b("bauConsole")||"true";document.cookie=`bauConsole=${e.get("bauConsole")||!0};path=/;max-age=604800`;const n=document.createElement("script");t==="true"?n.src="https://assets.bonad.io/dfp/bau-console.js":t==="stage"?n.src="https://assets.bonad.io/dfp/stage/bau-console.js":t==="local"&&(n.src="https://localhost:8080/dist/bau-console.js"),document.head.appendChild(n)};window.badConsole=()=>{Z()},window.Bau={openConsole:()=>{console.warn("bauConsole is deprecated and will be eventually removed, use window.badConsole() instead"),Z()}};function te(e,t){const n=document.createElement("div"),i=window.location.hostname,o=window.bamData.path;let s="Annons";o.includes("/bp/")&&(i.endsWith(".no")?s="Annonse":i.endsWith(".dk")?s="Annonce":i.endsWith(".fi")&&(s="Mainos")),n.textContent=s,n.style.cssText=`
    color: white;
    background-color: rgba(0, 0, 0, 0.50);
    font-size: 16px;
    position: fixed;
    top: ${t??"0"};
    left: 0px;
    width: 60px;
    font-weight: 700;
    padding: 4px 8px;
    z-index: 1;
    border-radius: 0px 0px 2px 0px;
    backdrop-filter: blur(2px);
  `;const a=document.getElementById(e);a&&a.shadowRoot?a.shadowRoot.appendChild(n):a.appendChild(n)}function Sn(e){const t=document.createElement("div");t.innerHTML=`
    <svg width="21" height="15" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.6001 0.834973L13.4501 2.70997L7.00007 9.15997L0.550073 2.70997L2.40007 0.834972L7.00007 5.43497L11.6001 0.834973Z" fill="white"/>
    </svg>
  `;const n=window.bamData.path.includes("/bp/")&&(document.querySelector("b-a-d[slotname='rich_media_premium']")?.rmpSlotOwnId||document.querySelector("b-a-d[slotname='mob_rich_media_premium']")?.rmpSlotOwnId)?"166px":"16px";t.style.cssText=`
    position: absolute;
    bottom: ${n};
    width: 52px !important;
    height: 52px !important;
    display: flex !important;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: rgba(0, 0, 0, 0.50);
    backdrop-filter: blur(2px);
    border-radius: 100px;
  `,t.addEventListener("click",()=>{const o=window.visualViewport.pageTop+document.getElementById(e).getBoundingClientRect().bottom+1;window.scrollTo({behavior:"smooth",top:o})});const i=document.getElementById(e);if(i.shadowRoot){const o=i.shadowRoot.querySelector("#rmp-container");o?o.appendChild(t):i.shadowRoot.appendChild(t)}else i.appendChild(t)}function An(e){const t=document.createElement("div");t.innerHTML=`
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.39999 19.45L4.54999 17.6L10.15 12L4.54999 6.40005L6.39999 4.55005L12 10.15L17.6 4.55005L19.45 6.40005L13.85 12L19.45 17.6L17.6 19.45L12 13.85L6.39999 19.45Z" fill="white"/>
    </svg>
  `,t.style.cssText=`
    position: fixed;
    top: 16px;
    right: 16px;
    width: 52px !important;
    height: 52px !important;
    display: flex !important;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: rgba(0, 0, 0, 0.50);
    backdrop-filter: blur(2px);
    border-radius: 100px;
  `;const n=document.getElementById(e);if(t.addEventListener("click",async()=>{const i=window.visualViewport.pageTop+document.getElementById(e).getBoundingClientRect().bottom+1;if(await new Promise(o=>{window.scrollTo({behavior:"smooth",top:i});const s=window.addEventListener("scrollend",()=>{window.removeEventListener("scrollend",s),o()})}),googletag.destroySlots([googletag.pubads().getSlots().find(o=>o.getSlotElementId()===e)]),n.dispatchEvent(new CustomEvent("bad:collapse",{bubbles:!0,detail:{slotName:e.split("-")[0],slotNumber:e.split("-")[1],id:e}})),n.shadowRoot&&n.shadowRoot.querySelector(".rmp-wrapper"))n.setAttribute("style","display: none !important");else{const o=document.querySelector("[data-bad-fullpage-container]");o&&o.setAttribute("style","display: none !important")}}),n.shadowRoot){const i=n.shadowRoot.querySelector("#rmp-container");i?i.appendChild(t):n.shadowRoot.appendChild(t)}else n.appendChild(t)}function ee(e,t){return t===e?!0:e===window.top?!1:e?.parent?ee(e.parent,t):null}function ne(){return["[data-bad-fullpage-header]"].map(t=>document.querySelector(t)).find(t=>t)}function ie(){return[".site-header__wrapper",".site-header__row-1","#navbar",".sticky-header",".sticky-menu","#menu-sm",".header-grid",".site-header > div","[data-site-header]"].map(t=>document.querySelector(t)).find(t=>t)}function En(){return[".sticky.bottom-0"].map(t=>document.querySelectorAll(t)[0]).find(t=>t!==null)}function Ln(e){try{const t=e.getBoundingClientRect(),n=Math.max(document.documentElement.clientHeight,window.innerHeight);return!(t.bottom<0||t.top-n>=0)}catch{return!1}}function In(){const e=ie();if(!e)return"0px";const t=e.offsetHeight,n=getComputedStyle(e,"::after"),i=parseFloat(n.height)||0;return`${t+i}px`}function Nn(e){if(!e.data)return;let t,n,i;try{t=JSON.parse(e.data);const s=document.querySelectorAll('iframe[id*="google_ads_iframe"]');i=Array.from(s).find(a=>ee(e.source,a.contentWindow)),n=i.closest("b-a-d")}catch{return}if(!i||!n)return;if(new URLSearchParams(window.location.search).get("google_preview")){const s=document.createElement("style");s.textContent=`
      iframe[title*='Preview Advertisement'] {
        width: 100vw !important;
        height: 100vh !important;
      };
    `;try{i.contentDocument.head.appendChild(s)}catch(a){console.warn("Could not inject google preview css",a.message)}}if(t.highImpactRequest||t.sender==="high-impact-js"&&t.action==="AD_RENDERED"){const s={mob:{formats:["midscroll","mobile_mega"],approvedSizes:{midscroll:[{width:1080,height:1920},{width:1920,height:1080},{width:300,height:240}],mobile_mega:[{width:1080,height:1920}]}},mob_widget:{formats:["mobile_mega"],approvedSizes:{mobile_mega:[{width:320,height:560}]}},mob_rich_media_premium:{formats:["topscroll","topscroll_gaming","topscroll_custom_disney"],approvedSizes:{topscroll:[{width:1080,height:1920},{width:300,height:220},{width:1920,height:1080}],topscroll_gaming:[{width:1080,height:1920},{width:300,height:220}],topscroll_custom_disney:[{width:1080,height:1920}]}},rich_media_premium:{formats:["topscroll","topscroll_gaming","topscroll_custom_disney"],approvedSizes:{topscroll:[{width:1920,height:1080},{width:1,height:2}],topscroll_gaming:[{width:1920,height:1080},{width:1,height:2}],topscroll_custom_disney:[{width:1920,height:1080}]}}},a=i.id,r=n.id,l=parseInt(i.width,10),h=parseInt(i.height,10);if(a===""||r==="")return;if(t.sender==="high-impact-js"&&t.action==="AD_RENDERED")if(t.preferredFormats&&Array.isArray(t.preferredFormats)&&t.preferredFormats.length>0){const g=s[n.slotName].formats,p=t.preferredFormats.find(m=>g.includes(m));t.action=p||s[n.slotName].formats[0]}else t.action=s[n.slotName].formats[0];const d=s[n.slotName],c=g=>{if(!d||!d.approvedSizes||!d.approvedSizes[g])return!1;const p=d.approvedSizes[g];for(const m of p){const w=Math.abs(l-m.width)<=5,F=Math.abs(h-m.height)<=5;if(w&&F)return!0}return!1};if(t.action==="highImpactSupportedFormat")e.source.postMessage(JSON.stringify({action:d.formats}),"*");else if(t.action==="midscroll"){if(!c("midscroll"))return;const g=document.getElementById(r);let m=getComputedStyle(document.documentElement).getPropertyValue("--bad-site-header-stuck-height").trim();m===""&&(m=In(),Ln(ie())||(m="0px"));const w=document.createElement("style");(window.bamData.path.includes("/bn/hdsyd")||window.bamData.path.includes("/mm/")||window.bamData.path.includes("/hm/")||window.bamData.path.includes("/hbl/")||window.bamData.path.includes("/gotamedia/")||window.bamData.path.includes("/bn_fi/"))&&(w.textContent=`
          .ad-text:has(+ #${r}) {
            display: none !important;
          }
        `,g.parentElement.style.cssText=`
          margin: 0px !important;
          transform: none !important;
          contain: none !important;
        `);const F=En(),he=F?F.offsetHeight:0,rt=`calc(100vh - ${m} - ${he}px)`;w.textContent+=`
        [slotname='mob']:has(>#${r}) {
          width: 100vw !important;
        }

        div #${r} {
          height: ${rt} !important;
          clip-path: polygon(0px 0px, 100vw 0px, 100vw ${rt}, 0px ${rt}) !important;
          padding: 0px !important;
          position: relative !important;
          width: 100vw !important;
          transform: none !important;
        }

        [id='${r}'] [id*='${a}'], [id='${r}'] [id*='${a}'] {
          height: calc(100vh - ${m} - ${he}px) !important;
          width: 100vw !important;
          clip: rect(auto, auto, auto, auto) !important;
          position: fixed !important;
          left: 0px !important;
          top: ${m} !important;
          transform: none !important;
        }

        [id='${r}'] [class*='ad-info_button'] {
          display: none !important;
        }
      `,document.head.appendChild(w),te(r,m)}else if(t.action.includes("topscroll")){if(!c(t.action))return;const g=document.createElement("style");let p="0px",m="0px";if(t.action==="topscroll_gaming")p="70svh";else if(t.action==="topscroll_custom_disney")p="100svh";else if(t.action==="topscroll"&&n.rmpSlotOwnId&&bamData.path.includes("/bp/"))p="calc(100svh - 9.375rem)";else if(t.action==="topscroll"){const w=getComputedStyle(document.documentElement);m=w.getPropertyValue("--bad-fullpage-header-height").trim(),m===""&&(m=w.getPropertyValue("--bad-site-header-height").trim()),m?p=`calc(100svh - ${m})`:p="100svh"}window.bamData.path.includes("/di_di/")?document.querySelector("b-a-d").parentElement.classList.remove("ad-fullpage__ad-slot"):window.bamData.path.includes("/bbm/")&&(document.querySelector("[data-bad-fullpage-adslot]").style.overflow="unset"),g.textContent=`
        [data-bad-fullpage-container], [data-bad-fullpage-adslot] {
          height: ${p} !important;
        }

        #rmp-container {
          height: calc(${p} + ${m}) !important;
        }

        [data-bad-fullpage-header], .rmp-banner {
          z-index: 1000 !important;
          position: relative;
          opacity: 0;
        }

        #${r}, #rich-media-wrapper {
          height: ${p} !important;
          clip-path: polygon(0px 0px, 100vw 0px, 100vw ${p}, 0px ${p}) !important;
          margin: 0px !important;
          padding: 0px !important;
          ${window.bamData.path.includes("/bp/vi-i-villa-no")||window.bamData.path.includes("/bn/vi-i-villa-se/")||window.bamData.path.includes("/bp/idenyt-dk")?"":"position: relative !important;"}
          --ad-slot-minheight: none;
          width: 100% !important;
          top: -${ne()?.offsetHeight>0?ne().offsetHeight:0}px !important;
        }

        .fullpage-ad .ad-slot > #${r} {
          clip-path: polygon(0px 0px, 100vw 0px, 100vw ${p}, 0px ${p}) !important;
        }

        [slotname='rich_media_premium'] #rmp-container,
        [slotname='mob_rich_media_premium'] #rmp-container {
          transform: none !important;
        }

        [slotname='rich_media_premium'] [id*='${a}'],
        [slotname='mob_rich_media_premium'] [id*='${a}'] {
          height: ${p} !important;
          width: 100vw !important;
          clip: rect(auto, auto, auto, auto) !important;
          position: fixed !important;
          left: 0px !important;
          transform: none !important;
          top: 0px;
        }
      `,document.head.appendChild(g),n.shadowRoot?.adoptedStyleSheets?.length>0&&n.shadowRoot.adoptedStyleSheets[0].insertRule(`
          .rmp-banner {
            z-index: 1000 !important;
            opacity: 0;
          }
        `),t.action!=="topscroll_custom_disney"&&(Sn(r),te(r)),An(r)}else if(t.action==="mobile_mega"){if(!c("mobile_mega"))return;const g=document.createElement("style");g.textContent=`
        [slotname='mob']:has(>#${r}) {
          width: 100vw !important;
        }

        [slotname='mob_widget']:has(>#${r}) {
           width: 100vw !important;
        }

        div:has(> [id='${a}']) {
          width: 100vw !important;
          height: 568px !important;
        }

        [id='${a}'] {
          width: 100% !important;
          height: 568px !important;
        }

        #${r} {
          width: 100vw !important;
        }
      `,document.head.appendChild(g)}}else if(t.action==="responsive"){const s=i.id,a=document.createElement("style");a.innerHTML=`
      [slotname='rich_media_premium'] [id*='${s}'],
      [slotname='mob_rich_media_premium'] [id*='${s}'] {
        width: 100% !important;
        height: 100% !important;
        transform: none !important;
      }

      #rmp-container {
        height: 100%;
        transform: none !important;
      }

      [slotname='rich_media_premium'], [slotname='mob_rich_media_premium'] {
        height: 100% !important;
      }
    `,document.head.appendChild(a),n.shadowRoot&&(n.shadowRoot.querySelector(".ad-wrapper").style.width="100%")}else if(t.action==="scaleAd"){const s=i.height,a=i.width,r=window.outerWidth/JSON.parse(a),l=r*s;i.style.cssText=i.style.cssText+`transform: scale(${r});transform-origin: top;width: ${a}px !important;height: ${s}px !important;`,i.parentElement.style.cssText=i.parentElement.style.cssText+`;width: 100% !important;height: ${l}px !important; display: grid !important; justify-content: center !important;`,n.style.width="100%",n.shadowRoot.querySelector(".ad-wrapper").style.width="100%"}}const Hn=()=>{window.addEventListener("message",e=>{Nn(e)})},j={PRIMARY_BORDER_COLOR:{r:132,g:0,b:222,a:255},ALT_BORDER_COLOR_1:{r:28,g:24,b:39,a:255},ALT_BORDER_COLOR_2:{r:141,g:10,b:231,a:255},ALT_BORDER_COLOR_3:{r:141,g:13,b:231,a:255}};function Tn(e,t){return Object.values(j).some(i=>t[e-200]===i.r&&t[e-200+1]===i.g&&t[e-200+2]===i.b&&t[e-200+3]===i.a)}function oe(e,t){return Object.values(j).some(i=>t[e+200]===i.r&&t[e+200+1]===i.g&&t[e+200+2]===i.b&&t[e+200+3]===i.a)}function Pn(e,t){return Object.values(j).some(i=>t[e-20]===i.r&&t[e+1-20]===i.g&&t[e+2-20]===i.b&&t[e+3-20]===i.a&&t[e-16]===i.r&&t[e+1-16]===i.g&&t[e+2-16]===i.b&&t[e+3-16]===i.a&&t[e-12]===i.r&&t[e+1-12]===i.g&&t[e+2-12]===i.b&&t[e+3-12]===i.a&&t[e-8]===i.r&&t[e+1-8]===i.g&&t[e+2-8]===i.b&&t[e+3-8]===i.a&&t[e-4]===i.r&&t[e+1-4]===i.g&&t[e+2-4]===i.b&&t[e+3-4]===i.a)}function se(e,t){return Object.values(j).some(i=>t[e+4]===i.r&&t[e+1+4]===i.g&&t[e+2+4]===i.b&&t[e+3+4]===i.a&&t[e+8]===i.r&&t[e+1+8]===i.g&&t[e+2+8]===i.b&&t[e+3+8]===i.a&&t[e+12]===i.r&&t[e+1+12]===i.g&&t[e+2+12]===i.b&&t[e+3+12]===i.a&&t[e+16]===i.r&&t[e+1+16]===i.g&&t[e+2+16]===i.b&&t[e+3+16]===i.a&&t[e+20]===i.r&&t[e+1+20]===i.g&&t[e+2+20]===i.b&&t[e+3+20]===i.a)}function ae(e,t){return Object.values(j).some(n=>t[e]===n.r&&t[e+1]===n.g&&t[e+2]===n.b&&t[e+3]===n.a)}function Vn(e,t,n){const o=t.getImageData(0,0,n.width,n.height).data,s={},a={};for(let r=200;r<o.length&&(!s.x&&!Tn(r,o)&&Pn(r,o)&&!ae(r,o)&&(s.x=r%(e.width*4)/4,s.y=Math.floor(r/(e.width*4))+1),s.x&&!oe(r,o)&&se(r,o)&&!ae(r,o)&&(a.x=r%(e.width*4)/4,a.y=Math.floor(r/(e.width*4))+1),!(s.x&&se(r,o)&&oe(r,o)));r+=4);return a.x<s.x&&(a.x=parseInt(e.width)),{topLeft:s,bottomRight:a}}function kn(){return`
    <div class="ad-info_dialog-modal-padding">
    <section>
    <h2 class="ad-info_dialog-header" autofocus>Om annonser på Bonnier News</h2>
    <p class="ad-info_dialog-text">Våra sajter är delvis annonsfinansierade.</p>
    <a target="_blank" href="https://privacy.bonniernews.se/vanliga-fragor/" class="ad-info_dialog-link">Läs mer om våra annonser
    <span class="ad-info_dialog_external_symbol"><svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" stroke="#666" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
    </a>
    </section>

    <section id="ad-info_dialog-section-report">
    <h2 class="ad-info_dialog-header">Rapportera annons</h2>
    <p class="ad-info_dialog-text">Inloggade användare har möjlighet att rapportera en annons som anses olämplig eller är en bluffannons.</p>
    <button id="dialog-report-button" class="ad-info_dialog-button">Rapportera annons</button>
    </section>

    <button id="dialog-cancel-button" class="ad-info_dialog-cancel-button">
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z"/>
    </svg>
    </button>

    <svg class="ad-info_dialog-logo" width="128" height="12" viewBox="0 0 128 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M118.27 8.2314V10.9421C119.212 11.6529 121.179 12 122.501 12C125.047 12 127.212 10.8264 127.212 8.38016C127.212 6.31405 125.642 5.50413 124.287 5.10744L122.171 4.49587C121.444 4.28099 120.948 3.98347 120.948 3.38843C120.948 2.66116 121.807 2.19835 122.832 2.19835C124.472 2.19835 125.344 2.73964 126.095 3.20557C126.132 3.22816 126.168 3.25057 126.204 3.27273V0.561983C125.262 0.181818 124.171 0 122.799 0C120.518 0 118.419 1.33884 118.419 3.4876C118.419 5.47107 119.774 6.2314 121.245 6.66116L123.377 7.28926C124.237 7.53719 124.7 7.85124 124.7 8.49587C124.7 9.2562 123.923 9.80165 122.468 9.80165C121.163 9.80165 119.559 9.20661 118.27 8.2314ZM0 0.231391H5.3719C6.69421 0.231391 7.73554 0.595027 8.39669 1.25618C8.92562 1.78511 9.19008 2.42974 9.19008 3.22313V3.25618C9.19008 4.56197 8.49587 5.28924 7.66942 5.75205C9.00826 6.26445 9.83471 7.04131 9.83471 8.59503V8.62808C9.83471 10.7438 8.1157 11.8016 5.50413 11.8016H0V0.231391ZM4.82645 4.90908C5.95041 4.90908 6.66116 4.54544 6.66116 3.68594V3.65288C6.66116 2.89255 6.06611 2.4628 4.99173 2.4628H2.47934V4.90908H4.82645ZM5.50413 9.57023C6.6281 9.57023 7.30578 9.17354 7.30578 8.31403V8.28098C7.30578 7.50412 6.72727 7.02478 5.42149 7.02478H2.47934V9.57023H5.50413ZM10.7273 6.04957V6.01651C10.7273 2.72726 13.3223 0.0330439 16.8926 0.0330439C20.4628 0.0330439 23.0248 2.6942 23.0248 5.98346V6.01651C23.0248 9.30577 20.4297 12 16.8595 12C13.2893 12 10.7273 9.33883 10.7273 6.04957ZM20.3636 6.04957V6.01651C20.3636 4.03304 18.9091 2.38015 16.8595 2.38015C14.8099 2.38015 13.3884 3.99999 13.3884 5.98346V6.01651C13.3884 7.99998 14.843 9.65288 16.8926 9.65288C18.9421 9.65288 20.3636 8.03304 20.3636 6.04957ZM26.7603 0.231391L32.1818 7.35536V0.231391H34.6942V11.8016H32.4132L26.9256 4.61156V11.8016H24.4132V1.76858L23.2397 0.231391H26.7603ZM39.5041 0.231391L44.9256 7.35536V0.231391H47.438V11.8016H45.157L39.6694 4.61156V11.8016H37.157V1.76858L35.9835 0.231391H39.5041ZM49.8512 0.231391H52.3967V11.8016H49.8512V0.231391ZM54.8595 0.231391H63.5868V2.49585H57.3884V4.84296H62.843V7.10742H57.3884V9.53718H63.6694V11.8016H54.8595V0.231391ZM65.2231 0.231391H70.5124C71.9835 0.231391 73.124 0.644614 73.8843 1.40494C74.5289 2.04957 74.876 2.95866 74.876 4.04957V4.08263C74.876 5.99999 73.8182 7.22313 72.2645 7.76858L75.3388 11.8016H72.2975L67.7686 5.85122H70.3471C71.5868 5.85122 72.2975 5.19007 72.2975 4.21486V4.1818C72.2975 3.09089 71.5372 2.52891 70.2975 2.52891H67.7686V5.85122V11.8016H65.2231V0.231391ZM80.3634 1.76859L79.1899 0.231396H82.7105L88.132 7.35536V0.231396H90.6444V11.8016H88.3634L82.8758 4.61156V11.8016H80.3634V1.76859ZM101.413 0.231396H92.686V11.8016H101.496V9.53718H95.215V7.10743H100.67V4.84297H95.215V2.49586H101.413V0.231396ZM102.083 0.231396H104.859L107.223 8.38015L108.925 2.74379L108.116 0.231396H110.843L113.19 8.09916L115.487 0.231396H118.066L114.479 11.8016H111.835L110.066 6.29751L108.314 11.8016H105.669L102.083 0.231396Z"/>
    </svg>
    </div>
  `}function Rn(){return`
    <div class="ad-info_dialog-modal-padding">
    <h2 class="ad-info_dialog-header">Rapportera annons</h2>
    <p class="ad-info_dialog-text">Välj anledningen till varför du vill rapportera denna annonsen.</p>

    <form id="dialog-report-form" method="dialog">
    <div>
    <input autofocus type="radio" id="olamplig" name="reason" value="olamplig" required>
    <label for="olamplig">
    <p>Den har ett olämpligt innehåll</p>
    <p class="ad-info_dialog-text-small">Det kan vara våld, droger eller erotisktrelaterat innehåll.</p>
    </label>
    </div>
    <div>
    <input type="radio" id="bluff" name="reason" value="bluff">
    <label for="bluff">
    <p>Det är en bluffannons</p>
    <p class="ad-info_dialog-text-small">Det kan vara potentiella bedragare med syfte att luras eller avskräcka besökare.</p>
    </label>
    </div>
    <p class="ad-info_dialog-text-small" id="ad-info_dialog_screenshot_info" hidden>För att kunna granska annonsen kommer verktyget att behöva ta en skärmbild av den aktuella annonsen. Aktuell yta och godkännande av detta sker i nästa steg. Det finns ingen information som sparas om dig som användare.</p>
    <button id="dialog-report-submit-button" class="ad-info_dialog-button">Skicka</button>
    </form>

    <button id="dialog-report-cancel-button" class="ad-info_dialog-cancel-button">
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z"/>
    </svg>
    </button>

    <svg class="ad-info_dialog-logo" width="128" height="12" viewBox="0 0 128 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M118.27 8.2314V10.9421C119.212 11.6529 121.179 12 122.501 12C125.047 12 127.212 10.8264 127.212 8.38016C127.212 6.31405 125.642 5.50413 124.287 5.10744L122.171 4.49587C121.444 4.28099 120.948 3.98347 120.948 3.38843C120.948 2.66116 121.807 2.19835 122.832 2.19835C124.472 2.19835 125.344 2.73964 126.095 3.20557C126.132 3.22816 126.168 3.25057 126.204 3.27273V0.561983C125.262 0.181818 124.171 0 122.799 0C120.518 0 118.419 1.33884 118.419 3.4876C118.419 5.47107 119.774 6.2314 121.245 6.66116L123.377 7.28926C124.237 7.53719 124.7 7.85124 124.7 8.49587C124.7 9.2562 123.923 9.80165 122.468 9.80165C121.163 9.80165 119.559 9.20661 118.27 8.2314ZM0 0.231391H5.3719C6.69421 0.231391 7.73554 0.595027 8.39669 1.25618C8.92562 1.78511 9.19008 2.42974 9.19008 3.22313V3.25618C9.19008 4.56197 8.49587 5.28924 7.66942 5.75205C9.00826 6.26445 9.83471 7.04131 9.83471 8.59503V8.62808C9.83471 10.7438 8.1157 11.8016 5.50413 11.8016H0V0.231391ZM4.82645 4.90908C5.95041 4.90908 6.66116 4.54544 6.66116 3.68594V3.65288C6.66116 2.89255 6.06611 2.4628 4.99173 2.4628H2.47934V4.90908H4.82645ZM5.50413 9.57023C6.6281 9.57023 7.30578 9.17354 7.30578 8.31403V8.28098C7.30578 7.50412 6.72727 7.02478 5.42149 7.02478H2.47934V9.57023H5.50413ZM10.7273 6.04957V6.01651C10.7273 2.72726 13.3223 0.0330439 16.8926 0.0330439C20.4628 0.0330439 23.0248 2.6942 23.0248 5.98346V6.01651C23.0248 9.30577 20.4297 12 16.8595 12C13.2893 12 10.7273 9.33883 10.7273 6.04957ZM20.3636 6.04957V6.01651C20.3636 4.03304 18.9091 2.38015 16.8595 2.38015C14.8099 2.38015 13.3884 3.99999 13.3884 5.98346V6.01651C13.3884 7.99998 14.843 9.65288 16.8926 9.65288C18.9421 9.65288 20.3636 8.03304 20.3636 6.04957ZM26.7603 0.231391L32.1818 7.35536V0.231391H34.6942V11.8016H32.4132L26.9256 4.61156V11.8016H24.4132V1.76858L23.2397 0.231391H26.7603ZM39.5041 0.231391L44.9256 7.35536V0.231391H47.438V11.8016H45.157L39.6694 4.61156V11.8016H37.157V1.76858L35.9835 0.231391H39.5041ZM49.8512 0.231391H52.3967V11.8016H49.8512V0.231391ZM54.8595 0.231391H63.5868V2.49585H57.3884V4.84296H62.843V7.10742H57.3884V9.53718H63.6694V11.8016H54.8595V0.231391ZM65.2231 0.231391H70.5124C71.9835 0.231391 73.124 0.644614 73.8843 1.40494C74.5289 2.04957 74.876 2.95866 74.876 4.04957V4.08263C74.876 5.99999 73.8182 7.22313 72.2645 7.76858L75.3388 11.8016H72.2975L67.7686 5.85122H70.3471C71.5868 5.85122 72.2975 5.19007 72.2975 4.21486V4.1818C72.2975 3.09089 71.5372 2.52891 70.2975 2.52891H67.7686V5.85122V11.8016H65.2231V0.231391ZM80.3634 1.76859L79.1899 0.231396H82.7105L88.132 7.35536V0.231396H90.6444V11.8016H88.3634L82.8758 4.61156V11.8016H80.3634V1.76859ZM101.413 0.231396H92.686V11.8016H101.496V9.53718H95.215V7.10743H100.67V4.84297H95.215V2.49586H101.413V0.231396ZM102.083 0.231396H104.859L107.223 8.38015L108.925 2.74379L108.116 0.231396H110.843L113.19 8.09916L115.487 0.231396H118.066L114.479 11.8016H111.835L110.066 6.29751L108.314 11.8016H105.669L102.083 0.231396Z"/>
    </svg>
    </div>
  `}function Dn(){return`
    <div class="ad-info_dialog-modal-padding">
    <h2 class="ad-info_dialog-header" autofocus>Annonsen är rapporterad</h2>
    <p class="ad-info_dialog-text">Tack för att du hjälper oss att uppmärksamma felaktiga annonser!</p>
    <button id="dialog-success-report-button" class="ad-info_dialog-button">Stäng</button>

    <button id="dialog-success-cancel-button" class="ad-info_dialog-cancel-button">
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z"/>
    </svg>
    </button>

    <svg class="ad-info_dialog-logo" width="128" height="12" viewBox="0 0 128 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M118.27 8.2314V10.9421C119.212 11.6529 121.179 12 122.501 12C125.047 12 127.212 10.8264 127.212 8.38016C127.212 6.31405 125.642 5.50413 124.287 5.10744L122.171 4.49587C121.444 4.28099 120.948 3.98347 120.948 3.38843C120.948 2.66116 121.807 2.19835 122.832 2.19835C124.472 2.19835 125.344 2.73964 126.095 3.20557C126.132 3.22816 126.168 3.25057 126.204 3.27273V0.561983C125.262 0.181818 124.171 0 122.799 0C120.518 0 118.419 1.33884 118.419 3.4876C118.419 5.47107 119.774 6.2314 121.245 6.66116L123.377 7.28926C124.237 7.53719 124.7 7.85124 124.7 8.49587C124.7 9.2562 123.923 9.80165 122.468 9.80165C121.163 9.80165 119.559 9.20661 118.27 8.2314ZM0 0.231391H5.3719C6.69421 0.231391 7.73554 0.595027 8.39669 1.25618C8.92562 1.78511 9.19008 2.42974 9.19008 3.22313V3.25618C9.19008 4.56197 8.49587 5.28924 7.66942 5.75205C9.00826 6.26445 9.83471 7.04131 9.83471 8.59503V8.62808C9.83471 10.7438 8.1157 11.8016 5.50413 11.8016H0V0.231391ZM4.82645 4.90908C5.95041 4.90908 6.66116 4.54544 6.66116 3.68594V3.65288C6.66116 2.89255 6.06611 2.4628 4.99173 2.4628H2.47934V4.90908H4.82645ZM5.50413 9.57023C6.6281 9.57023 7.30578 9.17354 7.30578 8.31403V8.28098C7.30578 7.50412 6.72727 7.02478 5.42149 7.02478H2.47934V9.57023H5.50413ZM10.7273 6.04957V6.01651C10.7273 2.72726 13.3223 0.0330439 16.8926 0.0330439C20.4628 0.0330439 23.0248 2.6942 23.0248 5.98346V6.01651C23.0248 9.30577 20.4297 12 16.8595 12C13.2893 12 10.7273 9.33883 10.7273 6.04957ZM20.3636 6.04957V6.01651C20.3636 4.03304 18.9091 2.38015 16.8595 2.38015C14.8099 2.38015 13.3884 3.99999 13.3884 5.98346V6.01651C13.3884 7.99998 14.843 9.65288 16.8926 9.65288C18.9421 9.65288 20.3636 8.03304 20.3636 6.04957ZM26.7603 0.231391L32.1818 7.35536V0.231391H34.6942V11.8016H32.4132L26.9256 4.61156V11.8016H24.4132V1.76858L23.2397 0.231391H26.7603ZM39.5041 0.231391L44.9256 7.35536V0.231391H47.438V11.8016H45.157L39.6694 4.61156V11.8016H37.157V1.76858L35.9835 0.231391H39.5041ZM49.8512 0.231391H52.3967V11.8016H49.8512V0.231391ZM54.8595 0.231391H63.5868V2.49585H57.3884V4.84296H62.843V7.10742H57.3884V9.53718H63.6694V11.8016H54.8595V0.231391ZM65.2231 0.231391H70.5124C71.9835 0.231391 73.124 0.644614 73.8843 1.40494C74.5289 2.04957 74.876 2.95866 74.876 4.04957V4.08263C74.876 5.99999 73.8182 7.22313 72.2645 7.76858L75.3388 11.8016H72.2975L67.7686 5.85122H70.3471C71.5868 5.85122 72.2975 5.19007 72.2975 4.21486V4.1818C72.2975 3.09089 71.5372 2.52891 70.2975 2.52891H67.7686V5.85122V11.8016H65.2231V0.231391ZM80.3634 1.76859L79.1899 0.231396H82.7105L88.132 7.35536V0.231396H90.6444V11.8016H88.3634L82.8758 4.61156V11.8016H80.3634V1.76859ZM101.413 0.231396H92.686V11.8016H101.496V9.53718H95.215V7.10743H100.67V4.84297H95.215V2.49586H101.413V0.231396ZM102.083 0.231396H104.859L107.223 8.38015L108.925 2.74379L108.116 0.231396H110.843L113.19 8.09916L115.487 0.231396H118.066L114.479 11.8016H111.835L110.066 6.29751L108.314 11.8016H105.669L102.083 0.231396Z"/>
    </svg>
    </div>
  `}function Mn(){if(document.getElementById("ad-info-style"))return;const e=document.createElement("style");e.id="ad-info-style",e.appendChild(document.createTextNode(`
    .ad-info_button {
    background: none;
    border: none;
    position: absolute;
    top: -1em;
    right: 4px;
    cursor: pointer;
    padding: 0;
    font-size: 2em;
    line-height: 1em;
    width: 18px;
    }
  `)),window.document.head.appendChild(e)}function Bn(){return`
  .ad-info_dialog-modal {
    box-sizing: content-box;
    max-width: 400px;
    width: 400px;
    margin: 92px auto auto;
    border-radius: 2px;
    border: none;
    background: rgb(255, 255, 255); 
    min-width: 300px;
    color: rgb(0, 0, 0); 
    color-scheme: light;
    padding: 0;
  }

  .ad-info_dialog-modal-padding {
    padding: 64px 40px 64px 40px;
  }

  .ad-info_dialog-modal h2.ad-info_dialog-header {
    font: normal 400 22px/31.68px "Georgia", sans-serif;
    letter-spacing: normal;
    padding-bottom: 0;
    margin-top: 0;
    color: inherit;
  }

  .ad-info_dialog-modal .ad-info_dialog-text {
    font: normal 400 16px/24px "inter V", sans-serif;
    margin: 16px 0;
    color: inherit;
  }

  .ad-info_dialog-modal .ad-info_dialog-text-small {
    font: normal 400 12px/14.5px "inter ", sans-serif;
    margin: 16px 0;
    color: inherit;
  }

  .ad-info_dialog-modal .ad-info_dialog-link {
    font: normal 400 16px/24px "inter V", sans-serif;
    text-decoration: underline;
    color: rgb(10, 107, 163); 
    display: flex;
    align-items: center;
    max-width: fit-content;
  }

  .ad-info_dialog-modal section:first-of-type {
    margin-bottom: 30px;
  }

  .ad-info_dialog-modal .ad-info_dialog-button {
    background: rgb(34, 34, 34); 
    border-radius: 60px;
    border: none;
    color: rgb(255, 255, 255); 
    font: normal 400 16px/24px "inter", sans-serif;
    padding: 12px 24px;
    cursor: pointer;
    letter-spacing: -1%;
    margin-top: 0.5rem;
  }

  .ad-info_dialog-modal .ad-info_dialog-cancel-button {
    position: absolute;
    right: 15px;
    top: 15px;
    background: rgb(255, 255, 255); 
    border: none;
    font-weight: bold;
    cursor: pointer;
    padding: 5px;
  }

  .ad-info_dialog-cancel-button svg path {
    fill: rgb(28, 27, 31);  
  }

  .ad-info_dialog-modal .ad-info_dialog-logo {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 128px;
  }

  .ad-info_dialog-logo path {
    fill: rgb(0, 0, 0); 
  }

  .ad-info_dialog-modal form div {
    padding: 12px 16px 12px 16px;
    accent-color: rgb(34, 34, 34); 
    display: flex;
    align-items: start;
  }

  .ad-info_dialog-modal input {
    height: 32px;
    width: 32px;
    margin-right: 10px;
    margin-top: 0;
    max-width: 15%;
    min-width: 32px;
  }

  .ad-info_dialog-modal label {
    font: normal 400 16px "inter V", sans-serif;
    color: rgb(34, 34, 34); 
    max-width: 85%;
  }

  .ad-info_dialog-modal form > div > label > p,
  .ad-info_dialog-modal form > div > label > p.ad-info_dialog-text-small {
    margin: 0;
    color: inherit;
  }


  .ad-info_dialog_external_symbol {
    display: flex;
    align-items: baseline;
    margin-left: 10px;
  }

  .ad-info_dialog_external_link {
  }


  @media only screen and (max-width: 600px) {
    .ad-info_dialog-modal {
      box-sizing: border-box;
      max-width: calc(100% - 32px);
      margin: auto;
    }
  }

  @media (prefers-color-scheme: dark) {
    .ad-info_dialog-modal {
      background: rgb(16, 16, 16); 
      color: rgb(240, 240, 240); 
      color-scheme: dark;
    }

    .ad-info_dialog-modal .ad-info_dialog-link {
      color: rgb(90, 187, 243); 
    }
  
    .ad-info_dialog-modal .ad-info_dialog-button {
      background: rgb(240, 240, 240); 
      color: rgb(16, 16, 16); 
    }

    .ad-info_dialog-modal .ad-info_dialog-cancel-button {
      background: rgb(16, 16, 16); 
    }

    .ad-info_dialog-cancel-button svg path {
      fill: rgb(240, 240, 240); 
    }

    .ad-info_dialog-logo path {
      fill: rgb(255, 255, 255); 
    }

    .ad-info_dialog-modal form > div > label > p,
    .ad-info_dialog-modal form > div > label > p.ad-info_dialog-text-small {
      color: rgb(240, 240, 240); 
    }
  }
  `}function On(){return`
    .ad-info {
      pointer-events:none;
      padding-bottom:18px;
      position:relative;
    }

    .ad-info:after {
      line-height:1;
      content:"⋯";
      display:block;
      font-family:Helvetica,Arial,sans-serif;
      font-size:25px;
      cursor:pointer;
      color:#22222;
      pointer-events:all;
      position:absolute;
      right:4px;
      top:0;
    }

    .ad-info>div{
      pointer-events:all;
      display:inline-block;
    }`}function Un(e){fetch("https://assets.bonad.io/test-vpn").then(t=>t.text()).then(t=>{if(t==="OK")return u("Internal network detected"),e(null,!0);e(null,!1)}).catch(t=>{e(t)})}let re=!1;Un((e,t)=>e?null:re=t);const jn={URL:"https://tintin.bonad.io/report-ad"};function le(e,t,n){zn(t,n),fetch(jn.URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(i=>{if(!i.ok)throw new Error("Failed to report ad")}).catch(i=>{console.error("",i)})}function zn(e,t){let n;if(!document.getElementById("dialog-report-success-modal")){n=document.createElement("dialog"),n.innerHTML=Dn(),document.body.appendChild(n);const a=document.getElementById("dialog-success-report-button"),r=document.getElementById("dialog-success-cancel-button");n.id="dialog-report-success-modal",n.className="ad-info_dialog-modal",n.addEventListener("click",l=>{l.target.id==="dialog-report-success-modal"&&n.close()}),a.onclick=()=>n.close(),r.onclick=()=>n.close()}n=document.getElementById("dialog-report-success-modal"),n.showModal();const i=e.getElementsByClassName("ad-info_button")[0],{height:o,width:s}=window.getComputedStyle(e);t.setConfig({collapseDiv:"DISABLED"}),window.googletag.destroySlots([t]),e.innerHTML=`
    <div style="height: ${o}; padding: 64px 40px 64px 40px; box-sizing: border-box; width: ${s}; background-color: rgb(211,211,211,1); z-index: 400; font-family: 'inter V', sans-serif; max-width: 1000px; max-height: 70vh; min-height: 380px;">
    <h2>Annonsen är rapporterad</h2>
    <p>Vi ser över den rapporterade  annonsen så snart som möjligt. Tills dess kan annonsen synas på andra artiklar. Den behöver då inte rapporteras igen.</p>
    <p>Tack för ditt deltagande!</p>
    </div>
  `,e.onclick=()=>{},i.remove()}function Wn(e){return new Promise(t=>setTimeout(t,e))}function qn(e){navigator.mediaDevices.getDisplayMedia({preferCurrentTab:!0}).then(t=>{Wn(150).then(()=>{const n=t.getVideoTracks(),i=n.map(o=>new ImageCapture(o).grabFrame());Promise.all(i).then(o=>(n.forEach(s=>{s.stop()}),e(o)))})}).catch(t=>{e(null,t)})}function Zn(e,t,n){if("ImageCapture"in window&&e.type==="AdX"){let i;t.parentNode.tagName==="MAIN"||t.parentNode.classList.contains("site-body__columns")||t.parentNode.classList.contains("outsider-ads__sticky-context")||t.parentNode.classList.contains("outsider-ad")||t.parentNode.classList.contains("site-body__column-3")?(i=t.style,t.style.border="1rem solid rgb(141, 10, 231, 1)",t.style.padding="0.4rem 0"):t.parentNode.classList.contains("ad-fullpage")||t.parentNode.classList.contains("fullpage-ad")||t.parentNode.classList.contains("slot-rich_media_premium")||t.parentNode.classList.contains("ad--rich_media_premium")?(i=t.firstChild.style,t.firstChild.style.border="1rem solid rgb(141, 10, 231, 1)",t.firstChild.style.padding="0.4rem 0"):(i=t.parentNode.style,t.parentNode.style.border="1rem solid rgb(141, 10, 231, 1)",t.parentNode.style.padding="0.4rem 0"),qn((o,s)=>{if(s&&console.error(s),o){const a=o.map(r=>{const l=document.createElement("canvas");l.width=r.width,l.height=r.height;const h=l.getContext("2d");h.drawImage(r,0,0);const{topLeft:d,bottomRight:c}=Vn(r,h,l);if(d.x&&d.y&&c.x&&c.y&&c.x>d.x&&c.y>d.y){const g=h.getImageData(d.x,d.y,c.x-d.x,c.y-d.y),p=document.createElement("canvas");return p.width=c.x-d.x,p.height=c.y-d.y,p.getContext("2d").putImageData(g,0,0),p.toDataURL()}return""});e.screenshotURLs=a,t.parentNode.style.border==="1rem solid rgb(141, 10, 231)"?t.parentNode.style=i:t.children[0].style.border==="1rem solid rgb(141, 10, 231)"?t.children[0].style=i:t.style=i,le(e,t,n)}else t.parentNode.style.border==="1rem solid rgb(141, 10, 231)"?t.parentNode.style=i:t.children[0].style.border==="1rem solid rgb(141, 10, 231)"?t.children[0].style=i:t.style=i})}else le(e,t,n)}function Fn(e,t,n){let i;if(!document.getElementById("dialog-report-modal")){i=document.createElement("dialog"),i.innerHTML=Rn(),document.body.appendChild(i),i.id="dialog-report-modal",i.className="ad-info_dialog-modal",i.addEventListener("click",l=>{l.target.id==="dialog-report-modal"&&i.close()});const r=document.getElementById("dialog-report-cancel-button");r.onclick=()=>i.close()}i=document.getElementById("dialog-report-modal");const o=document.getElementById("dialog-report-form");o.onsubmit=()=>{e.reason=i.querySelector("input[name=reason]:checked").value,Zn(e,t,n)};const s=document.getElementById("ad-info_dialog_screenshot_info"),a=document.getElementById("dialog-report-submit-button");"ImageCapture"in window&&e.type==="AdX"?(s.hidden=!1,a.textContent="Nästa"):(s.hidden=!0,a.textContent="Skicka"),i.showModal()}function Gn(e,t,n){if(t==="Prebid"){const i=pbjs.getAllWinningBids().find(o=>o.adUnitCode===e);return i&&i.ad}else if(t==="IO")return n.getHtml()}function Yn(e,t,n){const i=e.slot,o=i?.getResponseInformation()??{},s={id:i?.getSlotElementId()??t.id,campaignId:e.campaignId,creativeId:e.creativeId,lineItemId:e.lineItemId,device:"unknown",googleQueryId:t.dataset.googleQueryId,path:i?.getAdUnitPath()??window.bamData.path,size:`${t.width||0}x${t.height||0}`};window?.pbjs?.cmd?setTimeout(()=>{o?.isBackfill?(s.type="AdX",s.creativeId=o.sourceAgnosticCreativeId,s.lineItemId=o.sourceAgnosticLineItemId,s.yieldGroupId=o.yieldGroupIds&&o.yieldGroupIds[0]):pbjs?.getAllWinningBids().find(a=>a.adUnitCode===s.id)?(s.type="Prebid",s.prebidData=pbjs.getAllWinningBids().find(a=>a.adUnitCode===s.id)):s.type="IO",n(s)},50):(o.isBackfill?(s.type="AdX",s.creativeId=o.sourceAgnosticCreativeId,s.lineItemId=o.sourceAgnosticLineItemId,s.yieldGroupId=o.yieldGroupIds&&o.yieldGroupIds[0]):s.type="IO",n(s))}function Jn(e,t,n){e.retrievedAt=new Date().toUTCString(),e.url=window.location.href,e.adhtml=Gn(e.id,e.type,n),t.scrollIntoView({behavior:"smooth",block:"center"});let i;if(!document.getElementById("dialog-modal")){i=document.createElement("dialog"),i.innerHTML=kn(),i.id="dialog-modal",i.className="ad-info_dialog-modal",i.ariaLabel="Annonsinformation och rapportering",i.ariaDescription="Annonsinformation och rapportering",i.addEventListener("click",r=>{r.target.id==="dialog-modal"&&i.close()}),document.body.appendChild(i);const s=document.getElementById("dialog-cancel-button"),a=document.getElementById("ad-info_dialog-section-report");s.onclick=()=>i.close(),!hn()&&!re&&(a.style.display="none")}i=document.getElementById("dialog-modal");const o=document.getElementById("dialog-report-button");o.onclick=()=>{i.close(),Fn(e,t,n)},i.showModal()}function Kn(e){const t=e.detail,n=e.target;if(t.isEmpty||!n)return;const i=window.getComputedStyle(n);(i.position===""||i.position==="static")&&(n.style.position="relative"),Yn(t,n,o=>{const s=document.createElement("button");s.className="ad-info_button",s.title="Visa annonsinformation",s.type="button",s.ariaLabel="Visa annonsinformation",s.ariaDescription="Visa annonsinformation och rapportera annons",s.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="currentColor"><path d="M8.73 13.56A1.13 1.13 0 0 0 9.9 12.4c0-.34-.12-.62-.34-.85-.22-.23-.5-.34-.83-.34-.33 0-.61.11-.83.34-.23.23-.34.51-.34.85a1.13 1.13 0 0 0 1.17 1.16Zm-1.1-3.7h2.2V4.57h-2.2v5.27Zm1.1 7.87a8.48 8.48 0 0 1-3.42-.69A8.84 8.84 0 0 1 .7 12.42 8.48 8.48 0 0 1 0 9 8.84 8.84 0 0 1 5.31.96 8.48 8.48 0 0 1 8.73.27a8.85 8.85 0 0 1 8.04 5.31c.46 1.06.69 2.2.69 3.42a8.85 8.85 0 0 1-5.31 8.04c-1.06.46-2.2.69-3.42.69Zm0-2.2a6.3 6.3 0 0 0 4.63-1.9A6.3 6.3 0 0 0 15.25 9a6.3 6.3 0 0 0-1.89-4.64 6.3 6.3 0 0 0-4.63-1.88 6.3 6.3 0 0 0-4.64 1.88A6.3 6.3 0 0 0 2.21 9a6.3 6.3 0 0 0 1.88 4.64 6.3 6.3 0 0 0 4.64 1.88Z"/></svg>',s.onclick=()=>Jn(o,n,t.slot),n.appendChild(s)})}function Xn(){return window.bamData.path.includes("/bp")||window.bamData.path.includes("/borsen")||window.location.search.includes("tintinDisabled=true")}const Qn=[Hn,()=>{if(Xn()){u("Tintin disabled");return}const e=document.createElement("style"),t=document.createElement("style"),n=On(bamData?.adInfo?.text||""),i=Bn();e.appendChild(document.createTextNode(n)),t.appendChild(document.createTextNode(i)),window.document.head.appendChild(e),window.document.head.appendChild(t),Mn(),window.addEventListener("bad:slotRenderEnded",Kn)}];async function de(){(new URLSearchParams(window.location.search).has("bauConsole")||b("bauConsole")!==null)&&Z(),window.googletag=window.googletag||{cmd:[]},googletag.cmd.push(()=>{cn((i,o)=>{o&&googletag.pubads().setPublisherProvidedId(o)}),googletag.setConfig({lazyLoad:{fetchMarginPercent:100,renderMarginPercent:30,mobileScaling:1}}),googletag.setConfig({collapseDiv:"ON_NO_FILL"}),googletag.enableServices()}),await $n();const t=[...Qn];for(const i of t)googletag.cmd.push(()=>i(googletag));const n=["impressionViewable","slotOnload","slotRenderEnded","slotRequested","slotResponseReceived","slotVisibilityChanged"];googletag.cmd.push(()=>{for(const i of n)googletag.pubads().addEventListener(i,o=>{const s=document.getElementById(o.slot.getSlotElementId());s&&(i!=="slotVisibilityChanged"&&u(i,o.slot.getSlotElementId(),o.slot.getConfig("targeting").targeting),o?.isEmpty===!0?s.dispatchEvent(new CustomEvent(v.COLLAPSE,{bubbles:!0,detail:o})):s.dispatchEvent(new CustomEvent("bad:"+i,{bubbles:!0,detail:o})))})}),customElements.define("b-a-d",en)}const ti={panorama_top:[[980,240]],panorama:[[980,240],[980,400],[980,360]],panorama_widget:[[980,240]],module:[[640,360]],articlemodule:[[640,360]],insider:[[300,600]],insider_widget:[[300,600]],outsider:[[300,600],[300,300],[300,360],[300,250]],mob:[[320,320],[300,250]],mob_top:[[320,320],[300,250]],mob_widget:[[320,320]],rich_media_premium:[[1920,1080]],mob_rich_media_premium:[[320,480]]},ei=U(),ce=new IntersectionObserver(e=>{e.filter(t=>t.isIntersecting||t.intersectionRatio>0).forEach(t=>{t.target.display(),ce.unobserve(t.target)})},{rootMargin:"10%"});class ni extends N{static styles=ct`
      div {
          border: 1px solid blue;
      }
  `;static properties={slot:{state:!0},anchor:{state:!0},image:{state:!0},slotName:{type:String},slotNumber:{type:Number},slotSizes:{type:Array,converter:{fromAttribute:t=>t.split(/,\s*/g).map(n=>[parseInt(n.split("x")[0]),parseInt(n.split("x")[1])]),toAttribute:t=>t.map(([n,i])=>`${n}x${i}`).join(",")}},targetings:{type:Object},targetingTa:{type:String,attribute:"targeting-ta"}};constructor(){super(),this.anchor=document.createElement("a"),this.anchor.target="_blank",this.image=document.createElement("img"),this.image.onload=this.setImageSize()}connectedCallback(){super.connectedCallback();const{slotNameNumber:t,slotNameNumberTargeting:n}=Bt(this.slotName,this.slotNumber);if(this.id=`${this.slotName}-${t}`,this.slotNumber=n,this.pos=`${this.slotName}${this.slotNumber}`,window.bamData.adsEnabled===!1){this.dispatchEvent(new CustomEvent(v.COLLAPSE,{bubbles:!0,detail:{slotName:this.slotName,slotNumber:this.slotNumber}}));return}if(this.slotName==="rich_media_premium"||this.slotName==="mob_rich_media_premium"){if(zt()){this.remove();return}jt()}ce.observe(this),this.appendChild(this.anchor).appendChild(this.image)}getTargetingString(t){return encodeURIComponent(Object.keys(t).filter(n=>!!(n&&t[n])).map(n=>`${encodeURIComponent(n)}=${encodeURIComponent(Array.isArray(t[n])?t[n].join(","):t[n])}`).join("&"))}setImageSize(){return({target:t})=>{const{naturalWidth:n,naturalHeight:i}=t;this.style.height=`${i}px`,this.image.style.width=n,this.image.style.height=i}}_slotRenderEnded(t){}disconnectedCallback(){super.disconnectedCallback(),this.slot&&(this.slot.style.display="none"),this.image&&(this.image.style.display="none")}createRenderRoot(){return this}render(){return this.parentElement.style.justifyContent===""&&this.style.justifyContent===""&&(this.style.justifyContent="center"),this.firstChild}display(){this.style.display="flex",this.style.border="0";const t=bamData.slotNameConfig[this.slotName];if(!t)return this.disconnectedCallback();const n=this.slotSizes||t.slots[this.slotNumber-1]?.sizes||ti[this.slotName],i={_ta_:ei?._ta_||this.targetingTa},o=new URLSearchParams(window.location.search),s={};o.forEach((h,d)=>s[d]=h);const a=this.getTargetingString({...i,...s,slotName:this.slotName,slotNameNo:this.slotNumber,tcf:"0"}),r=Math.random().toFixed(10).split(".").pop(),l=encodeURIComponent(n.map(([h,d])=>`${h}x${d}`).join("|"));this.anchor.href=`https://privaxy.au.bn.nr/proxy/gampad/jump?iu=${bamData.path}&sz=${l}&t=${a}&c=${r}&tile=${this.slotNumber}&pre=1&d_imp=1&d_imp_hdr=1`,fetch(`https://privaxy.au.bn.nr/proxy/gampad/ad?iu=${bamData.path}&sz=${l}&t=${a}&c=${r}&tile=${this.slotNumber}&pre=1&d_imp=1&d_imp_hdr=1`).then(h=>h.json()).then(h=>{this.image.src=`https://privaxy.au.bn.nr/proxy${h.imageUrl}`,new Image().src=`https://privaxy.au.bn.nr/proxy${h.delayedImpressionTrackingUrl}`,this.dispatchEvent(new CustomEvent(v.SLOT_RENDER_ENDED,{bubbles:!0,detail:{slotName:this.slotName,slotNumber:this.slotNumber,size:n,adUnit:bamData.path}}))}).catch(h=>{console.warn(`C.L.A.S could not load ad: ${this.slotName}-${this.slotNumber} inform @au on slack`),this.dispatchEvent(new CustomEvent(v.COLLAPSE,{bubbles:!0,detail:{slotName:this.slotName,slotNumber:this.slotNumber}})),this.style.display="none"})}}async function ii(){(new URLSearchParams(window.location.search).has("bauConsole")||b("bauConsole")!==null)&&Z(),customElements.define("b-a-d",ni)}const oi=async()=>{try{if(!window.bamData){const e=new URL(window.location.href),t=Qt(e);window.bamData=await(await fetch(`https://bam.bonad.io/?${t}`)).json()}}catch{throw Error("Could not fetch bam data")}};new Promise(async(e,t)=>{if(await oi().catch(n=>{console.error("Failed to setup BAM, no ads will load. Contact @au on slack"),t(n)}),typeof window.__tcfapi!="function")return e(!1);window.__tcfapi("addEventListener",2,(n,i)=>{(i&&n.eventStatus==="tcloaded"||n.eventStatus==="useractioncomplete")&&(window.didomiOnReady=window.didomiOnReady||[],window.didomiOnReady.push(()=>e()))})}).then(async()=>{document.querySelector('script[src*="gpt.js"][type="Didomi/javascript"]')?await ai():await si()}).catch(e=>{console.log("Something went wrong with BAD setup: ",e)});const si=async()=>{try{u("Setting up ads with google CMP handling consent"),await de()}catch(e){console.log("BAD setup error: ",e)}},ai=async()=>{if(Pt())try{u("Setting up ads with BAD cmp handling consent"),await de()}catch(t){console.log("BAD setup error: ",t)}else try{u("Setting up ads without consent"),await ii()}catch(t){console.log("BAD setup for no consent ads error: ",t)}}})();
//# sourceMappingURL=bad.js.map
