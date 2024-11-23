const express = require('express');
const Todo = require('../models/Todo');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Create Todo
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { title, description, isPublic } = req.body;
        const newTodo = new Todo({
            title,
            description,
            isPublic,
            userId: req.user.id,
        });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Todos (Public + User-specific)
router.get('/', authMiddleware, async (req, res) => {
    try {
        const todos = await Todo.find({
            $or: [{ isPublic: true }, { userId: req.user.id }],
        });
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete Todo
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!todo) return res.status(404).json({ message: 'Todo not found' });

        res.status(200).json({ message: 'Todo deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
