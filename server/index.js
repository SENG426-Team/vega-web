import auth from './auth/AuthenticationManager.js';
import fileUploader from './controller/FileUploadController.js';
import adminPanel from './controller/AdminPanelController.js';
import secret from './controller/SecretController.js';
import account from './controller/AccountController.js';
import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';



const app = express();
const port = 8000;
const env = config();

//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({limit: '50mb'}));
app.disable('x-powered-by');
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  var corsOptions = {
    origin: 'https://venus-app.azurewebsites.net/',
    optionsSuccessStatus: 200
  };
  app.use(cors(corsOptions));
}

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Content-Type', 'application/json');
  res.status(404).json({Message: 'Not found'});
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
});


app.use("/api/login", auth);
app.use("/api/venus", fileUploader)
app.use("/api/venus/admin", adminPanel)
app.use("/api/venus/secret", secret)
app.use("/api/venus/account", account)

app.listen(port, () => {
  console.log(process.env.API_URL);
  console.log(`Example app listening on port ${port}!`)
});
