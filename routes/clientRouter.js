const express = require('express');
const clientController = require('../controllers/clientController');

const router = express.Router();

router.route("/").get(clientController.createThread).post(clientController.userMessage);

router.route("/bot").post(clientController.runClient);

module.exports = router;