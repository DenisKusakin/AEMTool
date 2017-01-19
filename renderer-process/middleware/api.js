import remoteDispatch from "./../../common/middleware/remote-dispatch.js";

const {dispatch} = remote.require("./main-process/store/index.js");

export default remoteDispatch(dispatch)