document.getElementById('textTarget').onkeydown = function(){saveTextStatus(this)};
function saveTextStatus(textTarget) {
    getTextFromElements(textTarget);
   // var textSample = document.getElementById('textSample');
   // textSample.innerHTML = textTarget.innerHTML + "turkey";
}

function getTextFromElements(fullHTML) {
    var nodeList = fullHTML.querySelectorAll('*');
    var textSample = document.getElementById('textSample');                             for(var i = 0; i < nodeList.length; i++){
        textSample.innerHTML += nodeList[i].innerHTML;
    }      
}

function saveSelection(textSelection) {
    var textSample = document.getElementById('textSample');
    textSample.innerHTML = textSelection.innerHTML + textSelection.;
}