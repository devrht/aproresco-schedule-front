(this["webpackJsonpstudent-scheduler"]=this["webpackJsonpstudent-scheduler"]||[]).push([[39],{156:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var o=n(0),r=o.createContext(void 0),i=function(e){var t=e.children,n=e.size;return o.createElement(r.Consumer,null,(function(e){return o.createElement(r.Provider,{value:n||e},t)}))};t.b=r},190:function(e,t,n){"use strict";var o=n(252);t.a=o.b},243:function(e,t,n){"use strict";var o=n(0),r={icon:{tag:"svg",attrs:{viewBox:"0 0 1024 1024",focusable:"false"},children:[{tag:"path",attrs:{d:"M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"}}]},name:"loading",theme:"outlined"},i=n(12),a=function(e,t){return o.createElement(i.a,Object.assign({},e,{ref:t,icon:r}))};a.displayName="LoadingOutlined";t.a=o.forwardRef(a)},252:function(e,t,n){"use strict";n.d(t,"a",(function(){return G}));var o=n(2),r=n(3),i=n(4),a=n(13),c=n(0),s=n.n(c),u=n(5),l=n.n(u),f=n(26),d=n(71),p=n(7),g=function e(t){return Object(p.a)(this,e),new Error("unreachable case: ".concat(JSON.stringify(t)))},b=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(n[o[r]]=e[o[r]])}return n},y=function(e){return c.createElement(d.a,null,(function(t){var n,i=t.getPrefixCls,a=t.direction,s=e.prefixCls,u=e.size,f=e.className,d=b(e,["prefixCls","size","className"]),p=i("btn-group",s),y="";switch(u){case"large":y="lg";break;case"small":y="sm";break;case"middle":case void 0:break;default:console.warn(new g(u))}var m=l()(p,(n={},Object(r.a)(n,"".concat(p,"-").concat(y),y),Object(r.a)(n,"".concat(p,"-rtl"),"rtl"===a),n),f);return c.createElement("div",Object(o.a)({},d,{className:m}))}))},m=n(6),h=n(10),v=n(8),k=n(9),O=n(80),w=n(33),S=n(16),j=0,x={};function E(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=j++,o=t;function r(){(o-=1)<=0?(e(),delete x[n]):x[n]=Object(S.a)(r)}return x[n]=Object(S.a)(r),n}E.cancel=function(e){void 0!==e&&(S.a.cancel(x[e]),delete x[e])},E.ids=x;var _,T=n(21);function C(e){return!e||null===e.offsetParent||e.hidden}function I(e){var t=(e||"").match(/rgba?\((\d*), (\d*), (\d*)(, [\d.]*)?\)/);return!(t&&t[1]&&t[2]&&t[3])||!(t[1]===t[2]&&t[2]===t[3])}var P=function(e){Object(v.a)(n,e);var t=Object(k.a)(n);function n(){var e;return Object(p.a)(this,n),(e=t.apply(this,arguments)).containerRef=c.createRef(),e.animationStart=!1,e.destroyed=!1,e.onClick=function(t,n){var o,r;if(!(!t||C(t)||t.className.indexOf("-leave")>=0)){var i=e.props.insertExtraNode;e.extraNode=document.createElement("div");var a=Object(h.a)(e).extraNode,c=e.context.getPrefixCls;a.className="".concat(c(""),"-click-animating-node");var s=e.getAttributeName();if(t.setAttribute(s,"true"),n&&"#ffffff"!==n&&"rgb(255, 255, 255)"!==n&&I(n)&&!/rgba\((?:\d*, ){3}0\)/.test(n)&&"transparent"!==n){a.style.borderColor=n;var u=(null===(o=t.getRootNode)||void 0===o?void 0:o.call(t))||t.ownerDocument,l=u instanceof Document?u.body:null!==(r=u.firstChild)&&void 0!==r?r:u;_=Object(O.a)("\n      [".concat(c(""),"-click-animating-without-extra-node='true']::after, .").concat(c(""),"-click-animating-node {\n        --antd-wave-shadow-color: ").concat(n,";\n      }"),"antd-wave",{csp:e.csp,attachTo:l})}i&&t.appendChild(a),["transition","animation"].forEach((function(n){t.addEventListener("".concat(n,"start"),e.onTransitionStart),t.addEventListener("".concat(n,"end"),e.onTransitionEnd)}))}},e.onTransitionStart=function(t){if(!e.destroyed){var n=e.containerRef.current;t&&t.target===n&&!e.animationStart&&e.resetEffect(n)}},e.onTransitionEnd=function(t){t&&"fadeEffect"===t.animationName&&e.resetEffect(t.target)},e.bindAnimationEvent=function(t){if(t&&t.getAttribute&&!t.getAttribute("disabled")&&!(t.className.indexOf("disabled")>=0)){var n=function(n){if("INPUT"!==n.target.tagName&&!C(n.target)){e.resetEffect(t);var o=getComputedStyle(t).getPropertyValue("border-top-color")||getComputedStyle(t).getPropertyValue("border-color")||getComputedStyle(t).getPropertyValue("background-color");e.clickWaveTimeoutId=window.setTimeout((function(){return e.onClick(t,o)}),0),E.cancel(e.animationStartId),e.animationStart=!0,e.animationStartId=E((function(){e.animationStart=!1}),10)}};return t.addEventListener("click",n,!0),{cancel:function(){t.removeEventListener("click",n,!0)}}}},e.renderWave=function(t){var n=t.csp,o=e.props.children;if(e.csp=n,!c.isValidElement(o))return o;var r=e.containerRef;return Object(w.c)(o)&&(r=Object(w.a)(o.ref,e.containerRef)),Object(T.a)(o,{ref:r})},e}return Object(m.a)(n,[{key:"componentDidMount",value:function(){var e=this.containerRef.current;e&&1===e.nodeType&&(this.instance=this.bindAnimationEvent(e))}},{key:"componentWillUnmount",value:function(){this.instance&&this.instance.cancel(),this.clickWaveTimeoutId&&clearTimeout(this.clickWaveTimeoutId),this.destroyed=!0}},{key:"getAttributeName",value:function(){var e=this.context.getPrefixCls,t=this.props.insertExtraNode;return"".concat(e(""),t?"-click-animating":"-click-animating-without-extra-node")}},{key:"resetEffect",value:function(e){var t=this;if(e&&e!==this.extraNode&&e instanceof Element){var n=this.props.insertExtraNode,o=this.getAttributeName();e.setAttribute(o,"false"),_&&(_.innerHTML=""),n&&this.extraNode&&e.contains(this.extraNode)&&e.removeChild(this.extraNode),["transition","animation"].forEach((function(n){e.removeEventListener("".concat(n,"start"),t.onTransitionStart),e.removeEventListener("".concat(n,"end"),t.onTransitionEnd)}))}}},{key:"render",value:function(){return c.createElement(d.a,null,this.renderWave)}}]),n}(c.Component);P.contextType=d.b;var L=n(57),A=n(54),N=n(156),R=n(28),M=n(243),F=function(){return{width:0,opacity:0,transform:"scale(0)"}},B=function(e){return{width:e.scrollWidth,opacity:1,transform:"scale(1)"}},D=function(e){var t=e.prefixCls,n=!!e.loading;return e.existIcon?s.a.createElement("span",{className:"".concat(t,"-loading-icon")},s.a.createElement(M.a,null)):s.a.createElement(R.b,{visible:n,motionName:"".concat(t,"-loading-icon-motion"),removeOnLeave:!0,onAppearStart:F,onAppearActive:B,onEnterStart:F,onEnterActive:B,onLeaveStart:B,onLeaveActive:F},(function(e,n){var o=e.className,r=e.style;return s.a.createElement("span",{className:"".concat(t,"-loading-icon"),style:r,ref:n},s.a.createElement(M.a,{className:o}))}))},U=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(n[o[r]]=e[o[r]])}return n},z=/^[\u4e00-\u9fa5]{2}$/,W=z.test.bind(z);function H(e){return"text"===e||"link"===e}function q(e,t){var n=!1,o=[];return c.Children.forEach(e,(function(e){var t=Object(a.a)(e),r="string"===t||"number"===t;if(n&&r){var i=o.length-1,c=o[i];o[i]="".concat(c).concat(e)}else o.push(e);n=r})),c.Children.map(o,(function(e){return function(e,t){if(null!=e){var n=t?" ":"";return"string"!==typeof e&&"number"!==typeof e&&"string"===typeof e.type&&W(e.props.children)?Object(T.a)(e,{children:e.props.children.split("").join(n)}):"string"===typeof e?(W(e)&&(e=e.split("").join(n)),c.createElement("span",null,e)):e}}(e,t)}))}Object(L.a)("default","primary","ghost","dashed","link","text"),Object(L.a)("circle","round"),Object(L.a)("submit","button","reset");function G(e){return"danger"===e?{danger:!0}:{type:e}}var $=function(e,t){var n,s,u=e.loading,p=void 0!==u&&u,g=e.prefixCls,b=e.type,y=e.danger,m=e.shape,h=e.size,v=e.className,k=e.children,O=e.icon,w=e.ghost,S=void 0!==w&&w,j=e.block,x=void 0!==j&&j,E=e.htmlType,_=void 0===E?"button":E,T=U(e,["loading","prefixCls","type","danger","shape","size","className","children","icon","ghost","block","htmlType"]),C=c.useContext(N.b),I=c.useState(!!p),L=Object(i.a)(I,2),R=L[0],M=L[1],F=c.useState(!1),B=Object(i.a)(F,2),z=B[0],G=B[1],$=c.useContext(d.b),V=$.getPrefixCls,J=$.autoInsertSpaceInButton,Y=$.direction,K=t||c.createRef(),Q=c.useRef(),X=function(){return 1===c.Children.count(k)&&!O&&!H(b)};s="object"===Object(a.a)(p)&&p.delay?p.delay||!0:!!p,c.useEffect((function(){clearTimeout(Q.current),"number"===typeof s?Q.current=window.setTimeout((function(){M(s)}),s):M(s)}),[s]),c.useEffect((function(){if(K&&K.current&&!1!==J){var e=K.current.textContent;X()&&W(e)?z||G(!0):z&&G(!1)}}),[K]);var Z=function(t){var n,o=e.onClick,r=e.disabled;R||r?t.preventDefault():null===(n=o)||void 0===n||n(t)};Object(A.a)(!("string"===typeof O&&O.length>2),"Button","`icon` is using ReactNode instead of string naming in v4. Please check `".concat(O,"` at https://ant.design/components/icon")),Object(A.a)(!(S&&H(b)),"Button","`link` or `text` button can't be a `ghost` button.");var ee=V("btn",g),te=!1!==J,ne="";switch(h||C){case"large":ne="lg";break;case"small":ne="sm"}var oe=R?"loading":O,re=l()(ee,(n={},Object(r.a)(n,"".concat(ee,"-").concat(b),b),Object(r.a)(n,"".concat(ee,"-").concat(m),m),Object(r.a)(n,"".concat(ee,"-").concat(ne),ne),Object(r.a)(n,"".concat(ee,"-icon-only"),!k&&0!==k&&!!oe),Object(r.a)(n,"".concat(ee,"-background-ghost"),S&&!H(b)),Object(r.a)(n,"".concat(ee,"-loading"),R),Object(r.a)(n,"".concat(ee,"-two-chinese-chars"),z&&te),Object(r.a)(n,"".concat(ee,"-block"),x),Object(r.a)(n,"".concat(ee,"-dangerous"),!!y),Object(r.a)(n,"".concat(ee,"-rtl"),"rtl"===Y),n),v),ie=O&&!R?O:c.createElement(D,{existIcon:!!O,prefixCls:ee,loading:!!R}),ae=k||0===k?q(k,X()&&te):null,ce=Object(f.a)(T,["navigate"]);if(void 0!==ce.href)return c.createElement("a",Object(o.a)({},ce,{className:re,onClick:Z,ref:K}),ie,ae);var se=c.createElement("button",Object(o.a)({},T,{type:_,className:re,onClick:Z,ref:K}),ie,ae);return H(b)?se:c.createElement(P,null,se)},V=c.forwardRef($);V.displayName="Button",V.Group=y,V.__ANT_BUTTON=!0;t.b=V},433:function(e,t,n){"undefined"!=typeof self&&self,e.exports=function(e){return o={},t.m=n=[function(t){t.exports=e},function(e,t,n){e.exports=n(2)()},function(e,t,n){"use strict";function o(){}function r(){}var i=n(3);r.resetWarningCache=o,e.exports=function(){function e(e,t,n,o,r,a){if(a!==i){var c=Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function t(){return e}var n={array:e.isRequired=e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:r,resetWarningCache:o};return n.PropTypes=n}},function(e){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,n){"use strict";function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],o=!0,r=!1,i=void 0;try{for(var a,c=e[Symbol.iterator]();!(o=(a=c.next()).done)&&(n.push(a.value),!t||n.length!==t);o=!0);}catch(e){r=!0,i=e}finally{try{o||null==c.return||c.return()}finally{if(r)throw i}}return n}}(e,t)||function(e,t){if(e){if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(e,t){null!=t&&t<=e.length||(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}function i(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],o=!0,r=!1,i=void 0;try{for(var a,c=e[Symbol.iterator]();!(o=(a=c.next()).done)&&(n.push(a.value),!t||n.length!==t);o=!0);}catch(e){r=!0,i=e}finally{try{o||null==c.return||c.return()}finally{if(r)throw i}}return n}}(e,t)||function(e,t){if(e){if("string"==typeof e)return a(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e,t){null!=t&&t<=e.length||(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}function c(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],o=!0,r=!1,i=void 0;try{for(var a,c=e[Symbol.iterator]();!(o=(a=c.next()).done)&&(n.push(a.value),!t||n.length!==t);o=!0);}catch(e){r=!0,i=e}finally{try{o||null==c.return||c.return()}finally{if(r)throw i}}return n}}(e,t)||function(e,t){if(e){if("string"==typeof e)return s(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(e,t){null!=t&&t<=e.length||(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}function u(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],o=!0,r=!1,i=void 0;try{for(var a,c=e[Symbol.iterator]();!(o=(a=c.next()).done)&&(n.push(a.value),!t||n.length!==t);o=!0);}catch(e){r=!0,i=e}finally{try{o||null==c.return||c.return()}finally{if(r)throw i}}return n}}(e,t)||function(e,t){if(e){if("string"==typeof e)return l(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?l(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(e,t){null!=t&&t<=e.length||(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}function f(e,t,n,o,r,i){var a=e.getElementsByTagName(t)[0],c=a,s=a;(s=e.createElement(t)).id=n,s.src=o,c&&c.parentNode?c.parentNode.insertBefore(s,c):e.head.appendChild(s),s.onerror=i,s.onload=r}function d(e,t){var n=e.getElementById(t);n&&n.parentNode.removeChild(n)}function p(e){return m.a.createElement("span",{style:{paddingRight:10,fontWeight:500,paddingLeft:e.icon?0:10,paddingTop:10,paddingBottom:10}},e.children)}function g(e){return m.a.createElement("div",{style:{marginRight:10,background:e.active?"#eee":"#fff",padding:10,borderRadius:2}},m.a.createElement("svg",{width:"18",height:"18",xmlns:"http://www.w3.org/2000/svg"},m.a.createElement("g",{fill:"#000",fillRule:"evenodd"},m.a.createElement("path",{d:"M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z",fill:"#EA4335"}),m.a.createElement("path",{d:"M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z",fill:"#4285F4"}),m.a.createElement("path",{d:"M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z",fill:"#FBBC05"}),m.a.createElement("path",{d:"M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z",fill:"#34A853"}),m.a.createElement("path",{fill:"none",d:"M0 0h18v18H0z"}))))}function b(e){var t=i(Object(y.useState)(!1),2),n=t[0],o=t[1],r=i(Object(y.useState)(!1),2),a=r[0],c=r[1],s=e.tag,u=e.type,l=e.className,f=e.disabledStyle,d=e.buttonText,b=e.children,v=e.render,k=e.theme,O=e.icon,w=e.disabled,S=h({onSuccess:e.onSuccess,onAutoLoadFinished:e.onAutoLoadFinished,onRequest:e.onRequest,onFailure:e.onFailure,onScriptLoadFailure:e.onScriptLoadFailure,clientId:e.clientId,cookiePolicy:e.cookiePolicy,loginHint:e.loginHint,hostedDomain:e.hostedDomain,autoLoad:e.autoLoad,isSignedIn:e.isSignedIn,fetchBasicProfile:e.fetchBasicProfile,redirectUri:e.redirectUri,discoveryDocs:e.discoveryDocs,uxMode:e.uxMode,scope:e.scope,accessType:e.accessType,responseType:e.responseType,jsSrc:e.jsSrc,prompt:e.prompt}),j=S.signIn,x=w||!S.loaded;if(v)return v({onClick:j,disabled:x});var E={backgroundColor:"dark"===k?"rgb(66, 133, 244)":"#fff",display:"inline-flex",alignItems:"center",color:"dark"===k?"#fff":"rgba(0, 0, 0, .54)",boxShadow:"0 2px 2px 0 rgba(0, 0, 0, .24), 0 0 1px 0 rgba(0, 0, 0, .24)",padding:0,borderRadius:2,border:"1px solid transparent",fontSize:14,fontWeight:"500",fontFamily:"Roboto, sans-serif"},_={cursor:"pointer",backgroundColor:"dark"===k?"#3367D6":"#eee",color:"dark"===k?"#fff":"rgba(0, 0, 0, .54)",opacity:1},T=x?Object.assign({},E,f):a?Object.assign({},E,_):n?Object.assign({},E,{cursor:"pointer",opacity:.9}):E;return m.a.createElement(s,{onMouseEnter:function(){return o(!0)},onMouseLeave:function(){o(!1),c(!1)},onMouseDown:function(){return c(!0)},onMouseUp:function(){return c(!1)},onClick:j,style:T,type:u,disabled:x,className:l},[O&&m.a.createElement(g,{key:1,active:a}),m.a.createElement(p,{icon:O,key:2},b||d)])}n.r(t),n.d(t,"default",(function(){return k})),n.d(t,"GoogleLogin",(function(){return k})),n.d(t,"GoogleLogout",(function(){return w})),n.d(t,"useGoogleLogin",(function(){return h})),n.d(t,"useGoogleLogout",(function(){return O}));var y=n(0),m=n.n(y),h=(n(1),function(e){function t(e){var t=e.getBasicProfile(),n=e.getAuthResponse(!0);e.googleId=t.getId(),e.tokenObj=n,e.tokenId=n.id_token,e.accessToken=n.access_token,e.profileObj={googleId:t.getId(),imageUrl:t.getImageUrl(),email:t.getEmail(),name:t.getName(),givenName:t.getGivenName(),familyName:t.getFamilyName()},i(e)}function n(e){if(e&&e.preventDefault(),A){var n=window.gapi.auth2.getAuthInstance(),o={prompt:P};p(),"code"===T?n.grantOfflineAccess(o).then((function(e){return i(e)}),(function(e){return u(e)})):n.signIn(o).then((function(e){return t(e)}),(function(e){return u(e)}))}}var r=e.onSuccess,i=void 0===r?function(){}:r,a=e.onAutoLoadFinished,c=void 0===a?function(){}:a,s=e.onFailure,u=void 0===s?function(){}:s,l=e.onRequest,p=void 0===l?function(){}:l,g=e.onScriptLoadFailure,b=e.clientId,m=e.cookiePolicy,h=e.loginHint,v=e.hostedDomain,k=e.autoLoad,O=e.isSignedIn,w=e.fetchBasicProfile,S=e.redirectUri,j=e.discoveryDocs,x=e.uxMode,E=e.scope,_=e.accessType,T=e.responseType,C=e.jsSrc,I=void 0===C?"https://apis.google.com/js/api.js":C,P=e.prompt,L=o(Object(y.useState)(!1),2),A=L[0],N=L[1];return Object(y.useEffect)((function(){var e=!1,n=g||u;return f(document,"script","google-login",I,(function(){var o={client_id:b,cookie_policy:m,login_hint:h,hosted_domain:v,fetch_basic_profile:w,discoveryDocs:j,ux_mode:x,redirect_uri:S,scope:E,access_type:_};"code"===T&&(o.access_type="offline"),window.gapi.load("auth2",(function(){var r=window.gapi.auth2.getAuthInstance();r?r.then((function(){e||(O&&r.isSignedIn.get()?(N(!0),c(!0),t(r.currentUser.get())):(N(!0),c(!1)))}),(function(e){u(e)})):window.gapi.auth2.init(o).then((function(n){if(!e){N(!0);var o=O&&n.isSignedIn.get();c(o),o&&t(n.currentUser.get())}}),(function(e){N(!0),c(!1),n(e)}))}))}),(function(e){n(e)})),function(){e=!0,d(document,"google-login")}}),[]),Object(y.useEffect)((function(){k&&n()}),[A]),{signIn:n,loaded:A}});function v(e){var t=u(Object(y.useState)(!1),2),n=t[0],o=t[1],r=u(Object(y.useState)(!1),2),i=r[0],a=r[1],c=e.tag,s=e.type,l=e.className,f=e.disabledStyle,d=e.buttonText,b=e.children,h=e.render,v=e.theme,k=e.icon,w=e.disabled,S=O({jsSrc:e.jsSrc,onFailure:e.onFailure,onScriptLoadFailure:e.onScriptLoadFailure,clientId:e.clientId,cookiePolicy:e.cookiePolicy,loginHint:e.loginHint,hostedDomain:e.hostedDomain,fetchBasicProfile:e.fetchBasicProfile,discoveryDocs:e.discoveryDocs,uxMode:e.uxMode,redirectUri:e.redirectUri,scope:e.scope,accessType:e.accessType,onLogoutSuccess:e.onLogoutSuccess}),j=S.signOut,x=w||!S.loaded;if(h)return h({onClick:j,disabled:x});var E={backgroundColor:"dark"===v?"rgb(66, 133, 244)":"#fff",display:"inline-flex",alignItems:"center",color:"dark"===v?"#fff":"rgba(0, 0, 0, .54)",boxShadow:"0 2px 2px 0 rgba(0, 0, 0, .24), 0 0 1px 0 rgba(0, 0, 0, .24)",padding:0,borderRadius:2,border:"1px solid transparent",fontSize:14,fontWeight:"500",fontFamily:"Roboto, sans-serif"},_={cursor:"pointer",backgroundColor:"dark"===v?"#3367D6":"#eee",color:"dark"===v?"#fff":"rgba(0, 0, 0, .54)",opacity:1},T=x?Object.assign({},E,f):i?Object.assign({},E,_):n?Object.assign({},E,{cursor:"pointer",opacity:.9}):E;return m.a.createElement(c,{onMouseEnter:function(){return o(!0)},onMouseLeave:function(){o(!1),a(!1)},onMouseDown:function(){return a(!0)},onMouseUp:function(){return a(!1)},onClick:j,style:T,type:s,disabled:x,className:l},[k&&m.a.createElement(g,{key:1,active:i}),m.a.createElement(p,{icon:k,key:2},b||d)])}b.defaultProps={type:"button",tag:"button",buttonText:"Sign in with Google",scope:"profile email",accessType:"online",prompt:"",cookiePolicy:"single_host_origin",fetchBasicProfile:!0,isSignedIn:!1,uxMode:"popup",disabledStyle:{opacity:.6},icon:!0,theme:"light",onRequest:function(){}};var k=b,O=function(e){var t=e.jsSrc,n=void 0===t?"https://apis.google.com/js/api.js":t,o=e.onFailure,r=e.onScriptLoadFailure,i=e.clientId,a=e.cookiePolicy,s=e.loginHint,u=e.hostedDomain,l=e.fetchBasicProfile,p=e.discoveryDocs,g=e.uxMode,b=e.redirectUri,m=e.scope,h=e.accessType,v=e.onLogoutSuccess,k=c(Object(y.useState)(!1),2),O=k[0],w=k[1],S=Object(y.useCallback)((function(){if(window.gapi){var e=window.gapi.auth2.getAuthInstance();null!=e&&e.then((function(){e.signOut().then((function(){e.disconnect(),v()}))}),(function(e){return o(e)}))}}),[v]);return Object(y.useEffect)((function(){var e=r||o;return f(document,"script","google-login",n,(function(){var t={client_id:i,cookie_policy:a,login_hint:s,hosted_domain:u,fetch_basic_profile:l,discoveryDocs:p,ux_mode:g,redirect_uri:b,scope:m,access_type:h};window.gapi.load("auth2",(function(){window.gapi.auth2.getAuthInstance()?w(!0):window.gapi.auth2.init(t).then((function(){return w(!0)}),(function(t){return e(t)}))}))}),(function(t){e(t)})),function(){d(document,"google-login")}}),[]),{signOut:S,loaded:O}};v.defaultProps={type:"button",tag:"button",buttonText:"Logout of Google",disabledStyle:{opacity:.6},icon:!0,theme:"light",jsSrc:"https://apis.google.com/js/api.js"};var w=v}],t.c=o,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)t.d(o,r,function(t){return e[t]}.bind(null,r));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=4);function t(e){if(o[e])return o[e].exports;var r=o[e]={i:e,l:!1,exports:{}};return n[e].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n,o}(n(0))},434:function(e,t,n){var o;e.exports=(o=n(0),function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(8)},function(e,t,n){e.exports=n(6)()},function(e,t){e.exports=o},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){return decodeURIComponent(e.replace(new RegExp("^(?:.*[&\\?]"+encodeURIComponent(t).replace(/[\.\+\*]/g,"\\$&")+"(?:\\=([^&]*))?)?.*$","i"),"$1"))}},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},c=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),s=o(n(2)),u=o(n(1)),l=o(n(5)),f=o(n(3)),d=function(e){function t(){var e,n,o;r(this,t);for(var c=arguments.length,s=Array(c),u=0;u<c;u++)s[u]=arguments[u];return n=o=i(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(s))),o.state={isSdkLoaded:!1,isProcessing:!1},o.responseApi=function(e){window.FB.api("/me",{locale:o.props.language,fields:o.props.fields},(function(t){a(t,e),o.props.callback(t)}))},o.checkLoginState=function(e){o.setStateIfMounted({isProcessing:!1}),e.authResponse?o.responseApi(e.authResponse):o.props.onFailure?o.props.onFailure({status:e.status}):o.props.callback({status:e.status})},o.checkLoginAfterRefresh=function(e){"connected"===e.status?o.checkLoginState(e):window.FB.login((function(e){return o.checkLoginState(e)}),!0)},o.click=function(e){if(o.state.isSdkLoaded&&!o.state.isProcessing&&!o.props.isDisabled){o.setState({isProcessing:!0});var t=o.props,n=t.scope,r=t.appId,i=t.onClick,a=t.returnScopes,c=t.responseType,s=t.redirectUri,u=t.disableMobileRedirect,f=t.authType,d=t.state;if("function"!=typeof i||(i(e),!e.defaultPrevented)){var p={client_id:r,redirect_uri:s,state:d,return_scopes:a,scope:n,response_type:c,auth_type:f};if(o.props.isMobile&&!u)window.location.href="https://www.facebook.com/dialog/oauth"+(0,l.default)(p);else{if(!window.FB)return void(o.props.onFailure&&o.props.onFailure({status:"facebookNotLoaded"}));window.FB.login(o.checkLoginState,{scope:n,return_scopes:a,auth_type:p.auth_type})}}}},i(o,n)}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),c(t,[{key:"componentDidMount",value:function(){if(this._isMounted=!0,document.getElementById("facebook-jssdk"))this.sdkLoaded();else{this.setFbAsyncInit(),this.loadSdkAsynchronously();var e=document.getElementById("fb-root");e||((e=document.createElement("div")).id="fb-root",document.body.appendChild(e))}}},{key:"componentWillReceiveProps",value:function(e){this.state.isSdkLoaded&&e.autoLoad&&!this.props.autoLoad&&window.FB.getLoginStatus(this.checkLoginAfterRefresh)}},{key:"componentWillUnmount",value:function(){this._isMounted=!1}},{key:"setStateIfMounted",value:function(e){this._isMounted&&this.setState(e)}},{key:"setFbAsyncInit",value:function(){var e=this,t=this.props,n=t.appId,o=t.xfbml,r=t.cookie,i=t.version,a=t.autoLoad;window.fbAsyncInit=function(){window.FB.init({version:"v"+i,appId:n,xfbml:o,cookie:r}),e.setStateIfMounted({isSdkLoaded:!0}),(a||e.isRedirectedFromFb())&&window.FB.getLoginStatus(e.checkLoginAfterRefresh)}}},{key:"isRedirectedFromFb",value:function(){var e=window.location.search;return(0,f.default)(e,"code")||(0,f.default)(e,"granted_scopes")}},{key:"sdkLoaded",value:function(){this.setState({isSdkLoaded:!0})}},{key:"loadSdkAsynchronously",value:function(){var e=this.props.language;!function(t,n,o){var r=t.getElementsByTagName(n)[0],i=r,a=r;t.getElementById(o)||((a=t.createElement(n)).id=o,a.src="https://connect.facebook.net/"+e+"/sdk.js",i.parentNode.insertBefore(a,i))}(document,"script","facebook-jssdk")}},{key:"render",value:function(){var e=this.props.render;if(!e)throw new Error("ReactFacebookLogin requires a render prop to render");var t={onClick:this.click,isDisabled:!!this.props.isDisabled,isProcessing:this.state.isProcessing,isSdkLoaded:this.state.isSdkLoaded};return this.props.render(t)}}]),t}(s.default.Component);d.propTypes={isDisabled:u.default.bool,callback:u.default.func.isRequired,appId:u.default.string.isRequired,xfbml:u.default.bool,cookie:u.default.bool,authType:u.default.string,scope:u.default.string,state:u.default.string,responseType:u.default.string,returnScopes:u.default.bool,redirectUri:u.default.string,autoLoad:u.default.bool,disableMobileRedirect:u.default.bool,isMobile:u.default.bool,fields:u.default.string,version:u.default.string,language:u.default.string,onClick:u.default.func,onFailure:u.default.func,render:u.default.func.isRequired},d.defaultProps={redirectUri:"undefined"!=typeof window?window.location.href:"/",scope:"public_profile,email",returnScopes:!1,xfbml:!1,cookie:!1,authType:"",fields:"name",version:"2.3",language:"en_US",disableMobileRedirect:!1,isMobile:function(){var e=!1;try{e=!!(window.navigator&&window.navigator.standalone||navigator.userAgent.match("CriOS")||navigator.userAgent.match(/mobile/i))}catch(t){}return e}(),onFailure:null,state:"facebookdirect",responseType:"code"},t.default=d},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return"?"+Object.keys(e).map((function(t){return t+"="+encodeURIComponent(e[t])})).join("&")}},function(e,t,n){"use strict";function o(){}var r=n(7);e.exports=function(){function e(e,t,n,o,i,a){if(a!==r){var c=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t};return n.checkPropTypes=o,n.PropTypes=n,n}},function(e,t){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},c=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),s=o(n(2)),u=o(n(1)),l=o(n(9)),f=o(n(4)),d=function(e){function t(){return r(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),c(t,[{key:"style",value:function(){var e=this.constructor.defaultProps.cssClass;return this.props.cssClass===e&&s.default.createElement("style",{dangerouslySetInnerHTML:{__html:l.default}})}},{key:"containerStyle",value:function(e){var t=e.isProcessing,n=e.isSdkLoaded,o=e.isDisabled,r={transition:"opacity 0.5s"};return(t||!n||o)&&(r.opacity=.6),a(r,this.props.containerStyle)}},{key:"renderOwnButton",value:function(e){var t=this.props,n=t.cssClass,o=t.size,r=t.icon,i=t.textButton,c=t.typeButton,u=t.buttonStyle,l=e.onClick,f="string"==typeof r,d={};return e.isDisabled&&function(e){return["button","input","select","textarea","optgroup","option","fieldset"].indexOf((e+"").toLowerCase())>=0}(this.props.tag)&&(d.disabled=!0),s.default.createElement("span",{style:this.containerStyle(e)},f&&s.default.createElement("link",{rel:"stylesheet",href:"https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"}),s.default.createElement(this.props.tag,a({type:c,className:n+" "+o,style:u,onClick:l},d),r&&f&&s.default.createElement("i",{className:"fa "+r}),r&&!f&&r,i),this.style())}},{key:"render",value:function(){var e=this;return s.default.createElement(f.default,a({},this.props,{render:function(t){return e.renderOwnButton(t)}}))}}]),t}(s.default.Component);d.propTypes={textButton:u.default.string,typeButton:u.default.string,size:u.default.string,cssClass:u.default.string,icon:u.default.any,containerStyle:u.default.object,buttonStyle:u.default.object,tag:u.default.oneOfType([u.default.node,u.default.func])},d.defaultProps={textButton:"Login with Facebook",typeButton:"button",size:"metro",fields:"name",cssClass:"kep-login-facebook",tag:"button"},t.default=d},function(e,t,n){(t=e.exports=n(10)()).push([e.id,".kep-login-facebook{font-family:Helvetica,sans-serif;font-weight:700;-webkit-font-smoothing:antialiased;color:#fff;cursor:pointer;display:inline-block;font-size:calc(.27548vw + 12.71074px);text-decoration:none;text-transform:uppercase;transition:background-color .3s,border-color .3s;background-color:#4c69ba;border:calc(.06887vw + .67769px) solid #4c69ba;padding:calc(.34435vw + 13.38843px) calc(.34435vw + 18.38843px)}.kep-login-facebook.small{padding:calc(.34435vw + 3.38843px) calc(.34435vw + 8.38843px)}.kep-login-facebook.medium{padding:calc(.34435vw + 8.38843px) calc(.34435vw + 13.38843px)}.kep-login-facebook.metro{border-radius:0}.kep-login-facebook .fa{margin-right:calc(.34435vw + 3.38843px)}",""]),t.locals={"kep-login-facebook":"kep-login-facebook",small:"small",medium:"medium",metro:"metro",fa:"fa"}},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},r=0;r<this.length;r++){var i=this[r][0];"number"==typeof i&&(o[i]=!0)}for(r=0;r<t.length;r++){var a=t[r];"number"==typeof a[0]&&o[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a))}},e}}]))}}]);
//# sourceMappingURL=39.603d8f9e.chunk.js.map