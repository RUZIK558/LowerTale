'use strict';
const DIFFICULTY_NAMES={story:'Сюжетная',normal:'Обычная',hard:'Сложная'};
function difficultyNow(){return ['story','normal','hard'].includes(settings.difficulty)?settings.difficulty:'normal'}
const openPuzzle32=openPuzzle;
openPuzzle=function(c,r){if(!Number.isInteger(c)||!CHAPTERS[c]||!Number.isInteger(r)||r<1||r>8){toast('Этот узел недоступен. Открой карту района.');return}const k=keyRoom(c,r),old=S.puzzleStates[k],changed=false,hints=old?.hints||0;if(changed)delete S.puzzleStates[k];openPuzzle32(c,r);if(puzzle){puzzle.difficulty=puzzle.difficulty||'normal';if(changed||puzzle.hints<hints){puzzle.hints=Math.max(puzzle.hints,hints);puzzle.notice='Режим изменён: схема пересоздана. Полученные подсказки сохранены.';renderPuzzle();cStash()}}};
const openScene32=openScene;
openScene=function(c,r){if(!Number.isInteger(c)||!CHAPTERS[c]||!Number.isInteger(r)||r<1||r>6)return;const k=keyRoom(c,r),old=S.missionStates[k],changed=false,hints=old?.hints||0;if(changed)delete S.missionStates[k];openScene32(c,r);if(mission&&(changed||mission.hints<hints)){mission.hints=Math.max(hints,mission.hints);mission.message='Задача обновлена под текущую сложность. Прежний счётчик подсказок сохранён.';renderScene();stashScene()}};
const safeEnter32=enterRoom;
enterRoom=function(c,r,entry='start'){if(!S||!Number.isInteger(c)||c<0||c>=CHAPTERS.length||!Number.isInteger(r)||r<0||r>=12){toast('Переход недоступен. Текущая позиция сохранена.');return false}safeEnter32(c,r,['start','W','E','N','S'].includes(entry)?entry:'start');return true};
const interact32=interact;
interact=function(id){if(typeof id!=='string')return;if(id.startsWith('door:')&&(!GRAPH[S?.room]||!Number.isInteger(GRAPH[S.room][id.split(':')[1]]))){toast('Здесь нет выхода в эту сторону.');return}interact32(id)};
const writeSlot32=writeSlot;
writeSlot=function(slot='auto'){if(puzzle&&S)S.puzzleStates[keyRoom(puzzle.c,puzzle.r)]=serialPuzzle(puzzle);if(mission&&S){const m=clone(mission);m.listening=false;m.flash=-1;m.history=m.history.slice(-50);S.missionStates[keyRoom(m.c,m.r)]=m}return writeSlot32(slot)};
function decorateTask32(){const board=$('contour-board')||$('scene-board');if(!board)return;const task=puzzle||mission;if(!task)return;const badge=document.createElement('div');badge.className='task-mode';badge.innerHTML='<span class="live-dot"></span>'+DIFFICULTY_NAMES[task.difficulty||'normal']+' задача <span>U · отмена / H · помощь</span>';$('panel-body').prepend(badge);$('panel').dataset.task=task.type||task.kind;}
const renderPuzzle32=renderPuzzle;
renderPuzzle=function(){renderPuzzle32();decorateTask32()};
const renderScene32=renderScene;
renderScene=function(){renderScene32();decorateTask32()};
const openModal32=openModal;
openModal=function(k,t,b){delete $('panel').dataset.task;openModal32(k,t,b);$('panel').classList.remove('panel-arrive');void $('panel').offsetWidth;$('panel').classList.add('panel-arrive')};
// Keep focus within the active dialog; Escape and puzzle shortcuts retain their behaviour.
window.addEventListener('keydown',e=>{if(e.code!=='Tab'||!modalOpen())return;const a=[...$('panel').querySelectorAll('button:not(:disabled),input:not(:disabled),[tabindex="0"]')].filter(el=>el.getClientRects().length);if(!a.length)return;const i=a.indexOf(document.activeElement);if(e.shiftKey&&i<=0){e.preventDefault();a.at(-1).focus()}else if(!e.shiftKey&&(i<0||i===a.length-1)){e.preventDefault();a[0].focus()}},true);
const hud32=updateHUD;
updateHUD=function(){hud32();if(!S)return;document.documentElement.style.setProperty('--chapter-accent',CHAPTERS[S.chapter].color);let status=$('route-status');if(!status){status=document.createElement('div');status.id='route-status';$('game-head').insertBefore(status,$('game-head').lastElementChild)}const n=mainSolved(S.chapter);status.innerHTML='<span class="live-dot"></span> '+DIFFICULTY_NAMES[difficultyNow()]+' <span class="status-divider">/</span> '+(CHAPTERS[S.chapter].contour?'Контуры':'Сцены')+' <b>'+n+'/6</b>';let meters=$('journey-meters');if(!meters){meters=document.createElement('div');meters.id='journey-meters';$('view').append(meters)}meters.innerHTML='<span>◆ <b>'+S.coins+'</b> осколков</span><span>◈ <b>'+Object.keys(S.memories).length+'</b> записей</span><span>Помощь <b>'+S.hintCount+'</b></span>';let label=$('goal-caption');if(!label){label=document.createElement('small');label.id='goal-caption';label.textContent='ТЕКУЩАЯ ЗАДАЧА';$('objective').before(label);const wrap=document.createElement('div');wrap.id='goal-card';label.before(wrap);wrap.append(label,$('objective'))}const abilities=[['Пробел','Рывок',dash.cd>0?'зарядка':'готов'],['L','Фонарь',S.lantern?'включён':'выключен'],['C','Полярность',S.chapter>=1?(S.polarity?'янтарь':'лазурь'):'глава 2'],['Q','Копия',S.chapter>=2?'доступна':'глава 3'],['G','Крюк',S.chapter>=3?'доступен':'глава 4']];$('ability-line').innerHTML=abilities.map(([k,l,v])=>'<span class="ability-chip"><kbd>'+k+'</kbd><b>'+l+'</b><small>'+v+'</small></span>').join('');};
// Replace tiny raster status text with the responsive HUD, leaving the world itself unchanged.

