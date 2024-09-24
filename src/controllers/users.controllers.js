import { error } from "console";
import userManagers from "../data/managers/users.fs.js";

class UserController{
    constructor(){}

    async readUsers(req,res){
        try {
          const {role} = req.query;
          const data = await userManagers.readAll(role);
          if(data.length > 0){
            return res.status(200).json({data, message: "complete users list"})
          }
          else{
            //return res.status(404).json({message: "no users in database"})
            const error = new Error("user not found");
            error.statusCode = 404;
            throw error;
          }
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({message: error.message || "API ERROR"});
        }
    }

    async createUser(req,res){
      try {
        const data = req.body;

        const {email, passwd} = data;
        if(!email || !passwd){
          const error = new Error("email or passwd, not found");
          error.statusCode = 400;
          throw error;
        }
        const userData = await userManagers.create(data);
        return res.status(201).json({ message: "user created", id: userData.id});
      } catch (error) {
        console.log(error);
        return res.status(error.status || 500).json({message: error.message || "API ERROR"});
      }
    }
}

const userController = new UserController();
export default userController;