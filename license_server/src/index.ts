import express from 'express';
import cors from "cors";
import { MongoDBInitializer } from './intializers/mongodbinit';
import { Credentials } from './config/credentials';
import keyCreation from './actions/key/keyCreation';
import signup from './actions/user/signup';
import login from './actions/user/login';
import fetchKey from './actions/key/fetchKey';
import RedisConnector from './intializers/redisInt';
import { CronManager } from './classes/cron';
const port = 4369;
const requestLogger = (req: any, res: any, next: any) => {
    console.log(`Method: ${req.method}`);
    console.log(`Path: ${req.path}`);
    console.log(`Query Params:`, req.query);
    console.log(`Request Body:`, req.body);
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('Client IP:', clientIp);
    console.log("--------------------------------------------------------");

    next();
};
export class MainServer {
    static app: any;
    async initalize() {
        MainServer.app = express();
        MainServer.app.use(express.json({ limit: '500mb' }));
        MainServer.app.use(cors());
        MainServer.app.use(requestLogger);
        MainServer.app.listen(port,'0.0.0.0');
        console.log("app is listening on port ", port);
        await MongoDBInitializer.initialize(Credentials.mongo.url);
        console.log("mongo db initialied");
        await RedisConnector.initialize(Credentials.redis.url,Credentials.redis.password);
        console.log("redis cache initialied");
        CronManager.init()
        await this.start();

    }
    async start() {
        MainServer.app.get('/test', (req: any, res: any) => {
            res.send("<h1>Hello Kalyan</h1>")
        })

        MainServer.app.use('/keyCreation',keyCreation);
        MainServer.app.use('/signup',signup);
        MainServer.app.use('/login',login);
        MainServer.app.use('/fetchKey',fetchKey);
    }

}
(async () => {
    let mainServer = new MainServer();
    mainServer.initalize();
})()