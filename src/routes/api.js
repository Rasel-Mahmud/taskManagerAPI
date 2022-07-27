const express = require('express');
const { createTask, deleteTask, updateTask, taskStatusChange, taskListByStatus, taskStatusCount } = require('../controllers/TaskController');
const { registration, login, updateProfile } = require('../controllers/UserController');
const { auth } = require('../middlewares/Auth');
const router = express.Router()

/*
** API Routers
*/

// Users 
router.post('/registration', registration);
router.post('/login', login);
router.post('/update-profile', auth, updateProfile);

// Tasks
router.post('/create-task', auth, createTask);
router.get('/delete-task/:id', auth, deleteTask);
router.post('/update-task/:id', auth, updateTask);
router.get('/task-status-change/:id/:status', auth, taskStatusChange);
router.get('/task-list/:status', auth, taskListByStatus);
router.get('/task-count', auth, taskStatusCount);

module.exports = router;