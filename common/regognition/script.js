const speechRecognition = window.webkitSpeechRecognition
const recognition = new speechRecognition();
const textBox = $("#textBox");
const instruction = $("#instruction");

let content = '';

recognition.continuous = true;

// recognition.Timeouts.InitialSilenceTimeout = TimeSpan.FromSeconds(6.0); // 인식 결과를 생성 하기 전에 SpeechRecognizer에서 침묵을 검색 하고 음성 입력을 사용할 수 없다고 가정하는 시간
// recognition.Timeouts.BabbleTimeout = TimeSpan.FromSeconds(4.0); // 인식 대기 시간
// recognition.Timeouts.EndSilenceTimeout = TimeSpan.FromSeconds(60); // 인식 결과가 생성 된 후, 음성 입력이 종료 된 것으로 가정하는 시간

recognition.onstart = () => {
    instruction.text("Voice Recognition is on");
}

recognition.onspeechend = () => {
    instruction.text("No activity");
    console.log("No activity");
    recognition.start();
}

recognition.onerror = () => {
    instruction.text("Try again");
    console.log("Try again");
    recognition.start();
}

recognition.onresult = (event) => {
    const current = event.resultIndex;
    const transScript = event.results[current][0].transcript;
    content += transScript;
    textBox.val(content);
}

$("#startBtn").click((event) => {
    if (content.length) {
        content += '\n';
    }
    recognition.start();
    console.log(recognition);
})

textBox.on('input', () => {
    content = $(this).val();
})