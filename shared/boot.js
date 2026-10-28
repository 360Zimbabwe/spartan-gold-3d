(function(){var L='https://www.spartangold.africa/assets/logo.jpeg',i=document.querySelector('#vg img');if(i){i.onerror=function(){i.onerror=null;i.src='../shared/logo.svg'};i.src=L}})();
(async()=>{var step='start';try{
step='webgl';var gl=document.createElement('canvas').getContext('webgl2')||document.createElement('canvas').getContext('webgl');if(!gl)throw new Error('WebGL is not available in this browser (graphics acceleration off or blocked)');
step='engine files';const N=11,ps=[];for(let i=0;i<N;i++)ps.push(fetch('../shared/eng/p'+String(i).padStart(2,'0')+'.txt').then(r=>{if(!r.ok)throw new Error('HTTP '+r.status+' on p'+i);return r.text()}));
const eng=(await Promise.all(ps)).join('').split('"#04060b"').join('"#0a1a5a"').split('"#06090f"').join('"#0b1f67"');const eu=URL.createObjectURL(new Blob([eng],{type:'text/javascript'}));
step='app file';let app=await (await fetch('app.js')).text();app=app.split('"../shared/engine-X4OBJFUI.js"').join('"'+eu+'"');
step='starting scene';await import(URL.createObjectURL(new Blob([app],{type:'text/javascript'})));
}catch(x){var l=document.getElementById('load');if(l){l.style.visibility='visible';l.style.flexDirection='column';l.style.gap='8px';l.style.textAlign='center';l.style.padding='20px';l.innerHTML='Could not load the 3D scene.<br><small style="opacity:.85">Step: '+step+' | '+String(x&&x.message||x).replace(/</g,'&lt;').slice(0,300)+'</small><br><small style="opacity:.7">'+navigator.userAgent.slice(0,120).replace(/</g,'&lt;')+'</small>'}console.error(step,x)}})();
