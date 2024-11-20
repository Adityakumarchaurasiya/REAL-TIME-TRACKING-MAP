const express=require("express");
const app=express();
const http=require("http");
const path=require("path");


const socketio=require("socket.io");

const server=http.createServer(app);
const io=socketio(server);

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname,"public")));

io.on("connection",(socket)=>{
    socket.on("send-location",(data)=>{
        io.emit("recive-location",({id: socket.id,...data}))
    });
socket.on("disconnect",()=>{
    io.emit("user-disconnected",socket.id);
});
});



app.get("/",(req,res)=>{
res.render("index.ejs")
})





let port=6060;

server.listen(port,()=>{
 console.log(`port is listing on ${port}`);
    
})