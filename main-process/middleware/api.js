const remoteDispatch = require("./../../common/middleware/remote-dispatch.js")
const dispatcher = require("./dispatcher.js")

module.exports = remoteDispatch(dispatcher.dispatch);