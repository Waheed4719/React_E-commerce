const express = require('express'),
      router = express.Router(),  
      {Login, Register, Add_To_Cart,getCartAndHistory, successfulPurchase} = require('./../controllers/authController')
      multer = require('multer'),
      DIR = './public/uploads',
      auth = require('./../middleware/auth.js'),
      storage = require('./../server.js')  

      
router.post('/login',Login)
router.post('/register',Register)
router.post('/add_to_cart',auth, Add_To_Cart)
router.get('/getCartAndHistory',auth, getCartAndHistory)
router.post('/successBuy',auth, successfulPurchase)


storage = multer.diskStorage({
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


const up = multer({ storage: storage }).single("file");



router.post('/upload_user_image', up, (req, res, next) => {
    
    if(req.file==undefined){
        console.log('no file found')
       return res.status(400).json({error: "no file selected"})
    }


        const url = req.protocol + '://' + req.get('host')
        data= url + '/public/uploads/' + req.file.filename
        try {
            res.status(201).json({userImage: data})
        } catch (error) {
            res.status(500).json({error});
        }
        next()
        
    })


module.exports = router