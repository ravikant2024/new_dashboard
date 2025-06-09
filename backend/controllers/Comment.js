const Comment = require('../models/Comment');

// POST: Create new comment
exports.createComment = async (req, res) => {
    try {
        const { name, email, website, comment } = req.body;

        if (!name || !email || !comment) {
            return res.status(400).json({ message: "Name, email, and comment are required." });
        }

        const newComment = new Comment({ name, email, website, comment });
        await newComment.save();

        res.status(201).json({ message: "Comment submitted successfully!", data: newComment });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// GET: Fetch all comments
exports.getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find().sort({ createdAt: -1 });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch comments", error: error.message });
    }
};
