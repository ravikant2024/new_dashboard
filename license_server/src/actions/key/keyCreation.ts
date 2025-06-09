import express from 'express';
import { KeysCollection } from '../../entities/key';
import { MongoDBInitializer } from '../../intializers/mongodbinit';
import { GeneralFunctions } from '../../utilities/generalFunction';
import { TokenHandler } from '../../classes/tokenManagement';
const router = express.Router();

router.post("/", async (req: any, res: any) => {
    try {
        const { macId, token,userId,mfgDate,expireDate } = req.body;
        console.log(macId, token,userId,mfgDate,expireDate)
        let tokenRes:any = await TokenHandler.validateToken(token);
        if (tokenRes) {
            console.log(tokenRes);
            const issuedate = mfgDate;

            // Set expiredate to 3 months later (3 * 30 days * 24 hours * 60 minutes * 60 seconds * 1000 ms)
            const expiredate = expireDate;
            let monogResponse = await KeysCollection.createKey({
                _id: GeneralFunctions.randomId(16),
                macId: macId,
                issuedate: issuedate,
                expiredate: expiredate,
                userId: userId
            })
            if (monogResponse.success) {
                res.status(200).send({
                    success: true,
                })
            } else {
                res.status(204).send({
                    success: false,
                    error: monogResponse.error
                })
            }
        } else {
            res.status(201).send({
                success: false,
                error: "token validation failed"
            })
        }
    } catch (e: any) {
        console.log(e);
        res.status(500).send({
            success: false,
            error: e
        })
    }
});
export default router;