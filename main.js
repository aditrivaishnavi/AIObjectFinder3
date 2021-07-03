video = "";
status = "";
objects = [];

function preload() {
    video = createVideo('video.mp4');
    video.size(480, 380);
}
function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video.hide();
}
function draw() {
    image(video, 0, 0, 480, 380);

    if(status != "") {
        objectDetector.detect(video, gotResult);

        for(i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are: " + objects.length;

            fill('#FF0000');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke('#FF0000');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
    if(objects == input_box) {
        videoLiveView.stop();
        objectDetector.detect(gotResult);
        document.getElementById("object_found_or_not_found").innerHTML = "Object Mentioned Found";
        var synth = window.speechSynthesis;
        var utterThis = new SpeechSynthesisUtterance("Object Mentioned Found");
        synth.speak(utterThis);
    }
    else {
        document.getElementById("object_found_or_not_found").innerHTML = "Object Mentioned Not Found";
    }
}
function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";

    input_box = document.getElementById("navigationTextbox").value;
    document.getElementById("object_status").innerHTML = object_name + " Found";
}
function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume();
}
function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}