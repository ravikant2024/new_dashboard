const Express=require('express');
const cors=require('cors')
const morgan=require("morgan")











const server=express()

server.use(cors({
    origin: '*', // This allows all origins
    credentials: true,
    exposedHeaders: ['X-Total-Count'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
  }));
  
server.use(express.json())
server.use(cookieParser())
server.use(morgan("tiny"))