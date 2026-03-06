const express = require('express');
const app = express();
const router = require('./Router/routes')
const ConnecDB = require('./DB/ConnectDB');
const cookieParser = require('cookie-parser');
const authRouter = require('./Router/Authroute');
require('dotenv').config();
const cors  = require('cors');
const auth = require('./middleware/auth')
const userRouter = require('./Router/UserRoute')
const adminRouter = require('./Router/AdminRoute')
const AppointmentRoute = require('./Router/AppointmentRoute')
const admin = require('./middleware/admin')
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL
];
app.set("trust proxy", 1);


app.use(cors({
  origin : allowedOrigins, 
  credentials : true
  
}
));


app.get('/',(req , res)=>{
    res.json({
        hello : 'hello'
    })
})
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/', auth , router);
app.use('/api/user/',userRouter);
app.use('/auth/' , authRouter);
app.use(require('./Router/meRoute'));
app.use('/api/v1/', auth , AppointmentRoute);
app.use('/api/v1/', auth , admin , adminRouter);



const start = async()=>{
  try{
    await ConnecDB(process.env.MongoUri);
   console.log('DB is connected');

   app.listen(5000 , ()=>{
    console.log("server is running on http://localhost:5000 " + process.env.FRONTEND_URL);
   })

  } catch(err){
    console.log({err})
  }
   
}

start();