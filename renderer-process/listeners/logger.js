import source from "./../events-stream.js";

export default (filter) =>
    source
    .filter(x => (filter !== undefined ? filter(x) : true))
    .subscribe(x =>
        console.log("Event: ", x)
    )