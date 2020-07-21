
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const { MONGODB_URI, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = require('./keyInfo');

const app = express();

app.use(cors());

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});

const imageStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'images',
    allowedFormats: ['png', 'jpg', 'jpeg'],
    transformation: [{
        width: 600,
        height: 600,
        crop: "limit"
    }]
});

app.use(bodyParser.json());
app.use(multer({storage: imageStorage}).single('image'));

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'PUT, PATCH, GET, POST, DELETE');
//     next();
// });


app.use(authRoutes);
app.use(postRoutes);
app.use(userRoutes);

app.use((error, req, res, next) => {
    console.log('Reached here');
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({
        message: message,
        data: data
    });
})

mongoose.connect(MONGODB_URI)
.then(result => {
    console.log('Connected!!');
    app.listen(8080);
})
.catch(err => {
    console.log(err);
})