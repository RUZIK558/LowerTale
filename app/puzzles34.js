'use strict';
// 3.4: turns the most answer-sheet-like contours into operated mechanisms.
(function(){
const V='3.4.0';
function cells(n){return Array.from({length:n*n},(_,i)=>i)}
function maskFor(n,i,pattern){
 const x=i%n,y=i/n|0,out=new Set([i]),add=(xx,yy)=>{if(xx>=0&&(xx<n)&&yy>=0&&yy<n)out.add(yy*n+xx)};
 if(pattern===0)[[1,0],[-1,0],[0,1],[0,-1]].forEach(([a,b])=>add(x+a,y+b));
 if(pattern===1)[[1,1],[-1,1],[1,-1],[-1,-1]].forEach(([a,b])=>add(x+a,y+b));
 if(pattern===2)[[1,2],[2,1],[-1,2],[-2,1],[1,-2],[2,-1],[-1,-2],[-2,-1]].forEach(([a,b])=>add(x+a,y+b));
 if(pattern===3){for(let xx=0;xx<n;xx++)add(xx,y)}
 if(pattern===4){for(let yy=0;yy<n;yy++)add(x,yy)}
 if(pattern===5)[[1,0],[0,1],[1,1]].forEach(([a,b])=>add(x+a,y+b));
 if(pattern===6){for(let d=1;d<n;d++){add(x+d,y);add(x,y+d)}}
 if(pattern===7)[[1,0],[-1,0],[0,1]].forEach(([a,b])=>add((x+a+n)%n,(y+b+n)%n));
 if(pattern===8){for(let xx=0;xx<n;xx++)if((xx+y)%2===(x+y)%2)add(xx,y);for(let yy=0;yy<n;yy++)if((x+yy)%2===(x+y)%2)add(x,yy)}
 if(pattern===9){let q=[[1,0],[0,1],[-1,0],[0,-1]][(x+2*y)%4];add(x+q[0],y+q[1]);add(x-q[1],y+q[0])}
 if(pattern===10){for(let xx=0;xx<n;xx++)add(xx,y);add(x-1,y-1);add(x+1,y+1)}
 if(pattern===11){[[1,0],[-1,0],[0,1],[0,-1],[1,2],[-1,2],[1,-2],[-1,-2]].forEach(([a,b])=>add(x+a,y+b))}
 return [...out];
}
const toggleRules=[
 'Нажатие меняет выбранный пульт и четыре соседних по сторонам. Погаси всю схему.',
 'Нажатие меняет выбранную лампу и диагональные лампы. Погаси всё поле.',
 'Импульс прыгает буквой Г, как шахматный конь, и меняет также исходную клетку. Погаси контур.',
 'Один рычаг меняет всю свою строку. Найди последовательность, которая обнулит табло.',
 'Один клапан меняет весь свой столбец. Оставь все индикаторы выключенными.',
 'Пульт меняет квадрат 2×2, начинающийся в выбранной клетке; на краю действует только внутри поля.',
 'Луч меняет клетку и всё справа и ниже неё. Погаси сеть, учитывая порядок нажатий.',
 'Импульс меняет клетку, соседей слева и справа по кольцу и клетку снизу. Погаси поле.',
 'Шахматная шина меняет клетки той же чётности в строке и столбце. Обнули решётку.',
 'Каждая клетка имеет свою Г-образную пару контактов, указанную её положением. Погаси все огни.',
 'Рычаг меняет всю строку и две диагональные муфты. Погаси решётку, не пытаясь править лампы по одной.',
 'Импульс меняет крест и четыре дальних контакта ходом коня. Обнули всю сеть.'
];
function toggleSpec(l,pattern,rules){
 const n=4+l,masks=cells(n).map(i=>maskFor(n,i,pattern));let initial=Array(n*n).fill(0),proof=[];
 cells(n).forEach(i=>{if(((i*7+pattern*5+n)%11)<(l===2?5:4)){proof.push({i});for(const j of masks[i])initial[j]^=1}});
 if(!initial.some(Boolean)){proof=[{i:0}];for(const j of masks[0])initial[j]^=1}
 return{view:'lights',mechanic34:'toggle-matrix',n,masks,initial,solution:Array(n*n).fill(0),rules:rules||toggleRules[pattern],proof};
}
function gearSpec(l,shift,rules){let n=6+2*l,press=Array.from({length:n},(_,i)=>(i*shift+1+i%3)%5),target=Array(n).fill(0);press.forEach((v,i)=>{target[i]=(target[i]+v)%5;target[(i+1)%n]=(target[(i+1)%n]+2*v)%5});return{view:'gears',mechanic34:'ring-gears',labels:Array.from({length:n},(_,i)=>'Узел '+(i+1)),options:Array.from({length:n},()=>[0,1,2,3,4]),solution:press,target,rules}}
function replace(c,r,kind,name,story,build){let d=U33['u33-'+c+'-'+r];if(!d)return;d.kind=kind;d.name=name;d.story=story;d.build=build;PUZZLE_NAMES['u33-'+c+'-'+r]=name}
const T=[
 [0,2,'relay-floor','Релейный пол диспетчерской','Семафоры соединены под плитами, и один рычаг всегда задевает соседние цепи.',0],
 [0,5,'cargo-pressure','Балластные плиты вагона','Ящики уже погружены. Теперь их вес нажимает сразу на несколько связанных плит.',5],
 [0,7,'address-board','Адресное табло без прямых кнопок','Поддельный адрес нельзя исправить по одному биту: контакты связаны диагонально.',1],
 [2,4,'cold-grid','Холодовая решётка','Каждый холодильный клапан меняет строку и диагональные муфты.',10],
 [2,6,'key-matrix','Замковая матрица смотрителей','Ключ поворачивает не одну дверь, а Г-образную группу старых замков.',9],
 [4,7,'stage-rhythm','Световой ритм сцены','Ритм задаётся не числами: каждый удар перебрасывает свет на клетки хода коня.',2],
 [6,8,'archive-scan','Сканер повреждённой записи','Сканер читает квадратами 2×2; отдельный байт восстановить нельзя.',5],
 [9,2,'prism-console','Пульт расщепления света','Каждая призма меняет клетки той же цветовой чётности по строке и столбцу.',8],
 [11,2,'nerve-field','Поле нервных ворот','Импульс расходится вправо и вниз по живой ткани.',6],
 [15,2,'causal-board','Доска причин и следствий','Изменение письма расходится крестом и по дальним причинным связям.',11],
 [15,7,'parallel-panels','Две сцепленные хроники','Переключатель действует на себя, боковых соседей по кольцу и запись снизу.',7],
 [26,5,'many-hearts','Решётка независимых сердец','Каждый пульс зажигает собственную клетку и диагональные камеры.',1]
];
T.forEach(([c,r,k,nm,st,p])=>replace(c,r,k,nm,st,l=>toggleSpec(l,p)));
// Replace remaining near-trivial one- or two-step boards with linked systems.
replace(6,5,'archive-matrix','Переплетённые даты','Календарные записи связаны перекрёстными контактами.',l=>toggleSpec(l,11));
replace(9,6,'lightning-matrix','Сеть громоотвода','Изолировать разряд можно лишь перенастроив всю связанную шину.',l=>toggleSpec(l,2));
replace(26,4,'living-matrix','Пульсы живых островов','Каждый остров передаёт импульс соседям по диагонали.',l=>toggleSpec(l,1));
replace(9,7,'bell-gears','Механизм стеклянных колоколов','Колокола соединены зубцами: один поворот сдвигает соседний вдвое сильнее.',l=>gearSpec(l,2,'Поворот узла добавляет ему 1, а следующему — 2 по кругу 0…4. Совмести механизм с метками.'));
replace(15,3,'broken-clockwork','Часовой каскад','Стрелки часов сцеплены в кольцо, поэтому поправка одних часов сбивает следующие.',l=>gearSpec(l,3,'Поворот часов добавляет им 1, а следующим — 2. Выведи весь каскад на отмеченные положения.'));
replace(26,8,'bridge-council-gears','Кольца совета','Каждый берег вращает своё кольцо и соседнее через общий вал.',l=>gearSpec(l,4,'Поворот кольца добавляет ему 1, следующему — 2 по модулю 5. Совмести все печати.'));
// Make four retained graphical puzzles denser instead of merely increasing a number range.
replace(19,3,'fuse-loop','Кольцо предохранителей','Нужно собрать замкнутую резервную шину, а не подобрать сумму мощностей.',l=>{let n=6+2*l,edges=[...Array.from({length:n},(_,i)=>[i,(i+1)%n]),...Array.from({length:n},(_,i)=>[i,(i+2)%n])],solution=edges.map((_,i)=>+(i<n));return{view:'edges',mechanic34:'alias',aliasKind:'loop',nodes:n,edges,options:edges.map(()=>[0,1]),solution,forbidden:Array.from({length:n},(_,i)=>n+i),rules:'Включи одно замкнутое кольцо: степень каждого узла ровно 2, вся сеть связна. Диагональные перемычки запрещены из-за перегрева.'}});
replace(19,7,'command-tape','Барабан команд','Команды нанесены на цельную плёнку: доступен только обмен соседних кадров.',l=>{let n=7+2*l,solution=uPermute(n,492),items=Array.from({length:n},(_,i)=>'Кадр '+(i+1));return{view:'order',mechanic34:'adjacent-order',items,solution,rules:'Восстанови плёнку по проявленным стыкам. Менять местами можно только соседние кадры; дальний обмен запрещён.'}});
replace(11,6,'lung-pipes','Капилляры кислорода','Кислород нужно провести через все отмеченные камеры без тупика и петли.',l=>{let n=4+l,solution=[];for(let y=0;y<n;y++)for(let x=0;x<n;x++)solution[y*n+x]=y%2===0?(x===n-1?2:1):(x===0?2:3);return{view:'grid',mechanic34:'alias',aliasKind:'pipes',n,labels:cells(n).map(i=>String(i+1)),options:cells(n).map(()=>[0,1,2,3]),solution,goal:n%2?n*n-1:n*(n-1),checks:[n-1,n*(n-1),((n/2|0)*n)+(n/2|0)],rules:'Поверни капилляры. Поток идёт по стрелке текущей клетки, должен пройти три камеры и выйти в клапан В. Тупик и цикл запрещены.'}});

const oldInitial=uInitial,oldWin=uWin,oldRaw=uRaw,oldSolve=uSolve,oldRender=uRender,oldAction=uActionText;
function aliasSpec(s){return s.aliasKind?{...s,kind:s.aliasKind}:s}
uInitial=function(s){if(s.mechanic34==='adjacent-order')return{v:uPermute(s.items.length,846),selected:null};return oldInitial(aliasSpec(s))};
uWin=function(p,st=p.state){let s=p.spec;if(s.mechanic34==='toggle-matrix')return st.v.every(x=>x===0);if(s.mechanic34==='ring-gears')return JSON.stringify(st.v)===JSON.stringify(s.target);if(s.mechanic34==='adjacent-order')return JSON.stringify(st.v)===JSON.stringify(s.solution);if(s.aliasKind)return oldWin({...p,spec:aliasSpec(s)},st);return oldWin(p,st)};
uRaw=function(p,st,a){let s=p.spec;if(s.mechanic34==='toggle-matrix'){if(!Number.isInteger(a.i)||a.i<0||a.i>=st.v.length)return null;let q=clone(st);for(const j of s.masks[a.i])q.v[j]^=1;return q}if(s.mechanic34==='adjacent-order'){let q=clone(st);if(!Number.isInteger(a.i)||a.i<0||a.i>=q.v.length)return null;if(q.selected===null){q.selected=a.i;return q}if(Math.abs(q.selected-a.i)!==1){q.selected=null;return q} [q.v[q.selected],q.v[a.i]]=[q.v[a.i],q.v[q.selected]];q.selected=null;return q}if(s.aliasKind)return oldRaw({...p,spec:aliasSpec(s)},st,a);return oldRaw(p,st,a)};
function gf2(s,v){let N=v.length,rows=Array.from({length:N},(_,cell)=>{let row=Array.from({length:N},(_,press)=>+s.masks[press].includes(cell));row.push(v[cell]);return row}),piv=[],at=0;for(let col=0;col<N;col++){let y=rows.findIndex((r,i)=>i>=at&&r[col]);if(y<0)continue;[rows[y],rows[at]]=[rows[at],rows[y]];for(let z=0;z<N;z++)if(z!==at&&rows[z][col])for(let x=col;x<=N;x++)rows[z][x]^=rows[at][x];piv.push(col);at++}if(rows.some(r=>!r.slice(0,N).some(Boolean)&&r[N]))return null;return piv.flatMap((col,i)=>rows[i][N]?[{i:col}]:[])}
uSolve=function(p){let s=p.spec;if(s.mechanic34==='toggle-matrix')return gf2(s,p.state.v);if(s.mechanic34==='adjacent-order'){let v=[...p.state.v],out=[];for(let target=0;target<v.length;target++){let at=v.indexOf(s.solution[target]);while(at>target){out.push({i:at});out.push({i:at-1});[v[at],v[at-1]]=[v[at-1],v[at]];at--}}return out}if(s.aliasKind)return oldSolve({...p,spec:aliasSpec(s)});return oldSolve(p)};
uActionText=function(p,a){if(p.spec.mechanic34==='adjacent-order'&&a.i!==undefined)return'Выбери соседний кадр '+(a.i+1);return oldAction(p,a)};
uRender=function(){let p=puzzle;if(!p||!p.spec?.aliasKind)return oldRender();let s=p.spec,k=s.kind;s.kind=s.aliasKind;try{return oldRender()}finally{s.kind=k}};
// Old unfinished states intentionally regenerate while preserving hints through openPuzzle.
for(const d of Object.values(U33))if(d.kind&&(['relay-floor','cargo-pressure','address-board','cold-grid','key-matrix','stage-rhythm','archive-scan','prism-console','nerve-field','causal-board','parallel-panels','many-hearts','bell-gears','broken-clockwork','bridge-council-gears','fuse-loop','command-tape','lung-pipes'].includes(d.kind)))d.version34=V;
window.LOWERTALE_PUZZLES_VERSION=V;
})();
