import express from 'express';
import { UsersCollection } from '../../entities/user';
import { TokenHandler } from '../../classes/tokenManagement';
import { GeneralFunctions } from '../../utilities/generalFunction';
const stringHash = require("string-hash");
const router = express.Router();
router.post("/", async (req: any, res: any) => {
    try {
        console.log("---------->> sign in ")
        const {
            name,

            phone,

            password,
            email
        } = req.body
        let randomKey = GeneralFunctions.randomId(6);

        let mongoResponse: any = await UsersCollection.createUser({
            _id: randomKey,
            phoneNumber: phone,

            name: name,
            password: stringHash(password),


            email: email

        })
        console.log(mongoResponse);
        if (mongoResponse.success) {

            let token = await TokenHandler.generateToken({
                _id: randomKey,
                phoneNumber: phone,

                name: name,


                email: email
            });
            res.send({
                success: true,
                data: {
                    _id: randomKey,
                    phoneNumber: phone,
        
                    name: name,
        
        
                    email: email
                }
                ,
                token: token
            });
        }
        else {
            res.send({
                success: false,
                error: mongoResponse.error.code
            })
        }

    } catch (e: any) {
        console.log(e);
        res.status(400).send({
            success: false,
            error: e
        })

    }
})
export default router; 