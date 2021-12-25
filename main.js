var guess1 = ""
var guess2 = ""

Webcam.set({
    width:400,
    height:300,
    image_format:"png",
    png_quality:100,
});

var webcam_div = document.getElementById("webcam");

Webcam.attach("#webcam");

function clickimage(){
    Webcam.snap(function(imgsrc){
        document.getElementById("photo").innerHTML= '<img id="photo_final" src=" ' + imgsrc + ' ">' ;         
    });
}   
console.log(ml5.version);

emotionmodel=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/HMDNtRo3v/model.json" , modelloaded);

function modelloaded(){
    console.log("model has loaded");
}

function speak(){
speechmodel=window.speechSynthesis;
speakguess1="I think you are either"+guess1;
speakguess2="or" + guess2;
converttospeech=new SpeechSynthesisUtterance(speakguess1+speakguess2);
speechmodel.speak(converttospeech);
}

function predict(){

    photo = document.getElementById("photo_final");
    emotionmodel.classify(photo,getresults);
}

function getresults(errors,results){

    if (errors){
        console.error(errors);
    }

    else {
        console.log(results);
        guess1 = results[0].label;
        guess2 = results[1].label;
        speak();

        if(guess1 == "Happy"){
            document.getElementById("Happy").style.fontSize="75px";
            document.getElementById("Happy").style.color="yellow";
        }

        if(guess1 == "Sad"){
            document.getElementById("Sad").style.fontSize="75px";
            document.getElementById("Sad").style.color="blue";
        }

        if(guess1 == "Angry"){
            document.getElementById("Angry").style.fontSize="75px";
            document.getElementById("Angry").style.color="red";
        }

    }
}