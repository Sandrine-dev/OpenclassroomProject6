const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controllers/sauces');


router.post ('/', auth, multer, sauceCtrl.create);
router.put ('/:id', auth, multer,  sauceCtrl.modify);
router.delete ('/:id', auth, multer, sauceCtrl.delete);
router.get ('/:id', auth, sauceCtrl.getOne);
router.post ('/:id/like', auth, sauceCtrl.like);
router.get ('/', auth, sauceCtrl.getAll);


module.exports = router;