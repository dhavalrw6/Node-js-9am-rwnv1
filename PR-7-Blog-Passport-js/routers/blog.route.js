import { Router } from "express";
import blogController from "../controllers/blog.controller.js";
import imageUpload from "../middlewares/imageUpload.js";

const router = Router();

router.get('/add-blog',blogController.addBlogPage);
router.post('/add-blog',imageUpload, blogController.addBlog);
router.get('/get-all-myblogs', blogController.getAllMyBlogs);

export default router;