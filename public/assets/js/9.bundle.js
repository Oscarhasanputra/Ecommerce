(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{589:function(e,t,n){"use strict";(function(e){var a=n(1);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n(21)),o=a(n(84)),c=a(n(301)),l=a(n(171)),s=a(n(64)),i=n(0),u=n(302),d=n(111),f=n(83),m=n(303),p=a(n(599)),h=n(304);function v(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function g(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?v(Object(n),!0).forEach((function(t){(0,l.default)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):v(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var w=function(t){var n=t.photo,a=t.productID,r=(0,f.useNavigate)();return null==n?e.createElement("div",{className:"d-flex skeleton w-100",style:{height:250}},e.createElement("span",{className:"m-auto title-2"},"Loading Image....")):e.createElement("img",{className:"d-block rounded "+(null==n&&"skeleton"),src:n&&"/assets/"+n,style:{height:250},onClick:function(){r("/item/"+a)}})},E=function(t){var n=t.showModal,a=t.product,o=(0,f.useNavigate)(),l=(0,i.useState)(""),u=(0,s.default)(l,2),v=(u[0],u[1],(0,i.useState)(a)),E=(0,s.default)(v,2),y=E[0],N=E[1],b=(0,d.useDispatch)(),x=(0,d.useSelector)((function(e){return e.ContractReducers.contract.wallet})),k=(0,d.useSelector)((function(e){return e.ContractReducers.contract.profil})),C=(0,d.useSelector)((function(e){return e.ContractReducers}));(0,i.useEffect)((function(){}),[]);return e.createElement("div",{className:"col-10 mx-2 mx-md-4 col-sm-5 col-md-3 mb-5 rounded shadow-4 p-0 image-card"},e.createElement(w,{photo:y.photo,productID:y.id}),e.createElement("div",{className:"d-flex flex-column p-3"},e.createElement("div",{className:"font-roboto text-line-3 title-barlow-1"},y.name," "),e.createElement("div",{className:"d-flex flex-row justify-content-between"},e.createElement("div",{className:"font-noto fw-bold title-noto-2"},(y.price/C.price).toFixed(6)," ",e.createElement("img",{src:"/assets/images/BNB.png",style:{height:30}})),e.createElement("div",{className:"title-noto-2",style:{fontSize:18}},y.category)),e.createElement("div",{className:"d-flex flex-row mt-4"},e.createElement("i",{className:"material-icons"},"person"),e.createElement("div",{className:"title-barlow-2 fw-bold text-line-1"},y.owner))),e.createElement("div",{className:"px-3 py-2 d-flex justify-content-between flex-row"},x&&k.name&&e.createElement("div",{className:"font-noto fw-bold",style:{color:"#018AD7",cursor:"pointer"},onClick:function(){return n(y)}},"Add To Cart"),x&&!k.name&&e.createElement("div",{className:"font-noto fw-bold",style:{color:"#018AD7",cursor:"pointer"},onClick:function(){return o("/profile/edit")}},"Update Profil"),!x&&e.createElement("div",{className:"font-noto fw-bold",style:{color:"#018AD7",cursor:"pointer"},onClick:function(){(0,h.ConnectBlockchain)(!0).then(function(){var e=(0,c.default)(r.default.mark((function e(t){var n,a;return r.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return b({type:"update",contract:t}),localStorage.setItem("login","true"),e.next=4,t.provider.getBalance(t.wallet);case 4:n=e.sent,a=m.ethers.utils.formatEther(n.toString()),b({type:"balance",price:a});case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){}))}},"Connect Wallet"),e.createElement("div",{className:"d-flex ",style:{cursor:"pointer"},onClick:function(){p.default.post("/product/"+a.id).then((function(e){y.rating+=1,N(g({},y))})).catch((function(e){}))}},e.createElement("span",{className:"material-icons"},"favorite_border"),e.createElement("span",{className:"font-roboto"}," ",y.rating," "))))},y=function(t){var n=t.showModal,a=t.product,o=(0,f.useNavigate)(),l=(0,i.useState)(""),u=(0,s.default)(l,2),v=(u[0],u[1],(0,i.useState)(a)),E=(0,s.default)(v,2),y=E[0],N=E[1],b=(0,d.useDispatch)(),x=(0,d.useSelector)((function(e){return e.ContractReducers.contract.wallet})),k=(0,d.useSelector)((function(e){return e.ContractReducers.contract.profil})),C=(0,d.useSelector)((function(e){return e.ContractReducers}));(0,i.useEffect)((function(){}),[]);return e.createElement("div",{className:"col-10 mx-2 mx-md-4 col-sm-5 mb-5 rounded shadow-4 p-0 image-card"},e.createElement(w,{photo:y.photo,productID:y.id}),e.createElement("div",{className:"d-flex flex-column p-3 "},e.createElement("div",{className:"font-roboto text-line-3 title-barlow-1"},y.name," "),e.createElement("div",{className:"d-flex flex-row justify-content-between"},e.createElement("div",{className:"font-noto fw-bold title-noto-2"},(y.price/C.price).toFixed(6)," ",e.createElement("img",{src:"/assets/images/BNB.png",style:{height:30}})),e.createElement("div",{className:"title-noto-2",style:{fontSize:18}},y.category)),e.createElement("div",{className:"d-flex flex-row mt-4"},e.createElement("i",{className:"material-icons"},"person"),e.createElement("div",{className:"title-barlow-2 fw-bold text-line-1"},y.owner))),e.createElement("div",{className:"px-3 py-2 d-flex justify-content-between flex-row"},x&&k.name&&e.createElement("div",{className:"font-noto fw-bold",style:{color:"#018AD7",cursor:"pointer"},onClick:function(){return n(y)}},"Add To Cart"),x&&!k.name&&e.createElement("div",{className:"font-noto fw-bold",style:{color:"#018AD7",cursor:"pointer"},onClick:function(){return o("/profile/edit")}},"Update Profil"),!x&&e.createElement("div",{className:"font-noto fw-bold",style:{color:"#018AD7",cursor:"pointer"},onClick:function(){(0,h.ConnectBlockchain)(!0).then(function(){var e=(0,c.default)(r.default.mark((function e(t){var n,a;return r.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return b({type:"update",contract:t}),localStorage.setItem("login","true"),e.next=4,t.provider.getBalance(t.wallet);case 4:n=e.sent,a=m.ethers.utils.formatEther(n.toString()),b({type:"balance",price:a});case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){}))}},"Connect Wallet"),e.createElement("div",{className:"d-flex ",style:{cursor:"pointer"},onClick:function(){p.default.post("/product/"+a.id).then((function(e){y.rating+=1,N(g({},y))})).catch((function(e){}))}},e.createElement("span",{className:"material-icons"},"favorite_border"),e.createElement("span",{className:"font-roboto"}," ",y.rating," "))))};var N=(0,d.connect)((function(e){return{contract:e.ContractReducers.contract.myContract,wallet:e.ContractReducers.contract.wallet,cart:e.CartReducers}}),(function(e){return{add:function(t){return e({type:"add",data:t})},delete:function(t){return e({type:"delete",index:t})},logout:function(){return e({type:"update",date:0})}}}))((function(t){var n=(0,i.useState)(!1),a=(0,s.default)(n,2),l=a[0],d=a[1],m=(0,i.useState)(!1),h=(0,s.default)(m,2),v=(h[0],h[1],(0,i.useState)({})),g=(0,s.default)(v,2),w=g[0],N=g[1],b=(0,i.useState)([]),x=(0,s.default)(b,2),k=x[0],C=x[1],S=(0,i.useState)("id,desc"),O=(0,s.default)(S,2),j=O[0],P=O[1],D=(0,i.useState)(""),M=(0,s.default)(D,2),L=M[0],B=M[1],A=(0,i.useState)(1),R=(0,s.default)(A,2),_=R[0],I=R[1];(0,i.useEffect)((function(){var e=function(){var e=(0,c.default)(r.default.mark((function e(){var n,a;return r.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,[],e.next=4,p.default.get("/products",{owner:t.wallet,filter:j,search:L});case 4:n=e.sent,C(n),t.contract&&(a=t.contract,n.map(function(){var e=(0,c.default)(r.default.mark((function e(t,c){var l,s,i,u,d,f;return r.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.productDetail(t.id);case 2:(l=e.sent)&&(l.productID,s=l.name,i=l.owner,u=l.photo,d=l.price,f=l.category,t.name=s,t.owner=i,t.photo=u,t.category=f,t.price=d.toNumber(),C((0,o.default)(n)));case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}())),e.next=11;break;case 9:e.prev=9,e.t0=e.catch(0);case 11:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}}();e()}),[t.wallet,j,L,t.contract]),(0,f.useNavigate)();var F=function(e){N(e),d(!0)},H=function(){var e=(0,c.default)(r.default.mark((function e(){var n;return r.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.cart,n={product_id:w.id,user_id:t.wallet,owner_id:w.owner},d(!1),p.default.post("/cart",{data:n}).then((function(e){t.add(e.cartItem)})).catch((function(e){t.delete(-1)}));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return e.createElement("div",{className:"container-xl p-5"},e.createElement("input",{type:"text",placeholder:"Search .....",className:"shadow-3 rounded-3 p-3 card-search border-0 col-7",value:L,onChange:function(e){e.preventDefault(),B(e.target.value)}}),e.createElement("select",{className:"shadow-3 rounded-3 p-3 card-search border-0 col-4 ms-5","aria-label":"",value:j,onChange:function(e){P(e.target.value)}},e.createElement("option",{value:"id,desc"},"Newest"),e.createElement("option",{value:"id,asc"},"Oldest"),e.createElement("option",{value:"price,asc"},"Lowest Price"),e.createElement("option",{value:"price,desc"},"Highest Price"),e.createElement("option",{value:"rating,asc"},"Lowest Rating"),e.createElement("option",{value:"rating,desc"},"Highest Rating")),e.createElement("div",{className:"row justify-content-center mt-5"},function(){for(var t=[],n=5*(_-1),a=k.slice(n,n+5),r=Math.floor(a.length/5),o=0;o<r;o++){var c=5*o;t.push(e.createElement(y,{key:a[c].id,product:a[c+0],showModal:F})),t.push(e.createElement(y,{key:a[c+1].id,product:a[c+1],showModal:F})),t.push(e.createElement(E,{key:a[c+2].id,product:a[c+2],showModal:F})),t.push(e.createElement(E,{key:a[c+3].id,product:a[c+3],showModal:F})),t.push(e.createElement(E,{key:a[c+4].id,product:a[c+4],showModal:F}))}for(var l=5*r;l<a.length;l++)t.push(e.createElement(E,{key:a[l].id+l,product:a[l],showModal:F}));return t}(),k.length<=0&&e.createElement(u.Spinner,{animation:"border",size:"lg",variant:"primary"}),k.length>0&&e.createElement("nav",{className:""},e.createElement("ul",{className:"pagination pagination-lg justify-content-center"},function(){var t=Math.ceil(k.length/5),n=[];n.push(e.createElement("li",{onClick:function(){_-1>=1&&I(_-1)},key:"previous",className:"page-item "+(1==_&&"disabled")},e.createElement("span",{className:"page-link"},"Previous")));for(var a=function(t){n.push(e.createElement("li",{onClick:function(){I(t)},className:"page-item "+(t==_&&"active"),key:t},e.createElement("a",{className:"page-link "},t)))},r=_-3>=1?_-3:1;r<=(_+3<=t?_+3:t);r++)a(r);return n.push(e.createElement("li",{onClick:function(){_+1<=t&&I(_+1)},key:"next",className:"page-item "+(_==t&&"disabled")},e.createElement("a",{className:"page-link"},"Next"))),n}()))),e.createElement(u.Modal,{show:l,onHide:function(){return d(!1)},centered:!0},e.createElement(u.Modal.Header,{closeButton:!0},e.createElement(u.Modal.Title,null,'Are You Sure Add "',w.name,'" to Cart?')),e.createElement(u.Modal.Body,null),e.createElement(u.Modal.Footer,null,e.createElement(u.Button,{className:"mx-2",variant:"danger",onClick:function(){return d(!1)}},"Cancel"),e.createElement(u.Button,{variant:"primary",onClick:H},"Add to Cart"))))}));t.default=N}).call(this,n(0))},598:function(e,t,n){"use strict";var a=n(1);Object.defineProperty(t,"__esModule",{value:!0}),t.Loader=void 0;var r=a(n(170)),o={show:function(){(0,r.default)("#loader").removeClass("d-none")},hide:function(){(0,r.default)("#loader").addClass("d-none")}};t.Loader=o},599:function(e,t,n){"use strict";var a=n(1);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n(9)),o=a(n(10)),c=a(n(300)),l=a(n(169)),s=n(598),i=function(){function e(){(0,r.default)(this,e)}return(0,o.default)(e,null,[{key:"get",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise((function(n,a){c.default.get(e,{params:t}).then((function(e){n(e.data)})).catch((function(e){a(e)}))}))}},{key:"post",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise((function(n,a){s.Loader.show(),c.default.post(e,t).then((function(e){var t=e.data;s.Loader.hide(),t&&t.message?l.default.fire({icon:"success",title:"Success",text:"".concat(t.message),timer:1e3}).then((function(){n(t)})).catch((function(e){})):n(t)})).catch((function(e){console.log("hiding"),s.Loader.hide(),e.response&&e.response.data&&e.response.data.message?l.default.fire({icon:"error",title:"Failed",text:"".concat(e.response.data.message),timer:1e3}).then((function(){console.log("hiding"),a(e)})):a(e)}))}))}},{key:"put",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return new Promise((function(a,r){s.Loader.show(),c.default.put("".concat(e,"/").concat(t),n).then((function(e){var t=e.data;s.Loader.hide(),t&&t.message?l.default.fire({icon:"success",title:"Success",text:"".concat(t.message),timer:1e3}).then((function(){a(t)})).catch((function(e){})):a(t)})).catch((function(e){s.Loader.hide(),e.response&&e.response.data&&e.response.data.message?l.default.fire({icon:"error",title:"Failed",text:"".concat(e.response.data.message),timer:1e3}).then((function(){r(e)})):r(e)}))}))}},{key:"delete",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise((function(n,a){s.Loader.show(),c.default.delete("".concat(e),t).then((function(e){var t=e.data;s.Loader.hide(),t.message?l.default.fire({icon:"success",title:"Success",text:"".concat(t.message),timer:1e3}).then((function(){n(t)})).catch((function(e){})):n(t)})).catch((function(e){s.Loader.hide(),e.response&&e.response.data&&e.response.data.message?l.default.fire({icon:"error",title:"Failed",text:"".concat(e.response.data.message),timer:1e3}).then((function(){a(e)})).catch((function(){})):a(e)}))}))}}]),e}(),u=i;t.default=u}}]);