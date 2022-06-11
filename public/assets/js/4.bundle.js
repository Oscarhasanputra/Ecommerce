(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{988:function(e,t,a){"use strict";(function(e){var n=a(0);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a(17)),o=n(a(117)),c=n(a(23)),l=n(a(53)),i=a(1),u=a(116),s=n(a(997)),d=n(a(240)),f=a(996),m=a(242),p=a(998);function v(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function g(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?v(Object(a),!0).forEach((function(t){(0,o.default)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):v(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var h=function(){var t=(0,u.useNavigate)(),a=(0,i.useState)(null),n=(0,l.default)(a,2),o=n[0],v=n[1],h=(0,i.useState)({name:"",description:"",category:"",price:0}),y=(0,l.default)(h,2),b=y[0],P=y[1],E=(0,i.useState)(null),w=(0,l.default)(E,2),x=w[0],N=w[1],O=(0,m.useSelector)((function(e){return e.ContractReducers.contract.myContract})),C=(0,m.useSelector)((function(e){return e.ContractReducers.contract}));(0,i.useEffect)((function(){}),[]);var L=function(e){if(e.type.match(/image\/*/)){var t=new FileReader;t.onload=function(t){N(e),v(t.target.result)},t.readAsDataURL(e)}};return e.createElement("div",{className:"container-xl py-5 px-5"},e.createElement("div",{className:"title-1"}," Create Your Own Product"),e.createElement("div",{className:"title-2 my-2"}," Upload Your Thumbnail Product"),e.createElement("div",{className:"my-2"}," Files Supported Types: JPG, PNG, JPEG."),e.createElement("div",{className:"file-area"},e.createElement("input",{title:"File Image",accept:"image/*",id:"fileupload",required:"required",src:x,onChange:function(e){var t=e.target.files[0];L(t)},type:"file",onDragOver:function(e){return console.log(b.file),!1},onDragEnd:function(e){return!1},onDrop:function(e){e.preventDefault();var t=e.dataTransfer.files[0];L(t)}}),e.createElement("div",{className:"file-dummy"},e.createElement("div",{id:"dummyImage",className:o?"d-none":""},e.createElement("img",{src:"/assets/images//upload-photo.png"}),e.createElement("div",null,"Please Select your image")),e.createElement("div",{id:"resultImage",className:o?"":"d-none"},e.createElement("img",{src:o,style:{width:"100%"}})))),e.createElement("label",{className:"form-label"},"Product Name"),e.createElement("input",{className:"form-control mb-4 w-70 required",type:"text",title:"Product Name",placeholder:"Product Name","aria-label":"default input example",value:b.name,onChange:function(e){var t=g(g({},b),{},{name:e.target.value});P(t)}}),e.createElement("label",{className:"form-label"},"Product Category"),e.createElement("select",{title:"Product Category",value:b.category,onChange:function(e){var t=g(g({},b),{},{category:e.target.value});P(t)},className:"form-select w-70 mb-2 required","aria-label":""},e.createElement("option",{value:""},"Product Category"),e.createElement("option",{value:"E-Book"},"E-Book"),e.createElement("option",{value:"Photo"},"Photo"),e.createElement("option",{value:"Music"},"Music"),e.createElement("option",{value:"Design"},"Design"),e.createElement("option",{value:"Others"},"Others")),e.createElement("label",{className:"form-label"},"Product Price"),e.createElement("div",{className:"row w-70 ms-1 justify-content-between"},e.createElement("div",{className:"col-4 col-md-2 border-1 corner-rounded px-2 py-2 d-flex flex-row justify-content-center",style:{backgroundColor:"#d0d0d9"}},e.createElement("span",{className:"title-2 align-self-center",style:{fontSize:16}},"Rupiah")),e.createElement("input",{type:"number",className:"col-7 col-md-9 ms-1 rounded-3 p-2 card-search border-1 ",title:"Product Price",placeholder:"Price",value:b.price,onChange:function(e){var t=g(g({},b),{},{price:e.target.value});P(t)}})),e.createElement("label",{className:"form-label"},"Product Description"),e.createElement("div",{className:"form-floating w-70 mb-4"},e.createElement("textarea",{className:"form-control required",title:"Product Description",placeholder:"Leave a comment here",id:"floatingTextarea",style:{height:100},onChange:function(e){var t=g(g({},b),{},{description:e.target.value});P(t)}}),e.createElement("label",{htmlFor:"floatingTextarea"},"Description")),e.createElement("button",{className:"py-2 px-5 text-white green btn-rounded",onClick:function(){var e=new FormData;e.append("file",x),x&&(0,p.validate)()&&(f.Loader.show(),s.default.post("/uploadfiles",e).then(function(){var e=(0,c.default)(r.default.mark((function e(a){var n,o,c,l,i,u,m;return r.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=a.images,o=b.name,c=b.description,l=b.category,i=b.price,u=(new Date).getTime(),e.prev=3,f.Loader.show("Initializing Wallet for Confirmation...."),console.log(u),e.next=8,O.addProduct(u.toString(),o,c,i,l,n);case 8:return m=e.sent,console.log("transaction detail"),console.log(m),console.log(m.value.toNumber()),e.next=14,s.default.post("/product",{data:{id:u,name:o,price:i,category:l,owner:C.wallet,txid:m.hash}});case 14:f.Loader.hide(),e.next=21;break;case 17:e.prev=17,e.t0=e.catch(3),f.Loader.hide(),d.default.fire({icon:"error",title:"Failed",text:"Product Upload Failed",timer:1e3}).then((function(){t(0)}));case 21:case"end":return e.stop()}}),e,null,[[3,17]])})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){f.Loader.hide(),d.default.fire({icon:"error",title:"Failed",text:"Product Upload Failed",timer:1e3}),t(0)})))}},"Create"))};t.default=h}).call(this,a(1))},996:function(e,t,a){"use strict";var n=a(0);Object.defineProperty(t,"__esModule",{value:!0}),t.Loader=void 0;var r=n(a(241)),o={show:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;e?(0,r.default)("#loaderText").text(e):(0,r.default)("#loaderText").text("Please Wait..."),(0,r.default)("#loader").removeClass("d-none")},hide:function(){(0,r.default)("#loader").addClass("d-none")}};t.Loader=o},997:function(e,t,a){"use strict";var n=a(0);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a(8)),o=n(a(9)),c=n(a(443)),l=n(a(240)),i=a(996),u=function(){function e(){(0,r.default)(this,e)}return(0,o.default)(e,null,[{key:"get",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise((function(a,n){c.default.get(e,{params:t}).then((function(e){a(e.data)})).catch((function(e){n(e)}))}))}},{key:"post",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise((function(a,n){i.Loader.show(),c.default.post(e,t).then((function(e){var t=e.data;i.Loader.hide(),t&&t.message?l.default.fire({icon:"success",title:"Success",text:"".concat(t.message),timer:1e3}).then((function(){a(t)})).catch((function(e){})):a(t)})).catch((function(e){console.log("hiding"),i.Loader.hide(),e.response&&e.response.data&&e.response.data.message?l.default.fire({icon:"error",title:"Failed",text:"".concat(e.response.data.message),timer:1e3}).then((function(){console.log("hiding"),n(e)})):n(e)}))}))}},{key:"put",value:function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return new Promise((function(n,r){i.Loader.show(),c.default.put("".concat(e,"/").concat(t),a).then((function(e){var t=e.data;i.Loader.hide(),t&&t.message?l.default.fire({icon:"success",title:"Success",text:"".concat(t.message),timer:1e3}).then((function(){n(t)})).catch((function(e){})):n(t)})).catch((function(e){i.Loader.hide(),e.response&&e.response.data&&e.response.data.message?l.default.fire({icon:"error",title:"Failed",text:"".concat(e.response.data.message),timer:1e3}).then((function(){r(e)})):r(e)}))}))}},{key:"delete",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise((function(a,n){i.Loader.show(),c.default.delete("".concat(e),t).then((function(e){var t=e.data;i.Loader.hide(),t.message?l.default.fire({icon:"success",title:"Success",text:"".concat(t.message),timer:1e3}).then((function(){a(t)})).catch((function(e){})):a(t)})).catch((function(e){i.Loader.hide(),e.response&&e.response.data&&e.response.data.message?l.default.fire({icon:"error",title:"Failed",text:"".concat(e.response.data.message),timer:1e3}).then((function(){n(e)})).catch((function(){})):n(e)}))}))}}]),e}(),s=u;t.default=s},998:function(e,t,a){"use strict";var n=a(0);Object.defineProperty(t,"__esModule",{value:!0}),t.validate=void 0;var r=n(a(241)),o=n(a(240));t.validate=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=e||".required",a=(0,r.default)(t),n=0;n<a.length;n++){var c=a[n],l=c.value;if(console.log("validating"),console.log(c),""==l||null==l)return o.default.fire({title:"Your "+c.title+" Still Empty",icon:"error",timer:500}),!1}return!0}}}]);