const Blog = require("../models/blog.model");
const { validationResult } = require("express-validator");

// Create a new blog
exports.createBlog = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, content } = req.body;
        const newBlog = new Blog({
            title,
            content,
            author: req.user.id
        });

        const savedBlog = await newBlog.save();
        res.status(201).json({ message: "Blog created successfully", blog: savedBlog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get all blogs
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate("author", "username email");
        res.json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get a single blog by ID
exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("author", "username email");
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.json(blog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Update blog
exports.updateBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        let blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Check if the user is the author of the blog
        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized to update this blog" });
        }

        blog.title = title || blog.title;
        blog.content = content || blog.content;
        blog.updatedAt = Date.now();

        const updatedBlog = await blog.save();
        res.json({ message: "Blog updated successfully", blog: updatedBlog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Delete blog
exports.deleteBlog = async (req, res) => {
    try {
        let blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Check if the user is the author
        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized to delete this blog" });
        }

        await blog.deleteOne();
        res.json({ message: "Blog deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
