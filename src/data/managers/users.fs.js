import fs from "fs";
import crypto from "crypto";

class UserManagers{
    constructor(){
        this.path = "./src/data/files/users.js"
        this.init();
    }

    init(){
        const check_file = fs.existsSync(this.path);
        if(!check_file){
            console.log("unable to find database " + this.path + ". Creating empty database Users...");
            fs.writeFileSync(this.path,"[]");
        }
    }

    async readAll(role){
        try {
        const data = await fs.promises.readFile(this.path, "utf-8")
        const data_parse = JSON.parse(data);
        if(role){
            const roleFilter = data_parse.filter(each => each.role === role);
            return roleFilter;
        }
        return data_parse;
        } catch (error) {
            throw error;
        }
    }

    async create(userData){
        try {
            userData.id = crypto.randomBytes(12).toString("hex");
            const allUsers = await this.readAll();
            allUsers.push(userData);
            await fs.promises.writeFile(this.path,(JSON.stringify(allUsers,null, 2)));
            return userData;
        } catch (error) {
            throw error;
        }
    }
}

const userManager = new UserManagers;
export default userManager; 