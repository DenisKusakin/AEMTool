import injectTapEventPlugin from 'react-tap-event-plugin';
import ServerList from "./server-list.js"
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

export {
    ServerList
}