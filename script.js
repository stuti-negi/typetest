const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p");
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
var timer = [0,0,0,0];
var interval;
var timerRunning = false; 
var display_text=["Explore the mysteries of science while exercising your fingers. Over a dozen science topics available.",
"Do something for somebody every day for which you do not get paid.",
"One cannot always live in the palaces and state apartments of language, but we can refuse to spend our days in searching for its vilest slums.",
"You may have to fight a battle more than once to win it.",
"Men are valued, not for what they are, but for what they seem to be.",
"If there's a book that you want to read, but it hasn't been written yet, then you must write it."
,"One day I will find the right words, and they will be simple.",
"Either write something worth reading or do something worth writing."];
var word;
function test()
{
    var i=Math.floor(Math.random()*display_text.length);
  originText.innerHTML = display_text[i];
  word=display_text[i].length;
  
}

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leading(time)
{
    if(time <= 9)
    {
        time = "0" + time;
    }
    return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer()
{
    let currentTime = leading (timer[0])+":"+leading(timer[1])+":"+leading(timer[2]);
    theTimer.innerHTML = currentTime ;
    timer[3]++;
    timer[0]=Math.floor((timer[3]/100)/60);
    timer[1]=Math.floor((timer[3]/100)-(timer[0]*60));
    timer[2]=Math.floor(timer[3]-(timer[1]*100) - (timer[0]*6000));
}

// Match the text entered with the provided text on the page:
function spellCheck()
{
    let textEntered= testArea.value;
    let origintextMatch= originText.innerHTML.substring(0,textEntered.length)
    
    if(textEntered == originText.innerHTML)
    { 
       
        clearInterval(interval);
        testWrapper.style.borderColor = "#065d31";
        console.log(timer[3]);
        var wpm=((word/5)/(timer[0]+(timer[1]/60)+((timer[2]/1000)/60)) );
        console.log(wpm);
        console.log(Math.floor(wpm));
        document.getElementById("word_speed").innerHTML=Math.floor(wpm);
        document.getElementById("reset").style.height="60px";
        document.getElementById("show_speed").style.display="block";
    }
   else 
   {
       if(textEntered == origintextMatch)
    {
        testWrapper.style.borderColor = "#4662b1";
    } 
    else
    {
        testWrapper.style.borderColor = "#a20f0f";
    }
}
    console.log(textEntered);
}

// Start the timer:
function start()
{
    let textEnteredLength = testArea.value.length;
    if(textEnteredLength === 0 && !timerRunning)
    {
        timerRunning=true;
       interval = setInterval(runTimer, 10);
    }
    console.log(textEnteredLength);
}

// Reset everything:
function reset()
{
    clearInterval(interval);
    interval = null;
    timer= [0,0,0,0];
    timerRunning = false;
    testArea.value="";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "#fdac17";
    
    document.getElementById("show_speed").style.display="none";
    test();
    
}


// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress",start,false);
testArea.addEventListener("keyup",spellCheck,false);
resetButton.addEventListener("click",reset,false);