const Color = require("../models/color.model");

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