window.addEventListener('keydown',e=>{if(e.code==='Escape'&&modalOpen()&&e.target.tagName==='INPUT'){e.preventDefault();e.stopImmediatePropagation();closeModal()}},true);
// Reject incomplete task data before it can reach a renderer or Undo.
const validPuzzleBefore32=validPuzzle;
validPuzzle=function(p,type){if(!validPuzzleBefore32(p,type))return false;if(!C_TYPES.includes(type))return true;try{const s=p.spec,n=s.n,N=n*n,idx=i=>Number.isInteger(i)&&i>=0&&i<N,ints=a=>Array.isArray(a)&&a.every(Number.isInteger),list=a=>Array.isArray(a)&&a.every(idx),vec=(a,len)=>ints(a)&&a.length===len;
if(type==='relay'&&(!ints(s.wires)||![6,8,10].includes(s.wires.length)||![s.base,s.target].every(Number.isInteger)))return false;
if(type==='thermal'&&(!vec(s.values,N)||!list(s.checks)||!list(s.walls)||![s.cap,s.target,s.length].every(Number.isFinite)))return false;
if(type==='puppet'&&(!list(s.wallsA)||!list(s.wallsB)||!idx(s.goal?.a)||!idx(s.goal?.b)))return false;
if(type==='archive'&&(!Array.isArray(s.rows)||s.rows.length!==n||!s.rows.every(ints)||!Array.isArray(s.cols)||s.cols.length!==n||!s.cols.every(ints)||!list(s.givens)||!Number.isInteger(s.diagonal)))return false;
if(type==='spectrum'&&(n!==6||!list(s.mirrors)||!Array.isArray(s.emitters)||s.emitters.length!==2||!s.emitters.every(e=>[e.x,e.y,e.dx,e.dy].every(Number.isInteger))||!Array.isArray(s.exits)||s.exits.length!==2||!s.exits.every(e=>e===null||vec(e,2))||!list(s.checks)))return false;
if(type==='hydro'&&(!vec(s.caps,3)||s.caps.some(v=>v<=0)||!vec(s.goal?.v,3)||![0,1].includes(s.goal.bank)))return false;
if(['chrono','ice'].includes(type)&&(!list(s.keys)||!list(s.walls)||!idx(s.goal)))return false;
if(type==='chrono'&&(!vec(s.masks,N)||s.masks.some(v=>v<0||v>15)))return false;
if(type==='ice'&&!list(s.brakes))return false;
if(type==='reactor'&&(!ints(s.target)||![4,6,8].includes(s.target.length)))return false;
if(type==='weave'&&(!Array.isArray(s.anchors)||!s.anchors.every(a=>idx(a.at)&&Number.isInteger(a.area)&&a.area>0&&a.area<=N)))return false;
function state(q){if(!q||typeof q!=='object')return false;if(type==='relay'||type==='spectrum')return Number.isInteger(q.bits)&&q.bits>=0&&q.bits<(1<<(type==='relay'?s.wires.length:s.mirrors.length));if(type==='thermal')return idx(q.pos)&&list(q.path)&&q.path.at(-1)===q.pos&&Number.isFinite(q.heat);if(type==='puppet')return idx(q.a)&&idx(q.b)&&[-n,-1,0,1,n].includes(q.last);if(type==='archive')return vec(q.cells,N)&&q.cells.every(v=>[-1,0,1].includes(v));if(type==='hydro')return vec(q.v,3)&&q.v.every((v,i)=>v>=0&&v<=s.caps[i])&&[0,1].includes(q.bank);if(['chrono','ice'].includes(type))return idx(q.pos)&&Number.isInteger(q.keys)&&q.keys>=0&&q.keys<(1<<s.keys.length)&&(type!=='chrono'||[0,1,2,3].includes(q.t));if(type==='reactor')return vec(q.v,s.target.length)&&q.v.every(v=>v>=0);if(type==='weave')return Array.isArray(q.regions)&&q.regions.every(list)&&(q.selection===null||idx(q.selection));return false}return state(p.state)&&state(p.initial)&&p.history.every(state)}catch(e){return false}};
const validSceneBefore32=validScene;
validScene=function(m,c,r){try{if(!m||!validSceneBefore32(m,c,r))return false;const f=makeScene(c,r,m.complexity44===undefined?2:m.complexity44);for(const key of['values','assign','items','mirrors','input','collected','bridges','pos','phase','a','b','active','speed','phaseA','phaseB','success'])if(key in f){if(!(key in m)||Array.isArray(f[key])&&!Array.isArray(m[key])||typeof f[key]!==typeof m[key])return false}if(f.values&&m.values.length!==f.values.length)return false;if(f.mirrors&&(!m.mirrors||typeof m.mirrors!=='object'))return false;return true}catch(e){return false}};
const closeModalBefore32=closeModal;
closeModal=function(){closeModalBefore32();if(S&&mode==='world')updateHUD()};
