const express = require('express');
const clientController = require('../controllers/clientController');
const clientCreate = require("../controllers/clientCreate");

const router = express.Router();

router.route("/").get(clientController.createThread).post(clientController.userMessage);
router.route("/bot").post(clientController.runClient);

router.route("/verify").get(clientCreate.verifyToken);

module.exports = router;