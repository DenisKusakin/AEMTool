module.exports = (function(){
    var dispatcher = false;

    return {
        dispatch: function(action){
            dispatcher && dispatcher(action)
        },
        subscribe: function(dispatch){
            dispatcher = dispatch;
        }
    };
})();
