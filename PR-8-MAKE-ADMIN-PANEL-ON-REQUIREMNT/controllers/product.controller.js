import Category from "../models/category.model.js";
import Product from "../models/product.model.js";
import subCategory from "../models/subcategory.model.js";

const productController = {
    async addProductPage(req, res) {
        try {
            const categorys = await Category.find({});
            const subcategorys = await subCategory.find({});
            return res.render('./pages/add-product.ejs', {
                categorys, subcategorys
            });
        } catch (error) {
            console.log(error.message);            
            return res.render('./pages/add-product.ejs', {
                categorys: [], subcategorys: []
            });
        }
    },
    async addProduct(req, res) {
        try {
            req.body.image = req.file.path;
            await Product.create(req.body);
            console.log("Product Add Success.");
            return res.redirect(req.get('Referrer') || '/');
        } catch (error) {
            console.log(error.message);
            return res.redirect(req.get('Referrer') || '/');
        }
    },
    async viewProduct (req,res){
        try {
            let products = await Product.find({}).populate('category').populate({
                path:'subcategory',
                populate :{
                    path : 'category'
                }
            });
            return res.json(products);
        } catch (error) {
            return res.json({error:error.message});
        }
    }
}

export default productController;