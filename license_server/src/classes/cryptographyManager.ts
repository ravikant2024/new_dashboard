export class CryptoGraphyManager {
    static async encrypt(inputString: string, macAddress: string) {
        try {
            console.log(inputString,macAddress)
            const key = await this.macToKey(macAddress);
            const n = Math.ceil(Math.sqrt(inputString.length)); 
            const paddedInput = inputString.padEnd(n * n, "#"); 
            const array = [];

            // Step 1: Convert string to 2D array
            for (let i = 0; i < n; i++) {
                array.push(paddedInput.slice(i * n, (i + 1) * n).split(""));
            }

            // Step 2: Row swapping
            for (let i = 0; i < Math.floor(array.length / 2); i++) {
                const temp: any = array[i];
                array[i] = array[array.length - 1 - i];
                array[array.length - 1 - i] = temp;
            }

            // Step 3: Column swapping
            for (let i = 0; i < Math.floor(array[0].length / 2); i++) {
                for (let row = 0; row < array.length; row++) {
                    const temp = array[row][i];
                    array[row][i] = array[row][array[row].length - 1 - i];
                    array[row][array[row].length - 1 - i] = temp;
                }
            }

            // Step 4: XOR with key
            for (let i = 0; i < array.length; i++) {
                for (let j = 0; j < array[i].length; j++) {
                    array[i][j] = String.fromCharCode(array[i][j].charCodeAt(0) ^ key);
                }
            }

            // Step 5: Flatten the 2D array back to a string
            return array.map(row => row.join("")).join("");
        } catch (e) {
            console.log(e);
            return {
                success: false,
                error: e
            }
        }
    }
    static async decrypt(encryptedString: string, macAddress: string) {
        try {
            const key = await this.macToKey(macAddress);
            const n = Math.sqrt(encryptedString.length);
            const array = [];

            // Step 1: Convert string to 2D array
            for (let i = 0; i < n; i++) {
                array.push(encryptedString.slice(i * n, (i + 1) * n).split(""));
            }

            // Step 2: Reverse XOR with key
            for (let i = 0; i < array.length; i++) {
                for (let j = 0; j < array[i].length; j++) {
                    array[i][j] = String.fromCharCode(array[i][j].charCodeAt(0) ^ key);
                }
            }

            // Step 3: Reverse column swapping
            for (let i = 0; i < Math.floor(array[0].length / 2); i++) {
                for (let row = 0; row < array.length; row++) {
                    const temp = array[row][i];
                    array[row][i] = array[row][array[row].length - 1 - i];
                    array[row][array[row].length - 1 - i] = temp;
                }
            }

            // Step 4: Reverse row swapping
            for (let i = 0; i < Math.floor(array.length / 2); i++) {
                const temp: any = array[i];
                array[i] = array[array.length - 1 - i];
                array[array.length - 1 - i] = temp;
            }

            // Step 5: Flatten the 2D array back to a string and trim padding
            return array.map(row => row.join("")).join("").replace(/#*$/, "");
        } catch (e) {
            console.log(e);
            return {
                success: false,
                error: e
            }
        }
    }
    static async macToKey(macAddress: string) {
        const cleanMac = macAddress.replace(/[:\-]/g, "");
        return cleanMac
            .split("")
            .reduce((sum, char) => sum + parseInt(char, 16), 0);
    }
}