const SizeProduct = require("../models/size_product");
const Product = require("../models/product.model");

// Add new size product
module.exports.addSizeProduct = (req,res) => {
    const size = new SizeProduct(req.body);

    Product.updateOne(
        {"colorProducts._id": req.body.colorProduct},
        {$push:{"colorProducts.$.sizeProducts":size}},
        (err,success) => {
            if (err) return res.json({success: false, err});
            return res.json({success: true, msg: "New size has been added"});
        }
    );
    // Product.findOne({"colorProducts._id": req.body.colorProduct},(err,product) =>{


    //     if(product){
    //         product.colorProducts.sizeProducts.push(size);
    //         product.save();
    //         res.json({
    //             success: true,
    //             message: "New size added"
    //         });
    //     }
    //     if (err){
    //         return res.json({success: false, err});
    //     }
    // })

}
