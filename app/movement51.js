'use strict';
// Cosmetic movement state is derived from actual travel, not key presses. It is
// deliberately transient: it never changes physics, saves, or combat hitboxes.
let movement51={actor:null,room:'',kind:'idle',phase:0};
const beforeMovement51=handleWorld;
handleWorld=function(dt){
 const actor=S,wasActive=actor&&mode==='world'&&!battle&&!puzzle&&!dialogue&&!modalOpen()&&!document.hidden;
 const x=actor?.x,y=actor?.y,room=actor?keyRoom():'',dashing=dash.t>0;
 beforeMovement51(dt);
 if(!wasActive||S!==actor||mode!=='world'||battle||puzzle||dialogue||modalOpen()||document.hidden||keyRoom()!==room){movement51={actor:S,room:S?keyRoom():'',kind:'idle',phase:0};return}
 const distance=Math.hypot(S.x-x,S.y-y),speed=dt>0?distance/dt:0;
 // Teleports and room transitions do not become spurious running animations.
 const moved=Number.isFinite(speed)&&distance>.03&&distance<40;
 let kind=!moved?'idle':dashing||dash.t>0?'dash':speed>175?'run':'walk';
 if(movement51.actor!==actor||movement51.room!==room)movement51={actor,room,kind:'idle',phase:0};
 movement51.kind=kind;
 if(moved&&kind!=='dash')movement51.phase=(movement51.phase+distance/(kind==='run'?94:90))%1;
};
const gait51=[
 {l:-1,r:1,ly:0,ry:0,arm:0,bob:0},
 {l:-2,r:1,ly:0,ry:-1,arm:1,bob:-1},
 {l:-2,r:1,ly:0,ry:-2,arm:1,bob:-1},
 {l:-1,r:1,ly:0,ry:0,arm:0,bob:0},
 {l:-1,r:2,ly:-1,ry:0,arm:-1,bob:-1},
 {l:-1,r:2,ly:-2,ry:0,arm:-1,bob:-1}
];
function heroPose51(kind,phase){
 if(kind==='dash')return {l:-3,r:3,ly:-1,ry:-2,arm:1,bob:-1};
 if(kind==='walk'||kind==='run'){const p=gait51[Math.floor((phase%1+1)%1*gait51.length)];return kind==='run'?{...p,l:p.l-1,r:p.r+1,arm:p.arm*2}:p}
 return {l:0,r:0,ly:0,ry:0,arm:0,bob:0};
}
function paintHero51(c,x,y,face,kind,phase){
 const scale=1.5,pose=heroPose51(kind,phase),lean=kind==='dash'||kind==='run'?(face==='left'?-1:face==='right'?1:0):0;
 c.save();c.translate(Math.round(x),Math.round(y));
 if(face==='right'){c.translate(18*scale,0);c.scale(-1,1)}
 for(let row=0;row<23;row++)for(let col=0;col<18;col++){
  let pixel=HERO50[row][col];if(face==='up'&&row>=4&&row<=8&&'seSP'.includes(pixel))pixel='h';
  if(!HERO_PAL50[pixel])continue;
  let dx=0,dy=pose.bob;
  if(row>=19){const left=col<9;dx=left?pose.l:pose.r;dy=left?pose.ly:pose.ry}
  else if(row>=10&&row<=16&&(col<4||col>=13)){dy+=col<4?pose.arm:-pose.arm}
  if(lean&&row<19)dx-=1;
  c.fillStyle=HERO_PAL50[pixel];c.fillRect(Math.round((col+dx)*scale),Math.round((row+dy)*scale),Math.ceil(scale),Math.ceil(scale));
 }
 c.restore();
}
drawPlayer=function(t){
 const visual=settings.motion?movement51.kind:'idle',phase=movement51.phase,face=S.face||'down';
 ctx.fillStyle='#0006';ctx.fillRect(S.x-13,S.y-4,26,7);
 // Dash invulnerability should not make the entire dash invisible.
 if(inv>0&&dash.t<=0&&Math.floor(t/80)%2)return;
 if(settings.motion&&visual==='dash'){
  ctx.save();ctx.globalAlpha=.18;paintHero51(ctx,S.x-13.5-dash.x*15,S.y-34-dash.y*15,face,'dash',phase);
  ctx.globalAlpha=.09;paintHero51(ctx,S.x-13.5-dash.x*27,S.y-34-dash.y*27,face,'dash',phase);ctx.restore();
 }
 const idleBob=settings.motion&&visual==='idle'?Math.sin(t/800)*.6:0;
 paintHero51(ctx,S.x-13.5,S.y-34+idleBob,face,visual,phase);
 if(S.lantern){const pose=heroPose51(visual,phase),swing=settings.motion&&(visual==='walk'||visual==='run')?pose.arm*1.5:0,x=S.x+(face==='left'?-16:16)+swing,y=S.y-15+idleBob+pose.bob;
  ctx.save();const radius=settings.motion?25+Math.sin(t/180)*2:25,g=ctx.createRadialGradient(x,y,1,x,y,radius);g.addColorStop(0,'#f9cc6966');g.addColorStop(1,'#f9cc6900');ctx.fillStyle=g;ctx.fillRect(x-28,y-28,56,56);ctx.fillStyle='#614f38';ctx.fillRect(x-3,y-7,6,9);ctx.fillStyle='#ffd98b';ctx.fillRect(x-2,y-5,4,5);ctx.restore();
 }
};
