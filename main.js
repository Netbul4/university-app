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

    mainWindow.loadURL('http://localhost:3000');
    //mainWindow.loadFile(path.join(__dirname, './views/login.ejs'));
}

//Create About Window
function createAboutWindow(){
    const aboutWindow = new BrowserWindow({
        title: 'About Image Resizer',
        width: 300,
        height: 300
    });

    aboutWindow.loadFile(path.join(__dirname, './views/about.html'));
}

// When App is Ready.
app.whenReady().then(() => {
    createMainWindow();

    //Implement menu.
    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);

    //Remove mainWindow from memory on close.
    mainWindow.on('closed', () => (mainWindow = null));


    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          createMainWindow();
        }
      });
});

//Menu template.
const menu = [
    ...(isMac ? [{
        label: app.name,
        submenu: [
            {
                label: 'About',
                click: createAboutWindow
            }
        ],
    }] 
    : []),
    {
        role: 'fileMenu',
    },
    ...(!isMac ? [{
        label: 'Help',
        submenu: [{
            label: 'About',
            click: createAboutWindow
        }]
    }] : [])
];

app.on('window-all-closed', () => {
    if(!isMac){
        app.quit();
    }
})