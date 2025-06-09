import express from 'express';
import { UsersCollection } from '../../entities/user';
import { TokenHandler } from '../../classes/tokenManagement';
const stringHash = require("string-hash");
const router = express.Router();
router.post("/", async (req: any, res: any) => {
    try {
        console.log("---------->> log in ")
        const { 
            phone,
            password,
        } = req.body

        let mongoResponse:any = await UsersCollection.findUser({
            phoneNumber: phone.trim(),
            password: password.trim()
        });
        console.log(mongoResponse);
        if (mongoResponse.success && mongoResponse.res.length>0) {
            let token = await TokenHandler.generateToken(mongoResponse.res[0]);
            res.send({
                success:true,
                data:mongoResponse.res[0],
                token: token
            })
            
        }
        else {
            res.send({
                success:false,
            })
        }
    } catch (e: any) {
        console.log(e);
        res.status(400).send({
            success:false,
            error:e
        })
    }
})
export default router; 