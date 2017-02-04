const Rx = require('rxjs/Rx');
const {CTRL_F, SHORTCUT} = require('./constants.js')
var source = new Rx.Subject();

ipcRenderer.on(SHORTCUT, (event, message) => source.next(message))

source.subscribe(x => console.log(x));

module.exports = source;