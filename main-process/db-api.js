const Datastore = require('nedb');

const db = new Datastore({ filename: 'datafile-bundles', autoload: true });
const serversDB = new Datastore({ filename: 'datafile-servers', autoload: true });

function persistServer(doc){
    //var doc = {name, host, login, password}
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

function getBundles(serverId){
    return new Promise((resolve, reject) => {
        db.findOne({serverId}, {}, function(error, doc){
            if(!error && doc != null){
                resolve(doc);
            }
            reject();
        })
    });
}

function persistBundles(serverId, bundles){
    return new Promise((resolve, reject) => {
        db.findOne({serverId}, {}, function(error, doc){
            if(!error && doc != null){
                resolve()
            }
            reject();
        })
    }).then(
        () => {
            return new Promise((resolve, reject) => {
                db.update({serverId}, {
                    $set: {
                        data: bundles,
                        time: new Date()
                    }
                }, {}, (error, numReplaced) => {
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
                    data: bundles,
                    time: new Date(),
                    serverId
                }
                db.insert(doc, (err, newDoc) => {
                    if(!err){
                        resolve();
                    }
                    reject();
                })
            });
        }
    )
}

module.exports = {
    getBundles,
    persistBundles,
    getServer,
    updateServer,
    persistServer,
    removeServer,
    findServers
}