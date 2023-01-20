const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'El campo username es obligatorio']
    },
    email: String,
    password: String,
    address: String,
    age: {
        type: Number,
        min: 0,
        max: 100
    },
    role: {
        type: String,
        enum: ['regular', 'admin', 'moderator']
    },
    products: [{ type: Schema.Types.ObjectId, ref: 'product' }]
});

module.exports = model('user', userSchema);