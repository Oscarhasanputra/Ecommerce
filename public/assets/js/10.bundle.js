(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{991:function(e,t,a){"use strict";(function(e){var n=a(0);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a(17)),s=n(a(23)),o=n(a(53)),i=a(116),l=a(1),c=a(242),d=a(996),u=a(444),f=a(445),m=n(a(240)),h=n(a(997)),p=n(a(443)),v=function(t){var a=t.photo;return null==a?e.createElement("div",{className:"d-flex skeleton",style:{height:100,width:100}},e.createElement("span",{className:"m-auto title-2"},"Image...")):e.createElement("img",{className:"d-block rounded "+(null==a&&"skeleton"),src:a&&"/assets/"+a,style:{height:100,width:100}})},x=function(t){var a=t.text,n=t.date,r=t.status,s=t.txid;return e.createElement("div",{className:"card p-3 my-3 flex-row"},e.createElement("span",{className:"align-self-start rounded-circle p-3 text-uppercased title-2",style:{backgroundColor:"hsl("+360*Math.random()+","+(25+70*Math.random())+"%,"+(80+10*Math.random())+"%)"}}," ","TX"," "),e.createElement("div",{className:"d-flex flex-column justify-content-center"},e.createElement("div",{className:"font-noto"},a),e.createElement("div",{className:"text-muted"},n)),("Waiting"==r||"Claimed"==r||"Refund"==r)&&e.createElement("a",{href:"https://testnet.bscscan.com/tx/"+s,target:"_blank",className:"align-self-center ms-auto"},e.createElement("i",{className:"material-icons",style:{fontSize:45}},"document_scanner")))};var g=function(){var t=(0,i.useParams)().id,a=(0,i.useNavigate)(),n=(0,c.useSelector)((function(e){return e.ContractReducers.contract})),g=(0,l.useState)({}),w=(0,o.default)(g,2),y=w[0],E=w[1],N=(0,l.useState)({}),b=(0,o.default)(N,2),k=b[0],C=b[1];(0,l.useEffect)((function(){var e=n.wallet,a=n.myContract;n.wallet&&p.default.get("/order/"+t,{params:{user_id:e}}).then((function(t){var n=t.data[0];try{var o=n.orders_details.filter((function(t,a){return null==t.readStatus||t.readStatus.indexOf(e)<0})).map((function(t,a){return{readStatus:"".concat(t.readStatus,",").concat(e),id:t.id}}));o.length>0&&p.default.post("/orderDetail/read",{data:o}).then((function(e){})).catch((function(e){}))}catch(e){console.log(e)}var i=n.product_id;a.productDetail(i).then(function(){var e=(0,s.default)(r.default.mark((function e(t){var n,s,o,i,l,c;return r.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.photo,s=t.name,o=t.owner,i=t.category,e.next=3,a.wallets(o);case 3:l=e.sent,c=l.name?l.name:o,C({photo:n,name:s,owner:o,category:i,price:t.price.toNumber(),seller:c});case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){})),E(n)})).catch((function(e){}))}),[t,n]);var S,L,P,_=function(e){h.default.post("/order/confirm",{id:y.id,status:e}).then((function(e){d.Loader.hide(),a(0)})).catch((function(e){d.Loader.hide(),a(0)}))},B=function(){var e=(0,s.default)(r.default.mark((function e(t){var o;return r.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:o=n.myContract,m.default.fire({title:"Claiming Your Payment Product",text:"Your Payment Fee is About "+t+" BNB",icon:"info",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, Claim to Wallet"}).then(function(){var e=(0,s.default)(r.default.mark((function e(n){var s,i,l,c,u,m;return r.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!n.isConfirmed){e.next=14;break}return s=f.ethers.utils.parseUnits(t.toString(),"ether"),i=s.toString(),d.Loader.show("Initializing Wallet for Confirmation...."),e.next=6,o.withdraw(i);case 6:return l=e.sent,d.Loader.show(" Claim Saldo to your Wallet..."),e.next=10,l.wait();case 10:c=l.gasLimit.toNumber(),u=f.ethers.utils.formatEther(l.gasPrice.toNumber()),m=(c*u).toFixed(8),h.default.post("/order/confirm",{id:y.id,status:"Claimed",gas:m,txid:l.hash}).then((function(e){d.Loader.hide(),a(0)})).catch((function(e){d.Loader.hide(),a(0)}));case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return e.createElement("div",{className:"container-xl p-5"},e.createElement("div",{className:"card rounded-3 shadow-sm p-4"},e.createElement("div",{className:"d-flex flex-row justify-content-between"},e.createElement("div",{className:"title-2"},"No. Order : ",t),e.createElement("div",{className:"title-2 "},"Status : ",y.status)),e.createElement("div",{className:"title-2 my-2"}," ","Invoice No : ",n.wallet,t),e.createElement("div",{className:"d-flex flex-row mt-4"},e.createElement("div",{className:"p-2 rounded order-image"},e.createElement(v,{photo:k.photo})),!k.name&&e.createElement("div",{className:"mx-3 d-flex flex-column justify-content-between",style:{flexGrow:1}},e.createElement("div",{className:"skeleton skeleton-text"}),e.createElement("div",{className:"skeleton skeleton-text"}),e.createElement("div",{className:"skeleton skeleton-text"}),e.createElement("div",{className:"skeleton skeleton-text"})),k.name&&e.createElement("div",{className:"mx-3 d-flex flex-column justify-content-between"},e.createElement("div",{className:"title-2"},k.name),e.createElement("div",null,"Qty : 1",e.createElement("span",{className:"mx-4"}," ","Price : ",e.createElement("span",{className:"d-inline-block"},y.price," "),e.createElement("img",{src:"/assets/images/BNB.png",height:"30"}))),e.createElement("div",null,"Email Buyer :"," ",e.createElement("span",{className:"d-inline-block"},y.email)),e.createElement("div",{className:"font-nato d-flex"},e.createElement("span",{className:"material-icons align-self-center me-1 text-primary"},"account_circle")," ",k.seller&&k.seller.name?k.seller.name:k.seller,e.createElement("span",{className:"material-icons align-self-center ms-5 me-1 text-danger"},"favorite")," ",y.product&&y.product.rating))),e.createElement("div",{className:"my-3"},e.createElement("div",{className:"title-2"},"History"),!y.orders_details&&e.createElement("div",{className:"d-flex flex-row justify-content-center"},e.createElement(u.Spinner,{animation:"border",variant:"primary",size:"lg"})),y.orders_details&&(y.orders_details?y.orders_details:[]).map((function(t,a){var n=t.status,r=t.txid,s="Waiting"==n?"Succesfully sent the Order to Seller":"Confirmation"==n?"Confirmed the Order and has sent Email to "+y.email+"by Seller":"Finished"==n?"Order Successfully Accepted by buyer and Payment has been paid":"Refund"==n?"Refund Payment by Buyer":"Payment Fee has been Claimed by Seller";return e.createElement(x,{key:a,text:s,date:t.createdAt,status:n,txid:r})}))),"Waiting"==y.status&&y.seller_id==n.wallet&&e.createElement("div",{className:"d-flex flex-row align-self-end btn btn-primary",onClick:function(){return _("Confirmation")}},"Confirmation"),"Confirmation"==y.status&&y.buyer_id==n.wallet&&e.createElement("div",{className:"d-flex flex-row align-self-end btn btn-primary",onClick:function(){return _("Finished")}},"Give Feedback"),"Finished"==y.status&&y.seller_id==n.wallet&&e.createElement("div",{className:"d-flex flex-row align-self-end btn btn-primary",onClick:function(){return B(y.price)}},"Claim"),"Waiting"==y.status&&(S=y.createdAt,L=new Date(S),P=new Date,Math.round(Math.abs((L-P)/864e5))>=3)&&y.buyer_id==n.wallet&&e.createElement("button",{className:"btn btn-success d-flex flex-row align-self-end ",onClick:function(){return e=y.price,t=n.myContract,void m.default.fire({title:"Refund Your Payment Product",text:"Your Payment Fee is About "+e+" BNB",icon:"info",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, Refund to Wallet"}).then(function(){var n=(0,s.default)(r.default.mark((function n(s){var o,i,l,c,u,m;return r.default.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!s.isConfirmed){n.next=20;break}return o=f.ethers.utils.parseUnits(e.toString(),"ether"),i=o.toString(),n.prev=3,d.Loader.show("Initializing Wallet for Confirmation...."),n.next=7,t.refund(y.seller_id,i);case 7:return l=n.sent,d.Loader.show("Refund Saldo to your Wallet..."),n.next=11,l.wait();case 11:c=l.gasLimit.toNumber(),u=f.ethers.utils.formatEther(l.gasPrice.toNumber()),m=(c*u).toFixed(8),h.default.post("/order/confirm",{id:y.id,status:"Refund",gas:m,txid:l.hash}).then((function(e){d.Loader.hide(),a(0)})).catch((function(e){d.Loader.hide(),a(0)})),n.next=20;break;case 17:n.prev=17,n.t0=n.catch(3),console.log(n.t0);case 20:case"end":return n.stop()}}),n,null,[[3,17]])})));return function(e){return n.apply(this,arguments)}}());var e,t}},"Refund")))};t.default=g}).call(this,a(1))},996:function(e,t,a){"use strict";var n=a(0);Object.defineProperty(t,"__esModule",{value:!0}),t.Loader=void 0;var r=n(a(241)),s={show:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;e?(0,r.default)("#loaderText").text(e):(0,r.default)("#loaderText").text("Please Wait..."),(0,r.default)("#loader").removeClass("d-none")},hide:function(){(0,r.default)("#loader").addClass("d-none")}};t.Loader=s},997:function(e,t,a){"use strict";var n=a(0);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a(8)),s=n(a(9)),o=n(a(443)),i=n(a(240)),l=a(996),c=function(){function e(){(0,r.default)(this,e)}return(0,s.default)(e,null,[{key:"get",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise((function(a,n){o.default.get(e,{params:t}).then((function(e){a(e.data)})).catch((function(e){n(e)}))}))}},{key:"post",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise((function(a,n){l.Loader.show(),o.default.post(e,t).then((function(e){var t=e.data;l.Loader.hide(),t&&t.message?i.default.fire({icon:"success",title:"Success",text:"".concat(t.message),timer:1e3}).then((function(){a(t)})).catch((function(e){})):a(t)})).catch((function(e){console.log("hiding"),l.Loader.hide(),e.response&&e.response.data&&e.response.data.message?i.default.fire({icon:"error",title:"Failed",text:"".concat(e.response.data.message),timer:1e3}).then((function(){console.log("hiding"),n(e)})):n(e)}))}))}},{key:"put",value:function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return new Promise((function(n,r){l.Loader.show(),o.default.put("".concat(e,"/").concat(t),a).then((function(e){var t=e.data;l.Loader.hide(),t&&t.message?i.default.fire({icon:"success",title:"Success",text:"".concat(t.message),timer:1e3}).then((function(){n(t)})).catch((function(e){})):n(t)})).catch((function(e){l.Loader.hide(),e.response&&e.response.data&&e.response.data.message?i.default.fire({icon:"error",title:"Failed",text:"".concat(e.response.data.message),timer:1e3}).then((function(){r(e)})):r(e)}))}))}},{key:"delete",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise((function(a,n){l.Loader.show(),o.default.delete("".concat(e),t).then((function(e){var t=e.data;l.Loader.hide(),t.message?i.default.fire({icon:"success",title:"Success",text:"".concat(t.message),timer:1e3}).then((function(){a(t)})).catch((function(e){})):a(t)})).catch((function(e){l.Loader.hide(),e.response&&e.response.data&&e.response.data.message?i.default.fire({icon:"error",title:"Failed",text:"".concat(e.response.data.message),timer:1e3}).then((function(){n(e)})).catch((function(){})):n(e)}))}))}}]),e}(),d=c;t.default=d}}]);