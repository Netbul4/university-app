const { remote } = require('electron');

let currWindow = remote.BrowserWindow.getFocusedWindow();

window.closeCurrentWindow = function(){
  currWindow.close();
}

window.minimizeCurrentWindow = function(){
    currWindow.minimize();
}