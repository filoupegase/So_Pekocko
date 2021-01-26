const express = require('express');
const multerImage = require('../middleware/multer-config');
const router = express.Router();
const auth = require('../middleware/auth');
const controllerSauces = require('../controllers/saucesController');

router.post('/', auth, multerImage, controllerSauces.createSauce);
router.put('/:id', auth, multerImage, controllerSauces.modifySauces);
router.delete('/:id', auth, controllerSauces.deleteSauces);
router.get('/:id', auth, controllerSauces.getIdSauces);
router.get('/', auth, controllerSauces.getAllSauces);
router.post('/:id/like', auth, controllerSauces.likeSauces);

module.exports = router;