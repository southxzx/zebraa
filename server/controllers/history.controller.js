const History = require("../models/history.model");
const User = require("../models/user.model");

// Add new history
module.exports.addHistory = (req,res) => {
    const history = new History(req.body);

    User.findOne(
        {_id: req.body.idUser},
        (err,data) => {
            if (err) return res.json({success: false, err});
            if(data){
                data.history.push(history)
                data.save();
                return res.json({
                    success: true,
                    message: 'New history has been added!',
                    data
                })
            }
        }
    )
}

// Get all history -- find(query, projection)
module.exports.getAllHistories = (req, res) => {
    try {
        User.findOne(
            {_id: req.query.idUser},
            {history:1, _id:0}
        ).
        populate({
            path: 'history',
            populate: {
                path: 'idColorProduct',
                select: {price:1,images:1,color:1},
                populate: {
                    path: "color"
                }
              }
        }).
        populate({
            path: 'history',
            populate: {
                path: 'idProduct',
                select: {name:1,category:1,colorProducts:1},
                populate: {
                    path: 'category',
                    select: {name:1},
                },
                populate: {
                    path: 'colorProducts',
                    populate: {
                        path:'sizeProducts',
                        populate: {
                            path:'size',
                            select: {name:1}
                        }
                    }
                }
              }
        }).
        exec((err, data)=>{
            if (err) return res.send(err);
            res.status(200).send(data);
        });
    } catch (error) {
        return res.json({error: error});
    }
}
