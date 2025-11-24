import BlogModel from "../models/blog.model.js";

const blogController = {
    addBlogPage(req,res){
        return res.render('./pages/add-blog.ejs');
    },
    async addBlog(req,res){
        try {
            req.body.image = req.file.path;
            let data = await BlogModel.create(req.body);
            console.log("Blog Created",data.id);
            return res.redirect(req.get('Referrer') || '/');
        } catch (error) {
            console.log(error.message);
            return res.redirect(req.get('Referrer') || '/');
        }
    },
    async getAllMyBlogs(req,res){
        try {
            const {id} = res.locals.user;
            const blogs = await BlogModel.find({userId : id});
            console.log(blogs);
            return res.render('./pages/get-all-myblogs.ejs',{blogs});
        } catch (error) {
            console.log(error.message);
            return res.render('./pages/get-all-myblogs.ejs',{blogs:[]});
        }
    }
} 

export default blogController;