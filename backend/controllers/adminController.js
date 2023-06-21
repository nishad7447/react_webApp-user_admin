const UserModel = require('../models/user');


module.exports={

    adminlogin:(req,res)=>{
        const adminCred={
            email:'admin@gmail.com',
            password:'123'
        }
        if(adminCred.email==req.body.email){
            console.log(adminCred,req.body,'==================')
            if(adminCred.password==req.body.password){
            res.status(201).send({success:true})
            }else {
                res.send({passErr:'Wrong password'});
              }
        }else {
            res.send({emailErr:'Admin not exists'});
          }
    },
    getUsers:async(req,res)=>{
        const users=await UserModel.find()
        // console.log(users)
        res.status(201).send(users)
    },
    search: async (req, res) => {
        const  name = req.body.search;
        try {
          const users = await UserModel.find({ name: { $regex: name, $options: 'i' } });
          res.status(201).send(users);
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      },
      editUser: async (req, res) => {
        const { id } = req.params;
        const { name, email, phone } = req.body;
      
        try {
          const user = await UserModel.findByIdAndUpdate(id, { name, email, phone }, { new: true });
      
          if (!user) {
            return res.status(404).send('User not found');
          }
      
          res.status(200).send(user);
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      },
      deleteUser: async (req, res) => {
        const { id } = req.params;
      
        try {
          const user = await UserModel.findByIdAndRemove(id);
      
          if (!user) {
            return res.status(404).send('User not found');
          }
      
          res.status(200).send('User deleted successfully');
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      }
      
      
}