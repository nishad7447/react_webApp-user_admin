const UserModel = require('../models/user');

module.exports = {


  signup: async (req, res) => {
    console.log(req.body);
    const user = await UserModel.findOne({ email: req.body.email });
    console.log(user);
    const userDetails = req.body;
    if (!user) {
      UserModel.create({ ...userDetails })
        .then((data) => {
          console.log(data, 'Saved user successfully..........');
          res.status(201).send(data);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send({ error: 'Something went wrong' });
        });
    } else {
      res.send({err:'User already exists'});
    }
  },
  login:async(req,res)=>{
      const user = await UserModel.findOne({ email: req.body.email });
      if(user){
          if(user.password==req.body.password){
            console.log(req.body,user,'yooooo')
            res.status(201).send({success:true})
        }else{  
            res.send({passErr:'Wrong Password'});
        }
    }else {
      res.send({emailErr:'User not exists'});
    }
}

};
