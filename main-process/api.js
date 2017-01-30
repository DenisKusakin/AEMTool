//const {
//    ADD_SERVER_ERROR,
//    NEW_SERVER_ADDED_SUCCESSFULLY,
//    SERVER_REMOVE_ERROR,
//    SERVER_REMOVED_SUCCESSFULLY,
//    SERVERS_FETCHED_ERROR,
//    SERVERS_FETCHED_SUCCEFFULLY
//} = require("./../common/event-types.js");

const {serverStatus} = require("./helpers");
const Datastore = require('nedb');

const db = new Datastore({ filename: 'datafile-servers', autoload: true });

function addServer({name, host, login, password}){
    var doc = {name, host, login, password}
    return new Promise((resolve, reject) => {
        db.insert(doc, function (err, newDoc) {   
            if(err){
                reject();
                return;
            }
            resolve(newDoc);
        });
    });
}

function removeServer(_id){
    return new Promise((resolve, reject) => {
        db.remove({_id}, {}, function (err, numRemoved) {
            if(!err){
                resolve({_id});
                return;
            }
            reject({_id});
        });
    });
}

function fetchServers(){
    return new Promise((resolve, reject) => {
        db.find({}, function(err, docs){
            if(!err){
                resolve(docs);
            }else{
                reject(docs);
            }
        })
    });
}

function checkStatus({_id}){
    return new Promise((resolve, reject) => {
        db.findOne({_id}, {}, function (err, doc) {
            if(!err){
                resolve(doc);
            }
            reject({_id});
        })
    }).then(server => {
        return serverStatus(server)
    });
}

function getServer(_id){
    return new Promise((resolve, reject) => {
        db.findOne({_id}, {}, function (err, doc) {
            if(!err){
                resolve(doc);
            }
            reject({_id});
        })
    });
}

module.exports = {addServer, removeServer, fetchServers, checkStatus, getServer};