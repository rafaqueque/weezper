var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Message = new Schema({
    uniqueid: String,
    content: String,
    created_at: Date
});

mongoose.model('Message', Message);
mongoose.connect('mongodb://local.dev/');