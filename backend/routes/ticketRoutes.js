const express = require("express");
const router = express.Router();
const controller = require("../controllers/ticketController");

router.post("/analyze", controller.analyzeTicket);
router.get("/", controller.getTickets);

module.exports = router;