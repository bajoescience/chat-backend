"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[34],{7649:function(e,n,t){var r=t(3978),o=t(184);n.Z=function(e){var n=e.person;return n.avatar?(0,o.jsx)(o.Fragment,{children:(0,o.jsx)(r.Z,{alt:n.firstName,src:n.img})}):(0,o.jsx)(o.Fragment,{children:(0,o.jsx)(r.Z,{sx:{backgroundColor:n.backgroundColor||function(e){var n,t="".concat(e.firstName," ").concat(e.lastName),r=0;for(n=0;n<t.length;n+=1)r=t.charCodeAt(n)+((r<<5)-r);var o="#";for(n=0;n<3;n+=1){o+="00".concat((r>>8*n&255).toString(16)).slice(-2)}return o}(n)},children:function(e){for(var n="".concat(e.firstName," ").concat(e.lastName),t="",r=0;r<n.length;r+=1)0===r?t=t.concat(n[r].toUpperCase()):" "===n[r]&&" "!==n[r+1]&&(t=t.concat(n[r+1].toUpperCase()));return t}(n)})})}},5034:function(e,n,t){t.r(n),t.d(n,{default:function(){return F}});var r=t(2982),o=t(1413),i=t(4165),s=t(5861),a=t(885),c=t(4162),l=t(228),u=t(3811),d=t(8955),f=t(2791),h=t(2773),x=t(1686),g=t(4565),m=t(7649),p=t(184),v=function(e){var n=e.message,t=e.contact;return n.receiver===(null===t||void 0===t?void 0:t.id)?(0,p.jsx)(l.Z,{children:(0,p.jsxs)(l.Z,{sx:{p:2.5,m:2,mb:4,backgroundColor:"purple",color:"aliceblue",float:"right",borderRadius:4,borderBottomRightRadius:0,minWidth:{xs:"10vw",md:"6vw"},maxWidth:{xs:"45vw",sm:"35vw",md:"20vw"},boxShadow:4,position:"relative"},children:[(0,p.jsx)(g.Z,{component:"div",sx:{float:"right"},children:null===n||void 0===n?void 0:n.string}),(0,p.jsx)(g.Z,{fontSize:"10px",position:"absolute",bottom:2,left:10,children:null===n||void 0===n?void 0:n.date})]})}):(0,p.jsxs)(c.Z,{direction:"row",children:[(0,p.jsx)(l.Z,{sx:{marginTop:.5},children:(0,p.jsx)(m.Z,{person:t})}),(0,p.jsxs)(l.Z,{sx:{p:2,m:2,mb:4,backgroundColor:"aliceblue",color:"#555555",float:"left",borderRadius:4,borderTopLeftRadius:0,minWidth:{xs:"10vw",md:"7vw"},maxWidth:{xs:"45vw",sm:"35vw",md:"20vw"},boxShadow:8,position:"relative"},children:[(0,p.jsx)(g.Z,{component:"div",sx:{float:"left"},children:(null===n||void 0===n?void 0:n.string)||"okay"}),(0,p.jsx)(g.Z,{fontSize:"10px",position:"absolute",bottom:1,right:10,children:null===n||void 0===n?void 0:n.date})]})]})},Z=function(e){var n=e.messages,t=e.contact;return(0,p.jsx)(p.Fragment,{children:(0,p.jsx)(c.Z,{direction:"column-reverse",sx:{overflowY:"auto",height:"inherit",position:"relative"},children:(0,r.Z)(n).sort((function(e,n){return-1})).map((function(e){return(0,p.jsx)(v,{contact:t,message:e},e.id)}))})})},j=t(277),b=t(8875),w=t(8254),C=t(4067),k=t(9663),S=(0,j.ZP)(b.Z)((function(e){e.theme;return{"& .MuiInputBase-root":{borderRadius:"70px"},"& .MuiOutlinedInput-root":{backgroundColor:"aliceblue",fontFamily:"sans-serif",color:"black","& fieldset":{borderColor:"aliceblue"},"&:hover fieldset":{borderColor:"aliceblue"},"&.Mui-focused fieldset":{borderColor:"aliceblue"}}}})),y=function(e){return(0,p.jsx)(S,{variant:"outlined",fullWidth:!0,placeholder:"Type a message",value:e.message.string,onChange:e.handleMessageChange,InputProps:{startAdornment:(0,p.jsxs)(w.Z,{position:"start",children:[(0,p.jsx)(C.Z,{fontSize:"large",onClick:function(){e.setToggleEmoji(!e.toggleEmoji)}}),e.toggleEmoji&&e.renderEmoji()]}),endAdornment:(0,p.jsx)(w.Z,{position:"end",children:(0,p.jsxs)(l.Z,{component:"label",children:[(0,p.jsx)(k.Z,{fontSize:"medium"}),(0,p.jsx)("input",{type:"file",hidden:!0,onChange:e.handleFileSubmission})]})})}})},E=t(7689),R=t(1001),F=function(e){var n=(0,f.useState)(!1),t=(0,a.Z)(n,2),g=t[0],m=t[1],v=(0,f.useState)(!1),j=(0,a.Z)(v,2),b=j[0],w=j[1],C=(0,f.useState)({string:"",files:[]}),k=(0,a.Z)(C,2),S=k[0],F=k[1],z=(0,f.useState)([]),M=(0,a.Z)(z,2),T=M[0],N=M[1],W=(0,E.bx)(),A=W.contactState,I=W.userState.user,O=(0,E.UO)().contactId;(0,f.useEffect)((function(){var e=function(){var e=(0,s.Z)((0,i.Z)().mark((function e(){var n,t;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R.Z.getAll();case 2:n=e.sent,t=function(e){return e.sender===I.id&&e.receiver===O||e.receiver===I.id&&e.sender===O},N(n.filter(t));case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[I,O]);var P=A.contacts.find((function(e){return e.id===O})),U=function(e){F((0,o.Z)((0,o.Z)({},S),{},{string:S.string.concat(e.emoji)}))},B=function(){var e=(0,s.Z)((0,i.Z)().mark((function e(n){var t,r;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("keydown"!==n.type){e.next=2;break}return e.abrupt("return");case 2:return t=(0,o.Z)((0,o.Z)({},S),{},{sender:I.id,receiver:O}),e.prev=3,e.next=6,R.Z.create(t);case 6:r=e.sent,N(T.concat(r)),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(3),console.log(e.t0);case 13:F({string:"",files:[]});case 14:case"end":return e.stop()}}),e,null,[[3,10]])})));return function(n){return e.apply(this,arguments)}}();return(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(c.Z,{sx:{backgroundColor:"white",height:{xs:"75vh",md:"100vh"},borderRadius:2,p:2},children:[(0,p.jsx)(l.Z,{sx:{height:"92%",width:"inherit"},children:(0,p.jsx)(Z,{contact:P,messages:T})}),(0,p.jsxs)(c.Z,{height:"8%",direction:"row",spacing:10,children:[(0,p.jsx)(l.Z,{width:600,children:(0,p.jsx)(y,{message:S,renderEmoji:function(){return(0,p.jsx)("span",{children:(0,p.jsx)(d.ZP,{onEmojiClick:U})})},toggleEmoji:g,handleMessageChange:function(e){F((0,o.Z)((0,o.Z)({},S),{},{string:e.target.value}))},setToggleEmoji:m,handleFileSubmission:function(e){var n;F((0,o.Z)((0,o.Z)({},S),{},{string:"files",files:(n=S.files).concat.apply(n,(0,r.Z)(e.target.files))}))}})}),(0,p.jsx)(l.Z,{sx:{borderRadius:10,height:70,width:70,backgroundColor:"lightblue",position:"relative",bottom:8,pl:"10px",pt:"8px"},children:(0,p.jsx)(u.Z,{onClick:B,onMouseOver:b?null:function(e){w(!0),setTimeout((function(){w(!1)}),2e3)},children:b?(0,p.jsx)(h.Z,{fontSize:"large"}):(0,p.jsx)(x.Z,{fontSize:"large"})})})]})]})})}}}]);
//# sourceMappingURL=34.48b7b439.chunk.js.map