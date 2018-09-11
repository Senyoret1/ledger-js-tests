'use strict'

const { app, Menu, BrowserWindow, shell, session, dialog } = require('electron');
const childProcess = require('child_process');
const path = require('path')
const url = require('url');
const Transport = require('@ledgerhq/hw-transport-node-hid');
const AppSky = require('@ledgerhq/hw-app-sky');

// This adds refresh and devtools console keybindings
// Page can refresh with cmd+r, ctrl+r, F5
// Devtools can be toggled with cmd+alt+i, ctrl+shift+i, F12
require('electron-debug')({enabled: true, showDevTools: false});
require('electron-context-menu')({});

app.commandLine.appendSwitch('ssl-version-fallback-min', 'tls1.2');
app.commandLine.appendSwitch('--no-proxy-server');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();
});

function createWindow() {
  if (win) {
    return;
  }

  console.log('Creating window');

  // Create the browser window.
  win = new BrowserWindow({
    width: 300,
    height: 300,
    title: 'Ledger JS test',
    nodeIntegration: true,
    webPreferences: {
      webgl: false,
      webaudio: false,
      contextIsolation: true,
      webviewTag: false,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      allowRunningInsecureContent: false,
      webSecurity: true,
      plugins: false,
    },
  });




  ////////////////////////////////////////////////////////
  // Testig code start
  ////////////////////////////////////////////////////////

  dialog.showErrorBox("Message (not an error)", "Connect the Ledger wallet and open the Skycoin app before continuing!");
  
  Transport.default.create().then(t => {
    try {
      dialog.showErrorBox("Transport object contents (not an error)", JSON.stringify(t).replace(new RegExp(',', 'g'), ' '));
      
      const sky = new AppSky.default(t);
      
      sky.getWalletPublicKey("44'/0'/0'/0/0").then(address => {
        dialog.showErrorBox("Address response", JSON.stringify(address).replace(new RegExp(',', 'g'), ' '));
      }).catch((err) => {
        dialog.showErrorBox("Error 1!", JSON.stringify(err).replace(new RegExp(',', 'g'), ' '));
      });
    } catch (err) {
      dialog.showErrorBox("Error 2!", JSON.stringify(err).replace(new RegExp(',', 'g'), ' '));
    }
  }).catch((err) => {
    dialog.showErrorBox("Error 3!", JSON.stringify(err).replace(new RegExp(',', 'g'), ' '));
  });

  ////////////////////////////////////////////////////////
  // Testig code end
  ////////////////////////////////////////////////////////




  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

// Enforce single instance
const alreadyRunning = app.makeSingleInstance((commandLine, workingDirectory) => {
  // Someone tried to run a second instance, we should focus our window.
  if (win) {
    if (win.isMinimized()) {
      win.restore();
    }
    win.focus();
  } else {
    createWindow();
  }
});

if (alreadyRunning) {
  app.quit();
  return;
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});
