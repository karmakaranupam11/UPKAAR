const express = require('express');
const { addBedVacancy, removePost } = require('../../Controllers/beds-vacancy');
const { isAuthenticated } = require('../middlewares/authentication');

const router = express.Router();

// here in routes we make apis for the backend
router.route("/post/upload").post(isAuthenticated, addBedVacancy);

router.route("/removePost/:id").delete(isAuthenticated, removePost);

module.exports = router;