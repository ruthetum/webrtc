'use strict';

const http = require('http');
const os = require('os');
const socketIO = require('socket.io');
const nodeStatic = require('node-static');

var fileServer = new(nodeStatic.Server)();
var app = http.createServer((req,res)=>{
    fileServer.serve(req,res);
}).listen(3010);

var io = socketIO.listen(app);
io.sockets.on('connection',socket=>{
    // 클라이언트에 서버 메시지 기록
    function log() {
        var array = ['Message from server:'];
        array.push.apply(array,arguments);
        socket.emit('log',array);
    }

    socket.on('message', message => {
        log('Client said : ' ,message);
        // 방을 통해서 입장 (not broadcast)
        socket.broadcast.emit('message',message);
    });

    socket.on('create or join', room => {
        var clientsInRoom = io.sockets.adapter.rooms[room];
        var numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;
        log('Room ' + room + ' now has ' + numClients + ' client(s)');
        
        if(numClients === 0){
            console.log('create room!');
            socket.join(room);
            log('Client ID ' + socket.id + ' created room ' + room);
            socket.emit('created',room,socket.id);
        }
        else if(numClients===1){
            console.log('join room!');
            log('Client Id' + socket.id + 'joined room' + room);
            io.sockets.in(room).emit('join',room);
            socket.join(room);
            socket.emit('joined',room,socket.id);
            io.sockets.in(room).emit('ready');
        }else{
            socket.emit('full',room);
        }
    });

    socket.on('ipaddr', function() {
        var ifaces = os.networkInterfaces();
        for (var dev in ifaces) {
            ifaces[dev].forEach(function(details) {
                if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
                socket.emit('ipaddr', details.address);
                }
            });
        }
    });
    
    socket.on('bye', function(){
        console.log('received bye');
    });
});