const Datastore = require('nedb');

const serversDB = new Datastore({ filename: 'datafile-servers', autoload: true });
const db = new Datastore({ filename: 'datafile-server-data', autoload: true });

//TODO: Servers should be implemented in the same way as below
function persistServer(doc){
    return new Promise((resolve, reject) => {
        serversDB.insert(doc, function (err, newDoc) {
            if(err){
                reject();
                return;
            }
            resolve(newDoc);
        });
    });
}

function getServer(_id){
    return new Promise((resolve, reject) => {
        serversDB.findOne({_id}, {}, function (err, doc) {
            if(!err){
                resolve(doc);
            }
            reject({_id});
        })
    });
}

function removeServer(_id){
    return new Promise((resolve, reject) => {
        serversDB.remove({_id}, {}, function (err, numRemoved) {
            if(!err){
                resolve({_id});
                return;
            }
            reject({_id});
        });
    });
}

function findServers(query){
    return new Promise((resolve, reject) => {
        serversDB.find(query, function(err, docs){
            if(!err){
                resolve(docs);
            }else{
                reject();
            }
        })
    });
}

function updateServer(_id, value){
    return new Promise((resolve, reject) => {
        serversDB.update({_id}, {
                $set: value
            }, function (err, doc) {
                if(!err){
                    resolve();
                    return;
                }
                reject();
        })
    })
}

const getEntity = database => entityType => serverId => new Promise((resolve, reject) => {
    database.findOne({serverId}, {}, function(error, doc){
        if(!error && doc != null && doc[entityType]){
          resolve(doc[entityType]);
        }
        reject();
    })
});

const persistEntity = database => entityType => (serverId, entity) => new Promise((resolve, reject) => {
    database.findOne({serverId}, {}, function(error, doc){
        if(!error && doc != null && doc[entityType]){
            resolve();
            return;
        }
        reject();
    })
}).then(
    () => {
        return new Promise((resolve, reject) => {
            let $set = {
                [entityType]: {
                    data: entity.data,
                    time: entity.time
                }
            };
            database.update({serverId}, {$set}, {}, (error, numReplaced) => {
                if(!error && numReplaced === 1){
                    resolve();
                }
                reject(numReplaced !== 1 ? "Not found" : error);
            })
        });
    },
    () => {
        return new Promise((resolve, reject) => {
            let doc = {
                [entityType]: {
                    data: entity.data,
                    time: entity.time,
                },
                serverId
            }
            database.insert(doc, (err, newDoc) => {
                if(!err){
                    resolve();
                }
                reject();
            })
        });
    }
)

module.exports = {
    getEntity: getEntity(db),
    persistEntity: persistEntity(db),
//  Rest
    getServer,
    updateServer,
    persistServer,
    removeServer,
    findServers
}