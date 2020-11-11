const Product = require("../models/product.model");

// Add new product
module.exports.addProduct = (req, res) => {
    const product = new Product(req.body);

    product.save((err,doc) => {
        if (err) return res.json({success: false, err});
        res.status(200).json({
            success: true,
            doc
        })
    })
}

// Get 1 product 
// api/product/get?id=A
module.exports.getSingleProduct = (req, res) => {

    Product.find(
        {_id : req.query.id}
    ).
    populate('brand').
    populate('category').
    populate('color').
    populate('size').
    exec((err, result) => {
        if (err) return res.send(err);
        res.status(200).send(result)
    });
    
}