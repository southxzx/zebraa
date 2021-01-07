const Review = require("../models/review.model");
const Product = require("../models/product.model");

// Add new review 
module.exports.addReview = (req,res) => {
    const review = new Review(req.body);

    review.save((err,doc)=>{
        if(err) return res.json({success: false, err});
        if (doc){
            Product.findOne({ _id: req.body.product},(err,data)=>{
                if (data){
                    // Push to Product
                    data.review.push(review);
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
}
 
// Get all reviews by productID
module.exports.getAllReviewsByProductID = (req, res) => {
    Review.find({product: req.query._id}).
    populate('user').
    exec((err,doc)=>{
        if (err) return res.json({success: false, err})
        res.status(200).send({doc})
    });
}