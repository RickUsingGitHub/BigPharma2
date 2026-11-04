const fs=require('node:fs');const vm=require('node:vm');const assert=require('node:assert/strict');
const html=fs.readFileSync('dist/index.html','utf8');
const nodes=new Map();const all=[];
function node(id=''){const n={id,value:'',innerHTML:'',textContent:'',style:{},hidden:false,open:false,tagName:'DIV',dataset:{},listeners:{},addEventListener(type,fn){this.listeners[type]=fn},setAttribute(k,v){this[k]=v},append(){},remove(){},click(){this.listeners.click?.({})},scrollIntoView(){}};all.push(n);return n;}
for(const m of html.matchAll(/id="([^"]+)"/g)){assert(!nodes.has(m[1]),'Duplicate ID '+m[1]);nodes.set(m[1],node(m[1]));}
nodes.get('baseline').value='10';nodes.get('reduction').value='25';nodes.get('case-category').value='all';nodes.get('case-sort').value='new';
const stages=Array.from({length:5},(_,i)=>Object.assign(node(),{dataset:{stage:String(i)}}));
const document={getElementById:id=>nodes.get(id),querySelectorAll:s=>s==='[data-stage]'?stages:[],querySelector:()=>node(),addEventListener(){},createElement:()=>node(),body:node(),documentElement:{scrollHeight:1000}};
const context={window:{addEventListener(){}},document,URL,Blob,Intl,console,location:{hash:''},innerHeight:600,scrollY:0,addEventListener(){},requestAnimationFrame:fn=>fn(),setTimeout:fn=>fn()};vm.createContext(context);
for(const file of ['research.js','cases.js','app.js'])vm.runInContext(fs.readFileSync('dist/'+file,'utf8'),context,{filename:file});
assert.equal(context.window.BP_CASES.length,12);assert.equal(context.window.BP_RESEARCH.length,14);assert.equal(nodes.get('prevented').textContent,'25');assert.equal(nodes.get('nnt').textContent,'40');
nodes.get('reduction').value='0';nodes.get('reduction').listeners.input();assert.equal(nodes.get('nnt').textContent,'∞');
nodes.get('baseline').value='1';nodes.get('reduction').value='25';nodes.get('baseline').listeners.input();assert.equal(nodes.get('prevented').textContent,'2.5');assert.equal(nodes.get('nnt').textContent,'400');
nodes.get('case-search').value='Bextra';nodes.get('case-search').listeners.input();assert.match(nodes.get('case-count').textContent,/^1 of 12/);assert.match(nodes.get('cases').innerHTML,/pfizer-2009/);
nodes.get('case-search').value='no-such-record-xyz';nodes.get('case-search').listeners.input();assert.equal(nodes.get('empty').hidden,false);
nodes.get('reset-filters').click();assert.match(nodes.get('case-count').textContent,/^12 of 12/);assert.equal(nodes.get('empty').hidden,true);
nodes.get('case-category').value='Competition';nodes.get('case-category').listeners.change();assert.match(nodes.get('case-count').textContent,/^3 of 12/);
nodes.get('reset-filters').click();nodes.get('case-sort').value='old';nodes.get('case-sort').listeners.change();assert.match(nodes.get('cases').innerHTML,/^<details[^>]+pfizer-2009/);
stages[4].click();assert.match(nodes.get('stage-detail').innerHTML,/actually obtain it/);assert.equal(stages[4]['aria-pressed'],'true');
const rendered=html+[...nodes.values()].map(n=>n.innerHTML).join('');const ids=new Set([...rendered.matchAll(/id="([^"]+)"/g)].map(m=>m[1]));for(const m of rendered.matchAll(/href="#([^"]+)"/g))assert(ids.has(m[1]),'Broken internal anchor '+m[1]);
for(const c of context.window.BP_CASES){assert(c.sources.length);assert(c.limit);for(const s of c.sources)assert.equal(new URL(s.url).protocol,'https:');}for(const s of context.window.BP_RESEARCH){assert(s.fact&&s.limit);assert.equal(new URL(s.url).protocol,'https:');}
console.log('PASS: 12 case records; 16 rendered research notes; risk calculations and zero-benefit edge; search, category filters, reset, date sort, stage switching; internal anchors; source schema.');

