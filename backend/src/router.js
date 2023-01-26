const express = require('express');
const tasksController = require('./controllers/taskController')

const router = express.Router();

router.get('/tasks', tasksController.getAll);

module.exports = router;