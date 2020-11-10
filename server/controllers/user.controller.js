const User = require("../models/user.model");


module.exports.addUserController = (req,res) =>{
    const {name, email, password} = req.body;     //client gửi qua axios post
    console.log(name,email,password);

    // const user = new User(req.body);
    // console.log(user);
    // user.save((err)=>{
    //     if(err) return res.json({success:false,err})
    //     res.status(200).json({
    //         success:true
    //     })
    // })

    const user = new User({
        name,
        email,
        password
      });

      // save vào mongodb thì sẽ thêm 1 collection có tên là :(tên Schema + s), như User thì -> users ; và sẽ thêm trg _id cho collection đó 
      user.save((err, user) => {
        if (err) {
          // console.log('Save error', errorHandler(err));
          return res.status(401).json({
            success: false, err
          });
        } else {
          return res.json({
            success: true,
            message: 'Signup success',
            user
          });
        }
      });
}