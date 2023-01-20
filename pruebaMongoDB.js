const mongoose = require('mongoose');

const Product = require('./models/product.model');
const User = require('./models/user.model');

(async () => {

    mongoose.set('strictQuery', false);
    await mongoose.connect('mongodb://127.0.0.1:27017/tienda_online');

    // const response = await Product.create({
    //     name: 'Pantalones azules',
    //     description: 'Son para las piernas',
    //     price: 35,
    //     department: 'moda',
    //     available: true,
    //     stock: 28,
    //     image: 'https://www.bolf.es/spa_pl_Pantalon-chino-para-hombre-color-marron-Bolf-1146-86886_9.jpg',
    //     category: 'new'
    // });

    // const products = await Product.find({
    //     price: { $gt: 20 }, // $gt, $gte, $lt, $lte
    //     available: true
    // });

    // const products = await Product.findOne({
    //     stock: { $lte: 30 }
    // });

    // console.log(products);

    // const user = await User.create({
    //     usernamea: 'mario',
    //     email: 'mario@mail.com',
    //     password: '12345',
    //     address: 'C Gran Vía 23',
    //     age: 123,
    //     role: 'admin'
    // });
    // console.log(user);

    const product = await Product.findById('63c64d59ca830a97c348e6f9');

    product.price = 120;

    await product.save();

    await mongoose.disconnect();
})();