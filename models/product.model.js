const { model, Schema } = require('mongoose');

const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    available: Boolean,
    stock: Number,
    department: String,
    image: String,
    owner: { type: Schema.Types.ObjectId, ref: 'user' }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// prod.price_tax
productSchema.virtual('price_tax').get(function () {
    return (this.price * 1.21);
});

// prod.price_tax = 1856
productSchema.virtual('price_tax').set(function (newValue) {
    this.price = newValue / 1.21;
});

productSchema.statics.actives = function () {
    return model('product').find({
        stock: { $gt: 0 },
        available: true
    });
}

module.exports = model('product', productSchema);