(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{986:function(e,t,n){"use strict";(function(e){var a=n(0);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=a(n(17)),r=a(n(54)),o=a(n(23)),l=a(n(53)),s=n(116),i=n(1),d=n(242),u=n(444),m=a(n(997)),f=function(t){var n=t.photo;return null==n?e.createElement("div",{className:"d-flex skeleton w-100",style:{height:150}},e.createElement("span",{className:"m-auto title-2"},"Loading Image....")):e.createElement("img",{className:"rounded "+(null==n&&"skeleton"),src:n&&"/assets/"+n})},v=function(t){var n=t.product,a=(0,s.useNavigate)(),c=(0,d.useSelector)((function(e){return e.ContractReducers}));return e.createElement("div",{className:"col-11 col-sm-5 mx-4 col-md-3 mb-5 rounded shadow-4 p-0 image-card d-flex flex-column justify-content-between"},e.createElement(f,{photo:n.photo}),e.createElement("div",{className:"d-flex flex-row p-3 justify-content-between"},e.createElement("div",{className:"d-flex flex-column"},e.createElement("div",{className:"title-2 text-line-1"},n.owner),e.createElement("div",{className:"font-roboto text-line-3"},n.name)),e.createElement("div",{className:"d-flex ms-1 flex-column text-end"},e.createElement("div",{className:"font-roboto"},"Price"),e.createElement("div",{className:"font-noto fw-bold d-flex flex-row "+(0==c.price&&"skeleton")},0!=c.price&&(n.price/c.price).toFixed(6),0!=c.price&&e.createElement("img",{src:"/assets/images/BNB.png",style:{height:30}})))),e.createElement("div",{className:"px-3 py-2 font-noto fw-bold d-flex justify-content-center flex-row",style:{color:"#018AD7",cursor:"pointer"},onClick:function(){return e="/item/"+n.id,void a(e);var e}},e.createElement("span",{className:"material-icons align-self-center"},"visibility"),"See More"))};var p=function(t){(0,s.useNavigate)();var n=(0,i.useState)([]),a=(0,l.default)(n,2),f=a[0],p=a[1],h=(0,d.useSelector)((function(e){return e.ContractReducers.contract.myContract}));return(0,i.useEffect)((function(){var e=function(){var e=(0,o.default)(c.default.mark((function e(){var t,n;return c.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,m.default.get("/products");case 3:t=e.sent,n=t.slice(0,6),p(n),h&&n.map(function(){var e=(0,o.default)(c.default.mark((function e(t,a){var o,l,s,i;return c.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(t.id),e.next=3,h.productDetail(t.id);case 3:o=e.sent,o.id,o.name,l=o.owner,s=o.photo,i=o.price,t.price=i.toNumber(),t.photo=s,t.owner=l,t.name=t.name,p((0,r.default)(n));case 10:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()),e.next=11;break;case 9:e.prev=9,e.t0=e.catch(0);case 11:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}}();e()}),[h]),e.createElement("div",{className:"container-xl p-5"},e.createElement("div",{className:"d-flex flex-row overflow-scroll py-5"},e.createElement(s.Link,{to:"/sell",style:{textDecoration:"none",color:"inherit"},className:"marketplace-card d-flex flex-column px-5"},e.createElement("div",{className:"d-block text-center"},e.createElement("object",{width:"50",height:"50",data:"/assets/images//selling.svg"})),e.createElement("div",{className:"text-center title-2"}," Selling Item"),e.createElement("div",{className:"text-center"},"Feel free register your own products and publiced it to everyone")),e.createElement(s.Link,{to:"/profile",style:{textDecoration:"none",color:"inherit"},className:"marketplace-card d-flex flex-column px-5"},e.createElement("div",{className:"d-block text-center"},e.createElement("object",{width:"50",height:"50",data:"/assets/images//history.svg"})),e.createElement("div",{className:"text-center title-2"},"Watch Your Histories"),e.createElement("div",{className:"text-center"},"Lookup Your Activities Chronologically")),e.createElement(s.Link,{to:"/market",style:{textDecoration:"none",color:"inherit"},className:"marketplace-card d-flex flex-column"},e.createElement("div",{className:"d-block text-center"},e.createElement("object",{width:"50",height:"50",data:"/assets/images//market.svg"})),e.createElement("div",{className:"text-center title-2"},"Market Place"),e.createElement("div",{className:"text-center"},"See what you like, then owned it"))),e.createElement("h1",{className:"mt-5 title-1"}," Recently Added "),e.createElement("hr",{className:"mb-5 mt-0"}),e.createElement("div",{className:"row gx-5 justify-content-center justify-content-sm-between"},f.map((function(t,n){return e.createElement(v,{key:t.id,product:t})}))),f.length<=0&&e.createElement(u.Spinner,{animation:"border",size:"lg",variant:"primary"}),e.createElement(s.Link,{to:"/market",className:"d-block text-center title-1",style:{fontSize:25,color:"#030083",textDecoration:"none"}}," ","View More"))};t.default=p}).call(this,n(1))},996:function(e,t,n){"use strict";var a=n(0);Object.defineProperty(t,"__esModule",{value:!0}),t.Loader=void 0;var c=a(n(241)),r={show:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;e?(0,c.default)("#loaderText").text(e):(0,c.default)("#loaderText").text("Please Wait..."),(0,c.default)("#loader").removeClass("d-none")},hide:function(){(0,c.default)("#loader").addClass("d-none")}};t.Loader=r},997:function(e,t,n){"use strict";var a=n(0);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=a(n(8)),r=a(n(9)),o=a(n(443)),l=a(n(240)),s=n(996),i=function(){function e(){(0,c.default)(this,e)}return(0,r.default)(e,null,[{key:"get",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise((function(n,a){o.default.get(e,{params:t}).then((function(e){n(e.data)})).catch((function(e){a(e)}))}))}},{key:"post",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise((function(n,a){s.Loader.show(),o.default.post(e,t).then((function(e){var t=e.data;s.Loader.hide(),t&&t.message?l.default.fire({icon:"success",title:"Success",text:"".concat(t.message),timer:1e3}).then((function(){n(t)})).catch((function(e){})):n(t)})).catch((function(e){console.log("hiding"),s.Loader.hide(),e.response&&e.response.data&&e.response.data.message?l.default.fire({icon:"error",title:"Failed",text:"".concat(e.response.data.message),timer:1e3}).then((function(){console.log("hiding"),a(e)})):a(e)}))}))}},{key:"put",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return new Promise((function(a,c){s.Loader.show(),o.default.put("".concat(e,"/").concat(t),n).then((function(e){var t=e.data;s.Loader.hide(),t&&t.message?l.default.fire({icon:"success",title:"Success",text:"".concat(t.message),timer:1e3}).then((function(){a(t)})).catch((function(e){})):a(t)})).catch((function(e){s.Loader.hide(),e.response&&e.response.data&&e.response.data.message?l.default.fire({icon:"error",title:"Failed",text:"".concat(e.response.data.message),timer:1e3}).then((function(){c(e)})):c(e)}))}))}},{key:"delete",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise((function(n,a){s.Loader.show(),o.default.delete("".concat(e),t).then((function(e){var t=e.data;s.Loader.hide(),t.message?l.default.fire({icon:"success",title:"Success",text:"".concat(t.message),timer:1e3}).then((function(){n(t)})).catch((function(e){})):n(t)})).catch((function(e){s.Loader.hide(),e.response&&e.response.data&&e.response.data.message?l.default.fire({icon:"error",title:"Failed",text:"".concat(e.response.data.message),timer:1e3}).then((function(){a(e)})).catch((function(){})):a(e)}))}))}}]),e}(),d=i;t.default=d}}]);