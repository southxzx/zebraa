const Cart = require("../models/cart.model");
const User = require("../models/user.model");

// Add new cart
module.exports.addCart = (req,res) => {
    const cart = new Cart(req.body);

    console.log(req.body.idSize);

    if(!req.body.idSize){
        return res.status(401).json({errors: 'You must choose size'});
    }

    User.findOne(
        {_id: req.body.idUser},
        (err,user) => {
            if (user){
                //Check xem sản phẩm có trùng không
                User.findOne(
                    {
                        "cart.idSize": req.body.idSize
                    },
                    (err2,user2)=>{
                        // Nếu trùng thì tăng quantity
                        if (user2){
                            // Kiếm lại vị trí item để tăng quantity
                            User.update(
                                {
                                    "cart.idSize": req.body.idSize
                                },
                                {$inc: {"cart.$.quantity": parseInt(req.body.quantity)}},
                                (err,success)=>{
                                    if (err) return res.json({success: false, err});
                                    return res.status(200).json({success: true, message: "Quantity has been updated!"});
                                }
                            )
                        }
                        // Nếu không trùng thì add bình thường
                        else{
                            // Push to cart
                            user.cart.push(cart);
                            user.save();
                            res.json({
                                success: true,
                                message: 'New item pushed!',
                            });
                        }
                    }
                );
            }
            if (err) return res.send({msg:"Fail to push",err});

        }
    );
}

// Update Cart
module.exports.updateItemInCart = (req, res) => {
    User.update(
        {"cart.idSize" : req.body.idSizeOld},
        {
            "cart.$.quantity" : req.body.quantity,
            "cart.$.idSize": req.body.idSizeNew
        },
        (err,success)=>{
            if (err) return res.json({success: false, err});
            return res.status(200).json({success: true, message: "Item has been updated!"});
        }
    )
}

// Get all items in cart by user
module.exports.getAllItemsInCart = (req, res) => {
    try{
        User.findOne(
            {_id: req.query.idUser},
            {cart:1, _id:0}
        ).

        // populate({
        //     path: 'cart',
        //     populate: {
        //         path: 'idSize',
        //         select: {size:1},
        //         populate: {
        //             path: "size",
        //             select: {name:1},
        //         }
        //       }
        // }).
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
                    path: "color",
                    select: {name:1},
                }
              }
        }).
        exec((err,user) => {
            if (err) {
                return res.send(err);
            }
            res.status(200).send(user);
        })
    }
    catch (err) {
        res.status(200).send(err);
    }
}

// Delete Item in Cart
module.exports.deleteItemInCart = (req, res) => {

    User.update(
        {"cart._id" : req.query.idItem},
        {$pull: {"cart": {_id: req.query.idItem}}},
        (err,success)=>{
            if (err) return res.json({success: false, err})
            return res.json({success: true, msg:"Item has been removed successfully!"})
        }
    )
}
