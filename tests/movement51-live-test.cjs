'use strict';
const {chromium}=require('playwright'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH||'/usr/local/bin/chromium',args:['--no-sandbox']}),page=await browser.newPage({viewport:{width:1280,height:720},reducedMotion:'no-preference'}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));await page.addInitScript(()=>{Object.defineProperty(document,'hidden',{get:()=>false});document.hasFocus=()=>true});
 await page.goto('file://'+path.resolve('app/index.html'));
 await page.evaluate(()=>{resetTransient();S=fresh();S.intros[0]=true;mode='world';settings.motion=true;$('title').classList.add('hidden');$('game').classList.remove('hidden');enterRoom(0,0);if(cinema49)skipCinema49();closeModal();dialogue=null;puzzle=null;battle=null;S.x=500;S.y=500;walkable=()=>true;tileAt=()=>'.';window.frames51=[];const paint=paintHero51;paintHero51=function(...args){window.frames51.push({kind:args[4],phase:args[5]});if(window.frames51.length>1000)window.frames51.shift();return paint(...args)}});
 await page.keyboard.down('d');await page.waitForFunction(()=>movement51.kind==='walk');await page.waitForTimeout(350);
 const walking=await page.evaluate(()=>window.frames51.filter(f=>f.kind==='walk'));assert(walking.length>4);assert(new Set(walking.map(f=>Math.floor(f.phase*4))).size>=2,'Walking did not visibly cycle');
 await page.keyboard.down('Shift');await page.waitForFunction(()=>movement51.kind==='run');await page.waitForTimeout(200);assert((await page.evaluate(()=>window.frames51.filter(f=>f.kind==='run').length))>2,'Running not rendered');
 await page.keyboard.press('Space');await page.waitForFunction(()=>window.frames51.some(f=>f.kind==='dash'),null,{timeout:3000});
 await page.keyboard.up('Shift');await page.keyboard.up('d');await page.waitForFunction(()=>movement51.kind==='idle',null,{timeout:3000});
 await page.screenshot({path:'/data/lowertale-classic-world.png'});
 assert.deepEqual(errors,[]);console.log('PASS actual keyboard, rendered walking frames, running, dash and stop');await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
