'use strict';
const {chromium}=require('playwright'),path=require('path'),assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH||'/usr/local/bin/chromium',args:['--no-sandbox']}),page=await browser.newPage({viewport:{width:1280,height:720}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));await page.addInitScript(()=>{Object.defineProperty(document,'hidden',{get:()=>false});document.hasFocus=()=>true;window.requestAnimationFrame=()=>0});
 await page.goto('file://'+path.resolve('app/index.html'));
 const result=await page.evaluate(()=>{
  const ok=(x,m)=>{if(!x)throw Error(m)};resetTransient();S=fresh();S.intros[0]=true;mode='world';settings.motion=true;enterRoom(0,0);if(cinema49)skipCinema49();closeModal();dialogue=null;puzzle=null;battle=null;S.x=500;S.y=500;
  walkable=()=>true;tileAt=()=>'.';keys={};handleWorld(.04);ok(movement51.kind==='idle','idle');
  keys={KeyD:true};handleWorld(.04);ok(movement51.kind==='walk'&&movement51.phase>0,'walk');
  const phase=movement51.phase;keys={KeyD:true,ShiftLeft:true};handleWorld(.04);ok(movement51.kind==='run'&&movement51.phase!==phase,'run');
  keys={KeyD:true};dash.cd=0;beginDash();handleWorld(.04);ok(movement51.kind==='dash'&&dash.t>0,'dash');
  dash.t=0;walkable=()=>false;handleWorld(.04);ok(movement51.kind==='idle','blocked movement must be idle');
  walkable=()=>true;keys={};handleWorld(.04);ok(movement51.kind==='idle','stop');
  const canvas=document.createElement('canvas');canvas.width=640;canvas.height=230;const c=canvas.getContext('2d');c.fillStyle='#0b1420';c.fillRect(0,0,640,230);c.imageSmoothingEnabled=false;
  const samples=[['СТОИТ','idle',0],['ШАГ 1','walk',.2],['ШАГ 2','walk',.7],['БЕГ','run',.2],['РЫВОК','dash',0]];
  for(let i=0;i<samples.length;i++){let [label,kind,p]=samples[i],small=document.createElement('canvas');small.width=50;small.height=50;let sc=small.getContext('2d');paintHero51(sc,10,8,'right',kind,p);c.drawImage(small,i*125+10,22,100,100);c.font='13px monospace';c.fillStyle='#e9d291';c.fillText(label,i*125+18,155)}
  document.body.appendChild(canvas);canvas.style='position:fixed;inset:0;z-index:10000;width:1000px;height:360px;image-rendering:pixelated';
  const pixel=(kind,p)=>{let z=document.createElement('canvas');z.width=60;z.height=60;paintHero51(z.getContext('2d'),15,10,'right',kind,p);return z.toDataURL()};
  ok(pixel('walk',.2)!==pixel('walk',.7),'walk frames identical');ok(pixel('walk',.2)!==pixel('run',.2),'run pose identical');ok(pixel('walk',.2)!==pixel('dash',0),'dash pose identical');
  settings.motion=false;movement51.kind='run';S.x=100;S.y=100;S.lantern=false;inv=0;ctx.clearRect(0,0,cv.width,cv.height);drawPlayer(0);const offRun=cv.toDataURL();ctx.clearRect(0,0,cv.width,cv.height);movement51.kind='dash';drawPlayer(0);ok(cv.toDataURL()===offRun,'reduced-motion state differs');
  return {walk:true,run:true,dash:true,blocked:true,reducedMotion:true,frames:true};
 });
 await page.screenshot({path:process.env.MOVEMENT_SCREENSHOT||'/data/lowertale-movement51.png'});assert.deepEqual(errors,[]);console.log('PASS',JSON.stringify(result));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
