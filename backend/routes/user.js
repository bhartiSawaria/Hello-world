
const express = require('express');

const isAuth = require('../middlewares/isAuth');
const userControllers = require('../controllers/user');

const router = express.Router();

router.get('/my-profile', isAuth, userControllers.getProfile);

// router.delete('/delete-account', isAuth, userControllers.deleteAccount);

router.post('/edit-account', isAuth, userControllers.postEditAccount);

router.get('/user/posts', isAuth, userControllers.getPosts);

router.get('/users', isAuth, userControllers.getUsers);

module.exports = router;