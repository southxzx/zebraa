const Product = require("../models/product.model");

function escapeRegex(text) {
    if(text.indexOf(' ') != -1) return text.split(' ');
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, " ");
}

module.exports.searchProduct = (req, res) => {
    var regex1;
    if(Array.isArray(escapeRegex(req.query.name))){
      regex1 = new RegExp("." + escapeRegex(req.query.name)[1], "i");
    }else{
      regex1 = new RegExp("." + escapeRegex(req.query.name), "i");
       
    }
    const regex2 = new RegExp("^" + escapeRegex(req.query.name), "i"); // i change upperCase or lowerCase
   
    console.log(regex1);
    console.log(regex2);

    Product.find(
        {
            name : { $in: [ regex1,regex2] }
        }
    ).
    populate('category').
    populate('colorProducts').
    populate({ 
        path: 'colorProducts',
        populate: {
          path: 'color'
        } 
    }).
    populate({ 
        path: 'review',
        populate: {
            path: 'user',
            select: {'name':1}
          }
    }).
    populate({ 
        path: 'colorProducts',
        populate: {
          path: 'sizeProducts',
          populate:{
              path: 'size'
          }
        } 
    }).
    exec((err, data)=>{
        if (err) return res.send(err);
        res.status(200).send({data});
    });
}