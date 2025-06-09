import express from 'express';
import { KeysCollection } from '../../entities/key';
import { TokenHandler } from '../../classes/tokenManagement';
import { CryptoGraphyManager } from '../../classes/cryptographyManager';
import { mongo } from 'mongoose';
const stringHash = require("string-hash");
const router = express.Router();
router.post("/", async (req: any, res: any) => {
    try {
        const { 
            macId
        } = req.body

        let mongoResponse:any = await KeysCollection.findKeys({
           macId:macId
        });
        console.log(mongoResponse);
        if (mongoResponse.success && mongoResponse.res.length>0) {
            let data=`${mongoResponse.res[0].issuedate}_${mongoResponse.res[0].expiredate}`
            let encryptedString=await CryptoGraphyManager.encrypt(data,mongoResponse.res[0].macId);
            res.send({
                success:true,
                data:encryptedString,
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