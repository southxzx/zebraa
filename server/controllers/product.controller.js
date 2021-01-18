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
            path: 'user',
            select: {'name':1}
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
    exec((err, data)=>{
        if (err) return res.send(err);
        res.status(200).send({data});
    });
    
}

// Get all products by ARRIVAL
// api/product/get/?sortBy=createdAt&order=desc&limit=8
module.exports.getAllProductsByArrival = (req, res) => {

    // let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    // let order = req.query.order ? req.query.order : 'asc';
    let limit = req.body.limit ? parseInt(req.body.limit) : 100
    let skip = parseInt(req.body.skip);    // vì xài pagination của hook nên mặc định currentPage = 1 nên phải trừ xuống cho skip = 0
    let findArgs = {};

    //Lấy filters bỏ vào findArgs để get SP theo filters
    for (let key in req.body.filters){
        if (req.body.filters[key].length > 0){
            if (key == "colorProducts.price")  {
                findArgs[key] = {
                    // Greater than equal
                    $gte: req.body.filters[key][0],
                    // Less than equal
                    $lte: req.body.filters[key][1]
                }
            }       
            else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }
    console.log(findArgs);

    Product.
    find(findArgs).
    populate('category').
    populate({ 
        path: 'colorProducts',
        populate: {
          path: 'color'
        } 
    }).
    populate({ 
        path: 'review',
        populate: {
          path: 'user',
          select: {'name':1}
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

// UpdateQty 
module.exports.updateQty = (req, res) => {
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
                                    doc3.quantity = doc3.quantity - req.body.quantity;
                                }
                                else{
                                    return;
                                    // return res.status(200).json({msg:"Can not find size product"})
                                }
                            })
                        }
                        else{
                            return;
                            // return res.status(200).json({msg:"Can not find color product"})
                        }
                        doc.save((err,doc)=>{
                            if (doc) return res.status(200).json({msg: "Updated!", data:doc})
                            if(err) return res.json({success: false, err})
                        })
                    });
                });
            
            }
            if (err) return res.status(200).json({msg:"Failed"})
            
        }
    })
}