function dS(s,x,y,sc,flip,alpha,pal){sc=sc||1;flip=!!flip;alpha=(alpha===undefined)?1:alpha;
 const C=pal||s.c;if(!C)return;
 ctx.save();ctx.globalAlpha=alpha;
 const h=s.length,w=s[0].length;
 for(let r=0;r<h;r++){const row=s[r];
  for(let i=0;i<row.length;i++){const c=row[i];if(c==='.')continue;
   const col=C[c];if(!col)continue;ctx.fillStyle=col;
   const px=flip?x+(w-1-i)*sc:x+i*sc;ctx.fillRect(px,y+r*sc,sc+.35,sc+.35);}}
 ctx.restore();}
const PL={c:{h:'#6a4a32',s:'#ffd9a0',b:'#4a6cd8',p:'#e86ac8',e:'#1a1a2e',k:'#3a2a20'}};
const PLD1=['....hhhh....','...hhhhhh...','..hhhhhhhh..','..hssssssh..','..hsessesh..','..ssssssss..','..pbbbbbbp..','..bbbbbbbb..','..sbbbbbps..','..kk....kk..'];
const PLD2=['....hhhh....','...hhhhhh...','..hhhhhhhh..','..hssssssh..','..hsessesh..','..ssssssss..','..pbbbbbbp..','..bbbbbbbb..','..sbbbbbps..','...kk..kk...'];
const PLU1=['....hhhh....','...hhhhhh...','..hhhhhhhh..','..hhhhhhhh..','..hhhhhhhh..','..hhhhhhhh..','..pbbbbbbp..','..bbbbbbbb..','..sbbbbbps..','..kk....kk..'];
const PLU2=['....hhhh....','...hhhhhh...','..hhhhhhhh..','..hhhhhhhh..','..hhhhhhhh..','..hhhhhhhh..','..pbbbbbbp..','..bbbbbbbb..','..sbbbbbps..','...kk..kk...'];
const PLL1=['....hhhh....','...hhhhhh...','..hhhhhhhh..','..hhsssssh..','..hsessssh..','..ssssssss..','..pbbbbbbp..','..sbbbbbbp..','..bbbbbbbb..','..kk....kk..'];
const PLL2=['....hhhh....','...hhhhhh...','..hhhhhhhh..','..hhsssssh..','..hsessssh..','..ssssssss..','..pbbbbbbp..','..sbbbbbbp..','..bbbbbbbb..','...kk..kk...'];
[PLD1,PLD2,PLU1,PLU2,PLL1,PLL2].forEach(s=>{s.c=PL.c});
const PALS={
 npc:{c:{h:'#8a6a4a',s:'#ffd9a0',b:'#8a5a3a',e:'#222222',k:'#333333'}},
 trader:{c:{h:'#4a3a6a',s:'#e8c890',b:'#7a4a9a',e:'#222222',k:'#333333'}},
 granny:{c:{h:'#cccccc',s:'#ffd9a0',b:'#c05a7a',e:'#222222',k:'#333333'}},
 fisher:{c:{h:'#3a6a8a',s:'#e8b880',b:'#4a7a5a',e:'#222222',k:'#333333'}},
 guard:{c:{h:'#666677',s:'#e8c890',b:'#8a8aa0',e:'#222222',k:'#333333'}},
 cat:{c:{k:'#222222',o:'#e8a03a',e:'#33ff33'}},
 king:{c:{g:'#ffd700',m:'#7a2a4a',s:'#e8c890',e:'#222222'}},
 refugee:{c:{h:'#7a6a5a',s:'#e8c890',b:'#6a5a4a',e:'#222222',k:'#333333'}},
 deserter:{c:{h:'#5a6a5a',s:'#e8c890',b:'#4a5a4a',e:'#222222',k:'#333333'}},
 wounded:{c:{h:'#8a7a6a',s:'#ffd9a0',b:'#7a4030',e:'#222222',k:'#333333'}},
 markit:{c:{h:'#6a4a5a',s:'#e8c890',b:'#8a5a6a',e:'#222222',k:'#333333'}}};
