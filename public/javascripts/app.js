// maak connectie browser naar primus 
var url = "/";
var value1 = 0;
var value2 = 0;
var total = 0; 
var primus = Primus.connect(url, {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
      , min: 500 // Number: The minimum delay before we try reconnect.
      , retries: 10 // Number: How many times we should try to reconnect.
    }
});

primus.on('data', function message(data) {
    //alert('client met primus verbonden'); 
    calculate(data); 
});

document.querySelector(".a1").addEventListener("click", function (e) {
    console.log("a1 clicked"); 
    primus.write("a"); 
    e.preventDefault();
});

document.querySelector(".a2").addEventListener("click", function (e) {
    console.log("a2 clicked"); 
    primus.write("b"); 
    e.preventDefault();
});

function calculate(answer) {

    total += 1;

    if (answer == "a") {
        value1 += 1;
    } else if (answer == "b") {
        value2 += 1;
    }

    /* laat procent zien */
    document.getElementById("procent1").innerHTML = Math.round((value1 / total) * 100).toFixed(0);
    document.getElementById("procent2").innerHTML = Math.round((value2 / total) * 100).toFixed(0);
}