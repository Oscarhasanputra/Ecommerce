(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{985:function(e,t,a){"use strict";(function(e){var n=a(0);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=n(a(17)),r=n(a(54)),o=n(a(23)),l=n(a(53)),i=a(117),s=a(1),d=a(446),u=a(444),m=n(a(998)),f=a(242),p=n(a(443)),v=a(1008),h=a(445),g=n(a(1001));var E=(0,f.connect)((function(e){return{wallet:e.ContractReducers.contract.wallet,balance:e.BalanceReducers,contractReducers:e.ContractReducers,provider:e.ContractReducers.contract.provider,contract:e.ContractReducers.contract.myContract,cart:e.CartReducers,socket:e.SocketReducers,notif:e.NotifReducers,chatList:e.ChatListReducers,chatContact:e.ChatReducers}}),(function(e){return{add:function(t){e({type:"add",data:t})},init:function(t){e({type:"init",data:t})},notif:function(t){e({type:"notif",data:t})},updateContract:function(t){e({type:"update",contract:t})},updateBalance:function(t){e({type:"balance",price:t})},addSocket:function(t){e({type:"socket",socket:t})},addChatList:function(t){e({type:"chatInit",keys:t})},addChat:function(t){e({type:"addChat",key:t})},addChatInit:function(t){e({type:"contact",data:t})},addContact:function(t,a){e({type:"addContact",key:t,contact:a})}}}))((function(t){var a=(0,s.useState)({}),n=(0,l.default)(a,2),f=n[0],E=n[1],w=(0,s.useState)([]),N=(0,l.default)(w,2),k=N[0],b=N[1],y=(0,s.useState)(localStorage.getItem("login")),x=(0,l.default)(y,2),C=x[0],L=x[1],_=(0,i.useNavigate)(),S=(0,s.useRef)([]),P=(0,s.useRef)([]),R=(0,s.useRef)({});(0,s.useEffect)((0,o.default)(c.default.mark((function e(){var a,n,r,l;return c.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=function(){var e=(0,o.default)(c.default.mark((function e(){var a;return c.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.default.get("/cart/"+t.wallet);case 2:a=e.sent,t.init(a);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),n=function(){var e=(0,o.default)(c.default.mark((function e(){var a,n;return c.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p.default.get("/myorder/notif",{params:{user_id:t.wallet}});case 3:a=e.sent,n=a.data,P.current=n,b(n),e.next=11;break;case 9:e.prev=9,e.t0=e.catch(0);case 11:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}}(),r=function(){var e=(0,o.default)(c.default.mark((function e(){var a;return c.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.contract.wallets(t.wallet);case 2:a=e.sent,E({photo:a.photo,name:a});case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),l=function(){var e=(0,o.default)(c.default.mark((function e(){var a,n,r,o;return c.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,d.ConnectBlockchain)(C);case 3:if(a=e.sent,!C){e.next=13;break}return e.next=7,a.provider.getBalance(a.wallet);case 7:n=e.sent,r=h.ethers.utils.formatEther(n.toString()),t.updateBalance(r),t.socket||((o=(0,v.io)("http://comercy.site/")).emit("add-user",a.wallet),t.addSocket(o)),e.next=14;break;case 13:t.updateBalance(null);case 14:t.contractReducers.setPrice(4404902),t.updateContract(a),e.next=20;break;case 18:e.prev=18,e.t0=e.catch(0);case 20:case"end":return e.stop()}}),e,null,[[0,18]])})));return function(){return e.apply(this,arguments)}}(),t.wallet?(a(),p.default.get("/contact/"+t.wallet).then((function(e){var a=e.data,n={},c=a.map((function(e,t){return n[e.id]=e,e.id}));t.addChatInit(n),t.addChatList(c),S.current=c,R.current=n})),n(),r()):l();case 5:case"end":return e.stop()}}),e)}))),[t.wallet,C]),(0,s.useEffect)((function(){S.current=t.chatList}),[t.chatList]),(0,s.useEffect)((function(){t.socket&&(t.socket.on("msg-recieve",(function(e){if(S.current.includes(e.room_id)){console.log(R.current);var a=new Date,n=R.current[e.room_id];n.newChats.push({message:e.msg,user_target:e.to,updatedAt:a,createdAt:a}),n.chats=[{updatedAt:a,createdAt:a,message:e.msg,user_target:e.to}],R.current[e.room_id]=n,t.addContact(e.room_id,n)}else{S.current=[e.room_id].concat((0,r.default)(S.current));var c=new Date,o={id:e.room_id,chats:[{createdAt:c,message:e.msg,user_target:e.to}],createdAt:c,updatedAt:c,user_id:"".concat(e.from,",").concat(e.to,","),newChats:[{createdAt:c,message:e.msg,user_target:e.to}]};R.current[e.room_id]=o,t.addContact(e.room_id,o),t.addChat(e.room_id)}})),t.socket.on("msg-notif",(function(e){P.current=[].concat((0,r.default)(e.order),(0,r.default)(P.current)),b(P.current)})))}),[t.socket]);var D,B,A=function(e){_(e)};return e.createElement("div",null,e.createElement("nav",{className:"top-app-bar navbar navbar-expand navbar-dark bg-dark"},e.createElement("div",{className:"container-fluid px-4"},e.createElement("button",{className:"btn btn-lg btn-icon order-1 order-lg-0",id:"drawerToggle",onClick:function(e){e.preventDefault(),document.body.classList.toggle("drawer-toggled")}},e.createElement("i",{className:"material-icons"},"menu")),e.createElement(i.Link,{className:"navbar-brand me-auto",to:"/"},e.createElement("div",{className:"text-uppercase font-monospace"},"ComerCY")),e.createElement("div",{className:"d-flex align-items-center mx-3 me-lg-0"},e.createElement("div",{className:"d-flex"},e.createElement(i.Link,{className:"btn btn-lg btn-icon mx-2 btn-overlay d-none d-md-block",to:"/chat"},e.createElement("i",{className:"material-icons"},"sms"),e.createElement("span",null,(B=0,t.chatList.map((function(e,a){var n=t.chatContact[e];B+=n.newChats.length})),B))),e.createElement(u.Dropdown,null,e.createElement(u.Dropdown.Toggle,{id:"dropdown-basic",className:"bg-none btn-overlay d-none d-md-block",size:"lg"},e.createElement("i",{className:"material-icons"},"notifications"),e.createElement("span",null,(D=0,k.forEach((function(e,a){D+=e.readStatus&&e.readStatus.search(t.wallet)>=0?0:1})),D))),e.createElement(u.Dropdown.Menu,null,k.length<=0?e.createElement(u.Dropdown.Item,{className:"d-flex flex-column align-items-start my-2 disabled",style:{height:"auto"}},e.createElement("div",{className:"title-noto-2 text-line-1 w-100"},"No New Notification")):k.slice(0,5).map((function(t,a){var n=t.status,c="Waiting"==n?"Succesfully sent the Order to Seller":"Confirmation"==n?"Confirmed the Order and has sent Email to "+t.email+"by Seller":"Finished"==n?"Order Successfully Accepted by buyer and Payment has been paid":"Payment Fee has been Claimed by Seller";return e.createElement(u.Dropdown.Item,{className:"d-flex flex-column align-items-start my-2",style:{height:"auto"},onClick:function(e){e.preventDefault(),A("/order/".concat(t.orders_id))},key:a},e.createElement("div",{className:"title-barlow-3"},e.createElement("i",{className:"material-icons text-primary",style:{verticalAlign:"bottom"}},"info"),". ",(0,g.default)(t.createdAt).fromNow()),e.createElement("div",{className:"title-noto-3 text-line-1 w-100"},c))})),e.createElement(u.Dropdown.Item,{className:"title-2 text-primary",style:{height:"auto"},onClick:function(e){e.preventDefault(),A("/notifications")}}," ","See More"))),e.createElement(i.Link,{className:"btn btn-lg btn-icon mx-2 btn-overlay d-none d-md-block",to:"/cart"},e.createElement("i",{className:"material-icons"},"shopping_cart"),e.createElement("span",null,t.cart.length)),e.createElement("div",{className:"dropdown"},e.createElement("button",{className:"btn btn-lg btn-icon dropdown-toggle mx-2",id:"dropdownMenuProfile",type:"button","data-bs-toggle":"dropdown","aria-expanded":"false"},t.wallet?e.createElement("img",{style:{height:"inherit",width:"inherit",objectFit:"cover",background:"white"},src:f.photo?f.photo:"/assets/images/profilTest.png"}):e.createElement("i",{className:"material-icons"},"person")),e.createElement("ul",{className:"dropdown-menu dropdown-menu-end mt-3","aria-labelledby":"dropdownMenuProfile"},e.createElement("li",null,e.createElement(i.Link,{to:"/profile",className:"dropdown-item",href:"#!"},e.createElement("i",{className:"material-icons leading-icon"},"person"),e.createElement("div",{className:"me-3"},"Profile"))),e.createElement("li",null,e.createElement("hr",{className:"dropdown-divider"})),e.createElement("li",null,t.wallet?e.createElement("a",{onClick:function(){(0,d.ConnectBlockchain)(!1).then(function(){var e=(0,o.default)(c.default.mark((function e(a){return c.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.updateContract(a),localStorage.removeItem("login"),L(!1),t.updateBalance(null);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){}))},style:{cursor:"pointer"},className:"dropdown-item"},e.createElement("i",{className:"material-icons leading-icon"},"login"),e.createElement("div",{className:"me-3"},"Logout")):e.createElement("a",{style:{cursor:"pointer"},className:"dropdown-item",onClick:function(){(0,d.ConnectBlockchain)(!0).then(function(){var e=(0,o.default)(c.default.mark((function e(a){var n,r;return c.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.updateContract(a),localStorage.setItem("login","true"),e.next=4,a.provider.getBalance(a.wallet);case 4:n=e.sent,r=h.ethers.utils.formatEther(n.toString()),t.updateBalance(r),L(!0);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){}))}},e.createElement("i",{className:"material-icons leading-icon"},"login"),e.createElement("div",{className:"me-3"},"Connect Wallet"))))),t.balance&&e.createElement("span",{className:"font-noto text-white align-self-center d-none d-sm-block"}," ",t.balance," ",e.createElement("img",{src:"/assets/images/BNB.png",style:{height:30}})))))),e.createElement("div",{id:"layoutDrawer"},e.createElement("div",{id:"layoutDrawer_nav"},e.createElement("nav",{className:"drawer accordion drawer-light bg-white",id:"drawerAccordion"},e.createElement("div",{className:"drawer-menu"},e.createElement("div",{className:"nav"},e.createElement(i.Link,{className:"nav-link d-md-none",to:"/notifications"},e.createElement("div",{className:"nav-link-icon"},e.createElement("i",{className:"material-icons"},"notifications")),"Notifications"),e.createElement(i.Link,{className:"nav-link d-md-none",to:"/cart"},e.createElement("div",{className:"nav-link-icon"},e.createElement("i",{className:"material-icons"},"shopping_cart")),"Cart"),e.createElement(i.Link,{className:"nav-link d-md-none",to:"/chat"},e.createElement("div",{className:"nav-link-icon"},e.createElement("i",{className:"material-icons"},"sms")),"Chats"),e.createElement("div",{className:"drawer-menu-divider d-sm-none"}),e.createElement("div",{className:"drawer-menu-heading"},"Menu"),e.createElement(i.Link,{to:"/",className:"nav-link"},e.createElement("div",{className:"nav-link-icon"},e.createElement("i",{className:"material-icons"},"home")),"Home"),e.createElement(i.Link,{className:"nav-link",to:"/market"},e.createElement("div",{className:"nav-link-icon"},e.createElement("i",{className:"material-icons"},"language")),"Market"),e.createElement(i.Link,{className:"nav-link collapsed",to:"/sell"},e.createElement("div",{className:"nav-link-icon"},e.createElement("i",{className:"material-icons"},"sell")),"Selling"),e.createElement(i.Link,{className:"nav-link collapsed",to:"/profile"},e.createElement("div",{className:"nav-link-icon"},e.createElement("i",{className:"material-icons"},"person")),"Profile"),e.createElement("div",{className:"drawer-menu-divider"}))),e.createElement("div",{className:"drawer-footer border-top"},e.createElement("div",{className:"d-flex align-items-center"},e.createElement("i",{className:"material-icons text-muted"},"account_circle"))))),e.createElement("div",{id:"layoutDrawer_content",onClick:function(e){document.body.classList.contains("drawer-toggled")&&document.body.classList.toggle("drawer-toggled")}},e.createElement("main",null,e.createElement(i.Outlet,null)),e.createElement("footer",{className:"py-4 mt-auto border-top",style:{minHeight:74}},e.createElement("div",{className:"container-xl px-5"},e.createElement("div",{className:"d-flex flex-column flex-sm-row align-items-center justify-content-sm-between small"})))),e.createElement("div",{className:"backdrop-cs d-none",id:"loader"},e.createElement("div",{className:"backdrop-bg"}),e.createElement("div",{className:"backdrop-content position-relative flex-column justify-content-center align-items-center"},e.createElement(u.Spinner,{animation:"grow",variant:"primary"}),e.createElement("div",{className:"text-white fw-bold",id:"loaderText"}," ","Please Wait....")))))}));t.default=E}).call(this,a(1))},997:function(e,t,a){"use strict";var n=a(0);Object.defineProperty(t,"__esModule",{value:!0}),t.Loader=void 0;var c=n(a(241)),r={show:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;e?(0,c.default)("#loaderText").text(e):(0,c.default)("#loaderText").text("Please Wait..."),(0,c.default)("#loader").removeClass("d-none")},hide:function(){(0,c.default)("#loader").addClass("d-none")}};t.Loader=r},998:function(e,t,a){"use strict";var n=a(0);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=n(a(8)),r=n(a(9)),o=n(a(443)),l=n(a(240)),i=a(997),s=function(){function e(){(0,c.default)(this,e)}return(0,r.default)(e,null,[{key:"get",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise((function(a,n){o.default.get(e,{params:t}).then((function(e){a(e.data)})).catch((function(e){n(e)}))}))}},{key:"post",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise((function(a,n){i.Loader.show(),o.default.post(e,t).then((function(e){var t=e.data;i.Loader.hide(),t&&t.message?l.default.fire({icon:"success",title:"Success",text:"".concat(t.message),timer:1e3}).then((function(){a(t)})).catch((function(e){})):a(t)})).catch((function(e){i.Loader.hide(),e.response&&e.response.data&&e.response.data.message?l.default.fire({icon:"error",title:"Failed",text:"".concat(e.response.data.message),timer:1e3}).then((function(){n(e)})):n(e)}))}))}},{key:"put",value:function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return new Promise((function(n,c){i.Loader.show(),o.default.put("".concat(e,"/").concat(t),a).then((function(e){var t=e.data;i.Loader.hide(),t&&t.message?l.default.fire({icon:"success",title:"Success",text:"".concat(t.message),timer:1e3}).then((function(){n(t)})).catch((function(e){})):n(t)})).catch((function(e){i.Loader.hide(),e.response&&e.response.data&&e.response.data.message?l.default.fire({icon:"error",title:"Failed",text:"".concat(e.response.data.message),timer:1e3}).then((function(){c(e)})):c(e)}))}))}},{key:"delete",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise((function(a,n){i.Loader.show(),o.default.delete("".concat(e),t).then((function(e){var t=e.data;i.Loader.hide(),t.message?l.default.fire({icon:"success",title:"Success",text:"".concat(t.message),timer:1e3}).then((function(){a(t)})).catch((function(e){})):a(t)})).catch((function(e){i.Loader.hide(),e.response&&e.response.data&&e.response.data.message?l.default.fire({icon:"error",title:"Failed",text:"".concat(e.response.data.message),timer:1e3}).then((function(){n(e)})).catch((function(){})):n(e)}))}))}}]),e}(),d=s;t.default=d}}]);