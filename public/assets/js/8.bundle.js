(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{1031:function(e,t,a){"use strict";var r=a(0),n=a(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=e.currentChat,a=e.socket,r=(0,i.useState)([]),n=(0,o.default)(r,2),p=n[0],v=n[1],g=(0,i.useRef)(),y=(0,i.useState)(null),b=(0,o.default)(y,2),O=b[0],w=b[1],E=(0,m.useSelector)((function(e){return e.ContractReducers.contract.wallet})),j=(0,m.useSelector)((function(e){return e.ContractReducers.contract.myContract})),P=(0,i.useState)({}),N=(0,o.default)(P,2),_=N[0],S=N[1];(0,i.useEffect)((function(){if(console.log(_),console.log(t),t)if(d.default.get("/chat/"+t.id).then((function(e){v(e.data&&e.data.chats)})),t.target_user)S({target_user:t.target_user});else{var e=t.user_id.split(","),a=e.indexOf(E),r=e[1==a?0:1];j.wallets(r).then((function(e){e.email;var t=e.name,a=e.photo;e.profesi;_.target_user={name:t,photo:a,address:r},S(function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?h(Object(a),!0).forEach((function(t){(0,s.default)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):h(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},_))}))}}),[t]);var k=function(){var e=(0,l.default)(c.default.mark((function e(r){var n,l;return c.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n={to:_&&_.target_user&&_.target_user.address,from:E,room_id:t.id,msg:r},a.emit("send-msg",n),d.default.post("/chat",{room_id:t.id,user_target:n.to,message:r}).then().catch((function(e){})),(l=(0,u.default)(p)).push({user_target:n.to,message:r}),v(l);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return(0,i.useEffect)((function(){a&&a.on("msg-recieve",(function(e){w({user_target:e.to,message:e.msg})}))}),[a]),(0,i.useEffect)((function(){O&&v((function(e){return[].concat((0,u.default)(e),[O])}))}),[O]),(0,i.useEffect)((function(){var e;null===(e=g.current)||void 0===e||e.scrollIntoView({behavior:"smooth"})}),[p]),i.default.createElement("div",{className:"chat-container-inside"},i.default.createElement("div",{className:"chat-header"},i.default.createElement("div",{className:"user-details"},i.default.createElement("div",{className:"avatar"},i.default.createElement("img",{src:_&&_.target_user&&_.target_user.photo?_.target_user.photo:"/assets/images/profilTest.png",alt:"",style:{height:50,width:50,borderRadius:50}})),i.default.createElement("div",{className:"username"},i.default.createElement("h3",null,_&&_.target_user&&_.target_user.name)))),i.default.createElement("div",{className:"chat-messages"},p.map((function(e,t){return i.default.createElement("div",{ref:g,key:t},i.default.createElement("div",{className:"message ".concat(e.user_target.indexOf(E)>=0?"recieved":"sended")},i.default.createElement("div",{className:"content "},i.default.createElement("p",null,e.message))))}))),t&&t.id&&i.default.createElement(f.default,{handleSendMsg:k}))};var c=r(a(17)),u=r(a(54)),l=r(a(23)),s=r(a(91)),o=r(a(53)),i=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!==n(e)&&"function"!=typeof e)return{default:e};var a=p(t);if(a&&a.has(e))return a.get(e);var r={},c=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if("default"!==u&&Object.prototype.hasOwnProperty.call(e,u)){var l=c?Object.getOwnPropertyDescriptor(e,u):null;l&&(l.get||l.set)?Object.defineProperty(r,u,l):r[u]=e[u]}r.default=e,a&&a.set(e,r);return r}(a(1)),f=r(a(1032)),d=r(a(443)),m=a(242);function p(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,a=new WeakMap;return(p=function(e){return e?a:t})(e)}function h(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}},1032:function(e,t,a){"use strict";var r=a(0),n=a(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=e.handleSendMsg,a=(0,u.useState)(""),r=(0,c.default)(a,2),n=r[0],s=r[1],o=(0,u.useState)(!1),i=(0,c.default)(o,2),f=i[0],d=i[1];return u.default.createElement("div",{className:"chatinput-container"},u.default.createElement("div",{className:"button-container"},u.default.createElement("div",{className:"emoji"},u.default.createElement("span",{className:"material-icons",style:{fontSize:35,color:"#e8ff0a",cursor:"pointer"},onClick:function(){d(!f)}},"add_reaction"),f&&u.default.createElement(l.default,{onEmojiClick:function(e,t){var a=n;a+=t.emoji,s(a)}}))),u.default.createElement("form",{className:"input-container",onSubmit:function(e){return function(e){e.preventDefault(),n.length>0&&(t(n),s(""))}(e)}},u.default.createElement("input",{type:"text",placeholder:"type your message here",onChange:function(e){return s(e.target.value)},value:n}),u.default.createElement("button",{type:"submit"},u.default.createElement("span",{className:"material-icons text-success",style:{padding:"10px 20px"}},"send"))))};var c=r(a(53)),u=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!==n(e)&&"function"!=typeof e)return{default:e};var a=s(t);if(a&&a.has(e))return a.get(e);var r={},c=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if("default"!==u&&Object.prototype.hasOwnProperty.call(e,u)){var l=c?Object.getOwnPropertyDescriptor(e,u):null;l&&(l.get||l.set)?Object.defineProperty(r,u,l):r[u]=e[u]}r.default=e,a&&a.set(e,r);return r}(a(1)),l=r(a(1033));function s(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,a=new WeakMap;return(s=function(e){return e?a:t})(e)}},1034:function(e,t,a){"use strict";var r=a(0),n=a(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=e.changeChat,a=(0,o.useState)(void 0),r=(0,s.default)(a,2),n=r[0],u=r[1],d=(0,o.useState)({}),m=(0,s.default)(d,2),h=m[0],v=m[1],g=(0,o.useState)(void 0),y=(0,s.default)(g,2),b=y[0],O=y[1],w=(0,o.useState)(void 0),E=(0,s.default)(w,2),j=E[0],P=E[1],N=(0,i.useSelector)((function(e){return e.ContractReducers.contract.wallet})),_=(0,i.useSelector)((function(e){return e.ContractReducers.contract.myContract})),S=(0,i.useSelector)((function(e){return e.ChatListReducers})),k=(0,i.useSelector)((function(e){return e.ChatReducers}));(0,o.useEffect)((0,l.default)(c.default.mark((function e(){return c.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:S.length>0&&k&&S.map((function(e,t){var a=k[e],r=a.user_id.split(","),n=r.indexOf(N),c=r[1==n?0:1];_.wallets(c).then((function(e){e.email;var t=e.name,r=e.photo;e.profesi;h[a.id]={name:t,photo:r,address:c},v(p({},h))}))}));case 1:case"end":return e.stop()}}),e)}))),[S,k]),(0,o.useEffect)((function(){_&&N&&_.wallets(N).then((function(e){var t=e.name,a=e.photo;u(t),O(a)}))}),[N]);var C=function(e,a){P(e),a.target_user=h[a.id],t(a)};return o.default.createElement(o.default.Fragment,null,o.default.createElement("div",{className:"contact-container"},o.default.createElement("div",{className:"brand"},o.default.createElement("h3",null,"snappy")),o.default.createElement("div",{className:"contacts"},S&&S.length>0?S.map((function(e,t){var a=k[e];return o.default.createElement("div",{key:t,className:"contact ".concat(t===j?"selected":""),onClick:function(){return C(t,a)}},o.default.createElement("div",{className:"avatar",style:{backgroundColor:"hsl("+360*Math.random()+","+(25+70*Math.random())+"%,"+(80+10*Math.random())+"%)"}},o.default.createElement("img",{src:h[a.id]&&h[a.id].photo?h[a.id].photo:"/assets/images/profilTest.png",style:{height:50,width:50,borderRadius:50},alt:""})),o.default.createElement("div",{className:"username w-100"},o.default.createElement("div",{className:"d-flex flex-row justify-content-between"},o.default.createElement("h3",{className:"text-line-1"},h[a.id]&&h[a.id].name),a&&a.newChats.length>0&&o.default.createElement("span",{className:"align-self-center bg-success text-white fw-bolder",style:{padding:"5px 11px",borderRadius:50}},a.newChats.length)),o.default.createElement("div",{className:"info-chat d-flex flex-row justify-content-between text-muted my-1"},o.default.createElement("span",{className:"text-line-2 ",style:{width:"70%"}},a.chats&&a.chats.length>0&&a.chats[0].message),o.default.createElement("span",null,a.chats&&a.chats.length>0&&(0,f.default)(a.chats[0].createdAt).fromNow()))))})):o.default.createElement("div",{className:"h-100 w-100 d-flex flex-column justify-content-center align-items-center"},o.default.createElement("i",{className:"material-icons text-white",style:{verticalAlign:"bottom",fontSize:50}},"comments_disabled"),o.default.createElement("span",{className:"title-2"},"No Chats Available"))),o.default.createElement("div",{className:"current-user"},o.default.createElement("div",{className:"avatar"},b&&o.default.createElement("img",{style:{height:70,width:70,objectFit:"cover",borderRadius:50},src:b,alt:"avatar"})),o.default.createElement("div",{className:"username"},o.default.createElement("span",{className:"title-1 text-white"},n)))))};var c=r(a(17)),u=r(a(91)),l=r(a(23)),s=r(a(53)),o=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!==n(e)&&"function"!=typeof e)return{default:e};var a=d(t);if(a&&a.has(e))return a.get(e);var r={},c=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if("default"!==u&&Object.prototype.hasOwnProperty.call(e,u)){var l=c?Object.getOwnPropertyDescriptor(e,u):null;l&&(l.get||l.set)?Object.defineProperty(r,u,l):r[u]=e[u]}r.default=e,a&&a.set(e,r);return r}(a(1)),i=(r(a(443)),a(242)),f=r(a(1001));function d(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,a=new WeakMap;return(d=function(e){return e?a:t})(e)}function m(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function p(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?m(Object(a),!0).forEach((function(t){(0,u.default)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):m(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}},996:function(e,t,a){"use strict";var r=a(0),n=a(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){var e=(0,s.useState)(void 0),t=(0,l.default)(e,2),a=(t[0],t[1],(0,s.useState)(void 0)),r=(0,l.default)(a,2),n=(r[0],r[1],(0,f.useSelector)((function(e){return e.ContractReducers.contract.wallet})),(0,f.useSelector)((function(e){return e.ContractReducers.contract.myContract})),(0,f.useSelector)((function(e){return e.SocketReducers}))),m=(0,d.useParams)().id,h=(0,d.useNavigate)(),v=((0,f.useSelector)((function(e){return e.ChatListReducers})),(0,f.useSelector)((function(e){return e.ChatReducers})));(0,s.useEffect)((0,u.default)(c.default.mark((function e(){return c.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)}))),[v]);return s.default.createElement(s.default.Fragment,null,s.default.createElement("div",{className:"chat-container"},s.default.createElement("div",{className:"container"},s.default.createElement(i.default,{changeChat:function(e){h("/chat/"+e.id)}}),m&&v[m]?s.default.createElement(o.default,{currentChat:v[m],socket:n}):s.default.createElement(p,null))))};var c=r(a(17)),u=r(a(23)),l=r(a(53)),s=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!==n(e)&&"function"!=typeof e)return{default:e};var a=m(t);if(a&&a.has(e))return a.get(e);var r={},c=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if("default"!==u&&Object.prototype.hasOwnProperty.call(e,u)){var l=c?Object.getOwnPropertyDescriptor(e,u):null;l&&(l.get||l.set)?Object.defineProperty(r,u,l):r[u]=e[u]}r.default=e,a&&a.set(e,r);return r}(a(1)),o=(a(1008),r(a(1031))),i=r(a(1034)),f=(r(a(443)),a(242)),d=a(117);function m(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,a=new WeakMap;return(m=function(e){return e?a:t})(e)}var p=function(){return s.default.createElement("div",{className:"welcome-chat"},s.default.createElement("img",{src:"/assets/images/robot.gif",alt:""}),s.default.createElement("h1",null,"Welcome, there"),s.default.createElement("h3",null,"Please select a chat to Start messaging."))}}}]);