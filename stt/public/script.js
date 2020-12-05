const socket = io('/')
const myPeer = new Peer(undefined, {
    host: '/',
    port: '3001'
})
const videoGrid = document.getElementById('video-grid')
const myVideo = document.createElement('video')
myVideo.muted = true;
const peers = {}

const speechRecognition = window.webkitSpeechRecognition
const recognition = new speechRecognition();
const textBox = $("#textBox");
const instruction = $("#instruction");

let content = '';

recognition.continuous = true;

recognition.onresult = (event) => {
    const current = event.resultIndex;
    const transScript = event.results[current][0].transcript;
    content += transScript;
    textBox.val(content);
}

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    addVideoStream(myVideo, stream);

    myPeer.on('call', call => {
        call.answer(stream)

        const video = document.createElement('video');
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
        })
    })

    if (content.length) {
        content += '\n';
    }
    recognition.start();

    socket.on('user-connected', userId => {
        console.log('User connected : ' + userId);

        // user 연결 후 기다렸다가 동영상 로드
        setTimeout(() => {
            connectToNewUser(userId, stream)
        }, 1000)
      })
})

socket.on('user-disconnected', userId => {
    console.log('User disconnected : ' + userId)
    if (peers[userId]) {
        peers[userId].close()
    }
})

myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id);
})

function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream);
    const video = document.createElement('video');

    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
    })

    call.on('close', () => {
        video.remove();
    });

    peers[userId] = call
}

function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    videoGrid.append(video)
}