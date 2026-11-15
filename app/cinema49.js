'use strict';
// Chapter openings are staged with the existing dialogue engine. They never
// change story decisions, and an interrupted automatic scene resumes on load.
const SCENES49={
 0:{place:'ВОКЗАЛ ПОД ДОЖДЁМ',title:'Посылка без отправителя',lines:[
  'Дождь барабанит по крыше вокзала. Из соседнего зала слышится стук: кто-то пытается открыть запертые двери.',
  'ЭРН: Проверка закончится через несколько минут. Если поезд всё ещё здесь, нас снимут с линии.',
  'КЛЁПКА: Тогда зачем ты оставил место в вагоне?',
  'ЭРН: Потому что за дверью люди. Мне не нравится расписание, в котором для них не нашлось строчки.',
  'В руки попадает тяжёлый регистратор. Адрес на корпусе: «Рин. Центральная станция». Отправитель не указан.',
  'КЛЁПКА: Я узнаю этот корпус. Спрячь его. Сегодня на платформе проверяют не билеты, а карманы.',
  'ЭРН: Шесть сигнальных цепей держат выход закрытым. Открой путь, а я подготовлю «Нить». И постарайся не оставлять пассажиров снаружи.'
 ]},
 4:{place:'КАРНАВАЛ',title:'Последний акт',lines:[
  'На сцене уже разыгрывают побег с вокзала. Актёр в жестяной маске поворачивается точно так же, как Клёпка.',
  'АКТЁР: Спрячь его. Сегодня на платформе проверяют не билеты, а карманы.',
  'КЛЁПКА: Я сказал это только нам. Кто-то был в вагоне?',
  'АЗАР: Не хлопай. В этом театре аплодисменты тоже запускают механизм. Сначала узнай, кто держит тросы.',
  'Занавес поднимается снова. В афише напечатан последний акт — и имя героя среди погибших.',
  'АЗАР: Бумагу ещё можно переписать. Но для начала нам придётся дожить до конца спектакля.'
 ]},
 9:{place:'СТЕКЛЯННАЯ БУРЯ',title:'Голос в помехах',lines:[
  'Молния на миг освещает мост. Под ногами возникает стеклянная дорожка, потом снова исчезает.',
  'НОРА: Погоди. В помехах не повтор. Кто-то отвечает на запросы станций.',
  'Из приёмника доносится голос, и ты узнаёшь его раньше, чем различаешь слова.',
  'НОРА: Это Рин. Она жива. Но канал обрывается каждый раз, когда ударяет гром.',
  'КЛЁПКА: Если мы восстановим цепь громоотводов, у нас будет время передать ответ.',
  'За следующим раскатом остаётся только шипение. На этот раз молчание похоже не на конец, а на оборванный разговор.'
 ]},
 12:{place:'ЦЕНТРАЛЬНАЯ СТАНЦИЯ',title:'Человек у пульта',lines:[
  'За дверью нет решётки. Есть пульт, недопитый чай и человек, который не оборачивается, пока стрелка не вернётся в зелёный сектор.',
  'РИН: Ты всё-таки приехал. Я просила не приезжать.',
  'Рин смотрит на посылку у тебя в руках — и на мгновение забывает о следующем переключателе.',
  'РИН: Я подписала расчёт. У меня были причины. Это не отменяет подписи.',
  'КЛЁПКА: Мы нашли свидетелей. В записи есть больше одного голоса.',
  'РИН: Передай регистратор. Потом помоги мне удержать эту машину достаточно долго, чтобы мы смогли решить, что делать дальше.'
 ]},
 15:{place:'УЧЕБНАЯ СТАНЦИЯ',title:'День, который повторяется',lines:[
  'Станционный громкоговоритель снова объявляет отправление. На табло каждый раз появляется одна и та же дата.',
  'КЛЁПКА: Это не вчера. Если мы нажмём правильную кнопку, никто здесь не воскреснет.',
  'В стекле кабины мелькает силуэт служебного робота. Его номер совпадает с номером Клёпки.',
  'КЛЁПКА: Я был здесь. Но между прибытием и отправлением в моей памяти — пустота.',
  'ЭРН: Тогда не будем угадывать. Проверим записи до того, как делать выводы.',
  'Клёпка молча касается таблички со своим номером. Учебный рейс начинается снова.'
 ]},
 20:{place:'ВСТРЕЧНЫЙ ПУТЬ',title:'Рейс без пассажиров',lines:[
  'Из темноты выходит поезд с номером «Нити». Его окна светятся, но на сиденьях никого нет.',
  'ЭРН: По расписанию встречного рейса здесь быть не должно.',
  'НОРА: Это служебная копия. Её журнал указывает на первый вокзал — ещё до нашего прибытия.',
  'КЛЁПКА: Значит, можно узнать, как посылка оказалась у тебя.',
  'Два состава идут рядом, на мгновение совпадая по скорости. Между ними появляется узкий переход.',
  'ЭРН: Я удержу ход. Найди журнал, прежде чем пути снова разойдутся.'
 ]},
 22:{place:'ПОСЛЕДНИЙ ВАГОН',title:'Никто не обязан соглашаться',lines:[
  'На столе лежат карта эвакуации и расчёт возвращения. Поезд качается; обе бумаги постепенно сползают к краю.',
  'ЭРН: Состав повреждён. Я могу довести его до безопасной станции, но не обещаю обратный путь.',
  'РИН: Если мы уйдём сейчас, нижние линии останутся без замены. Я не прошу никого рисковать вслепую.',
  'НОРА: А пассажиры имеют право знать, что мы выбираем за них.',
  'КЛЁПКА: Давайте сначала спросим, кто что умеет и на что согласен. Нельзя назначить человека запасной деталью.',
  'Разговор не заканчивается общим согласием. Но теперь каждый может назвать свой предел — и быть услышанным.'
 ]},
 29:{place:'ПОСЛЕДНИЙ ТАКТ',title:'Первый рейс',lines:[
  'На карте загораются огни станций. Каждый отвечает в своём темпе; никто не даёт сигнал за всех.',
  'ЭРН: Поезд готов принять нагрузку. Держу сцепку до твоего сигнала.',
  'КЛЁПКА: Я здесь. Не потому, что меня назначили. Я согласен держать эту сторону.',
  'РИН: У нас есть план. Но план не удержит рычаг за нас — и не заменит голоса тех, кто остался на берегах.',
  'В глубине просыпается аварийный автомат. Ему всё равно, кто назвал себя спасителем. Он проверит, готова ли сеть.',
  'На линии снова звучит первый сигнал. Тот же, что когда-то открыл выход из вокзала.'
 ]}
};
let cinema49=null;
const cinemaHost49=$('dialogue');
const cinemaStage49=document.createElement('div');cinemaStage49.id='cinema-stage49';cinemaStage49.setAttribute('aria-hidden','true');cinemaStage49.innerHTML='<div class="cinema-art49"></div><div class="cinema-vignette49"></div><div class="cinema-header49"><span class="cinema-kicker49"></span><strong class="cinema-title49"></strong></div><div class="cinema-figures49"><div class="cinema-figure49"><canvas width="72" height="80" class="cinema-hero49"></canvas><span>ТЫ</span></div><div class="cinema-figure49 cinema-other49"><canvas width="72" height="80" class="cinema-person49"></canvas><span></span></div></div>';
cinemaHost49.prepend(cinemaStage49);
const cinemaSkip49=document.createElement('button');cinemaSkip49.id='cinema-skip49';cinemaSkip49.textContent='Пропустить · Esc';cinemaSkip49.setAttribute('aria-label','Пропустить кат-сцену');cinemaHost49.append(cinemaSkip49);
const ROBOT_CLASSIC49=['...hhhh...','..hhhhhh..','..hehheh..','..hhhhhh..','...bbbb...','..bbbbbb..','..bbbbbb..','...k..k...'];
function pixelActor49(canvas,sprite,palette){const pc=canvas.getContext('2d');pc.clearRect(0,0,canvas.width,canvas.height);const sc=4,ox=Math.floor((canvas.width-sprite[0].length*sc)/2),oy=Math.floor((canvas.height-sprite.length*sc)/2);for(let y=0;y<sprite.length;y++)for(let x=0;x<sprite[y].length;x++){const color=palette[sprite[y][x]];if(color){pc.fillStyle=color;pc.fillRect(ox+x*sc,oy+y*sc,sc,sc)}}}
function clearCinema49(){cinema49=null;cinemaHost49.classList.remove('cinematic49','cinema-motion49');cinemaHost49.removeAttribute('data-scene');cinemaHost49.setAttribute('aria-label','Диалог')}
function paintStage49(){if(!cinema49||!dialogue)return;const d=dialogue,c=cinema49.chapter;if(cinema49.lastPage===d.i)return;cinema49.lastPage=d.i;const sc=SCENES49[c],speaker=speakerFor(d.pages[d.i]).name;cinemaHost49.dataset.scene=String(c);cinemaStage49.querySelector('.cinema-kicker49').textContent='ГЛАВА '+String(c+1).padStart(2,'0')+'  /  '+sc.place;cinemaStage49.querySelector('.cinema-title49').textContent=sc.title;pixelActor49(cinemaStage49.querySelector('.cinema-hero49'),PLD1,{...PL.c,b:'#3d9992',p:'#edbe7c'});const other=cinemaStage49.querySelector('.cinema-other49'),isNarrator=speaker==='ПОСЛЕДНИЙ ПОЕЗД';other.classList.toggle('cinema-quiet49',isNarrator);other.querySelector('span').textContent=isNarrator?'':speaker;const sprite=speaker==='КЛЁПКА'?ROBOT_CLASSIC49:GRID_NPC;const palettes={'КЛЁПКА':{h:'#c6aa71',s:'#ecd39b',b:'#8a7752',e:'#bce5d8',k:'#504534'},'РИН':{h:'#784a45',s:'#efc6a3',b:'#976f81',e:'#f8f2d9',k:'#394655'},'ЭРН':{h:'#66594d',s:'#e8c890',b:'#5d7780',e:'#f8e9bd',k:'#303948'},'НОРА':{h:'#483d5c',s:'#e8c890',b:'#708b78',e:'#f3e7c5',k:'#303948'},'АЗАР':{h:'#cdbb8e',s:'#e8c890',b:'#7d5661',e:'#f3e7c5',k:'#303948'}};pixelActor49(other.querySelector('canvas'),sprite,{...PALS.npc.c,...(palettes[speaker]||{})})}
const oldPaint49=paintDialogue;
paintDialogue=function(){oldPaint49();if(cinema49&&dialogue)paintStage49()};
const oldSay49=say;
function playCinema49(c,after,replay=false){const sc=SCENES49[c];if(!sc)return false;cinema49={chapter:c,lastPage:-1,replay};if(!replay&&S)S.scenePending49=c;cinemaHost49.classList.add('cinematic49');cinemaHost49.classList.toggle('cinema-motion49',!!settings.motion);cinemaHost49.setAttribute('aria-label','Кат-сцена: '+sc.title);const done=()=>{if(!replay&&S&&S.scenePending49===c){delete S.scenePending49;autosave()}clearCinema49();if(after)after()};oldSay49(sc.lines,done);return true}
say=function(pages,after,choices){const c=S?.chapter,original=CHAPTERS[c]?.intro;if(!cinema49&&!battle&&!choices&&SCENES49[c]&&Array.isArray(pages)&&original&&pages.length===original.length&&pages[0]===storyLines(c,original)[0]){playCinema49(c,after);return}return oldSay49(pages,after,choices)};
function skipCinema49(){if(!cinema49||!dialogue)return;const done=dialogue.after;dialogue=null;cinemaHost49.classList.add('hidden');keys={};if(done)done();else clearCinema49()}
cinemaSkip49.onclick=skipCinema49;
window.addEventListener('keydown',e=>{if(cinema49&&e.code==='Escape'&&!e.repeat){e.preventDefault();e.stopImmediatePropagation();skipCinema49()}},true);
const beforeReset49=resetTransient;
resetTransient=function(){clearCinema49();beforeReset49()};
const beforeLoad49=loadSlot;
loadSlot=function(slot='auto'){const ok=beforeLoad49(slot);if(ok&&Number.isInteger(S?.scenePending49)&&S.scenePending49===S.chapter&&SCENES49[S.chapter])playCinema49(S.chapter,()=>toast('Цель: '+CHAPTERS[S.chapter].goal));return ok};
function openCinemaLibrary49(){if(!S||battle)return;openModal('ПАМЯТЬ ПОЕЗДА','Киножурнал','<p>Здесь можно пересмотреть постановочные сцены уже открытых глав. Повтор не меняет выборы и награды.</p><div id="cinema-list49"></div>');for(const [key,sc] of Object.entries(SCENES49)){const c=Number(key);if(c>S.maxChapter)continue;const row=document.createElement('div');row.className='row';const label=document.createElement('div');label.innerHTML='<strong>'+String(c+1).padStart(2,'0')+' · '+esc(sc.title)+'</strong><small>'+esc(sc.place)+'</small>';const btn=document.createElement('button');btn.textContent='Смотреть';btn.onclick=()=>{closeModal();playCinema49(c,openCinemaLibrary49,true)};row.append(label,btn);$('cinema-list49').append(row)}setActions([['К журналу',()=>openJournal()],['Закрыть',closeModal]])}
const beforeJournal49=openJournal;
openJournal=function(c=S?S.chapter:0){beforeJournal49(c);if(!S||!modalOpen())return;const btn=document.createElement('button');btn.textContent='Киножурнал';btn.onclick=openCinemaLibrary49;$('panel-actions').prepend(btn)};
