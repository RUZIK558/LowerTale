'use strict';
// Hand-drawn pixel actors. Their drawing is cosmetic: hitboxes and movement stay unchanged.
const HERO50=[
'......hhhhhh......',
'....hhhhhhhhhh....',
'...hHHhhhhhhHhh...',
'...hHhhhhhHHHhh...',
'..hhhsshhsssshh...',
'..hHssessessHhh...',
'...hssssssssh.....',
'....ssSPPsss......',
'.....ssssss.......',
'....gGGGGGGg......',
'...gGbbbbbbGg.....',
'..gGbbbbbbbgGg....',
'..gGbbbppbbgGg....',
'..gGbbbbpbbgGg....',
'..ggbbbbpbbggg....',
'..ggbbbbpbbggg....',
'...gbbbbbbbbg.....',
'...gbbbbbbbbg.....',
'...ggbbbbbbgg.....',
'....kkk..kkk......',
'....kkk..kkk......',
'...kkkk..kkkk.....',
'...KKKK..KKKK.....',
'..................'];
const PERSON50=[
'......hhhhhh......',
'....hhhhhhhhhh....',
'...hHHhhhhhhHhh...',
'..hhhhhHHhhhhhhh..',
'..hhsssssssshhhh..',
'..hssessessshhhh..',
'..hhssssssshhhhh..',
'..hHsssPssshHhhh..',
'..hhssssssshhhhh..',
'..hhgGGGGgghhhhh..',
'..hGgbbbbGghhhhh..',
'..gGbbbbbbGghhhh..',
'..gGbbppbbGghhhh..',
'..gGbbbpbbGghhhh..',
'..ggbbbpbbgg.hh...',
'...gbbbbbbbg......',
'...gbbbbbbbg......',
'...gbbbbbbbg......',
'..ggbbbbbbbgg.....',
'....kkk..kkk......',
'....kkk..kkk......',
'...kkkk..kkkk.....',
'...KKKK..KKKK.....',
'..................'];
const ROBOT50=[
'..................','......kkkkkk......','.....kGGGGGGk.....','....kGGGGGGGGk....','....kGggGGggGk....','....kGeeeeeeGk....','....kGgGGGGgGk....','.....kGGGGGGk.....','......kggggk......','....kkGGGGGGkk....','...kGgGbbbbGgGk...','..kGgGbbppbbGgGk..','..kGgGbbppbbGgGk..','..kGgGbbggbbGgGk..','..kkkGbbbbbbGkkk..','...kkGbbbbbbGkk...','.....GbbbbbbG.....','....kGGGGGGGGk....','....kkkk..kkkk....','....kGGk..kGGk....','....kGGk..kGGk....','...kkGGk..kGGkk...','...kkkkk..kkkkk...','..................'];
const ROBOT_PAL50={k:'#3e3832',g:'#7c6c4b',G:'#c3a66a',b:'#756546',p:'#e7d4a0',e:'#9be0db'};
const HERO_PAL50={h:'#1b2431',H:'#39404a',s:'#e3b691',S:'#f3d4ab',e:'#181e27',P:'#bd7c71',g:'#182b35',G:'#53726d',b:'#29464a',p:'#d9b269',k:'#1a222e',K:'#536069'};
const NPC_PAL50={h:'#211f2a',H:'#514052',s:'#e7bf9c',e:'#252233',P:'#c7807e',g:'#26313f',G:'#778b8c',b:'#394958',p:'#d7b87b',k:'#202633',K:'#596271'};
function paintActor50(c,sprite,pal,x,y,scale,frame=0,face='down'){
 c.save(); if(face==='right'){c.translate(x+18*scale,y);c.scale(-1,1);x=0;y=0}
 for(let r=0;r<sprite.length;r++)for(let j=0;j<18;j++){let k=sprite[r][j];if(face==='up'&&r>=4&&r<=8&&'seSP'.includes(k))k='h';if(frame&&r>=19&&r<=22){const shift=j<9?1:-1;k=sprite[r][j+shift]||'.'}if(pal[k]){c.fillStyle=pal[k];c.fillRect(Math.round(x+j*scale),Math.round(y+r*scale),Math.ceil(scale),Math.ceil(scale))}}
 c.restore()
}
drawPlayer=function(t){ctx.fillStyle='#0006';ctx.fillRect(S.x-13,S.y-4,26,7);if(inv>0&&Math.floor(t/80)%2)return;const bob=settings.motion?(S.moving?Math.sin(t/90)*1.1:Math.sin(t/800)*.6):0,scale=1.5;paintActor50(ctx,HERO50,HERO_PAL50,S.x-13.5,S.y-34+bob,scale,settings.motion&&S.moving&&Math.floor(t/140)%2,S.face);if(S.lantern){const x=S.x+(S.face==='left'?-16:16),y=S.y-15+bob;ctx.save();let g=ctx.createRadialGradient(x,y,1,x,y,settings.motion?25+Math.sin(t/180)*2:25);g.addColorStop(0,'#f9cc6966');g.addColorStop(1,'#f9cc6900');ctx.fillStyle=g;ctx.fillRect(x-28,y-28,56,56);ctx.fillStyle='#614f38';ctx.fillRect(x-3,y-7,6,9);ctx.fillStyle='#ffd98b';ctx.fillRect(x-2,y-5,4,5);ctx.restore()}};
const previousEntity50=drawEntity;
drawEntity=function(e,t){if(e.type!=='npc')return previousEntity50(e,t);const bob=settings.motion?Math.sin(t/650+e.x)*.8:0;ctx.fillStyle='#0006';ctx.fillRect(e.x-12,e.y-4,24,7);paintActor50(ctx,PERSON50,{...NPC_PAL50,G:CHAPTERS[S.chapter].color},e.x-13.5,e.y-34+bob,1.5,0,'down')};
drawRobot=function(x,y,t){const bob=settings.motion?Math.sin(t/420)*.7:0;ctx.fillStyle='#0006';ctx.fillRect(x-10,y-3,20,5);paintActor50(ctx,ROBOT50,ROBOT_PAL50,x-10,y-27+bob,1.1,settings.motion&&Math.floor(t/200)%2,'down')};
const oldPeopleEntity50=drawEntity;
drawEntity=function(e,t){if(e.type!=='merchant39'&&e.type!=='villager39')return oldPeopleEntity50(e,t);if(e.type==='merchant39'){ctx.fillStyle='#513d35';ctx.fillRect(e.x-26,e.y-39,52,9);ctx.fillStyle='#c59c69';ctx.fillRect(e.x-28,e.y-42,56,5);ctx.fillStyle='#f1d28c';ctx.font='11px monospace';ctx.textAlign='center';ctx.fillText('ЛАВКА',e.x,e.y-48);ctx.textAlign='start'}const pal={...NPC_PAL50,b:e.type==='merchant39'?'#8c6848':'#527e75',G:e.type==='merchant39'?'#d3a96a':'#97b5a4',h:'#493b39'};paintActor50(ctx,PERSON50,pal,e.x-13.5,e.y-34+(settings.motion?Math.sin(t/650+e.x)*.6:0),1.5)};
const oldPortrait50=paintDialogue;
paintDialogue=function(){oldPortrait50();if(!dialogue)return;const sp=speakerFor(dialogue.pages[dialogue.i]);if(sp.name==='ПОСЛЕДНИЙ ПОЕЗД')return;const canvas=$('portrait').querySelector('canvas');if(!canvas)return;const pc=canvas.getContext('2d');pc.clearRect(0,0,64,64);const robot=sp.name.includes('КЛЁПКА');paintActor50(pc,robot?ROBOT50:PERSON50,robot?ROBOT_PAL50:NPC_PAL50,10,2,2.5)};
