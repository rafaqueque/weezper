// get the model
var mongoose = require('mongoose');
var Message = mongoose.model('Message');
var crypto = require('crypto');


// new Message POST handling 
exports.createMessage = function(req, res, next){

    // generate a random hash string
    var seed = crypto.randomBytes(20);
    var random_id = crypto.createHash('sha1').update(seed).digest('hex');

    // prepare object data
    var data = {
        uniqueid: random_id,
        content: req.body.content,
        updated_at: Date.now()
    }

    // save the object to the database
    new Message(data).save(function(err, todo, count){
        if (err) {
            return next(err);
        }
        else {
            // redirect user to the message, allowing to share
            res.redirect('/'+random_id);
        }
    });

};


// show specific Message
exports.showMessage = function(req, res, next){
    
    // prepare where clauses to get data
    var filters = {
        uniqueid: req.param('uniqueid')
    }

    // grab the message from the database
    Message.findOne(filters).exec(
        function (err, record){
            if (err) {
                return next(err);
            }
            else {
                if (record) {
                    // render the detail page
                    res.render('message', {message: record.content});
                    // remove the message
                    record.remove();
                }
                else {
                    // redirect the user to the index if there's no message
                    res.redirect('/');
                }
            }
        }
    );
};

