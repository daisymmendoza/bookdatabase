const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    name:{
        type:String
    },
    author:{
        type:String
    },
    genre:{
        type:String
    },
    release:{
        type:Number
    },
    language:{
        type:String
    },
    level:{
        type:String
    }
})

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;