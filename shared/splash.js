
(function(){
var l=document.getElementById('load'),sp=document.getElementById('intro');if(!sp)return;
var LG='https://www.spartangold.africa/assets/logo.jpeg',si=sp.querySelector('img');si.onerror=function(){si.onerror=null;si.src='../shared/logo.svg'};si.src=LG;var vi=document.querySelector('#vg img');if(vi){vi.onerror=function(){vi.onerror=null;vi.src='../shared/logo.svg'};vi.src=LG}
var HOLD=5000,t0=performance.now(),held=false,tm=0,ctx=null,AC=window.AudioContext||window.webkitAudioContext;
function el(){return (performance.now()-t0)/1000}
function noise(c){var n=c.sampleRate*2,b=c.createBuffer(1,n,c.sampleRate),d=b.getChannelData(0),p=0;for(var i=0;i<n;i++){p=p*.92+(Math.random()*2-1)*.08;d[i]=p*3.2}return b}
function sound(e0){
 var c=ctx,T=c.currentTime-e0,m=c.createGain();m.gain.value=.55;m.connect(c.destination);
 var s=c.createBufferSource();s.buffer=noise(c);s.loop=true;
 var bp=c.createBiquadFilter();bp.type='bandpass';bp.Q.value=3.5;
 bp.frequency.setValueAtTime(260,T+.9);bp.frequency.exponentialRampToValueAtTime(1900,T+1.65);bp.frequency.exponentialRampToValueAtTime(420,T+2.4);
 var g=c.createGain();g.gain.setValueAtTime(0,T+.9);g.gain.linearRampToValueAtTime(.7,T+1.4);g.gain.linearRampToValueAtTime(.5,T+2);g.gain.linearRampToValueAtTime(0,T+2.45);
 s.connect(bp);bp.connect(g);
 if(c.createStereoPanner){var pn=c.createStereoPanner();pn.pan.setValueAtTime(0,T+.9);pn.pan.linearRampToValueAtTime(1,T+1.275);pn.pan.linearRampToValueAtTime(0,T+1.65);pn.pan.linearRampToValueAtTime(-1,T+2.025);pn.pan.linearRampToValueAtTime(0,T+2.4);g.connect(pn);pn.connect(m)}else g.connect(m);
 s.start(Math.max(c.currentTime,T+.9));s.stop(T+2.5);
 [[1,.5,2.4],[2,.18,1.8],[2.76,.26,1.5],[5.4,.1,.8]].forEach(function(p){var o=c.createOscillator(),e=c.createGain(),t=T+2.6;o.type='sine';o.frequency.value=2093*p[0];e.gain.setValueAtTime(0,t);e.gain.linearRampToValueAtTime(p[1],t+.006);e.gain.exponentialRampToValueAtTime(.0001,t+p[2]);o.connect(e);e.connect(m);o.start(Math.max(c.currentTime,t));o.stop(t+p[2]+.1)})
}
function handover(){
 var lg=sp.querySelector('.lg'),c=l.querySelector('.startcard');if(!c)return;mo.disconnect();
 c.style.animation='none';var cr=c.getBoundingClientRect(),a=lg.getBoundingClientRect();
 l.style.visibility='visible';c.style.animation='';
 var tw=window.innerWidth<=760?48:68;
 sp.classList.add('dock');
 lg.animate([{transform:'none'},{transform:'translateY('+((cr.bottom+16+tw/2)-(a.top+a.height/2))+'px) scale('+(tw/a.width)+')'}],{duration:1000,easing:'cubic-bezier(.3,.7,.2,1)',fill:'forwards'});
}
var mo=new MutationObserver(function(){
 if(l.querySelector('.startcard')){if(!held){held=true;clearTimeout(tm);tm=setTimeout(handover,Math.max(0,t0+HOLD-performance.now()))}}
 else if(l.textContent){mo.disconnect();l.style.visibility='visible';sp.remove()}
});
if(window.MutationObserver){mo.observe(l,{childList:true,characterData:true,subtree:true});
 new MutationObserver(function(){if(l.style.opacity==='0'){sp.style.opacity='0';setTimeout(function(){sp.remove()},600)}}).observe(l,{attributes:true,attributeFilter:['style']})}
try{if(AC){ctx=new AC();
 var done=false;
 if(ctx.state==='running'){done=true;sound(el())}else{
 var ev=['pointerdown','touchend','click','keydown'];
 var go=function(){if(done)return;ctx.resume().then(function(){if(done)return;done=true;ev.forEach(function(n){document.removeEventListener(n,go,true)});var e=el();sound(e<=3.4?e:1.2)}).catch(function(){})};
 ev.forEach(function(n){document.addEventListener(n,go,true)})}}}catch(e){}
})();
