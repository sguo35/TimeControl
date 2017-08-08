'use strict';

/**
 * Module dependencies.
 */
var electron = require('electron');
var path = require('path');

// debug
if (process.env.NODE_ENV === 'development') {
    require('electron-debug')({
        showDevTools: true
    });
}

var mainWindow;

/**
 * Create the main browser window.
 */
function createWindow() {
    mainWindow = new electron.BrowserWindow({
        width: 800,
        height: 600
    });

    mainWindow.loadURL(
        path.join('file://', __dirname, '/app/index.html')
    );

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
};

/**
 * App.
 */
electron.app.on('ready', createWindow);

electron.app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        electron.app.quit();
    }
});

electron.app.on('activate', function() {
    if (mainWindow === null) {
        createWindow();
    }
});

electron.app.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  });
