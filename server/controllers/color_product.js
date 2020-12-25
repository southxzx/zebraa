const ColorProduct = require("../models/color_product");
const Product = require("../models/product.model");
const cloudinary = require("../utils/cloudinary");

module.exports.addColorProduct = async (req, res) => {

    try {
        // upload image to cloudinary
        // const result = await cloudinary.uploader.upload(req.file.path);

        // req.body.images = result.secure_url;

        const urls = [];
        const files = req.files;
        
        for(const file of files){
            const {path} = file;
            const result = await cloudinary.uploader.upload(path);
            urls.push(result.secure_url);
        }
        req.body.images = urls;

        // Create new product
        const colorProduct = new ColorProduct(req.body);
        // Save
        colorProduct.save((err,doc) => {
            if (err) return res.json({success: false, err});
            if (doc){
                // Push new colorProduct into Product[] whenever a new colorProduct is added               
                Product.findOne({ _id: req.body.product},(err,data) =>{
                    if (data){
                        // Push to Product
                        data.colorProducts.push(colorProduct);
                        data.save();
                        res.json({
                            success: true,
                            message:'Pushed!',
                            doc
                        });
                    }
                    if(err) return res.json({success: false, err});
                })
            }
        })
        // Push new colorProduct into Product[] whenever a new colorProduct is added
        // res.json(req.body);
    } catch (error) {
        console.log(error);
    }


}