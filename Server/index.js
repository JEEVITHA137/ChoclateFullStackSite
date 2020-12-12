const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');

const express = require('express');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(bodyParser.json());

const url = "mongodb+srv://Sakthi:Sakthi123@site.rzqsl.mongodb.net/dolls?retryWrites=true&w=majority";

const connect = mongoose.connect(url,{
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
  });

connect.then(() => {
    console.log('Connected correctly to server');
})
.catch((err) => console.log(err));

const UserRouter = require('./routes/userRouter');
app.use('/users', UserRouter);

app.get('*' ,(req,res) => {
  res.statusCode = 400;
  res.end("Bad Request path");
});

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server running at port ${port}/`);
});