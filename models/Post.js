const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName:  {
        type: String,
        required: true
    }
    // date:  {
    //     type: Date,
    //     default: Date.now
    // },

    // image: {
    //     type: String,
    // }
});





module.exports = mongoose.model('Post', PostSchema);