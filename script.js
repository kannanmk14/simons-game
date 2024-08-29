const buttonColors=["red","blue","green","yellow"];

let gamePattern=[];//system generated colors; 
let userClickedPattern=[]; //user typed pattern

let started=false;
let level=0;  //In simons game whatever button click game gets started how do we know that button is clicked
              //here only event listener comes in action when a particular action takes place we can call a function
              //here any button clicked that event listener function should be called so choose all button
document.addEventListener("keypress",()=>{
    if(!started){
         document.getElementById("level-title").innerText=`Level ${level}`;
         started=true;
          nextSequence();
    }
});
//now how to get user input here below all element with btn class returned in array
//for that we use for each loop so now for all color div event listener added and whenever we click anythung now event type gets returned
document.querySelectorAll(".btn").forEach((item)=>{
    item.addEventListener("click",(event)=>{
  //console.log(event.target.id);//now in this whenever i click event return event contaians lot of information so in that event we need its corrsponding id that id present inside target so target.id
   let userChoosenColor=event.target.id;
   userClickedPattern.push(userChoosenColor);
   animatePress(userChoosenColor);
   playAudio(userChoosenColor);
   checkAnswer(userClickedPattern.length-1);
 });
});
 
function checkAnswer(currentlevel){
if(userClickedPattern[currentlevel]===gamePattern[currentlevel]){
    if(userClickedPattern.length===gamePattern.length){
        setTimeout(()=>{
          nextSequence()
        },1000)
    }
}else{
  playAudio("wrong");
    document.querySelector("body").classList.add("wrong")
    document.getElementById("level-title").innerText="Game Over, Press Any Key to restart";
    setTimeout(()=>{
        document.querySelector("body").classList.remove("wrong")
    },200);
     setTimeout(()=>{
         playAudio("end");
     },300);
    startover();
    }
}

function fadeIn(time,id){
let fade=document.getElementById(id);
setTimeout(()=>{
    fade.style.opacity=0.1
},time);
}
function fadeOut(time,id){
    let fade=document.getElementById(id);
    setTimeout(()=>{
        fade.style.opacity=1
    },time);
}

//userclickedbutton each time becomes zero when we move to next level
function nextSequence(){
    userClickedPattern=[];//empty eac time entered into new level because user need to click pattern from level 1 if we
                               //didnt clear it prev clicked pattern gets stored and no use in clicking from first
    level++;
    document.getElementById("level-title").innerText=`Level ${level}`
    let randomNumber=Math.floor(Math.random()*4);
    let randomChoosencolor=buttonColors[randomNumber];
    gamePattern.push(randomChoosencolor);//now generated color need to be shown to user and audio must be generated //console.log(randomChoosencolor);
    fadeIn(200,randomChoosencolor);
    fadeOut(400,randomChoosencolor);
    playAudio(randomChoosencolor);

}

function playAudio(name){
    const audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentcolor){
    let temp=document.getElementById(currentcolor).classList.add("press");
    setTimeout(()=>{
        let temp=document.getElementById(currentcolor).classList.remove("press");
    },200);
}

function startover(){
    level=0;
    gamePattern=[];
    started=false;
}