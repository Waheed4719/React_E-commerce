const express = require('express'),
      cors = require('cors'),
      mongoose = require('mongoose'),
      db = require('./config/keys').mongoURI,
      app = express(),
      port = process.env.port || 5000,

      multer = require('multer'),
      passport = require('passport'),
      socketio = require('socket.io'),
      http = require('http'),
      server = http.createServer(app);
      global.io = module.exports.io =  socketio(server),
      app.use(express.json())
      app.use( express.urlencoded({ extended: false }) )
      
      auth = require('./routes/auth')
      products = require('./routes/products')
      admin = require('./routes/admin')

      app.use('/public', express.static('public'));

      app.use('/api/auth',auth)
      app.use('/api/products',products)
      app.use('/api/admin',admin)
      
      const checkUserType = function(req,res,next){
        const userType = req.originalUrl.split('/')[2]
        
        require('./passport')(userType,passport)
        next();
    }
    
      app.use(checkUserType)
      app.use(passport.initialize())
        
      DIR = './public/uploads'

 
      mongoose.set('useCreateIndex', true);
      mongoose.set('useFindAndModify',false);
      mongoose.connect(db, { useNewUrlParser: true,  useUnifiedTopology: true  })
              .then(console.log('Connected to MongoDB')) 
              .catch(err => console.log(err))
     
              
     server.listen(port,() => {
          console.log(`server started on port ${port}`)
      })


      







     