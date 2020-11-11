const Size = require("../models/size.model");

// Add new size
module.exports.addSize = (req,res) => {
    const color = new Size(req.body);

    color.save((err,doc) => {
        if (err) return res.json({success: false, err});
        res.status(200).json({
            success: true,
            size: doc
        })
    })
}

// Get all size -- find(query, projection)
module.exports.getAllSizes = (req, res) => {
    Size.find({},(err,sizes) => {
        if (err) return res.send(err);
        res.status(200).send(sizes);
    })
}