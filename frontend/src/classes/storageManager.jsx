import CryptoJS from "crypto-js";
import { key } from '../constants/cred'
export class CustomStorageManager {
    static secretKey = key;

    // Encrypt and store data in localStorage
    static async store(key, value) {
        try {
            const encryptedData = CryptoJS.AES.encrypt(value, this.secretKey).toString();
            localStorage.setItem(key, encryptedData);
        } catch (e) {
            console.error("Error storing data:", e);
        }
    }

    // Fetch and decrypt data from localStorage
    static fetch(key) {
        try {
            const encryptedData = localStorage.getItem(key);
            if (!encryptedData) return null;
            const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
            const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
            return decryptedData;
        } catch (e) {
            console.error("Error fetching data:", e);
            return null;
        }
    }

    // Clear all data in localStorage
    static async clearAll() {
        try {
            localStorage.clear();
        } catch (e) {
            console.error("Error clearing all data:", e);
        }
    }

    // Delete a specific key from localStorage
    static async delete(key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error("Error deleting data:", e);
        }
    }
}
