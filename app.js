(function(){
'use strict';
var PASS_HASH=5622403396775790;
function h53(str,seed){seed=seed||0;var h1=0xdeadbeef^seed,h2=0x41c6ce57^seed;for(var i=0,ch;i<str.length;i++){ch=str.charCodeAt(i);h1=Math.imul(h1^ch,2654435761);h2=Math.imul(h2^ch,1597334677);}h1=Math.imul(h1^(h1>>>16),2246822507)^Math.imul(h2^(h2>>>13),3266489909);h2=Math.imul(h2^(h2>>>16),2246822507)^Math.imul(h1^(h1>>>13),3266489909);return 4294967296*(2097151&h2)+(h1>>>0);}

var $=function(s,r){return (r||document).querySelector(s)};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var esc=function(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
var mk=function(k){return {get:function(x){try{return window[k].getItem(x)}catch(e){return null}},set:function(x,v){try{window[k].setItem(x,v)}catch(e){}},del:function(x){try{window[k].removeItem(x)}catch(e){}}}};
var ls=mk('localStorage'),ss=mk('sessionStorage');

var IMG={h1:'h1.jpg',h2:'h2.jpg',about:'about.jpg'};
var DEFAULT={"v": 1, "rev": 1, "punish": "تیم بازنده در پایان فصل باید برای همه بستنی بخرد 🍦", "players": [{"id": "tg1", "t": "tg", "name": "بازیکن 1"}, {"id": "tg2", "t": "tg", "name": "بازیکن 2"}, {"id": "tg3", "t": "tg", "name": "بازیکن 3"}, {"id": "tg4", "t": "tg", "name": "بازیکن 4"}, {"id": "tg5", "t": "tg", "name": "بازیکن 5"}, {"id": "hs1", "t": "hs", "name": "بازیکن 1"}, {"id": "hs2", "t": "hs", "name": "بازیکن 2"}, {"id": "hs3", "t": "hs", "name": "بازیکن 3"}, {"id": "hs4", "t": "hs", "name": "بازیکن 4"}, {"id": "hs5", "t": "hs", "name": "بازیکن 5"}], "matches": [{"id": "m1", "week": 1, "date": "", "res": null}], "ms": {}, "mvp": {}, "news": []};
var S=JSON.parse(JSON.stringify(DEFAULT));
var TN={tg:'توپ گستران',hs:'سلامت‌جویان'};
var TE={tg:'Toup Gostars',hs:'Health Seekers'};
var PW=ls.get('gl_pw')||'';
var ADMIN=!!PW;
var API=false,STORAGE=true,blockMsg='',dirty=false,saving=false,blocked=false,saveTimer=null;


var UI={tab:'league',stat:'goals',fil:'all',mid:null,rep:'',sec:{res:1,gl:1,as:1,ag:1,mvp:1,rt:1,tb:1,nw:1},scroll:0};
try{var u0=JSON.parse(ss.get('gl_ui')||'{}');for(var k in u0)UI[k]=u0[k];}catch(e){}

/* icons */
var AV='<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="14.5" r="7.4"/><path d="M5 40c0-9.2 6.6-14.6 15-14.6S35 30.8 35 40z"/></svg>';
function av(p){return p&&p.ph?'<img class="ph" alt="" src="'+p.ph+'">':AV}
(function(){var st=document.createElement('style');st.textContent='.ph{width:100%;height:100%;object-fit:cover;display:block}.mini .ph{position:absolute;inset:0}.phb{position:relative;flex:none;width:48px;height:48px;display:block;cursor:pointer}.phb .mini{width:48px;height:48px}.phb .cam{position:absolute;right:-4px;bottom:-4px;width:22px;height:22px;border-radius:50%;background:var(--gold);color:#2a1b00;display:grid;place-items:center;font-size:12px;border:2px solid var(--bg0)}.phb input{display:none}.pl-edit{align-items:center}.mini-bt.rm{color:#ff6b70}';document.head.appendChild(st)})();
function readPoster(file,cb){
  var url=URL.createObjectURL(file),im=new Image();
  im.onload=function(){var MW=900,MH=460,r=Math.min(MW/im.width,MH/im.height,1),w=Math.round(im.width*r),h=Math.round(im.height*r),c=document.createElement('canvas');c.width=w;c.height=h;c.getContext('2d').drawImage(im,0,0,w,h);URL.revokeObjectURL(url);cb(c.toDataURL('image/jpeg',0.82))};
  im.onerror=function(){URL.revokeObjectURL(url);cb(null)};
  im.src=url;
}
function toLocalInput(iso){if(!iso)return '';var d=new Date(iso);if(isNaN(d))return '';var l=new Date(d.getTime()-d.getTimezoneOffset()*60000);return l.toISOString().slice(0,16)}
function fmtCd(ms){ms=Math.max(0,ms);var s=Math.floor(ms/1000),d=Math.floor(s/86400);s-=d*86400;var h=Math.floor(s/3600);s-=h*3600;var mi=Math.floor(s/60);s-=mi*60;var p2=function(n){return (n<10?'0':'')+n};return (d>0?d+' روز و ':'')+p2(h)+':'+p2(mi)+':'+p2(s)}
function nextMatch(){var now=Date.now();return S.matches.filter(function(m){return m.dt&&new Date(m.dt).getTime()>now}).sort(function(a,b){return new Date(a.dt)-new Date(b.dt)})[0]||null}
function readPhoto(file,cb){
  var url=URL.createObjectURL(file),im=new Image();
  im.onload=function(){var s=Math.min(im.width,im.height),sx=(im.width-s)/2,sy=im.height>im.width?(im.height-s)*0.2:(im.height-s)/2,N=160,c=document.createElement('canvas');c.width=c.height=N;c.getContext('2d').drawImage(im,sx,sy,s,s,0,0,N,N);URL.revokeObjectURL(url);cb(c.toDataURL('image/jpeg',0.82))};
  im.onerror=function(){URL.revokeObjectURL(url);cb(null)};
  im.src=url;
}
var BOOT='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 3.5h6.2v5.4c0 1.3 1 2.4 2.3 2.8l6 1.9c1.9.6 3.2 2 3.2 3.9v1.5H3.5z" fill="#fff" stroke="#0b1220" stroke-width="1.1" stroke-linejoin="round"/><path d="M10.6 6.2l2 .8M11.4 8.5l2 .8" stroke="#0b1220" stroke-width="1" stroke-linecap="round"/><path d="M6 19.2v2.3M10.2 19.2v2.3M14.6 19.2v2.3M19 19.2v2.3" stroke="#fff" stroke-width="1.9" stroke-linecap="round"/></svg>';
var BALL='<span>⚽</span>';
var IC={
 league:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3"/></svg>',
 stats:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
 lineup:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 12h18"/><circle cx="12" cy="12" r="2.6"/></svg>',
 news:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h11a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2zM18 9h2a1 1 0 0 1 1 1v8a2 2 0 0 1-3 2M8 8h7M8 12h7M8 16h4"/></svg>',
 report:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4h6v3H9zM9 12h6M9 16h4"/></svg>',
 about:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.01"/></svg>',
 lock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
 unlock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 7.5-2"/></svg>',
 pen:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4"/></svg>',
 chev:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
 chev2:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>'
};
var TABS=[['league','لیگ'],['stats','Stats'],['lineup','Lineup'],['news','News'],['report','گزارش'],['about','About']];
var SLOTS=[{l:'دروازه‌بان',x:50,y:87},{l:'دفاع',x:50,y:65},{l:'بال چپ',x:21,y:43},{l:'بال راست',x:79,y:43},{l:'پیوت',x:50,y:20}];
var STAT_TABS=[['mvp','MVP'],['goals','Goals'],['assists','Assists'],['ag','A/G'],['rating','Gondegan Rating']];

/* helpers */
var uid=function(p){return p+Date.now().toString(36)+Math.floor(Math.random()*1e3).toString(36)};
var f1=function(n){return n==null?'—':(Math.round(n*10)/10).toFixed(1)};
var clamp=function(v,a,b){return Math.max(a,Math.min(b,v))};
var pl=function(id){return S.players.filter(function(p){return p.id===id})[0]};
var tp=function(t){return S.players.filter(function(p){return p.t===t})};
var curM=function(){var m=S.matches.filter(function(x){return x.id===UI.mid})[0];return m||S.matches[S.matches.length-1]||null};
var peek=function(mid,pid){var m=S.ms[mid];return (m&&m[pid])||{r:null,g:0,a:0}};
function rec(mid,pid){if(!S.ms[mid])S.ms[mid]={};if(!S.ms[mid][pid])S.ms[mid][pid]={r:null,g:0,a:0};return S.ms[mid][pid]}
function rcls(r){r=Math.round(r*10)/10;return r<6?'rr':r<7?'ro':r<9?'rg':'rn'}
function rb(r,x){if(r==null)return '';var v=Math.round(r*10)/10;return '<span class="rb '+rcls(v)+' '+(x||'')+'">'+(v>=9?'<i class="star">★</i>':'')+f1(v)+'</span>'}
function reps(n,html,max){if(n<=0)return '';max=max||4;if(n<=max){var s='';for(var i=0;i<n;i++)s+=html;return s}return html+'<span class="cnt">×'+n+'</span>'}

function agg(ms){
  ms=ms||S.matches;var R={};
  S.players.forEach(function(p){R[p.id]={p:p,g:0,a:0,rs:[],mvp:0,avg:null}});
  ms.forEach(function(m){var st=S.ms[m.id]||{};
    for(var id in st){if(!R[id])continue;var s=st[id];R[id].g+=s.g||0;R[id].a+=s.a||0;if(s.r!=null)R[id].rs.push(s.r)}
    if(S.mvp[m.id]&&R[S.mvp[m.id]])R[S.mvp[m.id]].mvp++;
  });
  for(var k in R){var r=R[k];r.avg=r.rs.length?r.rs.reduce(function(a,b){return a+b},0)/r.rs.length:null}
  return R;
}
function tbl(){
  var R={tg:{k:'tg',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},hs:{k:'hs',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0}};
  S.matches.forEach(function(m){if(!m.res)return;var a=m.res.tg,b=m.res.hs;R.tg.p++;R.hs.p++;R.tg.gf+=a;R.tg.ga+=b;R.hs.gf+=b;R.hs.ga+=a;
    if(a>b){R.tg.w++;R.hs.l++;R.tg.pts+=3}else if(a<b){R.hs.w++;R.tg.l++;R.hs.pts+=3}else{R.tg.d++;R.hs.d++;R.tg.pts++;R.hs.pts++}});
  var rows=[R.tg,R.hs];rows.forEach(function(r){r.gd=r.gf-r.ga});
  rows.sort(function(x,y){return y.pts-x.pts||y.gd-x.gd||y.gf-x.gf});
  rows.tie=rows[0].pts===rows[1].pts&&rows[0].gd===rows[1].gd&&rows[0].gf===rows[1].gf;
  rows.R=R;return rows;
}

/* ---------- views ---------- */
function vLeague(){
  var rows=tbl(),R=rows.R;
  var nm=nextMatch(),hero='';
  if(nm&&nm.poster){
    hero='<button class="card glass hero-next has-poster" id="heroNext" data-act="editMatch" data-id="'+nm.id+'" aria-label="ویرایش این بازی"><img class="hn-img" src="'+nm.poster+'" alt=""><span class="hn-chip"><b class="wk">هفته '+nm.week+'</b><span class="cd" id="cdTxt">—</span></span></button>';
  }else if(nm){
    hero='<button class="card glass hero-next" id="heroNext" data-act="editMatch" data-id="'+nm.id+'" aria-label="ویرایش این بازی"><div class="hn-ov"><span class="wk">هفته '+nm.week+'</span><h2>'+TN.tg+' <small>vs</small> '+TN.hs+'</h2><div class="cd" id="cdTxt">—</div></div></button>';
  }
  var adm=ADMIN?'<div class="bar"><button class="btn pri" data-act="newMatch">＋ ثبت نتیجه بازی</button><button class="btn dng" data-act="resetTable">ریست جدول</button></div>':'';
  var trs=rows.map(function(r,i){return '<tr class="'+(i===0&&!rows.tie?'lead':'')+'"><td class="tm"><span class="dot t-'+r.k+'"></span>'+TN[r.k]+'</td><td>'+r.p+'</td><td>'+r.w+'</td><td>'+r.d+'</td><td>'+r.l+'</td><td dir="ltr">'+(r.gd>0?'+':'')+r.gd+'</td><td class="pts">'+r.pts+'</td></tr>'}).join('');
  var ml=S.matches.length?S.matches.slice().sort(function(a,b){return b.week-a.week}).map(function(m){
    var res=m.res?'<span class="r">'+m.res.tg+' : '+m.res.hs+'</span>':'<span class="r na">بازی نشده</span>';
    return '<div class="ml"><span class="wk">هفته '+m.week+'</span><div class="sc"><span class="n tg">'+TN.tg+'</span>'+res+'<span class="n hs">'+TN.hs+'</span></div>'+(ADMIN?'<button class="mini-bt" data-act="editMatch" data-id="'+m.id+'" aria-label="ویرایش">'+IC.pen+'</button>':'')+'</div>';
  }).join(''):'<div class="empty">هنوز بازی‌ای ثبت نشده است.</div>';
  var loser=null,st;
  if(R.tg.p===0||rows.tie){st='هنوز مشخص نیست'}else{loser=rows[1].k;st='در حال حاضر «'+TN[loser]+'» در جایگاه بازنده است'}
  var pun='<div class="card glass pun"><div class="ic">🍦</div><div style="flex:1"><div class="ch" style="margin:0"><h3>مجازات بازنده</h3>'+(ADMIN?'<button class="mini-bt" data-act="editPun" aria-label="ویرایش">'+IC.pen+'</button>':'')+'</div><p>'+esc(S.punish)+'</p><span class="pill">'+st+'</span></div></div>';
  var d=(R.tg.pts-R.hs.pts)*14+(R.tg.gd-R.hs.gd)*1.5,pos=50-clamp(d,-40,40);
  var cap,sub='';
  if(R.tg.p===0||rows.tie){cap='جام هنوز صاحب ندارد';sub='با هر بازی جام به سمت تیم پیشتاز می‌رود'}
  else{cap='جام نزد «'+TN[rows[0].k]+'»';sub='اختلاف امتیاز: '+Math.abs(R.tg.pts-R.hs.pts)+' | تفاضل گل: '+Math.abs(R.tg.gd-R.hs.gd)}
  var cup='<svg viewBox="0 0 48 54" aria-hidden="true"><defs><linearGradient id="cg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe08a"/><stop offset=".55" stop-color="#f0b429"/><stop offset="1" stop-color="#b57a0c"/></linearGradient></defs><path d="M13 9H5c0 9 3.5 14 9 15M35 9h8c0 9-3.5 14-9 15" fill="none" stroke="#e0a82e" stroke-width="3" stroke-linecap="round"/><path d="M12 3h24v15a12 12 0 0 1-24 0z" fill="url(#cg)"/><path d="M24 8l2 4.2 4.6.6-3.3 3.2.8 4.5-4.1-2.2-4.1 2.2.8-4.5-3.3-3.2 4.6-.6z" fill="#fff6d6" opacity=".9"/><rect x="21" y="30" width="6" height="9" fill="#d99a12"/><rect x="14" y="39" width="20" height="6" rx="2" fill="#c98f1c"/><rect x="11" y="45" width="26" height="6" rx="2" fill="#94640c"/></svg>';
  var tro='<div class="card glass trophy"><div class="ch"><h2>جام قهرمانی</h2></div><div class="track"><div class="rail"></div><div class="end a"><i class="dot t-tg"></i><span>'+TN.tg+'</span></div><div class="end b"><i class="dot t-hs"></i><span>'+TN.hs+'</span></div><div class="cup" style="left:'+pos+'%">'+cup+'</div></div><div class="tcap">'+cap+'<small>'+sub+'</small></div></div>';
  return hero+adm+'<div class="card glass"><div class="ch"><h2>جدول لیگ</h2><small>امتیاز: برد ۳ | مساوی ۱</small></div><div class="tw"><table class="lt"><thead><tr><th class="tm">تیم</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GD</th><th>Pts</th></tr></thead><tbody>'+trs+'</tbody></table></div></div>'
    +'<div class="card glass"><div class="ch"><h2>نتایج بازی‌ها</h2></div>'+ml+'</div>'+pun+tro;
}

function statDefs(){
  var A=agg(),L=Object.keys(A).map(function(k){return A[k]});
  var D={
   mvp:{sub:'تعداد دفعاتی که بازیکن، MVP بازی شده',v:function(x){return x.mvp},sort:function(a,b){return b.mvp-a.mvp||(b.avg||0)-(a.avg||0)},show:function(x){return x.mvp+'<small>بار</small>'}},
   goals:{sub:'مجموع گل‌های زده‌شده',v:function(x){return x.g},sort:function(a,b){return b.g-a.g||b.a-a.a},show:function(x){return x.g+'<small>گل</small>'}},
   assists:{sub:'مجموع پاس گل‌ها',v:function(x){return x.a},sort:function(a,b){return b.a-a.a||b.g-a.g},show:function(x){return x.a+'<small>پاس گل</small>'}},
   ag:{sub:'مجموع گل + پاس گل هر بازیکن',v:function(x){return x.g+x.a},sort:function(a,b){return (b.g+b.a)-(a.g+a.a)||b.g-a.g},show:function(x){return (x.g+x.a)+'<small>'+x.g+'G + '+x.a+'A</small>'}},
   rating:{sub:'میانگین نمره‌های ثبت‌شده در بازی‌ها',v:function(x){return x.avg==null?0:x.avg},sort:function(a,b){return (b.avg||0)-(a.avg||0)},show:function(x){return x.avg==null?'—':rb(x.avg)+'<small>'+x.rs.length+' بازی</small>'}}
  };
  return {D:D,L:L};
}
function vStats(){
  var o=statDefs(),D=o.D[UI.stat]||o.D.goals,L=o.L.slice().sort(D.sort);
  var max=Math.max.apply(null,L.map(D.v).concat([UI.stat==='rating'?10:1]));
  var chips='<div class="chips">'+STAT_TABS.map(function(t){return '<button class="chip '+(UI.stat===t[0]?'on':'')+'" data-act="stat" data-v="'+t[0]+'">'+t[1]+'</button>'}).join('')+'</div>';
  var adm=ADMIN?'<div class="bar"><button class="btn pri" data-act="editStats">ویرایش آمار</button><button class="btn dng" data-act="resetStats">ریست آمار</button></div>':'';
  var rows=L.map(function(x,i){var v=D.v(x),c=x.p.t==='tg'?'var(--red)':'var(--blue)';
    return '<div class="lr '+(i===0&&v>0?'top':'')+'"><span class="rk">'+(i+1)+'</span><span class="mini '+x.p.t+'">'+av(x.p)+'</span><div class="lm"><b>'+esc(x.p.name)+(i===0&&v>0&&UI.stat==='mvp'?' 👑':'')+'</b><small>'+TN[x.p.t]+'</small><div class="b"><i style="width:'+(v/max*100)+'%;--c:'+c+'"></i></div></div><div class="lv">'+(v>0||UI.stat==='rating'?D.show(x):'<small>—</small>')+'</div></div>'}).join('');
  var title=STAT_TABS.filter(function(t){return t[0]===UI.stat})[0][1];
  return adm+chips+'<div class="card glass"><div class="ch"><h2>'+title+'</h2></div><small>'+D.sub+'</small><div style="margin-top:6px">'+rows+'</div></div>'
   +(UI.stat==='rating'?legend(true):'');
}
function legend(rOnly){
  var k=function(c,t){return '<span class="k"><i class="sw" style="background:'+c+'"></i>'+t+'</span>'};
  return '<div class="card glass"><h3 style="margin-bottom:2px">راهنمای نمره‌ها</h3><div class="legend">'+k('#e5484d','۱ تا ۵.۹')+k('#f59e0b','۶ تا ۶.۹')+k('#22c55e','۷ تا ۸.۹')+k('#1b2f7a','۹ تا ۱۰ ★')+(rOnly?'':'<span class="k">⚽ گل</span><span class="k">'+BOOT+' پاس گل</span>')+'</div></div>';
}

function matchChips(){
  if(!S.matches.length)return '';
  var m=curM();
  return '<div class="chips">'+S.matches.map(function(x){return '<button class="chip '+(m&&m.id===x.id?'on':'')+'" data-act="mid" data-id="'+x.id+'">هفته '+x.week+(x.res?' ('+x.res.tg+':'+x.res.hs+')':'')+'</button>'}).join('')+'</div>';
}
function badges(s,align){
  return (s.r!=null?rb(s.r):'')+(s.g?'<span class="ib">'+reps(s.g,'⚽')+'</span>':'')+(s.a?'<span class="ib">'+reps(s.a,BOOT)+'</span>':'');
}
function vsCell(p,m,side){
  if(!p)return '<div></div>';
  var s=peek(m.id,p.id),mv=S.mvp[m.id]===p.id;
  return '<button class="vc '+side+'" data-act="pl" data-id="'+p.id+'"><span class="mini '+side+'">'+av(p)+'</span><span class="tx"><span class="nm">'+esc(p.name)+(mv?' 👑':'')+'</span><span class="ic">'+(badges(s)||'<small>—</small>')+'</span></span></button>';
}
function node(p,i,m){
  var s=peek(m.id,p.id),sl=SLOTS[i],mv=S.mvp[m.id]===p.id;
  return '<button class="pn" style="left:'+sl.x+'%;top:'+sl.y+'%" data-act="pl" data-id="'+p.id+'"><span class="circ '+p.t+'"><span class="av">'+av(p)+'</span>'
   +'<span class="rt">'+(s.r!=null?rb(s.r):(ADMIN?'<span class="add">＋</span>':''))+'</span>'
   +(s.a?'<span class="sh">'+reps(s.a,BOOT,3)+'</span>':'')+(s.g?'<span class="gl">'+reps(s.g,BALL,3)+'</span>':'')
   +(mv?'<span class="mv">👑</span>':'')+'</span><span class="nm">'+esc(p.name)+'</span></button>';
}
function pitchSvg(){
  return '<svg class="ln" viewBox="0 0 100 125" preserveAspectRatio="none"><rect x="3" y="3" width="94" height="119" rx="1"/><path d="M3 3h94"/><path d="M38 3a12 12 0 0 0 24 0"/><rect x="26" y="96" width="48" height="26"/><rect x="38" y="110" width="24" height="12"/><circle cx="50" cy="106" r=".8" fill="rgba(255,255,255,.6)"/><path d="M36 96a14 14 0 0 1 28 0" /></svg>';
}
function vLineup(){
  var m=curM();
  var adm=ADMIN?'<div class="bar"><button class="btn pri" data-act="newMatch">＋ بازی جدید</button><button class="btn" data-act="managePl">مدیریت بازیکنان</button></div>':'';
  if(!m)return adm+'<div class="card glass empty">هنوز بازی‌ای ساخته نشده است.'+(ADMIN?'':'')+'</div>';
  var seg='<div class="seg glass"><button class="'+(UI.fil==='all'?'on':'')+'" data-act="fil" data-v="all">همه</button><button class="'+(UI.fil==='tg'?'on':'')+'" data-act="fil" data-v="tg"><i class="dot tg"></i>'+TN.tg+'</button><button class="'+(UI.fil==='hs'?'on':'')+'" data-act="fil" data-v="hs"><i class="dot hs"></i>'+TN.hs+'</button></div>';
  var body;
  if(UI.fil==='all'){
    var a=tp('tg'),b=tp('hs'),n=Math.max(a.length,b.length),rows='';
    for(var i=0;i<n;i++)rows+='<div class="vr">'+vsCell(a[i],m,'tg')+'<div class="pos">'+SLOTS[i].l+'</div>'+vsCell(b[i],m,'hs')+'</div>';
    body='<div class="card glass vs"><div class="vsh"><span class="a">'+TN.tg+'</span><span class="c">VS</span><span class="b">'+TN.hs+'</span></div>'+rows+'</div>';
  }else{
    var t=UI.fil,ps=tp(t);
    body='<div class="card glass" style="padding:10px"><div class="ch" style="padding:2px 6px 0"><h2 style="color:'+(t==='tg'?'var(--red)':'var(--blue)')+'">'+TN[t]+'</h2><small>'+TE[t]+'</small></div>'
     +(ADMIN?'<p class="hint">روی هر بازیکن بزنید تا نمره، گل و پاس گل را ثبت کنید</p>':'')
     +'<div class="pitch">'+pitchSvg()+ps.map(function(p,i){return node(p,i,m)}).join('')+'</div></div>';
  }
  return adm+matchChips()+seg+body+legend(false);
}

function vNews(){
  var adm=ADMIN?'<div class="bar"><button class="btn pri" data-act="newNews">＋ خبر جدید</button></div>':'';
  var L=S.news.slice().sort(function(a,b){return (b.week-a.week)||(b.ts-a.ts)});
  if(!L.length)return adm+'<div class="card glass empty">هنوز خبری ثبت نشده است.</div>';
  return adm+L.map(function(n){return '<div class="card glass nw"><div class="meta"><span class="wk">هفته '+n.week+'</span>'+(n.topic?'<span class="pill">'+esc(n.topic)+'</span>':'')+'</div><h3>'+esc(n.title)+'</h3>'+(n.body?'<p>'+esc(n.body)+'</p>':'')
    +(ADMIN?'<div class="ac"><button class="btn sm" data-act="editNews" data-id="'+n.id+'">ویرایش</button><button class="btn sm dng" data-act="delNews" data-id="'+n.id+'">حذف</button></div>':'')+'</div>'}).join('');
}

function faTeam(t){return TN[t]}
function reportText(){
  var sc=UI.rep||'season',one=sc!=='season'?S.matches.filter(function(m){return m.id===sc})[0]:null;
  if(sc!=='season'&&!one)sc='season';
  var ms=one?[one]:S.matches,A=agg(ms),L=Object.keys(A).map(function(k){return A[k]}),sec=UI.sec,out=[],SEP='━━━━━━━━━━━━';
  var nm=function(x){return x.p.name+' ('+TN[x.p.t]+')'};
  out.push(one?'📊 گزارش هفته '+one.week+' | Gondegan League':'📊 گزارش کل فصل | Gondegan League');
  if(sec.res){out.push(SEP,'🏆 نتیجه بازی'+(one?'':'ها'));
    var any=false;ms.forEach(function(m){any=true;var t=m.res?TN.tg+' '+m.res.tg+' - '+m.res.hs+' '+TN.hs:'هنوز برگزار نشده';out.push((one?'':'هفته '+m.week+': ')+t)});if(!any)out.push('—')}
  var list=function(title,f,fmt){out.push(SEP,title);var r=L.filter(f).sort(fmt.sort);if(!r.length)out.push('—');r.forEach(function(x){out.push('• '+nm(x)+': '+fmt.show(x))})};
  if(sec.gl)list('⚽ گلزنان',function(x){return x.g>0},{sort:function(a,b){return b.g-a.g},show:function(x){return x.g}});
  if(sec.as)list('🎯 پاس گل‌ها',function(x){return x.a>0},{sort:function(a,b){return b.a-a.a},show:function(x){return x.a}});
  if(sec.ag)list('🔥 A/G (گل + پاس گل)',function(x){return x.g+x.a>0},{sort:function(a,b){return (b.g+b.a)-(a.g+a.a)},show:function(x){return (x.g+x.a)+' ('+x.g+'G + '+x.a+'A)'}});
  if(sec.mvp){if(one){var mv=S.mvp[one.id]&&pl(S.mvp[one.id]);out.push(SEP,'⭐ MVP بازی',mv?mv.name+' ('+TN[mv.t]+')':'—')}
    else list('⭐ MVP',function(x){return x.mvp>0},{sort:function(a,b){return b.mvp-a.mvp},show:function(x){return x.mvp+' بار'}})}
  if(sec.rt)list('📈 Gondegan Rating',function(x){return x.avg!=null},{sort:function(a,b){return b.avg-a.avg},show:function(x){return f1(x.avg)}});
  if(sec.tb){out.push(SEP,'📋 جدول لیگ');var rows=tbl();rows.forEach(function(r,i){out.push((i+1)+'. '+TN[r.k]+' — '+r.pts+' امتیاز | '+r.p+' بازی | تفاضل '+(r.gd>0?'+':'')+r.gd)})}
  if(sec.nw){var nw=S.news.filter(function(n){return one?n.week===one.week:true}).sort(function(a,b){return a.week-b.week||a.ts-b.ts});
    out.push(SEP,'📰 اخبار'+(one?' هفته':''));if(!nw.length)out.push('—');nw.forEach(function(n){out.push('• '+n.title+(n.topic?' ('+n.topic+')':''));if(n.body)out.push(n.body)})}
  return out.join('\n');
}
function vReport(){
  var chips='<div class="chips"><button class="chip '+((UI.rep||'season')==='season'?'on':'')+'" data-act="rep" data-id="season">کل فصل</button>'+S.matches.map(function(m){return '<button class="chip '+(UI.rep===m.id?'on':'')+'" data-act="rep" data-id="'+m.id+'">هفته '+m.week+'</button>'}).join('')+'</div>';
  var names={res:'نتیجه',gl:'گلزنان',as:'پاس گل',ag:'A/G',mvp:'MVP',rt:'Rating',tb:'جدول',nw:'اخبار'};
  var tg='<div class="tg-row">'+Object.keys(names).map(function(k){return '<button class="tgl '+(UI.sec[k]?'on':'')+'" data-act="sec" data-k="'+k+'"><i>'+(UI.sec[k]?'✓':'')+'</i>'+names[k]+'</button>'}).join('')+'</div>';
  return '<div class="card glass"><div class="ch"><h2>گزارش هفتگی</h2></div><small>بازه و بخش‌های گزارش را انتخاب کنید و متن آماده را کپی کنید.</small><div style="height:10px"></div>'+chips+tg
   +'<textarea class="rep" id="repTa">'+esc(reportText())+'</textarea><div class="bar" style="margin:12px 0 0"><button class="btn pri wide" data-act="copy">کپی متن گزارش</button></div></div>';
}
function vAbout(){
  return '<div class="card glass about"><img src="'+IMG.about+'" alt=""><div class="tx"><h2>Gondegan League</h2><p>سلامت جویان و توپ گستران دو تیم کوچک مقیاس از مجموعه سلامت جویان توپ گستره که از فروردین ۱۴۰۴ در توپ گستر فیلد شروع به فعالیت کرده و با وجود جنگ و سختی، و لغو شدن مسابقات همچنان به فعالیت خود ادامه میدهد.</p></div></div>';
}
var VIEWS={league:vLeague,stats:vStats,lineup:vLineup,news:vNews,report:vReport,about:vAbout};

/* ---------- shell ---------- */
function buildShell(){
  $('#app').innerHTML='<div class="bg"><i></i><i></i><i></i></div><div class="wrap">'
   +'<header class="top glass"><div class="brand"><span class="lg"><b></b></span>Gondegan League</div><button class="lockbtn" id="lockBtn" data-act="lock"></button></header>'
   +'<section class="hero glass" id="hero"><div class="slide on"><img src="'+IMG.h1+'" alt=""></div><div class="slide"><img src="'+IMG.h2+'" alt=""></div>'
   +'<button class="ar l" data-act="slide" data-d="-1" aria-label="قبلی">'+IC.chev+'</button><button class="ar r" data-act="slide" data-d="1" aria-label="بعدی">'+IC.chev2+'</button><div class="dots"><i class="on"></i><i></i></div></section>'
   +'<main id="view"></main></div>'
   +'<div class="dock"><div id="savebar"></div><nav class="tabs glass" id="tabs"></nav></div><div id="sheetRoot"></div><div id="toast" class="glass"></div>';
}
function renderTop(){
  var b=$('#lockBtn');if(!b)return;
  b.className='lockbtn'+(ADMIN?' on':'');
  b.innerHTML=(ADMIN?IC.unlock+'حالت مدیر':IC.lock+'مدیر');
}
function renderTabs(){$('#tabs').innerHTML=TABS.map(function(t){return '<button class="tab '+(UI.tab===t[0]?'on':'')+'" data-act="tab" data-v="'+t[0]+'">'+IC[t[0]]+'<span>'+t[1]+'</span></button>'}).join('')}
function render(){renderTabs();$('#view').innerHTML=VIEWS[UI.tab]();persistUI()}
function persistUI(){UI.scroll=window.scrollY||0;ss.set('gl_ui',JSON.stringify(UI))}

/* slider */
var si=0,stimer=null;
function slideTo(i){var s=$$('.slide'),d=$$('.dots i');si=(i+s.length)%s.length;s.forEach(function(e,k){e.classList.toggle('on',k===si)});d.forEach(function(e,k){e.classList.toggle('on',k===si)});startSlide()}
function startSlide(){clearInterval(stimer);stimer=setInterval(function(){slideTo(si+1)},7000)}
function tickCountdown(){
  var now=Date.now(),changed=false;
  S.matches.forEach(function(m){if(m.dt&&m.poster&&new Date(m.dt).getTime()<=now){delete m.poster;changed=true}});
  if(changed){touch();render();return}
  var m=nextMatch(),el=$('#cdTxt');
  if(!m||!el)return;
  el.textContent=fmtCd(new Date(m.dt).getTime()-now);
}
function bindSwipe(){var h=$('#hero'),x0=null;h.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});h.addEventListener('touchend',function(e){if(x0==null)return;var dx=e.changedTouches[0].clientX-x0;x0=null;if(Math.abs(dx)>40)slideTo(si+(dx<0?1:-1))},{passive:true})}

/* ---------- sheets ---------- */
var SH=null;
function openSheet(html,st){SH=st||{};var r=$('#sheetRoot');r.innerHTML='<div class="backdrop" data-act="closeSheet"></div><div class="sheet glass" role="dialog">'+html+'</div>';r.classList.add('open');document.body.classList.add('noscroll')}
function setSheet(html){var s=$('#sheetRoot .sheet');if(s)s.innerHTML=html}
function closeSheet(){SH=null;var r=$('#sheetRoot');r.classList.remove('open');r.innerHTML='';document.body.classList.remove('noscroll');kick()}
function toast(t){var e=$('#toast');e.textContent=t;e.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(function(){e.classList.remove('show')},2600)}
var CONF=null;
function ask(text,okLabel,fn){CONF=fn;openSheet('<h3 style="margin-bottom:8px">'+text+'</h3><p class="sm-t" style="margin-bottom:16px">این کار قابل بازگشت نیست.</p><div class="two"><button class="btn" data-act="closeSheet">انصراف</button><button class="btn pri" data-act="confirmOk">'+okLabel+'</button></div>',{type:'confirm'})}
var head=function(title,sub){return '<div class="sh-head"><div class="t"><b>'+title+'</b>'+(sub?'<small>'+sub+'</small>':'')+'</div><button class="x" data-act="closeSheet" aria-label="بستن">✕</button></div>'}

function plSheet(){
  var p=pl(SH.id),m=curM();if(!p||!m){closeSheet();return ''}
  var s=peek(m.id,p.id),A=agg()[p.id],mv=S.mvp[m.id]===p.id;
  var h='<div class="sh-head"><span class="mini '+p.t+'">'+av(p)+'</span><div class="t"><b>'+esc(p.name)+'</b><small>'+TN[p.t]+' | هفته '+m.week+'</small></div><button class="x" data-act="closeSheet" aria-label="بستن">✕</button></div>';
  if(ADMIN){
    h+='<div class="row"><span class="lb">نمره این بازی '+(s.r!=null?rb(s.r):'')+'</span><div class="stp"><button data-act="r-" aria-label="کم">−</button><input id="rIn" inputmode="decimal" placeholder="—" value="'+(s.r==null?'':f1(s.r))+'"><button data-act="r+" aria-label="زیاد">+</button></div></div>'
     +(s.r!=null?'<div style="text-align:left;margin:-4px 0 6px"><button class="btn sm dng" data-act="rClear">پاک کردن نمره</button></div>':'')
     +'<div class="row"><span class="lb">⚽ گل</span><div class="stp"><button data-act="g-">−</button><span class="v">'+s.g+'</span><button data-act="g+">+</button></div></div>'
     +'<div class="row"><span class="lb"><span class="ib">'+BOOT+'</span> پاس گل</span><div class="stp"><button data-act="a-">−</button><span class="v">'+s.a+'</span><button data-act="a+">+</button></div></div>'
     +'<div class="row"><span class="lb">👑 MVP این بازی</span><button class="sw-btn '+(mv?'on':'')+'" data-act="mvp">'+(mv?'MVP است':'انتخاب به‌عنوان MVP')+'</button></div>';
  }else{
    h+='<div class="row"><span class="lb">نمره این بازی</span><span>'+(s.r!=null?rb(s.r,'big'):'—')+'</span></div><div class="row"><span class="lb">⚽ گل</span><b>'+s.g+'</b></div><div class="row"><span class="lb"><span class="ib">'+BOOT+'</span> پاس گل</span><b>'+s.a+'</b></div>'+(mv?'<div class="row"><span class="lb">👑 MVP این بازی</span></div>':'');
  }
  h+='<h3 style="margin:14px 0 6px">آمار فصل</h3><div class="tot"><div><b>'+A.g+'</b><small>Goals</small></div><div><b>'+A.a+'</b><small>Assists</small></div><div><b>'+A.mvp+'</b><small>MVP</small></div><div><b>'+(A.avg==null?'—':f1(A.avg))+'</b><small>Rating</small></div></div>';
  return h;
}
function editStatsSheet(){
  var m=curM();if(!m)return head('ویرایش آمار')+'<div class="empty">ابتدا یک بازی بسازید.</div>';
  var chips='<div class="chips">'+S.matches.map(function(x){return '<button class="chip '+(x.id===m.id?'on':'')+'" data-act="edMatch" data-id="'+x.id+'">هفته '+x.week+'</button>'}).join('')+'</div>';
  var blk=function(t){return '<div class="tl"><i class="dot '+t+'"></i>'+TN[t]+'</div><table class="et"><thead><tr><th style="text-align:right">بازیکن</th><th>نمره</th><th>گل</th><th>پاس گل</th><th>MVP</th></tr></thead><tbody>'+tp(t).map(function(p){var s=peek(m.id,p.id);
    return '<tr><td class="n">'+esc(p.name)+'</td><td><input data-f="r" data-p="'+p.id+'" inputmode="decimal" value="'+(s.r==null?'':f1(s.r))+'"></td><td><input data-f="g" data-p="'+p.id+'" inputmode="numeric" value="'+s.g+'"></td><td><input data-f="a" data-p="'+p.id+'" inputmode="numeric" value="'+s.a+'"></td><td><button class="mvb '+(S.mvp[m.id]===p.id?'on':'')+'" data-act="edMvp" data-id="'+p.id+'">👑</button></td></tr>'}).join('')+'</tbody></table>'};
  return head('ویرایش آمار','نمره ۱ تا ۱۰ | تغییرات همان لحظه اعمال می‌شود')+chips+blk('tg')+blk('hs')+'<button class="btn pri wide" style="margin-top:16px" data-act="closeSheet">تمام</button>';
}
function managePlSheet(){
  var blk=function(t){var ps=tp(t);return '<div class="tl"><i class="dot '+t+'"></i>'+TN[t]+' ('+ps.length+' از ۵)</div>'+ps.map(function(p){return '<div class="pl-edit"><label class="phb" title="عکس بازیکن"><span class="mini '+t+'">'+av(p)+'</span><span class="cam">📷</span><input type="file" accept="image/*" data-ph="'+p.id+'"></label><input class="in" data-pn="'+p.id+'" value="'+esc(p.name)+'" maxlength="24">'+(p.ph?'<button class="mini-bt rm" data-act="rmPh" data-id="'+p.id+'" aria-label="حذف عکس">🗑</button>':'')+'<button class="mini-bt" data-act="rmPl" data-id="'+p.id+'" aria-label="حذف بازیکن">✕</button></div>'}).join('')+(ps.length<5?'<button class="btn sm" data-act="addPl" data-t="'+t+'">＋ افزودن بازیکن</button>':'')};
  return head('مدیریت بازیکنان','حداکثر ۵ بازیکن برای هر تیم (فوتسال)')+blk('tg')+blk('hs')+'<button class="btn pri wide" style="margin-top:16px" data-act="closeSheet">تمام</button>';
}
function matchSheet(id){
  var m=id?S.matches.filter(function(x){return x.id===id})[0]:null;
  var wk=m?m.week:(S.matches.reduce(function(a,b){return Math.max(a,b.week)},0)+1);
  var poster=posterDraft!==undefined?posterDraft:(m&&m.poster);
  return head(m?'ویرایش بازی':'ثبت بازی جدید')
   +'<div class="two"><label class="fld"><span>هفته</span><input class="in" id="mw" inputmode="numeric" value="'+wk+'"></label><label class="fld"><span>تاریخ (اختیاری)</span><input class="in" id="md" value="'+esc(m?m.date:'')+'" placeholder="مثلاً ۱۴۰۵/۰۷/۰۳"></label></div>'
   +'<div class="two"><label class="fld"><span style="color:var(--red)">گل '+TN.tg+'</span><input class="in" id="ma" inputmode="numeric" value="'+(m&&m.res?m.res.tg:'')+'" placeholder="—"></label><label class="fld"><span style="color:var(--blue)">گل '+TN.hs+'</span><input class="in" id="mb" inputmode="numeric" value="'+(m&&m.res?m.res.hs:'')+'" placeholder="—"></label></div>'
   +'<p class="sm-t" style="margin:-4px 0 12px">اگر بازی هنوز برگزار نشده، نتیجه را خالی بگذارید.</p>'
   +(m?'<button class="btn sm wide" style="margin-bottom:10px" data-act="fillGoals" data-id="'+m.id+'">پر کردن نتیجه از گل‌های ثبت‌شده در Lineup</button>':'')
   +'<label class="fld"><span>تاریخ و ساعت دقیق بازی (برای شمارش معکوس)</span><input class="in" id="mdt" type="datetime-local" value="'+(dtDraft!==undefined?dtDraft:toLocalInput(m&&m.dt))+'"></label>'
   +'<label class="fld"><span>پوستر این بازی</span><label class="phb" style="width:100%;height:110px;border-radius:16px;overflow:hidden;display:block;background:var(--field);border:1px solid var(--line)">'+(poster?'<img class="ph" src="'+poster+'" alt="" style="width:100%;height:100%">':'<span style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--ink2);font-size:12px">افزودن پوستر</span>')+'<span class="cam">📷</span><input type="file" accept="image/*" data-poster="1"></label></label>'
   +(poster?'<button class="btn sm" style="margin:-6px 0 12px" data-act="rmPoster">حذف پوستر</button>':'')
   +'<div class="two"><button class="btn pri" data-act="saveMatch" data-id="'+(m?m.id:'')+'">ذخیره</button>'+(m?'<button class="btn dng" data-act="delMatch" data-id="'+m.id+'">حذف بازی</button>':'<button class="btn" data-act="closeSheet">انصراف</button>')+'</div>';
}
var posterDraft,dtDraft;
function newsSheet(id){
  var n=id?S.news.filter(function(x){return x.id===id})[0]:null;
  var wk=n?n.week:((curM()||{}).week||1);
  return head(n?'ویرایش خبر':'خبر جدید')
   +'<div class="two"><label class="fld"><span>هفته</span><input class="in" id="nw" inputmode="numeric" value="'+wk+'"></label><label class="fld"><span>موضوع</span><input class="in" id="nt" value="'+esc(n?n.topic:'')+'" placeholder="مثلاً مصدومیت"></label></div>'
   +'<label class="fld"><span>تیتر</span><input class="in" id="nh" value="'+esc(n?n.title:'')+'"></label><label class="fld"><span>متن خبر</span><textarea class="in" id="nb">'+esc(n?n.body:'')+'</textarea></label>'
   +'<button class="btn pri wide" data-act="saveNews" data-id="'+(n?n.id:'')+'">ذخیره خبر</button>';
}
function lockSheet(){
  if(ADMIN)return head('حالت مدیر','ویرایش فعال است')+'<p class="sm-t" style="margin-bottom:14px">با خروج، فقط امکان مشاهده باقی می‌ماند.</p><button class="btn dng wide" data-act="logout">خروج از حالت مدیر</button>';
  return head('ورود مدیر','رمز را وارد کنید')+'<label class="fld"><span>رمز</span><input class="in" id="pw" type="password" autocomplete="off" autocapitalize="off" dir="ltr"></label><div class="pw-err" id="pwe"></div><button class="btn pri wide" data-act="login">ورود</button>';
}

/* ---------- mutations ---------- */
function touch(){S.rev=(S.rev||0)+1;dirty=true;ls.set('gl_draft',JSON.stringify(S));saveUI();kick()}
function kick(){if(!ADMIN||!dirty||blocked)return;clearTimeout(saveTimer);saveTimer=setTimeout(function(){if(SH){kick();return}save()},2000)}
function saveUI(){
  var b=$('#savebar');if(!b)return;
  if(!ADMIN){b.innerHTML='';return}
  if(saving)b.innerHTML='<div class="sv glass"><span>در حال ذخیره…</span></div>';
  else if(blocked)b.innerHTML='<div class="sv warn glass"><span>'+blockMsg+'</span><button class="btn sm" data-act="saveNow">تلاش دوباره</button></div>';
  else if(dirty)b.innerHTML='<div class="sv glass"><span>تغییرات ذخیره‌نشده</span><button class="btn pri sm" data-act="saveNow">ذخیره</button></div>';
  else b.innerHTML='';
}
function save(){
  if(!ADMIN||!dirty||saving)return Promise.resolve();
  saving=true;saveUI();
  var snap=S.rev;
  if(!API){ls.set('gl_local',JSON.stringify(S));saving=false;if(S.rev===snap){dirty=false;ls.del('gl_draft')}saveUI();toast('✓ روی همین دستگاه ذخیره شد');return Promise.resolve()}
  return fetch('/api/state',{method:'PUT',headers:{'Content-Type':'application/json','x-admin-password':PW},body:JSON.stringify({state:S})}).then(function(r){
    if(r.status===401){ADMIN=false;PW='';ls.del('gl_pw');renderTop();render();throw {code:'auth'}}
    if(!r.ok)throw {code:'http',status:r.status};
    return r.json();
  }).then(function(){
    saving=false;blocked=false;if(S.rev===snap){dirty=false;ls.del('gl_draft')}saveUI();toast('✓ ذخیره شد');if(dirty)kick();
  }).catch(function(e){
    saving=false;
    if(e&&e.code==='auth'){toast('رمز مدیر معتبر نیست. دوباره وارد شوید.')}
    else{blocked=true;blockMsg=(e&&e.status===503)?'ذخیره‌ساز KV هنوز به پروژه وصل نشده است. راهنمای README را ببینید.':'ارتباط با سرور برقرار نشد. تغییرات روی همین دستگاه نگه داشته شد.'}
    saveUI();
  });
}

function load(first){
  return fetch('/api/state',{cache:'no-store'}).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(j){
    API=true;STORAGE=j.storage!==false;
    var remote=j.state;
    if(remote&&remote.players&&!dirty&&(first||remote.rev!==S.rev)){S=remote;render()}
    if(first&&ADMIN){try{var D=JSON.parse(ls.get('gl_draft')||'null');if(D&&D.players&&D.rev>(remote&&remote.rev||0)){S=D;dirty=true;render();kick()}}catch(e){}}
    if(!STORAGE&&ADMIN){blocked=true;blockMsg='ذخیره‌ساز KV هنوز به پروژه وصل نشده است. راهنمای README را ببینید.'}
    saveUI();
  },function(){
    if(!first)return;
    API=false;
    try{var L=JSON.parse(ls.get('gl_local')||'null');if(L&&L.players){S=L;render()}}catch(e){}
  });
}

