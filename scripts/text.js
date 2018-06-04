var textTarget = document.getElementById('textTarget');
var textSample = document.getElementById('textSample');
var textToHTML = document.getElementById('textToHTML');
textTarget.onkeydown = function(){textTest()};


function getTextContent(textTarget) {
   
   textSample.innerHTML = textTarget.textContent;
}


function getTextFromElements(fullHTML) {
    var nodeList = fullHTML.querySelectorAll('*');
                                 for(var i = 0; i < nodeList.length; i++){
        textSample.innerHTML += nodeList[i].innerHTML;
    }      
}


function getSelectionFromElements(textSelection) {
    
    var s = window.getSelection();
    textSample.innerHTML = s;
}

//
function iterateNodes(nodeObject){
    for(var i = 0; i < nodeObject.childNodes.length; i++){
        if (nodeObject.childNodes[i].childNodes.length >0){
            iterateNodes(nodeObject.childNodes[i]);
        }
        else{
            nodeValue(nodeObject.childNodes[i]);
        }
    }
}
function nodeValue(nodeObject){
        textSample.innerHTML += nodeObject.nodeValue;
}
function getinnerHTML(){
    textSample.innerHTML = textTarget.innerHTML;
}

function textTest(){
   textToHTML.innerHTML = editor.root.innerHTML; 
}