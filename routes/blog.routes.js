const express = require("express");
const { body } = require("express-validator");
const authMiddleware = require("../middleware/auth.middleware");
const blogController = require("../controllers/blog.controller");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Blog
 *   description: Blog endpoints
 */

/**
 * @swagger
 * /api/blogs:
 *   post:
 *     summary: Create a new blog
 *     description: Add a new blog post (requires authentication).
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Blog created successfully.
 */
router.post(
    "/",
    authMiddleware,
    [
        body("title").notEmpty().withMessage("Title is required"),
        body("content").notEmpty().withMessage("Content is required")
    ],
    blogController.createBlog
);
/**
 * @swagger
 * /api/blogs:
 *   get:
 *     summary: Get all blogs
 *     description: Retrieve a list of all blog posts.
 *     tags: [Blog]
 *     responses:
 *       200:
 *         description: A list of blogs.
 */
router.get("/", blogController.getAllBlogs);

/**
 * @swagger
 * /api/blogs/{id}:
 *   get:
 *     summary: Get a blog by ID
 *     description: Retrieve a blog post by its ID.
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single blog object.
 *       404:
 *         description: Blog not found.
 */
router.get("/:id", blogController.getBlogById);

/**
 * @swagger
 * /api/blogs/{id}:
 *   put:
 *     summary: Update a blog
 *     description: Update an existing blog post (requires authentication).
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Blog updated successfully.
 */
router.put("/:id", authMiddleware, blogController.updateBlog);
/**
 * @swagger
 * /api/blogs/{id}:
 *   delete:
 *     summary: Delete a blog
 *     description: Remove a blog post (requires authentication).
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Blog deleted successfully.
 */
router.delete("/:id", authMiddleware, blogController.deleteBlog);

module.exports = router;
