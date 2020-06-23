
const express = require('express');

const postControllers = require('../controllers/posts');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

router.post('/add-post/type1', isAuth, postControllers.createTextPost);

router.post('/add-post/type2', isAuth, postControllers.createImagePost);

router.get('/feed', isAuth, postControllers.getFeed);

router.post('/save-post/type1', isAuth, postControllers.postSaveTextPost);

router.post('/save-post/type2', isAuth, postControllers.postSaveImagePost);

router.delete('/remove-saved-post/type1', isAuth, postControllers.removeSavedTextPost);

router.delete('/remove-saved-post/type2', isAuth, postControllers.removeSavedImagePost);

module.exports = router;