const GRID_NPC=['....hhhh....','...hhhhhh...','..hhhhhhhh..','..hssssssh..','..hsessesh..','..ssssssss..','..bbbbbbbb..','..bbbbbbbb..','..bbbbbbbb..','..kk....kk..'];
GRID_NPC.c=PALS.npc.c;
const GRID_CAT=['..k......k..','.ko......ok.','..oooooooo..','.ooe....eoo.','.oooooooooo.','.oooooooooo.','..oooooooo..'];
GRID_CAT.c=PALS.cat.c;
const ED={
 dummy:{n:'Манекен',hp:14,atk:3,def:0,exp:6,gold:5,c:{w:'#e8e0c8',k:'#444444'},spr:['....kkkk....','...kwwwwk...','...kwkwwk...','...kwwwwk...','....kwwk....','..kkwwwwkk..','.kwkwwwwkwk.','.kwkwwwwkwk.','....kwwk....','....kwwk....','...kk..kk...']},
 frog:{n:'Лягух',hp:22,atk:4,def:0,exp:9,gold:8,c:{g:'#4caf50',d:'#2e7d32',k:'#111111',w:'#ffffff'},spr:['..gg......gg..','.gwg......gwg.','.gggggggggggg.','gggggggggggggg','ggkggggggkgggg','gggggggggggggg','.dggggggggggd.','..dggggggggd..','...ddggggdd...','.dd...dd...dd.']},
 ghost:{n:'Мрачник',hp:30,atk:5,def:1,exp:14,gold:10,c:{w:'#e8ecff',k:'#222222',t:'#8890c8'},spr:['....wwwwww....','..wwwwwwwwww..','.wwwwwwwwwwww.','.wwkkwwwwkkww.','.wwwwwwwwwwww.','.wwwwkkkkwwww.','..wwwwwwwwww..','..twwtwwtwwt..','...wt.wt.wt...']},
 snow:{n:'Снежок',hp:34,atk:6,def:1,exp:16,gold:12,c:{w:'#ffffff',s:'#dde8f2',k:'#222222',c:'#e05555'},spr:['......cc......','.....cccc.....','....wwwwww....','..wwwwwwwwww..','.wwkwwwwwwkww.','.wwwwwwwwwwww.','..wwwwsswwww..','..wwwwwwwwww..','....wwwwww....']},
 ice:{n:'Ледянка',hp:40,atk:7,def:2,exp:22,gold:15,drop:['crystal',.4],c:{c:'#9fd8ff',w:'#ffffff',b:'#4a90d9',k:'#112233'},spr:['......c.......','.....cwc......','....cwwwc.....','...cwwwwwc....','..cwwkwwkwc...','..cwwwwwwwc...','.bcccwwwcccb..','.b..cwwwwc..b.','....bccccb....','......bb......']},
 crystal:{n:'Кристалик',hp:48,atk:8,def:3,exp:28,gold:18,c:{c:'#b06ae8',w:'#e8d0ff',k:'#222222'},spr:['......cc......','.....cwcc.....','....cwcccc....','...cwcccccc...','..ccwckkcccc..','..cccccccccc..','...cccccccc...','....cccccc....','.....cccc.....','......cc......']},
 golem:{n:'Рудожор',hp:62,atk:9,def:4,exp:36,gold:22,c:{r:'#8a6a4a',d:'#5a4030',k:'#ffff99',o:'#c0a070'},spr:['..dddddddddd..','.drrrrrrrrrrd.','.drkrrrrrrkrd.','.drrrrrrrrrrd.','ddrrroooorrddd','drrrrrrrrrrrrd','drrdrrrrrrdrrd','.dd.drrrrdd.dd','....drrrrd....','....dddddd....']},
 vodya:{n:'Водяник',hp:55,atk:8,def:2,exp:32,gold:20,c:{w:'#4ac8e8',d:'#2a88b0',k:'#112233'},spr:['....wwwwww....','..wwwwwwwwww..','.wwkwwwwwwkww.','.wwwwwwwwwwww.','.wwwwddddwwww.','..wwwwwwwwww..','.dwwwwwwwwwwd.','d..dwwwwwwd..d','....d.ww.d....']},
 knight:{n:'Рыцарь',hp:75,atk:11,def:5,exp:48,gold:30,drop:['tea',.3],c:{a:'#b8c0d8',k:'#111111',r:'#e05555'},spr:['.....aaaa.....','....aaaaaa....','....akkkka....','....akkkka....','.....aaaa.....','..aaaaaaaaar..','..aaaaaaaaar..','..aa.aaaa.ar..','.....aaaa.....','....aa..aa....','...kk....kk...']},
 ash:{n:'Пепельник',hp:60,atk:9,def:3,exp:34,gold:20,c:{a:'#8a8a8a',d:'#5a5a5a',k:'#222222',e:'#ff9a3a'},spr:['....aaaa....','..aaaaaaaa..','.aaeaaaaeaa.','.aaaaaaaaaa.','..aaaaaaaa..','..daaaaaad..','.ddaaaaaadd.','..ddaaaaad..','...dd..dd...','...dd..dd...']},
 bone:{n:'Костяной страж',hp:70,atk:10,def:4,exp:40,gold:24,c:{w:'#e8e8d8',k:'#222222'},spr:['....wwww....','...wkkwwk...','...wwwwww...','....wwww....','..wwwwwwww..','.w..wwww..w.','.w..wwww..w.','....wwww....','...ww..ww...','...ww..ww...']},
 hunter:{n:'Охотник',hp:80,atk:11,def:4,exp:46,gold:28,c:{h:'#5a4030',s:'#e8c890',b:'#7a3020',k:'#222222',e:'#1a1a2e'},spr:['....hhhh....','...hhhhhh...','..hssssssh..','..hsessesh..','..ssssssss..','..bbbbbbbb..','..bbbbbbbb..','..kbbbbbbk..','..kk....kk..','..kk....kk..']},
 wisp:{n:'Огонёк',hp:52,atk:9,def:2,exp:30,gold:18,c:{f:'#ffd76a',o:'#ff9a3a',k:'#222222'},spr:['.....ff.....','....ffff....','...ffffff...','..ffkffkff..','..ffffffff..','...oooooo...','..oooooooo..','...oooooo...','....oooo....','.....oo.....']}};
