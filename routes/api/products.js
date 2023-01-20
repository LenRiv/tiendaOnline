const router = require('express').Router();
const { checkSchema } = require('express-validator');
const multer = require('multer');
const upload = multer({ dest: 'public/images' })
const fs = require('fs');

const { checkErrors } = require('../../helpers/middlewares');
const { newProduct } = require('../../helpers/validators');
const Product = require('../../models/product.model');

router.get('/', async (req, res) => {

    const { page = 1, limit = 5 } = req.query;
    console.log(page, limit);

    /**
     * page = 1 skip = 0 limit = 5
     * page = 2 skip = 5 limit = 5
     * page = 3 skip = 10 limit = 5
     */

    try {
        const products = await Product.find()
            .skip((page -1) * limit)
            .limit(limit)
            .populate('owner')
        
        const total = await Product.count();
        
        res.json({
            info: {
                current_page: parseInt(page),
                count: total,
                pages: Math.ceil(total/limit)
            },
            results: products
        });
        
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.get('/min/:minPrice/max/:maxPrice', async (req, res) => {
    const { minPrice, maxPrice } = req.params;

    try {
        const products = await Product.find({
            price: {
                $gte: minPrice,
                $lte: maxPrice
            }
        });
        res.json(products);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.get('/actives', async (req, res) => {
    try {
        const products = await Product.actives();
        // const products = await Product.find({
        //     $or: [
        //         { stock: 0 },
        //         { available: false }
        //     ]
        // });

        res.json(products);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.get('/:department', async (req, res) => {
    const { department } = req.params;

    try {
        const products = await Product.find({
            department
        });
        res.json(products);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});






router.post('/',
    upload.single('image'),
    checkSchema(newProduct),
    checkErrors
    , async (req, res) => {
        try {
            // Agregamos la extensión a la imagen
            const extension = req.file.mimetype.split('/')[1];
            const newPath = `${req.file.path}.${extension}`;
            fs.renameSync(req.file.path, newPath);

            req.body.image = `${req.file.filename}.${extension}`;
            req.body.owner = req.user._id;

            const product = await Product.create(req.body);
            res.json(product);
        } catch (error) {
            res.json({ fatal: error.message });
        }
    });








router.put('/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findByIdAndUpdate(productId, req.body, { new: true });
        res.json(product);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.delete('/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findByIdAndDelete(productId);
        res.json(product);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

module.exports = router;