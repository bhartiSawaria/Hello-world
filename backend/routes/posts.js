
const express = require('express');

const postControllers = require('../controllers/posts');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

router.post('/add-post/type1', isAuth, postControllers.createTextPost);

router.post('/add-post/type2', isAuth, postControllers.createImagePost);

module.exports = router;