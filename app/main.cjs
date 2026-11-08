const {app,BrowserWindow,Menu,dialog,ipcMain,shell}=require('electron');
const path=require('path');
const {pathToFileURL}=require('url');
app.setName('LowerTale');
// Avoid renderer crashes on Linux hosts with small /dev/shm.
if(process.platform==='linux')app.commandLine.appendSwitch('disable-dev-shm-usage');
// AppImages cannot provide a root-owned setuid helper. Chromium sandboxing
// should stay enabled on Linux distributions permitting unprivileged namespaces.
if(process.argv.includes('--portable-no-sandbox')) app.commandLine.appendSwitch('no-sandbox');
let win;
app.whenReady().then(()=>{
 Menu.setApplicationMenu(null);
 win=new BrowserWindow({width:1280,height:840,minWidth:960,minHeight:680,fullscreen:true,backgroundColor:'#090c17',title:'LowerTale: Full version',icon:path.join(__dirname,'icon.png'),webPreferences:{preload:path.join(__dirname,'preload.cjs'),nodeIntegration:false,contextIsolation:true,sandbox:true}});
 win.webContents.setWindowOpenHandler(()=>({action:'deny'}));
 win.webContents.on('will-navigate',(e,url)=>{if(!url.startsWith(pathToFileURL(__dirname+path.sep).href))e.preventDefault()});
 require('./updater.cjs').installIPC({ipcMain,app,win,shell});
 require('./coop-net.cjs').installIPC(ipcMain,win);
 win.loadFile('index.html');
 win.on('close',e=>{if(!app.closing){e.preventDefault();win.webContents.send('request-save-close');setTimeout(()=>{app.closing=true;app.quit()},250)}});
});
app.on('window-all-closed',()=>app.quit());
ipcMain.on('fullscreen',()=>win&&win.setFullScreen(!win.isFullScreen()));
ipcMain.on('quit',()=>app.quit());
ipcMain.handle('export-save',async(_,data)=>{if(typeof data!=='string'||data.length>10e6)return false;const r=await dialog.showSaveDialog(win,{defaultPath:'LowerTale-save.json',filters:[{name:'Сохранение LowerTale',extensions:['json']}]});if(r.canceled)return false;require('fs').writeFileSync(r.filePath,data,'utf8');return true});
ipcMain.handle('import-save',async()=>{const r=await dialog.showOpenDialog(win,{properties:['openFile'],filters:[{name:'Сохранение LowerTale',extensions:['json']}]});if(r.canceled)return null;const fs=require('fs');if(fs.statSync(r.filePaths[0]).size>10e6)throw Error('Слишком большой файл');return fs.readFileSync(r.filePaths[0],'utf8')});
