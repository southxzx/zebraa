const SizeProduct = require("../models/size_product");
const Product = require("../models/product.model");

// Add new size product
module.exports.addSizeProduct = (req,res) => {
    const size = new SizeProduct(req.body);

    size.save((err,doc) => {
        if (err) return res.json({success: false, err});
        if (doc){
            Product.updateOne(
                {"colorProducts._id": req.body.colorProduct},
                {$push:{"colorProducts.$.sizeProducts":size}},
                (err,success) => {
                    if (err) return res.json({success: false, err});
                    return res.json({success: true, msg: "New size has been added"});
                }
            );
        }
    })
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

module.exports.updateSizeProduct = (req,res) => {

    Product.find(
        {"_id" : req.body.idProduct}
    ).
    exec((err, data)=>{
        {
            if (data){
                data.forEach(function(doc){
                    doc.colorProducts.forEach( function(doc2) {
                        if (doc2._id == req.body.idColorProduct){
                            doc2.sizeProducts.forEach(function(doc3){
                                if (doc3._id == req.body.idSize){
                                    doc3.quantity = req.body.quantity;
                                }
                                else{
                                    // return res.status(200).json({msg:"Can not find size product"})
                                }
                            })
                        }
                        else{
                            // return res.status(200).json({msg:"Can not find color product"})
                        }
                        doc.save((err,doc)=>{
                            if (doc) return res.status(200).json({msg: "Updated!", data:doc})
                            return res.json({success: false, err})
                        })
                    });
                });
            
            }
            if (err) return res.status(200).json({msg:"Failed"})
            
        }
    })
}