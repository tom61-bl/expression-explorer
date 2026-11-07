const fs=require('fs');
const vm=require('vm');
const path=process.argv[2];
const html=fs.readFileSync(path,'utf8');
const script=html.match(/<script>([\s\S]*)<\/script>/)[1];

function makeEl(){
  const el={
    style:{},value:'',innerHTML:'',textContent:'',
    classList:{add(){},remove(){},toggle(){},contains(){return false}},
    querySelectorAll(){return[]},querySelector(){return makeEl()},
    addEventListener(){},removeEventListener(){},appendChild(){},removeChild(){},
    setAttribute(){},getAttribute(){return null},closest(){return makeEl()},
    focus(){},click(){},getContext(){return new Proxy({},{get:()=>()=>{}})},
    getBoundingClientRect(){return{left:0,top:0,width:100,height:100}},
    insertAdjacentHTML(){},cloneNode(){return makeEl()}
  };
  return el;
}
const elCache={};
const documentStub={
  getElementById(id){return elCache[id]||(elCache[id]=makeEl())},
  querySelector(){return makeEl()},
  querySelectorAll(){return[]},
  createElement(){return makeEl()},
  addEventListener(){},body:makeEl(),documentElement:makeEl()
};
const storeData={};
const localStorageStub={
  getItem(k){return k in storeData?storeData[k]:null},
  setItem(k,v){storeData[k]=String(v)},removeItem(k){delete storeData[k]},clear(){}
};

const ctx={
  document:documentStub,localStorage:localStorageStub,window:{},
  requestAnimationFrame(cb){return 0},cancelAnimationFrame(){},
  setInterval(){return 0},clearInterval(){},setTimeout(){return 0},clearTimeout(){},
  console,matchMedia(){return{matches:false,addEventListener(){}}},
  navigator:{userAgent:'node'},location:{href:'',reload(){}}
};
ctx.window=ctx;
ctx.globalThis=ctx;
vm.createContext(ctx);
vm.runInContext(script+'\nthis.__exp={runChecks,renderBlock,CHEAT_SHEET,FRAMEWORKS,PREFLIGHT_QUESTIONS};',ctx);
const {runChecks,renderBlock,CHEAT_SHEET,FRAMEWORKS,PREFLIGHT_QUESTIONS}=ctx.__exp;

let pass=0,fail=0;
function check(name,cond){if(cond){pass++;console.log('  PASS',name);}else{fail++;console.log('  FAIL',name);}}

const good='建议把上线时间推迟到下周五。第一，目前 32 个内测用户中只有 19 个每天使用，占比 59%，低于 80% 的标准。第二，剩余 12 个 bug 中有 3 个严重级别，修复需要 5 天。第三，推迟一周能让团队完成 2 轮回归测试。请您在今天下午 3 点前确认，我好安排资源。对您来说，推迟能避免上线后返工，节省约 4 万元的应急成本。';
const bad='因为最近情况比较复杂，我们可能大概研究一下。首先这个事情吧，我觉得效果不好，体验不佳，尽快加强优化，提升相关能力。那个应该差不多了，我们再说。';

console.log('[好文本]');
const rg=runChecks(good);
['conclusion','order','action','evidence','specific','audience'].forEach(k=>check('good.'+k+' pass',rg[k].pass===true));
check('good 每项都有 reason 和 sug',Object.values(rg).every(x=>x.reason&&x.sug));

console.log('[差文本]');
const rb=runChecks(bad);
check('bad.conclusion fail',rb.conclusion.pass===false);
check('bad.evidence fail',rb.evidence.pass===false);
check('bad.action fail',rb.action.pass===false);
check('bad.conciseness fail',rb.conciseness.pass===false);
check('bad.audience fail',rb.audience.pass===false);

console.log('[renderBlock 五种块]');
check('p',renderBlock({t:'p',text:'段落'}).includes('<p>'));
check('note',renderBlock({t:'note',text:'注'}).includes('fw-note'));
check('quote',renderBlock({t:'quote',text:'引'}).includes('fw-quote'));
check('table',renderBlock({t:'table',head:['A'],rows:[['x']]}).includes('<table>'));
const pf=renderBlock({t:'preflight'});
check('preflight 含 5 个勾选',(pf.match(/type="checkbox"/g)||[]).length===5);
check('preflight 含放行提示',pf.includes('pf-done'));
check('未知类型返回空串',renderBlock({t:'x'})==='');

console.log('[数据完整性]');
check('速查 19 条',CHEAT_SHEET.length===19);
check('速查每条 3 列',CHEAT_SHEET.every(r=>r.length===3));
check('框架 6 个',FRAMEWORKS.length===6);
check('框架 id 唯一',new Set(FRAMEWORKS.map(f=>f.id)).size===6);
check('框架都有 name/source/blocks',FRAMEWORKS.every(f=>f.name&&f.source&&Array.isArray(f.blocks)&&f.blocks.length));
check('框架 block 类型合法',FRAMEWORKS.every(f=>f.blocks.every(b=>['p','table','quote','note','preflight'].includes(b.t))));
check('table 块 head/rows 齐备',FRAMEWORKS.every(f=>f.blocks.filter(b=>b.t==='table').every(b=>b.head&&b.rows&&b.rows.length)));
check('自检 5 问',PREFLIGHT_QUESTIONS.length===5);

console.log('\n==== '+pass+' passed, '+fail+' failed ====');
process.exit(fail?1:0);
