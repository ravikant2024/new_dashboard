
import {
    connect as MongooseConnect,
    disconnect as MongooseDisconnect
} from 'mongoose';
import { GeneralFunctions } from '../utilities/generalFunction';

export class MongoDBInitializer {
    static uri: string;
    static connectionRetries: number;
    static connectionRetriesLimit: number;


   static async connectToMongoServer() {
        console.log(`URI ${this.uri}`);

        await MongooseConnect(this.uri, {
            connectTimeoutMS: 2000,
            serverSelectionTimeoutMS: 2000,
            socketTimeoutMS: 2000
        });
    }

    static async initialize(uri:string) {
        console.log(`Initialzing Mongodb`);
        this.uri =  uri;
        this.connectionRetriesLimit = -1;
        console.log(`Initialed Mongodb`);
        this.start();
    }

    static async start() {
        try {
            console.log(`Starting Mongodb ... `);
            await this.connectToMongoServer();
            console.log(`Started Mongodb`);
        } catch (err) {
            if (this.connectionRetriesLimit !== -1) {
                this.connectionRetries += 1;
                if (this.connectionRetries < this.connectionRetriesLimit) {
                    await GeneralFunctions.delay(4000);
                    this.start();
                } else {
                    console.log("connection error");
                }
            } else {
                await GeneralFunctions.delay(4000);
                this.start();
            }
        }
    }

    static async stop() {
        try {
            await MongooseDisconnect();
        } catch (err) {
            console.log(`Error stopping mongodb ${err}`);
        }
    }
}