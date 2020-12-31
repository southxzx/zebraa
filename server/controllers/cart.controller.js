const Cart = require("../models/cart.model");
const User = require("../models/user.model");

// Add new size
module.exports.addCart = (req,res) => {
    const cart = new Cart(req.body);

    User.updateOne(
        {_id: req.body.idUser},
        {$push:{cart:cart}},
        (err,success) => {
            if (err) return res.json({success: false, err});
            return res.json({success: true, msg: "New item in cart has been added"});
        }
    );
}

// Get all items in cart by user
module.exports.getAllItemsInCart = (req, res) => {
    try{
        console.log(req.query.idUser);
        User.find(
            {_id: req.query.idUser},
            {cart:1},
            (err,user) => {
                if (err) {
                    return res.send(err);
                }
                res.status(200).send(user);
            }
        )
    }
    catch (err) {
        res.status(200).send(err);
    }
}
//     Size.find({},(err,sizes) => {
//         if (err) return res.send(err);
//         res.status(200).send(sizes);
//     })
// }