function setStat(pid,f,v){var m=curM();if(!m)return;var r=rec(m.id,pid);
  if(f==='r'){r.r=v==null?null:clamp(Math.round(v*10)/10,1,10)}else r[f]=Math.max(0,Math.round(v)||0)}

var A={
 tab:function(el){UI.tab=el.dataset.v;render();window.scrollTo(0,0)},
 stat:function(el){UI.stat=el.dataset.v;render()},
 fil:function(el){UI.fil=el.dataset.v;render()},
 mid:function(el){UI.mid=el.dataset.id;render()},
 slide:function(el){slideTo(si+parseInt(el.dataset.d,10))},
 closeSheet:function(){closeSheet()},
 confirmOk:function(){var f=CONF;CONF=null;closeSheet();if(f)f()},
 lock:function(){openSheet(lockSheet(),{type:'lock'});setTimeout(function(){var i=$('#pw');if(i)i.focus()},250)},
 login:function(){var v=($('#pw').value||'').trim();
   var done=function(){ADMIN=true;PW=v;ls.set('gl_pw',v);closeSheet();renderTop();render();saveUI();toast('حالت مدیر فعال شد')};
   var fail=function(){$('#pwe').textContent='رمز اشتباه است.';var i=$('#pw');i.classList.remove('shake');void i.offsetWidth;i.classList.add('shake')};
   if(!v){fail();return}
   if(API){fetch('/api/auth',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:v})}).then(function(r){return r.json()}).then(function(j){j&&j.ok?done():fail()}).catch(function(){$('#pwe').textContent='ارتباط با سرور برقرار نشد.'})}
   else{h53(v)===PASS_HASH?done():fail()}},
 logout:function(){ADMIN=false;PW='';ls.del('gl_pw');closeSheet();renderTop();render();saveUI();toast('از حالت مدیر خارج شدید')},
 saveNow:function(){blocked=false;save()},
 /* league */
 newMatch:function(){if(!ADMIN)return;posterDraft=undefined;dtDraft=undefined;openSheet(matchSheet(null),{type:'match',id:null})},
 editMatch:function(el){if(!ADMIN)return;posterDraft=undefined;dtDraft=undefined;openSheet(matchSheet(el.dataset.id),{type:'match',id:el.dataset.id})},
 saveMatch:function(el){if(!ADMIN)return;var id=el.dataset.id,week=parseInt($('#mw').value,10)||1,date=$('#md').value.trim(),a=$('#ma').value.trim(),b=$('#mb').value.trim(),res=null;
   if(a!==''&&b!==''){res={tg:Math.max(0,parseInt(a,10)||0),hs:Math.max(0,parseInt(b,10)||0)}}
   var dtVal=dtDraft!==undefined?dtDraft:$('#mdt').value,dt='';if(dtVal){var dd=new Date(dtVal);if(!isNaN(dd))dt=dd.toISOString()}
   var poster=posterDraft!==undefined?posterDraft:null;
   if(id){var m=S.matches.filter(function(x){return x.id===id})[0];m.week=week;m.date=date;m.res=res;m.dt=dt;if(posterDraft!==undefined)m.poster=poster}
   else{var n={id:uid('m'),week:week,date:date,res:res,dt:dt,poster:poster||null};S.matches.push(n);UI.mid=n.id}
   S.matches.sort(function(x,y){return x.week-y.week});posterDraft=undefined;dtDraft=undefined;touch();closeSheet();render();toast('بازی ذخیره شد')},
 rmPoster:function(){posterDraft=null;setSheet(matchSheet(SH&&SH.id))},
 fillGoals:function(el){var id=el.dataset.id,g={tg:0,hs:0},st=S.ms[id]||{};for(var k in st){var p=pl(k);if(p)g[p.t]+=st[k].g||0}$('#ma').value=g.tg;$('#mb').value=g.hs},
 delMatch:function(el){var id=el.dataset.id;ask('این بازی همراه با آمار Lineup آن حذف شود؟','حذف بازی',function(){S.matches=S.matches.filter(function(x){return x.id!==id});delete S.ms[id];delete S.mvp[id];if(UI.mid===id)UI.mid=null;touch();render();toast('بازی حذف شد')})},
 resetTable:function(){ask('نتیجه همه بازی‌ها پاک شود و جدول صفر شود؟','ریست جدول',function(){S.matches.forEach(function(m){m.res=null});touch();render();toast('جدول ریست شد')})},
 editPun:function(){openSheet(head('ویرایش مجازات')+'<label class="fld"><span>متن مجازات</span><textarea class="in" id="pt">'+esc(S.punish)+'</textarea></label><button class="btn pri wide" data-act="savePun">ذخیره</button>',{type:'pun'})},
 savePun:function(){S.punish=$('#pt').value.trim()||S.punish;touch();closeSheet();render()},
 /* lineup / player */
 pl:function(el){var p=pl(el.dataset.id);if(!p||!curM())return;openSheet(plSheet.call(null,(SH={type:'pl',id:p.id},0)),{type:'pl',id:p.id})},
 'r+':function(){var m=curM(),s=peek(m.id,SH.id);setStat(SH.id,'r',s.r==null?6:s.r+.5);touch();refPl()},
 'r-':function(){var m=curM(),s=peek(m.id,SH.id);setStat(SH.id,'r',s.r==null?6:s.r-.5);touch();refPl()},
 rClear:function(){setStat(SH.id,'r',null);touch();refPl()},
 'g+':function(){var s=peek(curM().id,SH.id);setStat(SH.id,'g',s.g+1);touch();refPl()},
 'g-':function(){var s=peek(curM().id,SH.id);setStat(SH.id,'g',s.g-1);touch();refPl()},
 'a+':function(){var s=peek(curM().id,SH.id);setStat(SH.id,'a',s.a+1);touch();refPl()},
 'a-':function(){var s=peek(curM().id,SH.id);setStat(SH.id,'a',s.a-1);touch();refPl()},
 mvp:function(){var m=curM();if(S.mvp[m.id]===SH.id)delete S.mvp[m.id];else S.mvp[m.id]=SH.id;touch();refPl()},
 /* stats */
 editStats:function(){if(!ADMIN)return;openSheet(editStatsSheet(),{type:'ed'})},
 edMatch:function(el){UI.mid=el.dataset.id;setSheet(editStatsSheet());render()},
 edMvp:function(el){var m=curM();if(S.mvp[m.id]===el.dataset.id)delete S.mvp[m.id];else S.mvp[m.id]=el.dataset.id;touch();setSheet(editStatsSheet());render()},
 resetStats:function(){openSheet(head('ریست آمار','کدام بخش پاک شود؟')
   +'<div style="display:grid;gap:8px"><button class="btn" data-act="rs" data-k="g">ریست Goals</button><button class="btn" data-act="rs" data-k="a">ریست Assists (و A/G)</button><button class="btn" data-act="rs" data-k="r">ریست Gondegan Rating</button><button class="btn" data-act="rs" data-k="mvp">ریست MVP</button><button class="btn dng" data-act="rs" data-k="all">ریست همه‌ی آمار</button></div>',{type:'rst'})},
 rs:function(el){var k=el.dataset.k,lab={g:'Goals',a:'Assists',r:'Gondegan Rating',mvp:'MVP',all:'همه‌ی آمار'}[k];
   ask('«'+lab+'» ریست شود؟','ریست',function(){
     if(k==='all'){S.ms={};S.mvp={}}else if(k==='mvp'){S.mvp={}}else{for(var m in S.ms)for(var p in S.ms[m]){if(k==='r')S.ms[m][p].r=null;else S.ms[m][p][k]=0}}
     touch();render();toast('ریست شد')})},
 managePl:function(){if(!ADMIN)return;openSheet(managePlSheet(),{type:'mp'})},
 addPl:function(el){var t=el.dataset.t;if(tp(t).length>=5)return;var n=tp(t).length+1;S.players.push({id:uid('p'),t:t,name:'بازیکن '+n});touch();setSheet(managePlSheet());render()},
 rmPh:function(el){var p=pl(el.dataset.id);if(!p)return;delete p.ph;touch();setSheet(managePlSheet());render()},
 rmPl:function(el){var id=el.dataset.id,p=pl(id);if(tp(p.t).length<=1){toast('هر تیم حداقل یک بازیکن نیاز دارد');return}
   ask('«'+esc(p.name)+'» و آمارش حذف شود؟','حذف',function(){S.players=S.players.filter(function(x){return x.id!==id});for(var m in S.ms)delete S.ms[m][id];for(var k in S.mvp)if(S.mvp[k]===id)delete S.mvp[k];touch();openSheet(managePlSheet(),{type:'mp'});render()})},
 /* news */
 newNews:function(){openSheet(newsSheet(null),{type:'news'})},
 editNews:function(el){openSheet(newsSheet(el.dataset.id),{type:'news'})},
 saveNews:function(el){var id=el.dataset.id,t=$('#nh').value.trim();if(!t){toast('تیتر خبر را بنویسید');return}
   var o={week:parseInt($('#nw').value,10)||1,topic:$('#nt').value.trim(),title:t,body:$('#nb').value.trim()};
   if(id){var n=S.news.filter(function(x){return x.id===id})[0];for(var k in o)n[k]=o[k]}else{o.id=uid('n');o.ts=Date.now();S.news.push(o)}
   touch();closeSheet();render();toast('خبر ذخیره شد')},
 delNews:function(el){var id=el.dataset.id;ask('این خبر حذف شود؟','حذف خبر',function(){S.news=S.news.filter(function(x){return x.id!==id});touch();render()})},
 /* report */
 rep:function(el){UI.rep=el.dataset.id==='season'?'':el.dataset.id;render()},
 sec:function(el){UI.sec[el.dataset.k]=UI.sec[el.dataset.k]?0:1;render()},
 copy:function(){var ta=$('#repTa'),t=ta.value;
   var ok=function(){toast('متن گزارش کپی شد')},fb=function(){ta.focus();ta.select();var r=false;try{r=document.execCommand('copy')}catch(e){}if(r)ok();else toast('متن انتخاب شد؛ آن را کپی کنید')};
   if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(ok,fb);else fb()}
};
function refPl(){setSheet(plSheet());render()}

