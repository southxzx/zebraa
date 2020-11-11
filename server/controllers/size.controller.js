const Size = require("../models/size.model");

// Add new size
module.exports.addSize = (req,res) => {
    const size = new Size(req.body);

    size.save((err,doc) => {
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

// Update size by ID
module.exports.updateSize = (req, res) => {
    Size.findByIdAndUpdate(
        {_id : req.query.id},
        { $set : req.body},
        (err,data) => {
            if (err) return res.send(err);
            res.status(200).send(data);
        }
    )
}

//Delete size
module.exports.deleteSize = (req, res) => {
    Size.findByIdAndUpdate(
        {_id : req.query.id},
        {active : false},
        (err,data) => {
            if (err) return res.send(err);
            res.status(200).send(data);
        }
    )
}