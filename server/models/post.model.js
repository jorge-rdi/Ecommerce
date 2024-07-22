const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true,"El titulo es requerido!"],
        minLength: [3, "Debe ser mayor a 3 caracter."],
        maxLength: [100, "Debe ser menor a 100 caracteres."]
    },
    description: {
        type: String,
        required: true,
        minLength: [3, "Debe ser mayor a 3 caracter."],
        maxLength: [100, "Debe ser menor a 100 caracteres."]
    },
    price: {
        type: Number,
        required: true
    },  
    category:{
        type: String,
        enum: ['Casual','Deportivas', 'Street wear', 'Formales' ],
        required: true
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L', 'XL'],
        required: true
    },
    color: {
        type: String,
        required: true
    },
    image: {
        type: Array,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Post', PostSchema);