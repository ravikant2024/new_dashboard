import cron from 'node-cron';
import { KeysCollection } from '../entities/key';
export class CronManager {
    static async init() {
        try {
            // Schedule a job to run every hour (adjust the cron expression as needed)
            console.log("started cron")
            cron.schedule('5 * * * * *', () => {
                this.checkForExpire();
            });
        } catch (e) {
            console.log("error from cron ", e);
        }
    }

    static async checkForExpire() {
        try {
            console.log('checking for expire --->>');
            let mongokeyResponse = await KeysCollection.findKeys({});
            let keys = mongokeyResponse.res;
            let keyData;
            let date = new Date().getTime()
            for (let i = 0; i < keys.length; i++) {
                keyData = keys[i];
                console.log(keyData.expiredate,date)
                if (keyData.expiredate < date) {
                    console.log("user id ", keyData.userId, keyData.macId, " device is going to expire",)
                }else{
                    console.log("user id ", keyData.userId, keyData.macId, " device still have time",)
                }

            }
            // Add your expiration check logic here
        } catch (e) {
            console.log("error while checking expire ", e);
        }
    }
}
