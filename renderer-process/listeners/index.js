import storeListeners from "./store-listeners.js"
import serverListListeners from "./server-list.js"
import logger from "./logger.js"
import {SERVER_STATUS_UPDATED} from "./../../common/event-types.js"
import "./shortcut.js"
import {searchListeners} from "./search.js"

export default store => {
    storeListeners(store);
    searchListeners(store);
    serverListListeners();
    logger(x => x.type !== SERVER_STATUS_UPDATED);
}