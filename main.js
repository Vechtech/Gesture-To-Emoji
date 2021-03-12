p_1 = "";
Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach("#camera");

function capture() {
    Webcam.snap(function (uri) {
        document.getElementById("result").innerHTML = "<img id='selfie' src='" + uri + "'>";
    })
}
console.log("ml5 version:", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Beg7iMwYj/model.json", modelLoaded);

function modelLoaded() {
    console.log("Model loaded");
}

function speak() {

    var synth = window.speechSynthesis;
    speak_data_1 = "The prediction is " + p_1;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    utterThis.rate = 0.5;
    synth.speak(utterThis);

}

function check() {
    img = document.getElementById('selfie');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("e_1").innerHTML = results[0].label;
        p_1 = results[0].label;
         speak();
        if (results[0].label == "Amazing") {
            document.getElementById("emoji_1").innerHTML = "&#128076;";
        }
        if (results[0].label == "Best") {
            document.getElementById("emoji_1").innerHTML = "&#128077;";
        }
        if (results[0].label == "Peace") {
            document.getElementById("emoji_1").innerHTML = "&#9996;";
        }
    }
}