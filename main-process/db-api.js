const Datastore = require('nedb');

const db = new Datastore({ filename: 'datafile-bundles', autoload: true });

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
    persistBundles
}