(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{592:function(e,t,n){"use strict";(function(e){var a=n(1);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n(21)),c=a(n(171)),o=a(n(301)),i=a(n(64)),l=n(83),s=n(302),u=n(0),d=n(111),f=a(n(599)),m=n(304),p=n(303),h=a(n(300));function v(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function g(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?v(Object(n),!0).forEach((function(t){(0,c.default)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):v(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var w=function(t){var n=t.comment,a=t.person;return e.createElement("div",{className:"card my-3 shadow-sm",style:{padding:0}},e.createElement("div",{className:"card-header"}," ",e.createElement("i",{className:"material-icons mx-1",style:{verticalAlign:"middle"}},"person"),a),e.createElement("div",{className:"card-body"},n))};var y=(0,d.connect)((function(e){return{contract:e.ContractReducers.contract,wallet:e.ContractReducers.contract.wallet,priceBNB:e.ContractReducers.price,profil:e.ContractReducers.contract.profil,cart:e.CartReducers}}),(function(e){return{add:function(t){return e({type:"add",data:t})},delete:function(t){return e({type:"delete",index:t})},updateContract:function(t){return e({type:"update",contract:t})},updateBalance:function(t){return e({type:"balance",price:t})}}}))((function(t){var n=(0,u.useState)(!1),a=(0,i.default)(n,2),c=a[0],d=a[1],v=(0,u.useState)(""),y=(0,i.default)(v,2),E=(y[0],y[1],(0,u.useState)({})),b=(0,i.default)(E,2),N=b[0],x=b[1],C=(0,u.useState)(""),k=(0,i.default)(C,2),O=k[0],P=k[1],j=(0,u.useState)([]),B=(0,i.default)(j,2),S=B[0],_=B[1],D=function(){d(!0)},L=(0,l.useNavigate)(),A=(0,l.useParams)().id;(0,u.useEffect)((function(){var e=function(){var e=(0,o.default)(r.default.mark((function e(){var n,a,c,o,i,l,s,u,d,m;return r.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.contract.myContract,e.prev=1,e.next=4,n.productDetail(A);case 4:a=e.sent,c=a.category,o=a.description,i=a.name,l=a.owner,s=a.photo,u=a.price,d=a.productID,m={category:c,comment:O,description:o,name:i,owner:l,price:u.toNumber(),photo:s,productID:d},f.default.get("/product/"+A).then((function(e){x(g(g({},m),{},{rating:e.rating})),console.log(e)})).catch((function(e){})),x(m),e.next=13;break;case 11:e.prev=11,e.t0=e.catch(1);case 13:case"end":return e.stop()}}),e,null,[[1,11]])})));return function(){return e.apply(this,arguments)}}();e(),h.default.get("/comments",{params:{product_id:A}}).then((function(e){var t=e.data.data;_(t)})).catch((function(e){}))}),[]),console.log(N);var M=function(){var e=(0,o.default)(r.default.mark((function e(){var n;return r.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.cart,n={product_id:N.productID.toNumber(),user_id:t.wallet,owner_id:N.owner},d(!1),f.default.post("/cart",{data:n}).then((function(e){t.add(n)})).catch((function(e){t.delete(-1)}));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),F=function(){var e=(0,o.default)(r.default.mark((function e(){var n;return r.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.contract.myContract,n={text:O,product_id:N.productID.toNumber(),user_id:t.wallet},f.default.post("/comments",{data:n}).then((function(e){L(0)})).catch((function(e){}));case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return console.log(t.profil),e.createElement("div",{className:"container-xl p-5 row"},e.createElement("div",{className:"col-5"},e.createElement("img",{src:"/assets/"+N.photo,className:"image-rounded w-100"}),t.wallet&&!(t.wallet==N.owner)&&t.profil.name&&e.createElement("div",{className:"w-100 mt-3 py-2 px-5 text-white btn-primary btn-rounded shadow-lg",style:{color:"#018AD7",cursor:"pointer"},onClick:function(){return D}},"Add To Cart"),t.wallet&&!t.profil.name&&e.createElement("div",{className:"w-100 mt-3 py-2 px-5 text-white btn-primary btn-rounded shadow-lg",style:{color:"#018AD7",cursor:"pointer"},onClick:function(){return L("/profile/edit")}},"Update Profil"),!t.wallet&&e.createElement("div",{className:"w-100 mt-3 py-2 px-5 text-white btn-primary btn-rounded shadow-lg",style:{color:"#018AD7",cursor:"pointer"},onClick:function(){(0,m.ConnectBlockchain)(!0).then(function(){var e=(0,o.default)(r.default.mark((function e(n){var a,c;return r.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.updateContract(n),localStorage.setItem("login","true"),e.next=4,n.provider.getBalance(n.wallet);case 4:a=e.sent,c=p.ethers.utils.formatEther(a.toString()),t.updateBalance(c);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){}))}},"Connect Wallet")),e.createElement("div",{className:"col-7 align-self-start"},e.createElement("div",{className:"title-1"},N.name),e.createElement("div",{className:"font-nato d-flex"},e.createElement("span",{className:"material-icons align-self-center me-1"},"account_circle")," ",N.owner,e.createElement("span",{className:"material-icons align-self-center ms-5 me-1"},"favorite")," ",N.rating),e.createElement("div",{className:"d-flex flex-row"},e.createElement("img",{src:"/assets/images/BNB.png",className:"align-self-center",style:{height:30}}),e.createElement("div",{className:"title-2 my-2"},(N.price/t.priceBNB).toFixed(6)," ")),e.createElement("div",{className:"card my-3 shadow-sm"},e.createElement("div",{className:"card-header"},"Description"),e.createElement("div",{className:"card-body"},N.description))),e.createElement("div",{className:"py-2 px-4 my-4 card-comment shadow-lg d-flex flex-row",style:{backgroundColor:"white"}},e.createElement("div",{className:"circle-outlined align-self-center me-3 "},e.createElement("i",{className:"material-icons",style:{verticalAlign:"middle"}},"person")),e.createElement("input",{className:"form-control",style:{borderWidth:0},placeholder:"Add Comments....",value:O,onChange:function(e){return P(e.target.value)}}),e.createElement("span",{className:"mx-2 align-self-center",style:{cursor:"pointer",color:"#0d0074"},onClick:F},"Send")),function(){if(N.comment)return S.map((function(t,n){return e.createElement(w,{key:n,comment:t.text,person:t.user_id})}))}(),e.createElement(s.Modal,{show:c,onHide:function(){return d(!1)},centered:!0},e.createElement(s.Modal.Header,{closeButton:!0},e.createElement(s.Modal.Title,null,'Are You Sure Add "',N.name,'" to Cart?')),e.createElement(s.Modal.Body,null),e.createElement(s.Modal.Footer,null,e.createElement(s.Button,{className:"mx-2",variant:"danger",onClick:function(){return d(!1)}},"Cancel"),e.createElement(s.Button,{variant:"primary",onClick:M},"Add to Cart"))))}));t.default=y}).call(this,n(0))},598:function(e,t,n){"use strict";var a=n(1);Object.defineProperty(t,"__esModule",{value:!0}),t.Loader=void 0;var r=a(n(170)),c={show:function(){(0,r.default)("#loader").removeClass("d-none")},hide:function(){(0,r.default)("#loader").addClass("d-none")}};t.Loader=c},599:function(e,t,n){"use strict";var a=n(1);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n(9)),c=a(n(10)),o=a(n(300)),i=a(n(169)),l=n(598),s=function(){function e(){(0,r.default)(this,e)}return(0,c.default)(e,null,[{key:"get",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise((function(n,a){o.default.get(e,{params:t}).then((function(e){n(e.data)})).catch((function(e){a(e)}))}))}},{key:"post",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise((function(n,a){l.Loader.show(),o.default.post(e,t).then((function(e){var t=e.data;l.Loader.hide(),t&&t.message?i.default.fire({icon:"success",title:"Success",text:"".concat(t.message),timer:1e3}).then((function(){n(t)})).catch((function(e){})):n(t)})).catch((function(e){console.log("hiding"),l.Loader.hide(),e.response&&e.response.data&&e.response.data.message?i.default.fire({icon:"error",title:"Failed",text:"".concat(e.response.data.message),timer:1e3}).then((function(){console.log("hiding"),a(e)})):a(e)}))}))}},{key:"put",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return new Promise((function(a,r){l.Loader.show(),o.default.put("".concat(e,"/").concat(t),n).then((function(e){var t=e.data;l.Loader.hide(),t&&t.message?i.default.fire({icon:"success",title:"Success",text:"".concat(t.message),timer:1e3}).then((function(){a(t)})).catch((function(e){})):a(t)})).catch((function(e){l.Loader.hide(),e.response&&e.response.data&&e.response.data.message?i.default.fire({icon:"error",title:"Failed",text:"".concat(e.response.data.message),timer:1e3}).then((function(){r(e)})):r(e)}))}))}},{key:"delete",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise((function(n,a){l.Loader.show(),o.default.delete("".concat(e),t).then((function(e){var t=e.data;l.Loader.hide(),t.message?i.default.fire({icon:"success",title:"Success",text:"".concat(t.message),timer:1e3}).then((function(){n(t)})).catch((function(e){})):n(t)})).catch((function(e){l.Loader.hide(),e.response&&e.response.data&&e.response.data.message?i.default.fire({icon:"error",title:"Failed",text:"".concat(e.response.data.message),timer:1e3}).then((function(){a(e)})).catch((function(){})):a(e)}))}))}}]),e}(),u=s;t.default=u}}]);