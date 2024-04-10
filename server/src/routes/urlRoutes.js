const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');
const { authenticate } = require('../middleware/auth');
const { validateUrl } = require('../middleware/validator');

router.post('/', authenticate, validateUrl, urlController.createUrl);
router.get('/:shortUrl', urlController.getUrl);
router.get('/', authenticate, urlController.getUserUrls);
router.delete('/:id', authenticate, urlController.deleteUrl);
router.get('/analytics/:shortUrl', authenticate, urlController.getUrlAnalytics);

module.exports = router;