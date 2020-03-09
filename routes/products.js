const Product = require('./../models/Product.js')
const multer = require('multer')
const express = require('express')
const router = express.Router()
const { getProducts, getSingleProduct } = require('./../controllers/productController')


router.get('/getProducts',getProducts)
router.get('/:id',getSingleProduct)
// router.post('/addProduct', addProduct)


const DIR = './public/uploads';
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' && ext !== '.png' && ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
});


const upload = multer({ storage: storage }).single("file");

router.post("/uploadfiles", (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err });
        }
        console.log(res.req.file.path)
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename });
    });
});





module.exports = router


