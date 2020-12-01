const Category = require("../models/category.model");

// Add new category
module.exports.addCategory = (req,res) => {
    const category = new Category(req.body);

    category.save((err,doc) => {
        if (err) return res.json({success: false, err});
        res.status(200).json({
            success: true,
            category: doc
        })
    })
}

// Get all category -- find(query, projection)
module.exports.getAllCategories = (req, res) => {
    Category.find({},(err,categories) => {
        if (err) return res.send(err);
        res.status(200).send(categories);
    })
}

// Update category -- findbyidandupdate(id, brand)
module.exports.updateCategory = (req, res) => {
    Category.findByIdAndUpdate(
        {_id : req.query.id},
        { $set: req.body},
        (err,data)=>{
        if (err) return res.send(err);
        res.status(200).send(data);
    })
}

// Delete category 
module.exports.deleteCategory = (req, res) => {
    Category.findByIdAndUpdate(
        {_id : req.query.id},
        {active : false},
        (err,data)=>{
            if (err) return res.send(err);
            res.status(200).send(data);
        }
    )
}