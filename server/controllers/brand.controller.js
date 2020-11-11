const Brand = require("../models/brand.model");

// Add new brand
module.exports.addBrand = (req,res) => {
    const brand = new Brand(req.body);

    brand.save((err,doc) => {
        if (err) return res.json({success: false, err});
        res.status(200).json({
            success: true,
            brand: doc
        })
    })
}

// Get all brand -- find(query, projection)
module.exports.getAllBrands = (req, res) => {
    Brand.find({},(err,brands) => {
        if (err) return res.send(err);
        res.status(200).send(brands);
    })
}

// Update brand -- findbyidandupdate(id, brand)
module.exports.updateBrand = (req, res) => {
    Brand.findByIdAndUpdate(
        {_id : req.query.id},
        { $set: req.body},
        (err,data)=>{
        if (err) return res.send(err);
        res.status(200).send(data);
    })
}