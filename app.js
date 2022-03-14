const express = require("express");
const socketio = require("socket.io");  // socket.io for realtime refresh
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//var compression = require('compression');

//설정파일 ./config.js - 계정, 암호 등
const config = require('./config');

const sensors = require('./sensors');

//app.use(compression());

app.use(bodyParser.urlencoded({extended: false}));  // body-parser 미들웨어 사용
app.use(express.static('public'));  // public 폴더에 대한 정적 파일 서비스 사용

app.set('view engine', 'ejs'); // ejs view engine 사용

// mongoDB models
const TempHumid = require("./models/tempHumid");

// mongoDB 연동
function connect(){
  mongoose.connect(config.mongoURL,
    { useNewUrlParser: true, useUnifiedTopology:false })
  .catch((err)=>{
    console.log(err);
    //connect();
  });
}
connect();
const connection = mongoose.connection;
connection.once("open", () =>{
  console.log("MongoDB database connection success")
});

// routes
app.get('/', (req,res) => {
  res.render('index', {sensors});
});

app.post('/temphumid-write', (req,res)=>{
  var post=req.body;
  console.log(post);
  // db 액세스
/*   var currentData = new TempHumid(post);
  currentData.save()
    .then(() => {
      console.log(currentData);
    })
    .catch((err) => {
      console.log("DB Error : " + err);
    }); */
  // socket.io event emit to all users subscribed to the socket
  io.sockets.emit(post.name, post);
  console.log("update socket event emit");
  // response ends with 204(no content) status
  res.status(204).end();
});

// url error: cannot find requested url
app.use((req,res,next)=>{
  res.status(404);
});
// internal error handler
app.use((err,req,res,next)=>{
  console.error(err.stack);
  res.status(500);
})

// server 열기
const server = app.listen(process.env.PORT || 3000, function(){
  console.log("server is running");
});

// socket.io 설정
const io = socketio(server,{
  cors:{
    origin: "http://localhost:3000",
    methods:["GET", "POST"]
  }
});

io.on('connection', function(socket){
  console.log("New socket.io connection");
  
  // socket event listener examples
  /*
  // receive socket emit from frontend: 'change_username
  socket.on('change_username', data => {
    //console.log(`username changed: ${socket.username} => ${data.username}`);
    socket.username = data.username;
  });

  // receive socket emit from frontend: 'new_message'
  socket.on('new_message', data => {
    console.log("new message");
    io.sockets.emit('receive_message', {message: data.message, username: socket.username})
  });*/
});