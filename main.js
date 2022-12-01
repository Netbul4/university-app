const path = require('path');
const os = require('os');
const fs = require('fs');
const { app, BrowserWindow, Menu } = require('electron'); require('./app');

process.env.NODE_ENV = 'production';

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';

let mainWindow;

function createMainWindow() {
    mainWindow = new BrowserWindow({
        title: 'App',
        width: isDev ? 1000 : 1200,
        height: 800,
        frame: false,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    // Open devtools if in dev environment.
    if(isDev){
        mainWindow.webContents.openDevTools();
    }

    mainWindow.loadURL('http://localhost:3000/');
    mainWindow.focus();
}

// When App is Ready.
app.whenReady().then(() => {
    createMainWindow();

    // Removing the default menu.
    Menu.setApplicationMenu(null);

    // Remove mainWindow from memory on close.
    mainWindow.on('closed', () => (mainWindow = null));


    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          createMainWindow();
        }
      });
});

app.on('window-all-closed', () => {
    if(!isMac){
        app.quit();
    }
})