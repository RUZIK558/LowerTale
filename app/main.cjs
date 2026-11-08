const {app,BrowserWindow,Menu,dialog,ipcMain,shell}=require('electron');
const path=require('path');
const {pathToFileURL}=require('url');
app.setName('LowerTale');
// Avoid renderer crashes on Linux hosts with small /dev/shm.
if(process.platform==='linux')app.commandLine.appendSwitch('disable-dev-shm-usage');
// AppImages cannot provide a root-owned setuid helper. Chromium sandboxing
// should stay enabled on Linux distributions permitting unprivileged namespaces.
if(process.argv.includes('--portable-no-sandbox')) app.commandLine.appendSwitch('no-sandbox');
let win, updater, closePending=false, closeTimer=null, manualRestart=false;
app.whenReady().then(()=>{
 Menu.setApplicationMenu(null);
 win=new BrowserWindow({width:1280,height:840,minWidth:960,minHeight:680,fullscreen:true,backgroundColor:'#090c17',title:'LowerTale: Full version',icon:path.join(__dirname,'icon.png'),webPreferences:{preload:path.join(__dirname,'preload.cjs'),nodeIntegration:false,contextIsolation:true,sandbox:true}});
 win.webContents.setWindowOpenHandler(()=>({action:'deny'}));
 win.webContents.on('will-navigate',(e,url)=>{if(!url.startsWith(pathToFileURL(__dirname+path.sep).href))e.preventDefault()});
 updater=require('./updater.cjs').installIPC({ipcMain,app,win,shell});
 require('./coop-net.cjs').installIPC(ipcMain,win);
 win.loadFile('index.html');
 const failure=path.join(app.getPath('userData'),'update-failed.txt');try{const fs=require('fs');if(fs.existsSync(failure)){const details=fs.readFileSync(failure,'utf8').slice(0,1000);fs.unlinkSync(failure);dialog.showMessageBox(win,{type:'warning',message:'Обновление не установлено. Старая версия сохранена.',detail:details})}}catch(_){}
 win.on('close',e=>{if(app.closing)return;e.preventDefault();if(closePending)return;closePending=true;win.webContents.send('request-save-close',{update:manualRestart});closeTimer=setTimeout(()=>closeFailed('Игра не подтвердила сохранение.'),15000)});
});
app.on('window-all-closed',()=>app.quit());
ipcMain.on('fullscreen',()=>win&&win.setFullScreen(!win.isFullScreen()));
ipcMain.on('quit',()=>app.quit());
ipcMain.on('update-restart',e=>{if(e.sender!==win?.webContents||!updater?.hasStaged()||closePending)return;manualRestart=true;win.close()});
ipcMain.handle('export-save',async(_,data)=>{if(typeof data!=='string'||data.length>10e6)return false;const r=await dialog.showSaveDialog(win,{defaultPath:'LowerTale-save.json',filters:[{name:'Сохранение LowerTale',extensions:['json']}]});if(r.canceled)return false;require('fs').writeFileSync(r.filePath,data,'utf8');return true});
ipcMain.handle('import-save',async()=>{const r=await dialog.showOpenDialog(win,{properties:['openFile'],filters:[{name:'Сохранение LowerTale',extensions:['json']}]});if(r.canceled)return null;const fs=require('fs');if(fs.statSync(r.filePaths[0]).size>10e6)throw Error('Слишком большой файл');return fs.readFileSync(r.filePaths[0],'utf8')});

async function closeFailed(reason){if(!closePending)return;clearTimeout(closeTimer);closePending=false;manualRestart=false;const r=await dialog.showMessageBox(win,{type:'warning',buttons:['Остаться в игре','Выйти без обновления'],defaultId:0,cancelId:0,title:'Сохранение не подтверждено',message:reason,detail:'Автоматическое обновление не будет установлено. Чтобы не потерять прогресс, попробуйте экспортировать сохранение.'});if(r.response===1){app.closing=true;app.quit()}}
ipcMain.on('close-ready',async(e,r)=>{if(!closePending||e.sender!==win?.webContents)return;clearTimeout(closeTimer);if(!r?.ok){await closeFailed(r?.message||'Не удалось сохранить или создать резервную копию.');return}if(manualRestart&&!r.auto){await closeFailed('Обновление отложено: завершите бой или испытание.');return}if(r.auto&&updater?.hasStaged()&&(manualRestart||updater.hasAutoStaged?.())){const result=await updater.applyStaged({restart:manualRestart});if(!result.ok){if(manualRestart){await closeFailed('Обновление не установлено: '+result.message);return}await dialog.showMessageBox(win,{type:'warning',message:'Исправление не установлено: '+result.message,detail:'Прогресс сохранён. Повторите обновление вручную.'})}}closePending=false;manualRestart=false;app.closing=true;app.quit()});
ipcMain.handle('backup-save',async(e,text)=>{try{if(e.sender!==win?.webContents||typeof text!=='string'||text.length>20e6)throw Error('Некорректная резервная копия');const d=JSON.parse(text);if(d.format!=='LowerTale-backup-44'||!d.storage||typeof d.storage!=='object'||Array.isArray(d.storage)||Object.entries(d.storage).some(([k,v])=>!k.startsWith('lt')||typeof v!=='string'))throw Error('Некорректная резервная копия');const fs=require('fs'),dir=path.join(app.getPath('userData'),'save-backups');fs.mkdirSync(dir,{recursive:true,mode:0o700});const name='LowerTale-'+new Date().toISOString().replace(/[:.]/g,'-')+'-'+require('crypto').randomBytes(4).toString('hex')+'.json',file=path.join(dir,name),temp=file+'.tmp';fs.writeFileSync(temp,text,{flag:'wx',mode:0o600});fs.renameSync(temp,file);return{ok:true}}catch(err){return{ok:false,message:err.message}}});
ipcMain.handle('backup-load',async(e)=>{if(e.sender!==win?.webContents)throw Error('Доступ запрещён');const fs=require('fs'),dir=path.join(app.getPath('userData'),'save-backups'),r=await dialog.showOpenDialog(win,{defaultPath:dir,properties:['openFile'],filters:[{name:'Резервная копия LowerTale',extensions:['json']}]});if(r.canceled)return null;if(fs.statSync(r.filePaths[0]).size>20e6)throw Error('Файл слишком большой');return fs.readFileSync(r.filePaths[0],'utf8')});
