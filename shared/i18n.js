// Spartan Gold language support: EN (default), ZH, FR, PT
export const LANGS={en:{name:'English',tag:'en-US',pre:'en'},zh:{name:'中文',tag:'zh-CN',pre:'zh'},fr:{name:'Français',tag:'fr-FR',pre:'fr'},pt:{name:'Português',tag:'pt-PT',pre:'pt'}};
export const BASE='https://cdn.jsdelivr.net/gh/360Zimbabwe/spartan-gold-3d@8044036030a967d8e74408a2438937c55293d515/shared/lang/';
export function getLang(){var l='en';try{l=localStorage.getItem('sgLang')||'en'}catch(e){}return LANGS[l]?l:'en'}
export function setLang(l){try{localStorage.setItem('sgLang',l)}catch(e){}}
export async function loadDict(l){if(l==='en')return null;var r=await fetch((window.SG_LANG_BASE||BASE)+l+'.json');if(!r.ok)throw new Error('lang HTTP '+r.status);return r.json()}
function dec(k){return k.replace(/\\x([0-9A-Fa-f]{2})/g,function(_,h){return String.fromCharCode(parseInt(h,16))}).replace(/\\u([0-9A-Fa-f]{4})/g,function(_,h){return String.fromCharCode(parseInt(h,16))}).replace(/\\n/g,'\n').replace(/\\"/g,'"').replace(/\\\\/g,'\\')}
const norm=function(s){return s.replace(/\s+/g,' ').trim()};
export function makeMap(dict,extra){var m=new Map();for(var k in dict){var v=dict[k].replace(/\[\[|\]\]/g,'');m.set(norm(dec(k)),v);}
 if(extra)for(var k2 in extra)m.set(norm(k2),extra[k2]);return m}
export function patchSource(src,dict,only){ // replace "literal" string tokens in minified JS
 for(var k in dict){var tok='"'+k+'"';if(only&&only.indexOf(k)<0)continue;if(src.indexOf(tok)<0)continue;var v=dict[k].replace(/\[\[|\]\]/g,'');src=src.split(tok).join(JSON.stringify(v))}
 return src}
export function translateDOM(root,map,dict){
 var tr=function(t){var n=norm(t);if(!n)return null;var v=map.get(n);if(v!==undefined)return t.match(/^\s*/)[0]+v+t.match(/\s*$/)[0];
  var m=t.match(/^(\s*(?:[·•|]\s*)?)([\s\S]*?)(\s*(?:[·•|]\s*)?)$/);if(m){var n2=norm(m[2]);var v2=map.get(n2);if(v2!==undefined)return m[1]+v2+m[3]}return null};
 var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null),nodes=[],x;while(x=w.nextNode()){var p=x.parentNode&&x.parentNode.nodeName;if(p==='SCRIPT'||p==='STYLE')continue;nodes.push(x)}
 nodes.forEach(function(t){var r=tr(t.nodeValue);if(r!==null&&r!==t.nodeValue)t.nodeValue=r});
 var els=root.querySelectorAll?root.querySelectorAll('[title],[aria-label],[placeholder],[alt]'):[];
 els.forEach(function(e){['title','aria-label','placeholder','alt'].forEach(function(a){var v=e.getAttribute(a);if(v){var n=norm(v),r=map.get(n);if(r!==undefined&&r!==v)e.setAttribute(a,r)}})});
}
// "Inside a [[jaw crusher]]" heading: full title in dict has [[ ]] around the highlighted part
export function translateHeading(h,dict){var span=h.querySelector('span');if(!span)return;var full=norm(h.textContent);
 for(var k in dict){var v=dict[k];if(v.indexOf('[[')<0)continue;if(norm(dec(k))===full){var m=v.match(/^([\s\S]*?)\[\[([\s\S]*?)\]\]([\s\S]*)$/);if(!m)return;h.textContent='';h.appendChild(document.createTextNode(m[1]));var s=document.createElement('span');s.textContent=m[2];h.appendChild(s);h.appendChild(document.createTextNode(m[3]));return}}}

export const ENGX={zh:[['\\u25B6 Start with voice','\\u25B6 \u5f00\u59cb\uff08\u5e26\u8bb2\u89e3\uff09'],['>Start silent<','>\u9759\u97f3\u5f00\u59cb<']],fr:[['\\u25B6 Start with voice','\\u25B6 D\u00e9marrer avec la voix'],['>Start silent<','>D\u00e9marrer en silence<']],pt:[['\\u25B6 Start with voice','\\u25B6 Come\u00e7ar com voz'],['>Start silent<','>Come\u00e7ar em sil\u00eancio<']]};
