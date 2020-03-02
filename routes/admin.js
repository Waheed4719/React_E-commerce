const express = require('express'),
      router = express.Router(),  
      {Login, Register, getAdmins, getUsers} = require('./../controllers/adminController'),
      {addProduct} = require('./../controllers/productController'),
      authenticate = require('./../authenticate')
       admin = require('./../middleware/admin') 
router.post('/login',Login)
router.post('/register',Register)
router.get('/admins',getAdmins)
router.get('/getUsers',getUsers)

router.post('/products/addProduct',admin, addProduct)


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