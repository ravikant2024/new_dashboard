export class GeneralFunctions {
    static async delay(milliSeconds: number) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(1);
            }, milliSeconds)
        })
    }
    static randomId(length: any) {
        let result = '';
        const characters = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }
}