const Color = require("../models/color.model");

// Add new color
module.exports.addColor = (req,res) => {
    const color = new Color(req.body);

    color.save((err,doc) => {
        if (err) return res.json({success: false, err});
        res.status(200).json({
            success: true,
            color: doc
        })
    })
}

// Get all color -- find(query, projection)
module.exports.getAllColors = (req, res) => {
    Color.find({},(err,colors) => {
        if (err) return res.send(err);
        res.status(200).send(colors);
    })
}