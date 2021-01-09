const Order = require("../models/order.model");

// Add new order
module.exports.addOrder = (req,res) => {
    const order = new Order(req.body);

    order.save((err,doc) => {
        if (err) return res.json({success: false, err});
        res.status(200).json({
            success: true,
            doc
        })
    })
}

//Get latest order
module.exports.getLatestOrder = (req, res) => {
    Order.find(
        {idUser : req.query.idUser}
    ).
    limit(1).
    sort({_id:-1}).
    populate({
        path: 'cart',
        populate: {
            path: 'idProduct',
            select: {name:1,category:1,colorProducts:1},
            populate: {
                path: 'category',
                select: {name:1},
            }
          }
    }).
    populate({
        path: 'cart',
        populate: {
            path: 'idProduct',
            select: {name:1,category:1,colorProducts:1},
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
    populate({
        path: 'cart',
        populate: {
            path: 'idColorProduct',
            select: {price:1,images:1,color:1},
            populate: {
                path: "color"
            }
          }
    }).
    exec((err,data)=>{
        if (err) return res.status(400).json({err});
        if (data) return res.status(200).send(data);
    })
}
