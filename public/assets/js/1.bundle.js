(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{989:function(e,t,n){"use strict";(function(e){var a=n(0);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n(17)),o=a(n(117)),c=a(n(23)),l=a(n(53)),s=a(n(999)),i=n(1),u=a(n(997)),d=a(n(241)),m=n(445),f=n(444),p=n(996),h=n(242),v=n(116),y=a(n(240)),E=a(n(443));function g(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function b(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?g(Object(n),!0).forEach((function(t){(0,o.default)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var w=function(t){(0,s.default)({},t);var n=(0,h.useSelector)((function(e){return e.ContractReducers.contract.wallet})),a=(0,h.useSelector)((function(e){return e.ContractReducers.price})),o=(0,i.useState)([]),m=(0,l.default)(o,2),p=m[0],y=m[1],g=(0,i.useState)(!0),w=(0,l.default)(g,2),x=w[0],N=w[1];(0,i.useEffect)((function(){n&&E.default.get("/products/owner",{params:{wallet:n}}).then((function(e){var t=e.data.data;y(t),N(!1)})).catch((function(e){console.log("")}))}),[n]);var C=function(t){var n=t.product,o=(0,v.useNavigate)(),s=(0,i.useState)(n),m=(0,l.default)(s,2),f=m[0],p=m[1],y=(0,i.useRef)(!1),E=(0,h.useSelector)((function(e){return e.ContractReducers.contract.myContract}));(0,i.useEffect)((function(){y.current=!0;var e=function(){var e=(0,c.default)(r.default.mark((function e(){var t,a;return r.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.productDetail(n.id);case 2:(t=e.sent)&&y.current&&(a=t.photo,p(b(b({},f),{},{photo:a})));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return e(),function(){return y.current=!1}}),[]);var g=function(e){o(e)};return e.createElement("div",{className:"col-10 mx-2 mx-md-4 col-sm-5 col-md-3 mb-5 rounded shadow-4 p-0 "},e.createElement("div",{className:"btn-overlay image-card"},e.createElement("img",{className:"d-block rounded",src:"/assets/"+f.photo,onClick:function(){g("/item/"+f.id)}}),e.createElement("span",{onClick:function(){g("/edit/"+f.id)},style:{padding:0,cursor:"pointer",top:-10,right:-10}},e.createElement("i",{className:"material-icons",style:{padding:15}},"edit"))),e.createElement("div",{className:"d-flex flex-column p-3"},e.createElement("div",{className:"font-roboto text-line-3 title-barlow-1"},f.name," "),e.createElement("div",{className:"d-flex flex-row justify-content-between"},e.createElement("div",{className:"font-noto fw-bold title-noto-2"},(f.price/a).toFixed(8)," ",e.createElement("img",{src:"/assets/images/BNB.png",style:{height:30}})),e.createElement("div",{className:"title-noto-2",style:{fontSize:18}},"Book")),e.createElement("div",{className:"d-flex flex-row mt-4"},e.createElement("i",{className:"material-icons"},"person"),e.createElement("div",{className:"title-barlow-2 fw-bold text-line-1"},f.owner))),e.createElement("div",{className:"px-3 py-2 d-flex justify-content-center flex-row"},e.createElement("div",{className:"px-3 py-2 font-noto fw-bold d-flex justify-content-center flex-row row",style:{color:"#018AD7",cursor:"pointer"}},e.createElement("div",{className:"switch_box box_1 col-8"},e.createElement("input",{type:"checkbox",checked:"ON"==f.status,className:"switch_1",onChange:function(e){var t=e.target.checked;(0,d.default)(e.target).prop("checked",!t);var n=t?"ON":"OFF";u.default.put("/products",f.id,{status:n}).then((function(n){(0,d.default)(e.target).prop("checked",t)})).catch((function(){}))}})),e.createElement("span",{className:"font-roboto-2 text-center mt-2"},"Published"))))};return e.createElement("div",{className:"mt-5 row justify-content-center"},p.map((function(t,n){return e.createElement(C,{product:t,key:n})})),x&&e.createElement(f.Spinner,{animation:"border",size:"lg"}),p.length<=0&&!x&&e.createElement("div",{className:"d-flex align-items-center flex-column justify-content-center"},e.createElement("i",{className:"material-icons text-danger",style:{fontSize:100}},"search_off"),e.createElement("div",{className:"title-1 "},"You Haven`t Own Any Product")))},x=function(t){var n,a,o,l=t.order,s=t.index,i=t.setmodalShow,d=(0,h.useSelector)((function(e){return e.ContractReducers.contract.myContract})),f=((0,h.useSelector)((function(e){return e.ContractReducers.price})),(0,v.useNavigate)());return e.createElement("tr",null,e.createElement("th",{scope:"row"},s),e.createElement("td",null,l.product&&l.product.name),e.createElement("td",null,l.createdAt),e.createElement("td",null,l.status),e.createElement("td",null,e.createElement("div",{className:"d-flex flex-row"},e.createElement(v.Link,{to:"/order/"+l.id,className:"btn btn-primary me-2"},"Check"),"Confirmation"==l.status&&e.createElement("button",{className:"btn btn-success",onClick:function(){return i(l)}},"Feedback"),"Waiting"==l.status&&(n=l.createdAt,a=new Date(n),o=new Date,Math.round(Math.abs((a-o)/864e5))>=3)&&e.createElement("button",{className:"btn btn-success",onClick:function(){return e=l.price,void y.default.fire({title:"Refund Your Payment Product",text:"Your Payment Fee is About "+e+" BNB",icon:"info",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, Refund to Wallet"}).then(function(){var t=(0,c.default)(r.default.mark((function t(n){var a,o,c,s,i,h;return r.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!n.isConfirmed){t.next=20;break}return a=m.ethers.utils.parseUnits(e.toString(),"ether"),o=a.toString(),t.prev=3,p.Loader.show("Initializing Wallet for Confirmation...."),t.next=7,d.refund(l.seller_id,o);case 7:return c=t.sent,p.Loader.show("Refund Saldo to your Wallet..."),t.next=11,c.wait();case 11:s=c.gasLimit.toNumber(),i=m.ethers.utils.formatEther(c.gasPrice.toNumber()),h=(s*i).toFixed(8),u.default.post("/order/confirm",{id:l.id,status:"Refund",gas:h,txid:c.hash}).then((function(e){p.Loader.hide(),f(0)})).catch((function(e){p.Loader.hide(),f(0)})),t.next=20;break;case 17:t.prev=17,t.t0=t.catch(3),console.log(t.t0);case 20:case"end":return t.stop()}}),t,null,[[3,17]])})));return function(e){return t.apply(this,arguments)}}());var e}},"Refund"))))},N=function(t){var n=t.selling,a=t.index,o=t.setmodalSell,l=(0,h.useSelector)((function(e){return e.ContractReducers.contract.myContract})),s=((0,h.useSelector)((function(e){return e.ContractReducers.price})),(0,v.useNavigate)()),i=function(){var e=(0,c.default)(r.default.mark((function e(t){return r.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:y.default.fire({title:"Claiming Your Payment Product",text:"Your Payment Fee is About "+t+" BNB",icon:"info",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, Claim to Wallet"}).then(function(){var e=(0,c.default)(r.default.mark((function e(a){var o,c,i,d,f,h;return r.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!a.isConfirmed){e.next=20;break}return o=m.ethers.utils.parseUnits(t.toString(),"ether"),c=o.toString(),e.prev=3,p.Loader.show("Initializing Wallet for Confirmation...."),e.next=7,l.withdraw(c);case 7:return i=e.sent,p.Loader.show(" Claim Saldo to your Wallet..."),e.next=11,i.wait();case 11:d=i.gasLimit.toNumber(),f=m.ethers.utils.formatEther(i.gasPrice.toNumber()),h=(d*f).toFixed(8),u.default.post("/order/confirm",{id:n.id,status:"Claimed",gas:h,txid:i.hash}).then((function(e){p.Loader.hide(),s(0)})).catch((function(e){p.Loader.hide(),s(0)})),e.next=20;break;case 17:e.prev=17,e.t0=e.catch(3),console.log(e.t0);case 20:case"end":return e.stop()}}),e,null,[[3,17]])})));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return console.log(n),e.createElement("tr",null,e.createElement("th",{scope:"row"},a),e.createElement("td",null,n.product&&n.product.name),e.createElement("td",null,n.createdAt),e.createElement("td",null,n.status),e.createElement("td",null,e.createElement("div",{className:"d-flex flex-row"},e.createElement(v.Link,{to:"/order/"+n.id,className:"btn btn-primary me-2"},"Check"),"Waiting"==n.status&&e.createElement("button",{className:"btn btn-success",onClick:function(){return o(n)}},"Confirm"),"Finished"==n.status&&e.createElement("button",{className:"btn btn-success",onClick:function(){return i(n.price)}},"Claim"))))};var C=function(){var t=(0,i.useState)([]),n=(0,l.default)(t,2),a=n[0],o=n[1],s=(0,i.useState)("myorder"),d=(0,l.default)(s,2),m=d[0],y=d[1],g=(0,i.useState)([]),C=(0,l.default)(g,2),k=C[0],S=C[1],O=(0,i.useState)({}),P=(0,l.default)(O,2),L=P[0],B=P[1],j=(0,i.useState)(!1),M=(0,l.default)(j,2),F=M[0],R=M[1],_=(0,i.useState)(!1),A=(0,l.default)(_,2),D=A[0],T=A[1],W=(0,h.useSelector)((function(e){return e.ContractReducers.contract.wallet})),z=(0,h.useSelector)((function(e){return e.ContractReducers.contract.myContract})),Y=(0,i.useState)({}),H=(0,l.default)(Y,2),K=H[0],I=H[1],U=(0,v.useNavigate)();(0,i.useEffect)((function(){var e=function(){var e=(0,c.default)(r.default.mark((function e(){var t,n,a,o,c;return r.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,z.wallets(W);case 2:t=e.sent,n=t.email,a=t.name,o=t.photo,c=t.profesi,B({email:n,name:a,photo:o,profesi:c});case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();null!=W&&(e(),E.default.get("/myorder",{params:{user_id:W}}).then((function(e){var t=e.data;o(t.myOrder),S(t.mySelling)})).catch((function(e){})))}),[W]);var G=function(){var e=(0,c.default)(r.default.mark((function e(t){var n,a;return r.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,z.wallets(t.buyer_id);case 2:n=e.sent,a=n.name,I(b(b({},t),{},{buyer:a})),T(!0);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),J=function(e){I(e),R(!0)},q=function(e){u.default.post("/order/confirm",{id:K.id,status:e}).then((function(e){p.Loader.hide(),U(0)})).catch((function(e){p.Loader.hide(),U(0)}))};return e.createElement("div",{className:"container-xl p-5"},e.createElement("div",{className:"d-flex flex-column flex-md-row justify-content-center my-2"},e.createElement("div",{className:"btn-overlay-bottom align-self-center"},e.createElement("img",{className:"img-card-circle align-self-center",src:L.photo?L.photo:"/assets/images/profilTest.png"}),e.createElement("span",{className:"bg-primary d-inline d-md-none"},e.createElement(v.Link,{to:"/profile/edit",className:"no-style"},e.createElement("i",{className:"material-icons align-self-center p-2",style:{cursor:"pointer"}},"border_color")))),e.createElement("div",{className:"d-flex align-items-center align-items-md-start flex-column justify-content-center mx-2"},e.createElement("div",{className:"title-roboto-1 fw-bold my-1 ",style:{letterSpacing:1}},L.name?L.name:"Unknown Name"),e.createElement("div",{className:"title-noto-2 my-1"},L.email?L.email:"---------------"),e.createElement("div",{className:"title-noto-2 my-1",style:{color:"#666666"}},L.profesi?L.profesi:"---------------")),e.createElement(v.Link,{to:"/profile/edit",className:"no-style"},e.createElement("i",{className:"material-icons align-self-center mx-4 d-none d-md-inline",style:{cursor:"pointer"}},"border_color"))),e.createElement(f.Tab.Container,{id:"left-tabs-example",defaultActiveKey:"galery"},e.createElement(f.Nav,{variant:"pills",className:"flex-row my-3"},e.createElement(f.Nav.Item,{className:"col-12 col-md-6",style:{cursor:"pointer"}},e.createElement(f.Nav.Link,{eventKey:"history",className:"text-center title-roboto-2"},e.createElement("i",{className:"material-icons",style:{verticalAlign:"bottom",fontSize:30}},"history")," ","Activity")),e.createElement(f.Nav.Item,{className:"col-12 col-md-6",style:{cursor:"pointer"}},e.createElement(f.Nav.Link,{eventKey:"galery",className:"text-center title-roboto-2"},e.createElement("i",{className:"material-icons",style:{verticalAlign:"bottom",fontSize:30}},"widgets")," ","My Draft"))),e.createElement(f.Tab.Content,null,e.createElement(f.Tab.Pane,{eventKey:"history"},e.createElement("div",{className:"row"},e.createElement("input",{type:"text",placeholder:"Search .....",className:"shadow-3 rounded-3 p-3 card-search border-0 col-12 col-sm-7"}),e.createElement("select",{className:"shadow-3 rounded-3 p-3 card-search border-0 col-12 col-sm-4 ms-0 ms-sm-5 my-2 my-sm-0","aria-label":"",value:m,onChange:function(e){return y(e.target.value)}},e.createElement("option",{value:"myorder"},"Buying"),e.createElement("option",{value:"mysell"},"Selling"))),e.createElement("div",{className:"table-responsive my-5"},e.createElement("table",{className:"table table-striped"},e.createElement("thead",{className:""},e.createElement("tr",null,e.createElement("th",{scope:"col"},"#"),e.createElement("th",{scope:"col"},"Product Name"),e.createElement("th",{scope:"col"},"Date"),e.createElement("th",{scope:"col"},"Status"),e.createElement("th",{scope:"col"},"Action"))),e.createElement("tbody",null,"myorder"==m?a.map((function(t,n){return e.createElement(x,{key:n,index:n+1,order:t,setmodalShow:J})})):k.map((function(t,n){return e.createElement(N,{key:n,index:n+1,selling:t,setmodalSell:G})}))))),e.createElement(f.Modal,{show:F,onHide:function(){return R(!1)}},e.createElement(f.Modal.Header,{closeButton:!0},e.createElement(f.Modal.Title,{className:"title-1"},"Confirmation Order")),e.createElement(f.Modal.Body,null,e.createElement("div",{className:"title-2"},"Make Sure that you have received your Orders from the Seller!")),e.createElement(f.Modal.Footer,null,e.createElement(f.Button,{variant:"primary",onClick:function(){return q("Finished")}},"Give Feedback"))),e.createElement(f.Modal,{show:D,onHide:function(){return T(!1)}},e.createElement(f.Modal.Header,{closeButton:!0},e.createElement(f.Modal.Title,{className:"title-1"},"Buying Order")),e.createElement(f.Modal.Body,null,e.createElement("div",{className:"title-2"},"Hoolla, Got your Recent Order from :"),e.createElement("div",{className:"mt-2"},"Buyer`s name :"," ",K.buyer?K.buyer:K.buyer_id),e.createElement("div",null,"Buyer`s Email : ",K.email),e.createElement("div",null,"Order`s Date : ",K.createdAt)),e.createElement(f.Modal.Footer,null,e.createElement(f.Button,{variant:"primary",onClick:function(){return q("Confirmation")}},"Confirmed")))),e.createElement(f.Tab.Pane,{eventKey:"galery"},e.createElement(w,null)))))};t.default=C}).call(this,n(1))},996:function(e,t,n){"use strict";var a=n(0);Object.defineProperty(t,"__esModule",{value:!0}),t.Loader=void 0;var r=a(n(241)),o={show:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;e?(0,r.default)("#loaderText").text(e):(0,r.default)("#loaderText").text("Please Wait..."),(0,r.default)("#loader").removeClass("d-none")},hide:function(){(0,r.default)("#loader").addClass("d-none")}};t.Loader=o},997:function(e,t,n){"use strict";var a=n(0);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n(8)),o=a(n(9)),c=a(n(443)),l=a(n(240)),s=n(996),i=function(){function e(){(0,r.default)(this,e)}return(0,o.default)(e,null,[{key:"get",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise((function(n,a){c.default.get(e,{params:t}).then((function(e){n(e.data)})).catch((function(e){a(e)}))}))}},{key:"post",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise((function(n,a){s.Loader.show(),c.default.post(e,t).then((function(e){var t=e.data;s.Loader.hide(),t&&t.message?l.default.fire({icon:"success",title:"Success",text:"".concat(t.message),timer:1e3}).then((function(){n(t)})).catch((function(e){})):n(t)})).catch((function(e){console.log("hiding"),s.Loader.hide(),e.response&&e.response.data&&e.response.data.message?l.default.fire({icon:"error",title:"Failed",text:"".concat(e.response.data.message),timer:1e3}).then((function(){console.log("hiding"),a(e)})):a(e)}))}))}},{key:"put",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return new Promise((function(a,r){s.Loader.show(),c.default.put("".concat(e,"/").concat(t),n).then((function(e){var t=e.data;s.Loader.hide(),t&&t.message?l.default.fire({icon:"success",title:"Success",text:"".concat(t.message),timer:1e3}).then((function(){a(t)})).catch((function(e){})):a(t)})).catch((function(e){s.Loader.hide(),e.response&&e.response.data&&e.response.data.message?l.default.fire({icon:"error",title:"Failed",text:"".concat(e.response.data.message),timer:1e3}).then((function(){r(e)})):r(e)}))}))}},{key:"delete",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise((function(n,a){s.Loader.show(),c.default.delete("".concat(e),t).then((function(e){var t=e.data;s.Loader.hide(),t.message?l.default.fire({icon:"success",title:"Success",text:"".concat(t.message),timer:1e3}).then((function(){n(t)})).catch((function(e){})):n(t)})).catch((function(e){s.Loader.hide(),e.response&&e.response.data&&e.response.data.message?l.default.fire({icon:"error",title:"Failed",text:"".concat(e.response.data.message),timer:1e3}).then((function(){a(e)})).catch((function(){})):a(e)}))}))}}]),e}(),u=i;t.default=u},999:function(e,t,n){"use strict";function a(){return e.exports=a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},a.apply(this,arguments)}e.exports=a}}]);