const BD={
 shadow:{n:'ТЕНИУС',hp:170,atk:7,def:2,exp:80,gold:60,c:{p:'#4a3a7a',d:'#2a2050',w:'#ffffff',k:'#111111'},spr:['..pp......pp..','.pdpp....ppdp.','.pddppppppddp.','.pddddddddddp.','.pdkddddddkdp.','ppddddddddddpp','pddddddddddddp','.pddddwwddddp.','..pddddddddp..','...pddddddp...','..pd.pddp.pd..','.pd...pp...pd.']},
 baron:{n:'СНЕЖНЫЙ БАРОН',hp:260,atk:8,def:3,exp:150,gold:90,c:{w:'#ffffff',s:'#dfe8f2',k:'#112233',c:'#2a4a8a',o:'#e8903a'},spr:['......cc......','.....cccc.....','....wwwwww....','..wwwwwwwwww..','.wwwwwwwwwwww.','.wwkwwwwwwkww.','.wwwwwwwwwwww.','wwwwwsooswwwww','wwwwwwwwwwwwww','.swwwwwwwwwws.','..wwwwwwwwww..','...wwwwwwww...','....wwwwww....']},
 gguard:{n:'КРИСТАЛЬНЫЙ ГОЛЕМ',hp:380,atk:10,def:4,exp:250,gold:120,c:{r:'#7a5a3a',c:'#b06ae8',w:'#e8d0ff',k:'#ffff99'},spr:['..cc......cc..','.cccc....cccc.','.rrrrrrrrrrrr.','.rkkrrrrrrkkr.','.rrrrrrrrrrrr.','.rrcccccccrrr.','rrccccwccccrrr','rccrrccccrrccr','rcrr.cccc.rrcr','.cc..cccc..cc.','......cc......','.....cccc.....']},
 twins:{n:'ЭХО и РЕВЕРБ',hp:460,atk:11,def:4,exp:350,gold:140,c:{w:'#e8ecff',b:'#7df0ff',p:'#ffa0d0',k:'#222222'},spr:['..wwww....wwww..','.wwwwww..wwwwww.','.wkwwkw..wkwwkw.','.wwwwww..wwwwww.','..bwwb....pwwp..','..bbbb....pppp..','...bb......pp...','..bb..bbbb..pp..','.bb..bbbbbb..pp.']},
 king:{n:'КОРОЛЬ АЗАР',hp:625,atk:12,def:5,exp:600,gold:0,c:{g:'#ffd700',m:'#7a2a4a',s:'#e8c890',k:'#111111'},spr:['.g..g..g..g..g..','.gg.gg.gg.gg.gg.','..gggggggggggg..','..mmmmmmmmmmmm..','..msksssskksm...','..msssssssssm...','...mmmmmmmmm....','..mmmmmmmmmmmm..','.mgmmmmmmmmmmgm.','.mgmmmmmmmmmmgm.','..mmmmmmmmmmmm..','...mm......mm...','..kkk......kkk..']},
 granit:{n:'КАПИТАН ГРАНИТ',hp:520,atk:11,def:5,exp:400,gold:150,c:{a:'#7a7a88',k:'#111111',r:'#c04030',g:'#ffd700'},spr:['.....aaaa.....','....aaaaaa....','....akkkka....','....akkkka....','.....aaaa.....','..aaaaaaaaar..','..aaaaaaaaar..','..aa.aaaa.ar..','.....aaaa.....','....aa..aa....','...kk....kk...','..gg......gg..']},
 arch:{n:'АРХИВАРИУС',hp:800,atk:13,def:6,exp:800,gold:0,c:{m:'#3a2a5a',w:'#e8d0ff',k:'#111111',e:'#7df0ff'},spr:['.....mmmm.....','....mmmmmm....','...mmmmmmmm...','..mmekmmekmm..','..mmmmmmmmmm..','..wmmmmmmmmw..','.wwmmmmmmmmww.','.w.wmmmmmmw.w.','....mmmmmm....','...mm.mm.mm...','..mm...mm..mm.','..w....ww...w.']}};

