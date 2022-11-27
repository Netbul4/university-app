const path = require('path');
const os = require('os');
const fs = require('fs');
const { app, BrowserWindow, Menu, ipcMain, shell } = require('electron');

process.env.NODE_ENV = 'production';

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';

let mainWindow;

function createMainWindow() {
    mainWindow = new BrowserWindow({
        title: 'App',
        width: isDev ? 1000 : 1200,
        height: 800,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
        }
    });

    // Open devtools if in dev environment.
    if(isDev){
        mainWindow.webContents.openDevTools();
    }

    mainWindow.loadURL('http://localhost:3000/login');
    mainWindow.maximize();
}

// Create About Window
function createAboutWindow(){
    const aboutWindow = new BrowserWindow({
        title: 'About Uni-App',
        width: 300,
        height: 300
    });

    aboutWindow.loadFile(path.join(__dirname, './views/about.html'));
}

function createIndexWindow(){
    const indexWindow = new BrowserWindow({
        title: 'Inicio',
        width: isDev ? 1000 : 1200,
        height: 800,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
        }
    });

    // Open devtools if in dev environment.
    if(isDev){
        indexWindow.webContents.openDevTools();
    }

    mainWindow.close();
    indexWindow.loadURL('http://localhost:3000');
    indexWindow.maximize();
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