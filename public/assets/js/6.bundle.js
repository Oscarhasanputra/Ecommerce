(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{1002:function(e,t,a){"use strict";var n=a(0);Object.defineProperty(t,"__esModule",{value:!0}),t.validate=void 0;var r=n(a(241)),o=n(a(240));t.validate=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=e||".required",a=(0,r.default)(t),n=0;n<a.length;n++){var i=a[n],l=i.value;if(""==l||null==l)return o.default.fire({title:"Your "+i.title+" Still Empty",icon:"error",timer:500}),!1}return!0}},993:function(e,t,a){"use strict";(function(e){var n=a(0);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a(17)),o=n(a(91)),i=n(a(23)),l=n(a(53)),c=a(1),s=n(a(998)),u=(n(a(241)),a(242)),f=a(1002),d=a(117),m=n(a(240)),p=a(997);function v(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function h(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?v(Object(a),!0).forEach((function(t){(0,o.default)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):v(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var g=function(){var t=(0,c.useState)({name:"",email:"",profesi:""}),a=(0,l.default)(t,2),n=a[0],o=a[1],v=(0,u.useSelector)((function(e){return e.ContractReducers.contract.myContract})),g=(0,u.useSelector)((function(e){return e.ContractReducers.contract.wallet})),b=(0,d.useNavigate)(),y=(0,c.useState)(null),w=(0,l.default)(y,2),E=w[0],x=w[1],O=(0,c.useState)(null),N=(0,l.default)(O,2),P=(N[0],N[1],(0,c.createRef)());(0,c.useEffect)((function(){var e=function(){var e=(0,i.default)(r.default.mark((function e(){var t,a,n,i,l;return r.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.wallets(g);case 2:t=e.sent,a=t.email,n=t.name,i=t.photo,l=t.profesi,o({email:a,name:n,photo:i,profesi:l});case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();g?e():(alert("Login Metamask First!"),b("/"))}),[]);var j=function(e){if(e.type.match(/image\/*/)){var t=new FileReader;t.onload=function(t){x(e),o(h(h({},n),{},{photo:t.target.result}))},t.readAsDataURL(e)}};return e.createElement("div",{className:"container-xl p-5"},e.createElement("div",{className:"d-flex flex-column my-2"},e.createElement("div",{className:"btn-overlay-bottom align-self-center"},e.createElement("input",{title:"File Image",className:"file-dropped-area",accept:"image/*",id:"fileupload",ref:P,src:E,onChange:function(e){var t=e.target.files[0];j(t)},type:"file",onDragOver:function(e){return!1},onDragEnd:function(e){return!1},onDrop:function(e){e.preventDefault();var t=e.dataTransfer.files[0];j(t)}}),e.createElement("img",{className:"img-card-circle align-self-center",src:n.photo?n.photo:"/assets/images/profilTest.png"}),e.createElement("span",{className:"bg-success d-inline",onClick:function(e){P.current.click()}},e.createElement("i",{className:"material-icons align-self-center p-3",style:{cursor:"pointer"}},"add_a_photo"))),e.createElement("div",{className:"width-responsive align-self-center"},e.createElement("div",{className:"mb-3 "},e.createElement("label",{htmlFor:"exampleInputEmail1",className:"form-label"},"Username"),e.createElement("input",{type:"text",className:"form-control required",title:"Username",value:n.name,onChange:function(e){return o(h(h({},n),{},{name:e.target.value}))}})),e.createElement("div",{className:"mb-3"},e.createElement("label",{htmlFor:"exampleInputEmail1",className:"form-label"},"Email Address"),e.createElement("input",{type:"email",value:n.email,title:"Email Address",className:"form-control required",onChange:function(e){return o(h(h({},n),{},{email:e.target.value}))}})),e.createElement("div",{className:"mb-3"},e.createElement("label",{htmlFor:"exampleInputEmail1",className:"form-label"},"Job Status"),e.createElement("input",{type:"text",className:"form-control required",title:"Job Status",value:n.profesi,onChange:function(e){return o(h(h({},n),{},{profesi:e.target.value}))}})),e.createElement("div",{className:"d-flex flex-row justify-content-end"},e.createElement("span",{className:"btn btn-primary",onClick:function(){var e=new FormData;if(e.append("file",E),(0,f.validate)()){if(!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(n.email))return void m.default.fire({title:"Invalid Format Email",text:"Please Fill Email Correctly",icon:"error",timer:1e3});if(!E)return void m.default.fire({title:"Your Image Still Empty",text:"Please Upload an Image of Yours First!",icon:"error",timer:1e3});s.default.post("/user/upload",e).then(function(){var e=(0,i.default)(r.default.mark((function e(t){var a,o;return r.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.images,p.Loader.show("Initializing Wallet for Confirmation...."),e.next=4,v.registerAccount(n.name,a,n.email,n.profesi);case 4:return o=e.sent,p.Loader.show("Updating Data Profil to Blockchain...."),e.next=8,o.wait();case 8:b(0);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){b(0)}))}}},"Save Changes")))))};t.default=g}).call(this,a(1))},997:function(e,t,a){"use strict";var n=a(0);Object.defineProperty(t,"__esModule",{value:!0}),t.Loader=void 0;var r=n(a(241)),o={show:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;e?(0,r.default)("#loaderText").text(e):(0,r.default)("#loaderText").text("Please Wait..."),(0,r.default)("#loader").removeClass("d-none")},hide:function(){(0,r.default)("#loader").addClass("d-none")}};t.Loader=o},998:function(e,t,a){"use strict";var n=a(0);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a(8)),o=n(a(9)),i=n(a(443)),l=n(a(240)),c=a(997),s=function(){function e(){(0,r.default)(this,e)}return(0,o.default)(e,null,[{key:"get",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise((function(a,n){i.default.get(e,{params:t}).then((function(e){a(e.data)})).catch((function(e){n(e)}))}))}},{key:"post",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise((function(a,n){c.Loader.show(),i.default.post(e,t).then((function(e){var t=e.data;c.Loader.hide(),t&&t.message?l.default.fire({icon:"success",title:"Success",text:"".concat(t.message),timer:1e3}).then((function(){a(t)})).catch((function(e){})):a(t)})).catch((function(e){c.Loader.hide(),e.response&&e.response.data&&e.response.data.message?l.default.fire({icon:"error",title:"Failed",text:"".concat(e.response.data.message),timer:1e3}).then((function(){n(e)})):n(e)}))}))}},{key:"put",value:function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return new Promise((function(n,r){c.Loader.show(),i.default.put("".concat(e,"/").concat(t),a).then((function(e){var t=e.data;c.Loader.hide(),t&&t.message?l.default.fire({icon:"success",title:"Success",text:"".concat(t.message),timer:1e3}).then((function(){n(t)})).catch((function(e){})):n(t)})).catch((function(e){c.Loader.hide(),e.response&&e.response.data&&e.response.data.message?l.default.fire({icon:"error",title:"Failed",text:"".concat(e.response.data.message),timer:1e3}).then((function(){r(e)})):r(e)}))}))}},{key:"delete",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise((function(a,n){c.Loader.show(),i.default.delete("".concat(e),t).then((function(e){var t=e.data;c.Loader.hide(),t.message?l.default.fire({icon:"success",title:"Success",text:"".concat(t.message),timer:1e3}).then((function(){a(t)})).catch((function(e){})):a(t)})).catch((function(e){c.Loader.hide(),e.response&&e.response.data&&e.response.data.message?l.default.fire({icon:"error",title:"Failed",text:"".concat(e.response.data.message),timer:1e3}).then((function(){n(e)})).catch((function(){})):n(e)}))}))}}]),e}(),u=s;t.default=u}}]);