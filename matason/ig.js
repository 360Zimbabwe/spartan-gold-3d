/* MataSon explainer infographics: pure inline SVG + CSS, no external assets */
const applyIG=(function(){
const IG_CSS=`
.ig{margin:12px 0 6px;padding:10px 8px 8px}
.ig svg{width:100%;height:auto;display:block;overflow:visible}
.ig text{font-family:'Space Grotesk','Inter',sans-serif}
.ig p{text-align:center;margin-top:6px;font-size:11.5px}
.ig .pop{opacity:0;transform-box:fill-box;transform-origin:center}
.xe.in .pop{animation:igPop .9s var(--spring,cubic-bezier(.2,.9,.3,1.25)) both;animation-delay:calc(var(--d,0)*.18s + .25s)}
@keyframes igPop{from{opacity:0;transform:scale(.55)}to{opacity:1;transform:none}}
.ig .grow{transform-box:fill-box;transform-origin:50% 100%;transform:scaleY(0)}
.xe.in .grow{animation:igGrow .9s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--d,0)*.18s + .3s)}
@keyframes igGrow{to{transform:scaleY(1)}}
.ig .draw{stroke-dasharray:var(--l,300);stroke-dashoffset:var(--l,300)}
.xe.in .draw{animation:igDraw 1.6s ease both;animation-delay:.3s}
@keyframes igDraw{to{stroke-dashoffset:0}}
.ig .flow{stroke-dasharray:5 5;animation:igFlow 1.1s linear infinite}
@keyframes igFlow{to{stroke-dashoffset:-20}}
.ig .shackle{transform-box:fill-box;transform-origin:0% 100%}
.xe.in .shackle{animation:igOpen .6s ease both;animation-delay:calc(var(--d,0)*.55s + 1s)}
@keyframes igOpen{to{transform:translateY(-3px) rotate(-30deg)}}
.ig .pulse{animation:igPulse 2.4s ease-in-out infinite}
@keyframes igPulse{50%{opacity:.35}}

:root{--spring:linear(0,.009,.035 2.1%,.141,.281 6.7%,.723 12.9%,.938 16.7%,1.017,1.077,1.121,1.149 24.3%,1.159,1.163,1.161,1.154 29.9%,1.129 32.8%,1.051 39.6%,1.017 43.1%,.991,.977 51%,.974 53.8%,.975 57.1%,.997 69.8%,1.003 76.9%,1.004 83.8%,1)}
.xe{transition:opacity .6s ease,filter .6s ease,transform 1s cubic-bezier(.2,.9,.3,1.2)}
@supports (transition-timing-function:linear(0,1)){.xe{transition:opacity .6s ease,filter .6s ease,transform 1.1s var(--spring)}}
.xc{will-change:transform}
.xc:not(.ig):hover{transform:translateY(-2px) scale(1.015);transition:transform .35s cubic-bezier(.2,.9,.3,1.4)}
.xc:active{transform:scale(.975)!important;transition:transform .12s ease}
.xc b.hasico{display:flex;align-items:center;gap:7px}
.ico{flex:0 0 22px;width:22px;height:22px;display:inline-flex;align-items:center;justify-content:center;border-radius:50%;background:rgba(56,217,128,.12);box-shadow:0 0 0 1px rgba(56,217,128,.35),0 0 10px rgba(56,217,128,.18);opacity:0}
.ico svg{width:15px;height:15px;overflow:visible}
.xe.in .ico{animation:igIco 1s cubic-bezier(.2,.9,.3,1.3) .35s both,igBob 3.2s ease-in-out 1.6s infinite}
@supports (transition-timing-function:linear(0,1)){.xe.in .ico{animation:igIco 1.1s var(--spring) .35s both,igBob 3.2s ease-in-out 1.6s infinite}}
@keyframes igIco{from{opacity:0;transform:scale(.2) rotate(-70deg)}to{opacity:1;transform:none}}
@keyframes igBob{50%{transform:translateY(-2px) rotate(4deg)}}
@media (prefers-reduced-motion:reduce){.xe,.xe.in .ico,.xe.in .pop,.ig .flow,.ig .pulse{animation:none!important;transition:opacity .3s!important}.ig .pop{opacity:1}.xe.in .ico{opacity:1}.ig .grow{transform:none}.ig .draw{stroke-dashoffset:0}}
`;
const IG={GR:'#38d980',GD:'#f0d060',OR:'#e08a50',WH:'#eafff4',DM:'rgba(200,222,212,.72)',BG:'rgba(14,40,28,.8)'};
const {GR,GD,OR,WH,DM,BG}=IG;
const co=(rest)=>`CO<tspan font-size='70%' dy='2'>2</tspan><tspan dy='-2'>${rest||''}</tspan>`;
const T=(x,y,t,o)=>{o=o||{};return `<text x='${x}' y='${y}' text-anchor='${o.a||'middle'}' font-size='${o.s||10}' font-weight='${o.w||600}' fill='${o.c||WH}'${o.ls?` letter-spacing='${o.ls}'`:''}>${t}</text>`;};
const TL=(x,y,ls,o)=>{o=o||{};const lh=o.lh||11;return ls.map((t,i)=>T(x,y+i*lh,t,o)).join('');};
const R=(x,y,w,h,o)=>{o=o||{};return `<rect x='${x}' y='${y}' width='${w}' height='${h}' rx='${o.r==null?8:o.r}' fill='${o.f||BG}' stroke='${o.s||GR}' stroke-width='${o.sw||1.2}'${o.d?` stroke-dasharray='${o.d}'`:''}/>`;};
const C=(x,y,r,o)=>{o=o||{};return `<circle cx='${x}' cy='${y}' r='${r}' fill='${o.f||BG}' stroke='${o.s||GR}' stroke-width='${o.sw||1.4}'${o.d?` stroke-dasharray='${o.d}'`:''}${o.cl?` class='${o.cl}'`:''}/>`;};
const L=(x1,y1,x2,y2,o)=>{o=o||{};return `<line x1='${x1}' y1='${y1}' x2='${x2}' y2='${y2}' stroke='${o.c||GR}' stroke-width='${o.w||1.4}'${o.d?` stroke-dasharray='${o.d}'`:''}${o.cl?` class='${o.cl}'`:''}${o.m?` marker-end='url(#${o.m})'`:''}/>`;};
const AR=(x1,y1,x2,y2,c)=>L(x1,y1,x2,y2,{c:c||GR,w:1.6,m:c===GD?'ahY':'ahG',cl:'flow'});
const P=(d,o)=>{o=o||{};return `<path d='${d}' fill='${o.f||'none'}' stroke='${o.s||'none'}' stroke-width='${o.sw||1.4}' stroke-linecap='round' stroke-linejoin='round'${o.d?` stroke-dasharray='${o.d}'`:''}${o.cl?` class='${o.cl}'`:''}${o.st?` style='${o.st}'`:''}${o.m?` marker-end='url(#${o.m})'`:''}/>`;};
const G=(d,inner)=>`<g class='pop' style='--d:${d}'>${inner}</g>`;
const X=(x,y,c)=>`<path d='M${x-3} ${y-3}L${x+3} ${y+3}M${x+3} ${y-3}L${x-3} ${y+3}' stroke='${c||OR}' stroke-width='1.8' stroke-linecap='round'/>`;
const IC=(n,x,y,s,c)=>{c=c||GR;s=s||1;const sh={
flame:`<path d='M0 -11C5 -5 8 -1 8 3A8 8 0 0 1 -8 3C-8 -1 -4 -4 0 -11Z' fill='${c}'/><path d='M0 -2C3 1 4 3 0 7C-4 3 -3 1 0 -2Z' fill='#04110a'/>`,
tree:`<circle cy='-4' r='8.5' fill='${c}'/><rect x='-1.6' y='3' width='3.2' height='8' fill='${c}'/>`,
cloud:`<path d='M-9 6A5 5 0 0 1 -8 -3A7 7 0 0 1 4 -7A6 6 0 0 1 9 6Z' fill='none' stroke='${c}' stroke-width='1.4' stroke-linejoin='round'/>`,
ticket:`<path d='M-11 -7H11V-2A2.5 2.5 0 0 0 11 3V7H-11V3A2.5 2.5 0 0 0 -11 -2Z' fill='none' stroke='${c}' stroke-width='1.8' stroke-linejoin='round'/><path d='M3 -7V7' stroke='${c}' stroke-width='1.4' stroke-dasharray='2 2'/>`,
cert:`<rect x='-9' y='-11' width='18' height='22' rx='2' fill='none' stroke='${c}' stroke-width='1.8'/><path d='M-5 -6H5M-5 -2H5M-5 2H1' stroke='${c}' stroke-width='1.4'/><circle cx='4' cy='7' r='3' fill='${c}'/>`,
vault:`<rect x='-11' y='-9' width='22' height='18' rx='2.5' fill='none' stroke='${c}' stroke-width='1.8'/><circle r='4.5' fill='none' stroke='${c}' stroke-width='1.6'/><path d='M0 -4.5V4.5M-4.5 0H4.5' stroke='${c}' stroke-width='1.2'/>`,
coin:`<circle r='9' fill='none' stroke='${c}' stroke-width='1.8'/><circle r='5' fill='none' stroke='${c}' stroke-width='1.2'/>`,
block:`<rect x='-9' y='-9' width='18' height='18' rx='2' fill='none' stroke='${c}' stroke-width='1.8'/><path d='M-9 -3H9M-9 3H9M-3 -9V9M3 -9V9' stroke='${c}' stroke-width='1'/>`,
person:`<circle cy='-5' r='4' fill='${c}'/><path d='M-8 10C-8 2 8 2 8 10Z' fill='${c}'/>`,
building:`<rect x='-8' y='-10' width='16' height='20' rx='1.5' fill='none' stroke='${c}' stroke-width='1.8'/><path d='M-4 -5H-1M2 -5H5M-4 0H-1M2 0H5M-2 10V5H2V10' stroke='${c}' stroke-width='1.4'/>`,
shield:`<path d='M0 -11L9 -7V1C9 7 4 10 0 12C-4 10 -9 7 -9 1V-7Z' fill='none' stroke='${c}' stroke-width='1.8' stroke-linejoin='round'/><path d='M-4 0L-1 3L5 -3' fill='none' stroke='${c}' stroke-width='1.6'/>`,
mag:`<circle cx='-2' cy='-2' r='6' fill='none' stroke='${c}' stroke-width='1.8'/><path d='M3 3L9 9' stroke='${c}' stroke-width='2' stroke-linecap='round'/>`,
leaf:`<path d='M-8 8C-8 -4 0 -9 9 -9C9 0 4 8 -8 8Z' fill='${c}'/><path d='M-8 8L3 -3' stroke='#04110a' stroke-width='1.2'/>`,
factory:`<path d='M-10 9V-1L-3 3V-1L4 3V-8H8V9Z' fill='none' stroke='${c}' stroke-width='1.8' stroke-linejoin='round'/>`,
bar:`<path d='M-10 7L-6 -6H6L10 7Z' fill='${c}'/><path d='M-5 0H5' stroke='#04110a' stroke-width='1.2'/>`,
check:`<path d='M-7 0L-2 5L7 -5' fill='none' stroke='${c}' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'/>`,
wallet:`<rect x='-11' y='-7' width='22' height='15' rx='3' fill='none' stroke='${c}' stroke-width='1.8'/><circle cx='5' cy='1' r='2' fill='${c}'/>`,
lock:`<rect x='-7' y='-2' width='14' height='11' rx='2' fill='${c}'/><path d='M-4 -2V-5A4 4 0 0 1 4 -5V-2' fill='none' stroke='${c}' stroke-width='2'/>`
}[n];return `<g transform='translate(${x} ${y}) scale(${s})'>${sh}</g>`;};
const S=(w,h,body,cap)=>`<div class='xc ig'><svg viewBox='0 0 ${w} ${h}' role='img' aria-hidden='true'><defs><marker id='ahG' viewBox='0 0 8 8' refX='6' refY='4' markerWidth='6' markerHeight='6' orient='auto'><path d='M0 0L8 4L0 8Z' fill='${GR}'/></marker><marker id='ahY' viewBox='0 0 8 8' refX='6' refY='4' markerWidth='6' markerHeight='6' orient='auto'><path d='M0 0L8 4L0 8Z' fill='${GD}'/></marker></defs>${body}</svg>${cap?`<p>${cap}</p>`:''}</div>`;

/* Overview: action to token */
const ig1=()=>{const xs=[40,113,187,260],ic=['flame','mag','ticket','coin'],cl=[GR,GR,GR,GD],lb=[['Climate','action'],['Independent','proof'],['Retired','for good'],['Token','released']];let b='';
xs.forEach((x,i)=>{if(i<3)b+=G(i+.5,AR(x+25,38,xs[i+1]-25,38,GR));
b+=G(i,C(x,38,22,{s:cl[i]})+IC(ic[i],x,38,1.15,cl[i])+C(x+17,19,7,{f:cl[i],s:'none'})+T(x+17,22,i+1,{s:8,c:'#04110a',w:700})+TL(x,76,lb[i],{s:9.5,c:i===3?GD:WH}));});
return S(300,100,b,'The whole idea: no proof, no token.');};

/* Credits */
const ig2=()=>{let b=G(0,IC('cloud',62,46,2.8,GR)+T(62,52,'1 t',{s:15,w:700})+T(62,92,co(' kept out of the air'),{s:9.5})+T(62,105,'about 500 m&sup3; of gas',{s:8.5,c:DM,w:400}))
+G(1,T(150,56,'=',{s:26,c:GR,w:700}))
+G(2,IC('cert',238,46,2.6,GD)+T(238,92,'1 carbon credit',{s:9.5,c:GD}));
return S(300,114,b);};
const ig3=()=>{let b=R(6,6,138,138,{r:10})+R(156,6,138,138,{r:10})
+T(75,24,'REMOVAL',{s:9,c:GD,ls:2})+T(225,24,'AVOIDANCE',{s:9,c:GD,ls:2});
[48,75,102].forEach((x,i)=>{b+=G(i*.4,L(x,32,x,52,{c:GR,w:1.6,m:'ahG',cl:'flow'}));});
b+=G(1,IC('tree',75,78,2.3,GR))+TL(75,118,[co(' taken out of the air'),'as the tree grows'],{s:8.5,c:DM,w:400});
b+=`<g class='grow' style='--d:1'>${R(184,50,34,52,{f:OR,s:OR,r:3})}</g><g class='grow' style='--d:2'>${R(236,82,34,20,{f:GR,s:GR,r:3})}</g>`
+L(174,102,282,102,{c:'rgba(255,255,255,.3)',w:1})+T(201,114,'Open fire',{s:8.5,c:DM,w:400})+T(253,114,'LPG stove',{s:8.5,c:DM,w:400})+T(201,45,'more '+co(),{s:8.5,c:OR})+T(253,77,'less '+co(),{s:8.5,c:GR})+T(225,132,'Less wood burned',{s:8.5,c:DM,w:400});
return S(300,150,b);};
const ig4=()=>{const xs=[30,90,150,210,270],ic=['leaf','mag','cert','person','ticket'],lb=['Project','Verifier','Issuer','Holder','Retirement'];let b='';
xs.forEach((x,i)=>{if(i<4)b+=G(i+.5,AR(x+19,24,xs[i+1]-19,24,GR));b+=G(i,C(x,24,17,{s:i===4?GD:GR})+IC(ic[i],x,24,.85,i===4?GD:GR)+T(x,60,lb[i],{s:9,c:i===4?GD:WH}));});
return S(300,70,b,'Five hands, one credit.');};
const ig5=()=>{let b=G(0,`<path d='M30 8H270V40A8 8 0 0 0 270 56V92H30V56A8 8 0 0 0 30 40Z' fill='${BG}' stroke='${GD}' stroke-width='1.6'/>`+L(206,12,206,88,{c:GD,w:1,d:'3 3'})+T(116,28,'CARBON CREDIT',{s:11,c:GD,ls:2})+T(116,43,'1 tonne '+co(),{s:9.5,w:400,c:DM})+C(238,50,11,{f:'#020507',s:GD,d:'3 3'}))
+G(1.5,`<g transform='rotate(-8 116 68)'><rect x='66' y='55' width='100' height='26' rx='4' fill='rgba(2,5,7,.75)' stroke='${GD}' stroke-width='2'/>${T(116,73,'RETIRED',{s:14,c:GD,w:700,ls:3})}</g>`);
[['Sell again',14],['Count twice',108],['Take back',202]].forEach((c,i)=>{b+=G(3+i*.5,R(c[1],104,84,24,{r:12,s:OR,f:'rgba(224,138,80,.08)'})+X(c[1]+14,116)+T(c[1]+52,119,c[0],{s:9,c:OR}));});
return S(300,140,b,'Like a punched bus ticket: used up for good.');};
const ig6=()=>{let b=G(0,C(48,56,26)+IC('building',48,56,1.5,GR)+TL(48,98,['Companies','& countries'],{s:9.5}))
+G(1,C(252,56,26,{s:GD})+IC('tree',252,56,1.5,GD)+TL(252,98,['Climate','projects'],{s:9.5,c:GD}))
+G(2,AR(80,42,220,42,GD)+T(150,34,'pay for climate action',{s:9,c:GD}))
+G(3,AR(220,72,80,72,GR)+T(150,88,'credits to count',{s:9,c:GR}));
return S(300,114,b,'Demand for credits is what pays for clean stoves and trees.');};

/* Token birth */
const ig7=()=>{const st=[['Climate action happens','stove, cactus or online payment',0],['An expert measures it','tonnes of '+co(' saved'),0],['Credits are issued','one credit for every tonne',0],['Credits are retired','ZCR, blockchain certificate',1],['Certificate to Green Vault','checked and recorded',2],['Tokens are released','vault and wallet handshake',3],['The ADN is written','receipt ties tokens to carbon',0]];
const Y=i=>26+i*38;let b=P(`M34 ${Y(0)}V${Y(6)}`,{s:GR,sw:2,cl:'draw',st:`--l:${Y(6)-Y(0)}`});
st.forEach((s,i)=>{b+=G(i*.5,C(34,Y(i),11,{s:i===6?GD:GR,f:'#06140d'})+T(34,Y(i)+3.5,i+1,{s:10,w:700,c:i===6?GD:GR})+T(56,Y(i)-2,s[0],{a:'start',s:11})+T(56,Y(i)+11,s[1],{a:'start',s:8.5,c:DM,w:400}));
if(s[2])b+=G(i*.5+.3,R(228,Y(i)-10,60,20,{r:10,s:GD,f:'rgba(212,168,48,.14)'})+IC('lock',241,Y(i),.7,GD)+T(266,Y(i)+3,'LOCK '+s[2],{s:8,c:GD,ls:.5}));});
return S(300,Y(6)+26,b,'The seven steps on one map. Gold marks the three locks.');};
const ig8=()=>{let b=G(0,R(36,6,228,118,{r:8,f:'#0b1d15',s:GD,sw:1.8})+R(42,12,216,106,{r:5,f:'none',s:GD,sw:.6,d:'3 3'})
+T(150,32,'RETIREMENT CERTIFICATE',{s:10,c:GD,ls:1.5})+T(150,45,'Zimbabwe Carbon Registry (ZCR)',{s:8.5,c:DM,w:400}));
[['Credit type',66],['Quantity',82],['Date retired',98]].forEach((f,i)=>{b+=G(1+i*.5,T(58,f[1]+3,f[0],{a:'start',s:8.5,c:DM,w:400})+R(128,f[1]-3,76,6,{r:3,f:'rgba(200,222,212,.25)',s:'none'}));});
b+=G(3,C(230,92,17,{s:GD,f:'rgba(212,168,48,.12)'})+IC('check',230,92,1.1,GD))
+G(3.5,T(22,152,'recorded on a blockchain',{a:'start',s:9,c:GR})+[0,1,2].map(k=>IC('block',196+k*28,150,.8,GR)).join('')+L(204,150,212,150,{c:GR,w:1.2})+L(232,150,240,150,{c:GR,w:1.2}));
return S(300,166,b,'Illustration of the idea only, not a real certificate.');};
const ig9=()=>{let b=G(0,IC('cert',44,40,2,GD)+T(44,76,'Certificate',{s:9.5,c:GD}))+G(1,AR(72,40,122,40,GR))
+G(2,C(164,40,32,{s:GR})+IC('vault',164,40,2.2,GR)+T(164,92,'Green Vault',{s:9.5}));
['Type','Quantity','Value'].forEach((t,i)=>{b+=G(3+i*.4,R(226,10+i*26,66,20,{r:6})+IC('check',238,20+i*26,.6,GR)+T(262,24+i*26,t,{s:9}));});
return S(300,106,b,'The vault checks the certificate, then records it.');};
const ig10=()=>{let b=G(0,C(58,38,26)+IC('vault',58,38,1.8,GR)+T(58,82,'Green Vault',{s:9.5}))+G(1,C(242,38,26,{s:GD})+IC('wallet',242,38,1.8,GD)+T(242,82,'Genesis Wallet',{s:9.5,c:GD}))
+G(2,AR(88,30,212,30,GR)+AR(212,46,88,46,GD)+T(150,64,'recorded handshake',{s:9,c:DM,w:400}))
+G(3,L(242,90,242,102,{c:GD,w:1.2,d:'3 3'}));
[0,1,2,3,4].forEach(k=>{b+=G(3.5+k*.35,IC('coin',154+k*22,114,.9,GD));});
b+=G(5.5,T(204,142,'ACCT tokens released',{s:9.5,c:GD,a:'middle'}));
return S(300,152,b);};

/* Three locks */
const ig11=()=>{const xs=[88,152,216],lb=[['Registry','certificate'],['Green','Vault'],['Blockchain','release']];let b=G(0,IC('cert',22,50,1.5,GD)+T(22,84,'Proof',{s:9.5,c:GD}));
xs.forEach((x,i)=>{b+=G(i*.5+.3,AR(i===0?40:xs[i-1]+25,50,x-25,50,GR));
b+=G(i+.5,R(x-22,28,44,44,{r:10,s:GD,f:'rgba(212,168,48,.1)'})+`<g transform='translate(${x} 50)'><rect x='-9' y='-2' width='18' height='14' rx='2.5' fill='${GD}'/><g class='shackle' style='--d:${i}'><path d='M-5 -2V-7A5 5 0 0 1 5 -7V-2' fill='none' stroke='${GD}' stroke-width='2.4'/></g></g>`+T(x,20,'LOCK '+(i+1),{s:8.5,c:GD,ls:1})+TL(x,86,lb[i],{s:9.5}));});
b+=G(2.2,AR(240,50,256,50,GR))+G(3,C(278,50,16,{s:GD,f:'rgba(212,168,48,.2)',cl:'pulse'})+IC('coin',278,50,1.3,GD)+T(278,84,'Token',{s:9.5,c:GD}))+G(4,T(150,122,'All three must open, or no token is released.',{s:10,c:GD}));
return S(300,132,b);};
const ig12=()=>{let b=R(10,74,280,44,{r:6,f:'rgba(60,40,18,.45)',s:OR,sw:1})+G(0,T(80,18,'1  Retire first',{s:10.5,c:GD})+IC('coin',80,40,1.4,GD)+AR(80,54,80,80,GD)+IC('coin',80,96,1.3,'rgba(240,208,96,.5)')+T(80,112,'buried for good',{s:8.5,c:DM,w:400}))
+G(1.5,P('M98 90C130 80 170 52 204 46',{s:GD,sw:1.4,d:'4 4',m:'ahY'})+T(140,44,'only then',{s:8.5,c:DM,w:400}))
+G(2.5,T(230,18,'2  Release second',{s:10.5,c:GR})+C(230,46,17,{s:GR,f:'rgba(56,217,128,.14)',cl:'pulse'})+IC('coin',230,46,1.4,GR));
return S(300,124,b);};
const ig13=()=>{const bars=[['Larvae','1 to 10,000',82],['Cocoons','to 100,000',62],['Caterpillars','to 500,000',44],['Then lower','every 500,000',28]];let b=L(14,112,292,112,{c:'rgba(255,255,255,.3)',w:1});
bars.forEach((r,i)=>{const x=24+i*70;b+=`<g class='grow' style='--d:${i}'>${R(x,112-r[2],52,r[2],{r:5,f:i===0?GR:'rgba(56,217,128,'+(.75-i*.18)+')',s:GR})}</g>`+T(x+26,126,r[0],{s:9.5})+T(x+26,138,r[1],{s:8,c:DM,w:400});});
b+=G(4,P('M30 22C110 12 190 24 272 50',{s:GD,sw:1.4,d:'4 4',m:'ahY'})+T(150,12,'tokens per credit go down',{s:9,c:GD}));
return S(300,148,b,'Early credits release more tokens each, later ones fewer.');};

/* Who is who */
const ig15=()=>{const cx=150,cy=125,pts=[[150,32],[238,82],[238,168],[150,208],[62,168],[62,82]],it=[['Projects &amp; verifiers','do the climate work','leaf'],['ZCR registry','retires credits','cert'],['Matason BlockSol','designs and runs it','building'],['Chengetedzai (CDC)','keeps the Green Vault','vault'],['SECZ','oversees the market','shield'],['Token holders','trace each token','person']];let b='';
pts.forEach((p,i)=>{b+=G(i*.4,L(cx,cy,p[0],p[1],{c:'rgba(56,217,128,.45)',w:1.2,cl:'flow'}));});
b+=G(0,C(cx,cy,28,{s:GD,f:'rgba(212,168,48,.14)',cl:'pulse'})+IC('coin',cx,cy-5,1.2,GD)+T(cx,cy+18,'ACCT',{s:9.5,c:GD,w:700}));
pts.forEach((p,i)=>{const side=i===0;b+=G(1+i*.5,C(p[0],p[1],19)+IC(it[i][2],p[0],p[1],.95,GR)+(side?T(p[0]+26,p[1]-2,it[i][0],{a:'start',s:9.5})+T(p[0]+26,p[1]+10,it[i][1],{a:'start',s:8,c:DM,w:400}):T(p[0],p[1]+34,it[i][0],{s:9})+T(p[0],p[1]+45,it[i][1],{s:8,c:DM,w:400})));});
return S(300,262,b,'Every party has one clear job, and the token sits at the centre.');};
const ig16=()=>{const xs=[50,150,250],ic=['building','factory','bar'],lb=[['Carbon','duties'],['Pay for','offsets'],['Scarce','reserve assets']];let b='';
xs.forEach((x,i)=>{b+=G(i,C(x,26,22,{s:GD})+IC(ic[i],x,26,1.2,GD)+TL(x,66,lb[i],{s:9.5}));});
return S(300,92,b,'Who ACCT may suit.');};


const ICMAP=[[/lock/i,'lock'],[/climate action|clean cooking|autogas/i,'flame'],[/independent|expert|verifier/i,'mag'],[/retire|retirement/i,'ticket'],[/tokens? (are )?released|a token is released|token birth|token holders|holder/i,'coin'],[/project/i,'leaf'],[/vault|chengetedzai/i,'vault'],[/zcr|registry|certificate|issuer|credits are issued|adn|asset deposit/i,'cert'],[/matason|organisations/i,'building'],[/secz/i,'shield'],[/genesis|wallet/i,'wallet'],[/removal|cactus/i,'tree'],[/avoidance/i,'leaf'],[/digital|blockchain/i,'block'],[/companies/i,'factory'],[/reserve/i,'bar'],[/credit/i,'cert'],[/burial/i,'ticket'],[/credits$/i,'cert'],[/overview|3 locks/i,'lock']];
function decorate(root){root.querySelectorAll('.xc:not(.ig):not(.xs) b').forEach(b=>{if(b.dataset.ic)return;b.dataset.ic='1';const t=b.textContent.trim();for(const m of ICMAP){if(m[0].test(t)){b.classList.add('hasico');b.insertAdjacentHTML('afterbegin',`<span class='ico'><svg viewBox='-12 -12 24 24'>${IC(m[1],0,0,1,GR)}</svg></span>`);break;}}});}
function applyIG(X){
const st=document.createElement('style');st.textContent=IG_CSS;document.head.appendChild(st);
const body=document.getElementById('xp-body');if(body){new MutationObserver(()=>decorate(body)).observe(body,{childList:true});}
const ins=(p,at,h)=>X[p].splice(at,0,h);
ins(0,3,ig1());
ins(1,6,ig6());ins(1,5,ig5());ins(1,4,ig4());ins(1,3,ig3());ins(1,2,ig2());
ins(2,9,ig10());ins(2,8,ig9());ins(2,6,ig8());ins(2,4,ig7());
ins(3,5,ig13());ins(3,3,ig12());ins(3,1,ig11());
ins(4,4,ig16());ins(4,1,ig15());
}
return applyIG;
})();
