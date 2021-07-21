(this["webpackJsonpreact-frontend"]=this["webpackJsonpreact-frontend"]||[]).push([[0],{52:function(t,e,n){},68:function(t,e,n){},69:function(t,e,n){"use strict";n.r(e);var i,a,s,r,c,o,l,u,d,f,j,h,b,O,p,m=n(0),g=n(26),y=n.n(g),x=(n(52),n(4)),v=n(20),w=n(17),S=n(8),k=n(6),E=n(7),T=n(1),N=E.a.div(i||(i=Object(k.a)(["\n    color : white;\n    font-size: 7vw;\n    font-family: 'Mulish', sans-serif;\n    font-weight: 700;\n"]))),P=Object(E.b)(a||(a=Object(k.a)(["\n    0% { width: 0 }\n    20% { width: 0% }\n    30% { width: 100% }\n    70% { width: 100% }\n    80% { width: 0 }\n    100% { width: 0 }\n"]))),C=Object(E.b)(s||(s=Object(k.a)(["\n    from, to { border-color: transparent }\n    50% { border-color: #11FD4C; }\n"]))),L=E.a.div(r||(r=Object(k.a)(["\n    display: inline-block;\n    color : white;\n    font-size: 7vw;\n    font-family: 'Mulish', sans-serif;\n    font-weight: 700;\n\n    overflow: hidden; /* Ensures the content is not revealed until the animation */\n    border-right: .15em solid #11FD4C; /* The typwriter cursor */\n    white-space: nowrap; /* Keeps the content on a single line */\n\n    margin: 0 auto; /* Gives that scrolling effect as the typing happens */\n    animation: \n        "," 5s steps(15, end) infinite,\n        "," .75s step-end infinite;\n"])),P,C),_=E.a.div(c||(c=Object(k.a)(["\n    width: max-content;\n"]))),I=E.a.div(o||(o=Object(k.a)(["\n    margin: 3em;\n"]))),z=E.a.button(l||(l=Object(k.a)(["\n    padding: 1em;\n    margin-top: 1em;\n    margin-left: 50%;\n    transform: translate(-50%);\n\n    font-family: 'Mulish', sans-serif;\n    font-weight: 700;\n    font-size: 3vw;    \n    color: white;\n    \n    border: 7px solid;\n    border-color: white;\n    background-color: black;\n    width: max-content;\n\n    @media screen and (max-width: 500px) {\n        margin-top: 12em;\n    }\n"]))),M=function(t){var e=t.handleLogin,n=Object(m.useState)(0),i=Object(x.a)(n,2),a=i[0],s=i[1],r=["K-means","Mean Shift","Affinity Propagation"];return Object(m.useEffect)((function(){setTimeout((function(){s(a<r.length-1?a+1:0)}),5e3)}),[a]),Object(T.jsxs)(I,{children:[Object(T.jsx)(N,{children:"Find clusters in your Spotify playlists using..."}),Object(T.jsx)(_,{children:Object(T.jsx)(L,{children:r[a]})}),Object(T.jsx)(z,{onClick:e,children:"Login"})]})},D=E.a.div(u||(u=Object(k.a)(["\n    display: grid;\n    grid-template-columns: 50% 50%;\n"]))),X=E.a.div(d||(d=Object(k.a)(["\n    padding: 1em;\n    grid-row-start: 1;\n    grid-column-start: 1;\n"]))),K=E.a.img(f||(f=Object(k.a)(["\n    object-fit: cover;\n    width: 100%;\n    max-height: 100%;\n    margin-left: 50%;\n    transform: translate(-50%);\n    padding: 2vw 6vw;\n    @media screen and (min-width: 1025px) {\n        padding: 2vw 12vw;\n    }\n"]))),Y=E.a.div(j||(j=Object(k.a)(["\n    grid-row-start: 1;\n    grid-column-start: 2;\n    position: sticky;\n    top: 0;\n    height: 100vh;\n    padding: calc(1em + 2vh);\n    color: white;\n"]))),F=E.a.div(h||(h=Object(k.a)(["\n    font-family: 'Mulish', sans-serif;\n    font-weight: 700;\n    font-size: 4vw;    \n    color: white;\n"]))),J=E.a.div(b||(b=Object(k.a)(["\n    margin: 2vw 0;\n\n    font-family: 'Mulish', sans-serif;\n    font-style: italic;\n    font-weight: 300;\n    font-size: 2vw;    \n    color: white;\n"]))),B=E.a.div(O||(O=Object(k.a)(["\n    font-family: 'Mulish', sans-serif;\n    font-weight: 300;\n    font-size: 2vw;    \n    color: white;\n"]))),Z=E.a.button(p||(p=Object(k.a)(["\n    padding: 1em;\n    margin-top: 5em;\n\n    font-family: 'Mulish', sans-serif;\n    font-weight: 700;\n    font-size: 2vw;\n    color: white;\n    \n    border: 7px solid;\n    border-color: white;\n    background-color: black;\n    width: max-content;\n"]))),A=function(t){var e=t.images,n=t.selectPlaylist,i=t.userInfo,a=t.titles,s=t.artists,r=t.features,c=t.TSNEfeatures,o=t.playlistList,l=t.selectedPlaylist,u=t.setSelectPlaylistId;var d={dataPointLabels:s.map((function(t,e){return"".concat(t," - ").concat(a[e])})),TSNE_features:c,features:r},f=Object(S.g)();return Object(T.jsxs)(D,{children:[Object(T.jsx)(X,{children:e.map((function(t,e){return Object(T.jsx)(K,{src:t,alt:"Playlist cover",onClick:function(){n(o.map((function(t){return t.id}))[e]),u(o.map((function(t){return t.id}))[e])}},e)}))}),Object(T.jsxs)(Y,{children:[Object(T.jsxs)(F,{children:["Hi, ",i.display_name]}),Object(T.jsx)(J,{children:"Click on a playlist cover to fetch its data"}),a.length>0&&Object(T.jsxs)("div",{children:[Object(T.jsxs)(B,{children:["No. of songs: ",a.length]}),Object(T.jsxs)(B,{children:["No. of artists: ",s.filter((function(t,e,n){return n.indexOf(t)===e})).length]}),c.length>0&&Object(T.jsx)(Z,{onClick:function(){f.push({pathname:"playlists/".concat(l),data:d})},children:"Plot"})]})]})]})},H=function(t){var e=t.authenticated,n=t.userInfo,i=t.playlistList,a=t.selectPlaylist,s=t.titles,r=t.features,c=t.TSNEfeatures,o=t.ids,l=t.artists,u=t.selectedPlaylist,d=t.setSelectPlaylistId,f=t.getLabels,j=i.map((function(t){return t.images[0].url}));return e?Object(T.jsx)(A,{images:j,selectPlaylist:a,userInfo:n,titles:s,artists:l,features:r,ids:o,playlistList:i,selectedPlaylist:u,setSelectPlaylistId:d,TSNEfeatures:c,getLabels:f}):Object(T.jsx)(S.a,{to:"/login"})},U=n(47),G=n.n(U);function W(){var t=window;return{width:t.innerWidth,height:t.innerHeight}}var q,Q,R,V=function(t){var e=t.data,n=t.labels,i=t.Xdim,a=t.Ydim,s=t.Zdim,r=function(){var t=Object(m.useState)(W()),e=Object(x.a)(t,2),n=e[0],i=e[1];return Object(m.useEffect)((function(){function t(){i(W())}return window.addEventListener("resize",t),function(){return window.removeEventListener("resize",t)}}),[]),n}(),c=r.height,o=r.width,l={tick0:0,tickcolor:"#D3D3D3",tickwidth:2,gridcolor:"#D3D3D3",gridwidth:2,zerolinecolor:"#D3D3D3",zerolinewidth:2};return Object(T.jsx)(G.a,{style:{transform:"scale(1.3)"},config:{displayModeBar:!1},data:[{x:i,y:a,z:s,type:"scatter3d",mode:"markers",marker:{color:n,symbol:"circle"},hoverlabel:{bgcolor:"grey"},hoverinfo:"text",text:e.dataPointLabels}],layout:{displayModeBar:!1,margin:{pad:20},width:o,height:c,paper_bgcolor:"black",scene:{aspectmode:"auto",yaxis:l,xaxis:l,zaxis:l}}})},$=n.p+"static/media/loading_animation_v1.2dd379a5.svg",tt=E.a.object(q||(q=Object(k.a)(["\n    height: 15vh;\n    width: 15vh;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%); \n    position: fixed;\n"]))),et=E.a.div(Q||(Q=Object(k.a)(["\n    top: 60%;\n    left: 50%;\n    transform: translate(-50%);\n    font-size: 1.5vh;\n    position: absolute;\n    color: white;\n    font-weight: 700;\n"]))),nt=function(t){var e=t.loadingCaption;return Object(T.jsxs)("div",{children:[Object(T.jsx)(tt,{type:"image/svg+xml",data:$,children:"svg-animation"}),Object(T.jsx)(et,{children:e})]})},it=(n(66),n(41)),at=n(31),st=n(32),rt=E.a.div(R||(R=Object(k.a)(["\n    position: absolute;\n    z-index: 1;\n    background-color: transparent;\n    text-align: center;\n    width: 100%;\n    display: flex;\n    justify-content: space-between;\n    width: 50%;\n    left: 50%;\n    transform: translateX(-50%)\n"]))),ct=function(t){var e=t.getLabels,n=t.labels,i={TSNE1:{array:"TSNE_features",index:0},TSNE2:{array:"TSNE_features",index:1},TSNE3:{array:"TSNE_features",index:2},acousticness:{array:"features",index:0},danceability:{array:"features",index:1},energy:{array:"features",index:2},instrumentalness:{array:"features",index:3},liveness:{array:"features",index:4},loudness:{array:"features",index:5},speechiness:{array:"features",index:6},tempo:{array:"features",index:7},valence:{array:"features",index:8}},a=Object(m.useState)([]),s=Object(x.a)(a,2),r=s[0],c=s[1],o=Object(m.useState)([]),l=Object(x.a)(o,2),u=l[0],d=l[1],f=Object(m.useState)([]),j=Object(x.a)(f,2),h=j[0],b=j[1],O=Object(m.useState)([]),p=Object(x.a)(O,2),g=p[0],y=p[1],v=Object(m.useState)("TSNE1"),w=Object(x.a)(v,2),k=w[0],E=w[1],N=Object(m.useState)("TSNE2"),P=Object(x.a)(N,2),C=P[0],L=P[1],_=Object(m.useState)("TSNE3"),I=Object(x.a)(_,2),z=I[0],M=I[1],D=Object(S.h)();Object(m.useEffect)((function(){c(D.data),d(D.data.TSNE_features.map((function(t){return t[0]}))),b(D.data.TSNE_features.map((function(t){return t[1]}))),y(D.data.TSNE_features.map((function(t){return t[2]})))}),[D.data,r]);var X=function(t){return"X axis"===t?k:"Y axis"===t?C:z};return void 0===r.TSNE_features?Object(T.jsx)(nt,{}):Object(T.jsxs)("div",{children:[Object(T.jsxs)(rt,{children:[["X axis","Y axis","Z axis"].map((function(t,e){return Object(T.jsx)("div",{style:{color:"white"},children:Object(T.jsx)(it.a,{title:X(t),children:Object.entries(i).map((function(e){var n=Object(x.a)(e,2),i=n[0],a=n[1];return Object(T.jsx)("div",{children:Object(T.jsx)(at.a.Item,{eventKey:i,onClick:function(){!function(t,e,n){"X axis"===t?(d(r[e.array].map((function(t){return t[e.index]}))),E(n)):"Y axis"===t?(b(r[e.array].map((function(t){return t[e.index]}))),L(n)):(y(r[e.array].map((function(t){return t[e.index]}))),M(n))}(t,a,i)},children:i})},i)}))})},e)})),Object(T.jsx)(it.a,{title:"Model Selector",children:Object.keys({"K-means":{params:{n_clusters:0}},"Affinity Propagation":{params:{max_iter:5e3,convergence_iter:150}},"Mean Shift":{params:{n_jobs:-1}}}).map((function(t,n){return Object(T.jsx)(st.a,{eventKey:t,onClick:function(){return e(t)},children:t},n)}))})]}),Object(T.jsx)(V,{data:r,labels:n,Xdim:u,Ydim:h,Zdim:g})]})},ot=function(){return Object(T.jsx)("div",{children:"Page not found"})},lt=(n(68),function(t){var e=t.loading,n=t.loadingCaption,i=t.showLoading,a=t.hideLoading,s=Object(m.useState)(!1),r=Object(x.a)(s,2),c=r[0],o=r[1],l=Object(m.useState)([]),u=Object(x.a)(l,2),d=u[0],f=u[1],j=Object(m.useState)({}),h=Object(x.a)(j,2),b=h[0],O=h[1],p=Object(m.useState)([]),g=Object(x.a)(p,2),y=g[0],v=g[1],k=Object(m.useState)([]),E=Object(x.a)(k,2),N=E[0],P=E[1],C=Object(m.useState)([]),L=Object(x.a)(C,2),_=L[0],I=L[1],z=Object(m.useState)(""),D=Object(x.a)(z,2),X=D[0],K=D[1],Y=Object(m.useState)([]),F=Object(x.a)(Y,2),J=F[0],B=F[1],Z=Object(m.useState)([]),A=Object(x.a)(Z,2),U=A[0],G=A[1],W=Object(m.useState)([]),q=Object(x.a)(W,2),Q=q[0],R=q[1];Object(m.useEffect)((function(){fetch("/spotify/is-authenticated").then((function(t){return t.json()})).then((function(t){console.log("authentication status: ".concat(t.status)),o(t.status),a()}))}),[]),Object(m.useEffect)((function(){c&&(fetch("/spotify/playlists").then((function(t){return t.json()})).then((function(t){var e=t.playlists.items.map((function(t){return t.id}));I(e),f(t.playlists.items)})),fetch("/spotify/user-profile").then((function(t){return t.json()})).then((function(t){O(t.user_profile),a()})))}),[c]);var V=function(t){i("Calculating labels..."),fetch("/spotify/get-labels",{method:"POST",headers:{"Content-Type":"application/json",Model:t},body:JSON.stringify(J)}).then((function(t){return t.json()})).then((function(t){a();var e=setInterval((function(){fetch("/spotify/task-result",{method:"POST",headers:{"Content-Type":"application/json",taskId:t}}).then((function(t){return t.json()})).then((function(t){console.log(t),"SUCCESS"===t.state&&(R(t.result),clearInterval(e))}))}),3e3)}))},$=Object(S.i)("/playlists/:id"),tt=$?d.find((function(t){return t.id===Number($.params.id)})):null;return e?Object(T.jsx)(nt,{loadingCaption:n}):Object(T.jsx)("div",{children:Object(T.jsxs)(S.d,{children:[Object(T.jsx)(S.b,{path:"/playlists/:id",children:Object(T.jsx)(ct,{id:tt,getLabels:V,labels:Q})}),Object(T.jsx)(S.b,{path:"/login",children:Object(T.jsx)(M,{handleLogin:function(){return fetch("/spotify/is-authenticated").then((function(t){return t.json()})).then((function(t){t.status||fetch("/spotify/get-auth-url").then((function(t){return t.json()})).then((function(t){o(!0),window.location.replace(t.url)}))}))}})}),Object(T.jsx)(S.b,{path:"/",children:Object(T.jsx)(H,{authenticated:c,userInfo:b,playlistList:d,selectPlaylist:function(t){i("Fetching tracks..."),v([]),P([]),B([]),G([]),I([]),R([]);var e=[];return function t(n){return fetch("/spotify/get-track-ids",{headers:{url:n}}).then((function(t){return t.json()})).then((function(n){if(console.log(n),v((function(t){return[].concat(Object(w.a)(t),Object(w.a)(n.title))})),P((function(t){return[].concat(Object(w.a)(t),Object(w.a)(n.artist))})),B((function(t){return[].concat(Object(w.a)(t),Object(w.a)(n.features))})),I((function(t){return[].concat(Object(w.a)(t),Object(w.a)(n.track_ids))})),e.push(n.features),n.next_url){var i=n.next_url.replace("https://api.spotify.com/v1","");return t(i)}return fetch("/spotify/dimension-reduction-async",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({features:e.flat()})}).then((function(t){return t.json()})).then((function(t){console.log(t);var e=setInterval((function(){fetch("/spotify/task-result",{method:"POST",headers:{"Content-Type":"application/json",taskId:t}}).then((function(t){return t.json()})).then((function(t){console.log(t),"SUCCESS"===t.state&&(G(t.result),clearInterval(e))}))}),3e3)}))}))}("/playlists/".concat(t,"/tracks/?offset=0&limit=100")).then((function(){a()}))},titles:y,artists:N,features:J,TSNEfeatures:U,ids:_,selectedPlaylist:X,setSelectPlaylistId:function(t){K(t)},getLabels:V})}),Object(T.jsx)(S.b,{component:ot})]})})}),ut=function(){var t=Object(m.useState)(!0),e=Object(x.a)(t,2),n=e[0],i=e[1],a=Object(m.useState)(""),s=Object(x.a)(a,2),r=s[0],c=s[1];return Object(T.jsx)(v.a,{children:Object(T.jsx)(lt,{loading:n,loadingCaption:r,showLoading:function(t){i(!0),c(t)},hideLoading:function(){i(!1),c("")}})})};y.a.render(Object(T.jsx)(ut,{}),document.getElementById("root"))}},[[69,1,2]]]);
//# sourceMappingURL=main.19db152f.chunk.js.map