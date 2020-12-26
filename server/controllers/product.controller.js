const Product = require("../models/product.model");

// Add new product
module.exports.addProduct = async (req, res) => {

    try {
        // Create new product
        const product = new Product(req.body);
        // Save
        product.save((err,doc) => {
            if (err) return res.json({success: false, err});
            res.status(200).json({
                success: true,
                doc
            })
        })

        // res.json(req.body);
    } catch (error) {
        console.log(err);
    }


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

// Get all products by ARRIVAL
// api/product/get/?sortBy=createdAt&order=desc&limit=8
module.exports.getAllProductsByArrival = (req, res) => {

    // let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    // let order = req.query.order ? req.query.order : 'asc';
    let limit = req.query.limit ? parseInt(req.query.limit) : 100
    let skip = parseInt(req.query.skip);

    Product.
    find().
    populate('category').
    populate('colorProducts').
    populate({ 
        path: 'colorProducts',
        populate: {
          path: 'color'
        } 
    }).
    populate({ 
        path: 'review',
        populate: {
          path: 'user'
        } 
    }).
    populate({ 
        path: 'colorProducts',
        populate: {
          path: 'sizeProducts',
          populate:{
              path: 'size'
          }
        } 
    }).
    // sort({sortBy: order}).
    limit(limit).
    skip(skip).
    exec((err, data)=>{
        if (err) return res.send(err);
        res.status(200).send({data});
    })
}

// Update product by ID
module.exports.updateProduct = (req, res) => {

    Product.findByIdAndUpdate(
        {_id : req.query.id},
        { $set : req.body},
        (err, data)=>{
            if (err) return res.send(err);
            res.status(200).send(data);
        }
    )
}

// Delete product by ID
module.exports.deleteProduct = (req, res) =>{
    Product.findByIdAndUpdate(
        {_id : req.query.id},
        { active : false},
        (err, data)=>{
            if (err) return res.send(err);
            res.status(200).send(data);
        }
    )
}