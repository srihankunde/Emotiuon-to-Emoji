prediction_1= "";
prediction_2="";

Webcam.set({

    width:350,
    height:300,
     image_format:"png",
     png_quality:90
});


camera = document.getElementById("camera");

Webcam.attach(camera);

function take_snapshot(){

    Webcam.snap(function(data_uri){
     document.getElementById("result").innerHTML="<img id='captured_image'  src='"+data_uri+"'>";
    });

}

console.log("ml5 version-", ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/98f0Yo41J/model.json', model_loaded);


function model_loaded()
{

    console.log("Model Loaded!");
}


function speak(){

    var synth = window.speechSynthesis;
    speak_data_1 = "The First Prediction is"+prediction_1;
    speak_data_2 = "And the Second Prediction is"+prediction_2;
    var utterthis = new SpeechSynthesisUtterance(speak_data_1+ speak_data_2);
    synth.speak(utterthis)
}


function check(){

    img = document.getElementById("captured_image");
    classifier.classify(img , gotresult)
}

function gotresult(error, results){

    if (error){
        console.error(errror);
    }
    else{
        console.log (results);

        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;

        speak();

        if (results[0].label=="Happy"){
            document.getElementById("update_emoji").innerHTML="&#128522;"

        }

        if (results[0].label=="Sad"){
            document.getElementById("update_emoji").innerHTML="&#128532;"

        }

        if (results[0].label=="Surpirse"){
            document.getElementById("update_emoji").innerHTML="&#128562;"

        }


        if (results[1].label=="Happy"){
            document.getElementById("update_emoji2").innerHTML="&#128522;"

        }

        if (results[1].label=="Sad"){
            document.getElementById("update_emoji2").innerHTML="&#128532;"

        }

        if (results[1].label=="Surpirse"){
            document.getElementById("update_emoji2").innerHTML="&#128562;"

        }


    }

}