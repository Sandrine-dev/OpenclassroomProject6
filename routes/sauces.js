const express = require('express');
const router = express.Router();

//const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controllers/sauces');


router.post ('/', multer, sauceCtrl.create);
router.put ('/:id',  sauceCtrl.modify);
router.delete ('/:id',  sauceCtrl.delete);
router.get ('/:id',  sauceCtrl.getOne);
router.post ('/:id/like', sauceCtrl.like);
router.get ('/', sauceCtrl.getAll);


module.exports = router;