document.addEventListener('click',function(e){var el=e.target.closest('[data-act]');if(!el)return;var f=A[el.dataset.act];if(f)f(el,e)});
document.addEventListener('input',function(e){var t=e.target;if(!ADMIN)return;
  if(t.id==='rIn'&&SH&&SH.id){var v=parseFloat(String(t.value).replace(',','.').replace(/[۰-۹]/g,function(d){return '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)}));setStat(SH.id,'r',isNaN(v)?null:v);touch();render();return}
  if(t.dataset&&t.dataset.f){var f=t.dataset.f,raw=String(t.value).replace(',','.'),v2=parseFloat(raw);if(f==='r')setStat(t.dataset.p,'r',isNaN(v2)?null:v2);else setStat(t.dataset.p,f,isNaN(v2)?0:v2);touch();render();return}
  if(t.dataset&&t.dataset.pn){var p=pl(t.dataset.pn);if(p){p.name=t.value.slice(0,24)||p.name;touch();render()}}
  if(t.id==='mdt'){dtDraft=t.value}
});
document.addEventListener('change',function(e){var t=e.target;
  if(t.dataset&&t.dataset.poster==='1'&&t.files&&t.files[0]&&ADMIN){var mid=SH&&SH.id;readPoster(t.files[0],function(d){if(!d){toast('این عکس قابل استفاده نیست. عکس JPG یا PNG انتخاب کنید.');return}posterDraft=d;setSheet(matchSheet(mid))});return}
  if(t.dataset&&t.dataset.ph&&t.files&&t.files[0]&&ADMIN){var pid=t.dataset.ph,file=t.files[0];readPhoto(file,function(d){var p=pl(pid);if(!d||!p){toast('این عکس قابل استفاده نیست. عکس JPG یا PNG انتخاب کنید.');return}p.ph=d;touch();setSheet(managePlSheet());render();toast('عکس بازیکن ذخیره شد')});return}
  if(t.id==='rIn'&&SH&&SH.id){var s=peek(curM().id,SH.id);t.value=s.r==null?'':f1(s.r);setSheet(plSheet())}});
document.addEventListener('keydown',function(e){if(e.key==='Enter'&&e.target.id==='pw')A.login();if(e.key==='Escape'&&SH)closeSheet()});
window.addEventListener('scroll',function(){clearTimeout(window.__sc);window.__sc=setTimeout(persistUI,300)},{passive:true});
window.addEventListener('beforeunload',function(){persistUI()});

/* init */
buildShell();renderTop();render();startSlide();bindSwipe();saveUI();
setInterval(tickCountdown,1000);
if(UI.scroll)setTimeout(function(){window.scrollTo(0,UI.scroll)},60);
load(true);
setInterval(function(){if(document.hidden||SH||dirty||saving||!API)return;load(false)},30000);
})();
