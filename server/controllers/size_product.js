const SizeProduct = require("../models/size_product");
const ColorProduct = require("../models/color_product");

// Add new size product
module.exports.addSizeProduct = (req,res) => {
    const size = new SizeProduct(req.body);


    ColorProduct.findOne({_id: req.body.colorProduct},(err,product) =>{


        if(product){
            product.sizeProducts.push(size);
            product.save();
            res.json({
                success: true,
                message: "New size added"
            });
        }
        if (err){
            return res.json({success: false, err});
        }
    })

}
