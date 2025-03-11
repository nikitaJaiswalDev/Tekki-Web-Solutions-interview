const express = require("express");
const { body } = require("express-validator");
const authMiddleware = require("../middleware/auth.middleware");
const blogController = require("../controllers/blog.controller");

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    [
        body("title").notEmpty().withMessage("Title is required"),
        body("content").notEmpty().withMessage("Content is required")
    ],
    blogController.createBlog
);

router.get("/", blogController.getAllBlogs);
router.get("/:id", blogController.getBlogById);
router.put("/:id", authMiddleware, blogController.updateBlog);
router.delete("/:id", authMiddleware, blogController.deleteBlog);

module.exports = router;
