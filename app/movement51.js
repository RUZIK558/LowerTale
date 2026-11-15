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
// Reuse the original 12×10 sprites and palette so the cast keeps its classic look.
const HERO_CLASSIC_PAL51={...PL.c,b:'#3d9992',p:'#edbe7c'};
function heroPose51(kind,phase){
 if(kind==='dash')return {left:-1,right:1,ly:0,ry:0,bob:-1};
 if(kind!=='walk'&&kind!=='run')return {left:0,right:0,ly:0,ry:0,bob:0};
 const frame=Math.floor(((phase%1+1)%1)*4),wide=1,lift=1;
 return frame===0?{left:-wide,right:0,ly:0,ry:-lift,bob:-1}:frame===1?{left:-1,right:1,ly:0,ry:0,bob:0}:frame===2?{left:0,right:wide,ly:-lift,ry:0,bob:-1}:{left:-1,right:1,ly:0,ry:0,bob:0};
}
function paintHero51(c,x,y,face,kind,phase){
 const scale=2.5,pose=heroPose51(kind,phase),sprite=face==='up'?PLU1:(face==='left'||face==='right')?PLL1:PLD1,flip=face==='right';
 c.save();
 for(let row=0;row<sprite.length;row++)for(let col=0;col<sprite[row].length;col++){
  const color=HERO_CLASSIC_PAL51[sprite[row][col]];if(!color)continue;
  let dx=0,dy=pose.bob;
  if(row===sprite.length-1){const left=col<6;dx=left?pose.left:pose.right;dy=pose.bob+(left?pose.ly:pose.ry)}
  else if((kind==='dash'||kind==='run')&&row<6&&(face==='left'||face==='right'))dx=-1;
  const px=flip?11-col-dx:col+dx;
  c.fillStyle=color;c.fillRect(Math.round(x+px*scale),Math.round(y+(row+dy)*scale),scale+.35,scale+.35);
 }
 c.restore();
}
drawPlayer=function(t){
 const visual=settings.motion?movement51.kind:'idle',phase=movement51.phase,face=S.face||'down';
 ctx.fillStyle='#0006';ctx.fillRect(S.x-13,S.y-4,26,7);
 // Dash invulnerability should not make the entire dash invisible.
 if(inv>0&&dash.t<=0&&Math.floor(t/80)%2)return;
 if(settings.motion&&visual==='dash'){
  ctx.save();ctx.globalAlpha=.18;paintHero51(ctx,S.x-15-dash.x*15,S.y-27-dash.y*15,face,'dash',phase);
  ctx.globalAlpha=.09;paintHero51(ctx,S.x-15-dash.x*27,S.y-27-dash.y*27,face,'dash',phase);ctx.restore();
 }
 const idleBob=settings.motion&&visual==='idle'?Math.sin(t/800)*.6:0;
 paintHero51(ctx,S.x-15,S.y-27+idleBob,face,visual,phase);
 if(S.lantern){const pose=heroPose51(visual,phase),swing=settings.motion&&(visual==='walk'||visual==='run')?Math.sin(phase*Math.PI*2)*2:0,x=S.x+(face==='left'?-16:16)+swing,y=S.y-15+idleBob+pose.bob;
  ctx.save();const radius=settings.motion?25+Math.sin(t/180)*2:25,g=ctx.createRadialGradient(x,y,1,x,y,radius);g.addColorStop(0,'#f9cc6966');g.addColorStop(1,'#f9cc6900');ctx.fillStyle=g;ctx.fillRect(x-28,y-28,56,56);ctx.fillStyle='#614f38';ctx.fillRect(x-3,y-7,6,9);ctx.fillStyle='#ffd98b';ctx.fillRect(x-2,y-5,4,5);ctx.restore();
 }
};
