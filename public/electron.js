const { app, BrowserWindow } = require('electron');
const path = require('path');

app.whenReady().then(()=>{
    const win = new BrowserWindow({
        show: false,
        webPreferences: {
            preload: __dirname + '/preload.js'
        }
    });
    console.log(process.env);
    if(process.env.mode === 'dev') {
        win.loadURL('http://localhost:3000');
        win.webContents.openDevTools();
    } else {
        win.loadFile(`${path.join(__dirname, '../build/index.html')}`);
    }

    win.once('ready-to-show', ()=>win.show());
    win.on('closed', ()=>win = null);
});

app.on('window-all-closed', ()=>app.quit());


