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

// Get all color product -- find(query, projection)
module.exports.getAllColorProduct = (req, res) => {
    ColorProduct.find({},(err,colorProduct) => {
        if (err) return res.send(err);
        res.status(200).send(colorProduct);
    })
}

module.exports.getLastColorProduct = (req, res) => {
    ColorProduct.find(
        {}
    ).
    limit(1).
    sort({_id:-1}).
    exec((err,colorProduct) => {
        if (err) return res.send(err);
        res.status(200).send(colorProduct);
    })
}


module.exports.updateColorProduct = async (req,res) => {
    try {
        const urls = [];
        const files = req.files;
        
        for(const file of files){
            const {path} = file;
            const result = await cloudinary.uploader.upload(path);
            urls.push(result.secure_url);
        }
        req.body.images = urls;

        // Create new product
        //const colorProduct = new ColorProduct(req.body);
        
        ColorProduct.findByIdAndUpdate(
            {_id: req.query.id},
            { $set : req.body},
            (err,doc) => {
                if (err) return res.send(err);

                if(doc){
                    //Update product by colorProduct
                    Product.updateOne(
                        {"colorProducts._id" : req.query.id},
                        { $set : {'colorProducts.$.price':req.body.price,
                                  'colorProducts.$.color':req.body.color,
                                  'colorProducts.$.images':req.body.images,
                                  'colorProducts.$.avatar':req.body.avatar }},
                        (errs,docs) => {
                            if (errs) return res.send(errs);
            
                            if(docs) return res.status(200).json({
                                success: true,
                                message:'Color Product updated!',
                                docs
                            });
                        }
                    )

                }
                
            }
        )
    } catch (error) {
        console.log(error);
    }
}