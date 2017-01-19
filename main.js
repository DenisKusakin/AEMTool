const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

// storage.set('server', {"url": "http://eprupetw1009.petersburg.epam.com:4502", "login": "admin", "password": "admin"}, function(error) {
//   if (error) throw error;
// });
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

//const test = require("./test");

// request(data.url, function (error, response, body) {
//     console.log(body) // Show the HTML for the Google homepage.
// }).auth(data.login, data.password, false);

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 2500, height: 2500})

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    app.quit()
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
