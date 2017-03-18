const Rx = require('rxjs/Rx');
const {fetchBundles, fetchComponents} = require("./services-api.js");

export default serverId =>
    Rx.Observable.create( observer => {
        Rx.Observable.interval(10 * 1000)
            .map( () => fetchBundles(serverId) )
            .pairwise()
            .map( ( [prev, current] ) => {
                let prevData = prev.data.data;
                let currentData = current.data.data;

                currentData.forEach( ( {stateRaw, symbolicName} ) => {
                    let prevData.find( x => x.symbolicName === symbolicName )
                } )
            } )
    } );