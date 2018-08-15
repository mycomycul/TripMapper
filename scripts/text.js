// swap set attribute with .className


var options = {
    debug: 'info',
    placeholder: 'Compose an epic...',
    theme: 'snow'
}
//do this in document ready function so that editor is local and can be reused
var editor = new Quill('#QuillTarget', options);

function addNewSection() {
    // var  newTextColumn = document.createElement("section");
    //  newTextColumn.setAttribute("id", Math.floor(Math.random()*10000));
    //  newTextColumn.innerHTML = editor.root.innerHTML;
    var element = document.getElementById('quillcontainer').parentNode;
    while (element.lastChild) {
        element.removeChild(element.lastChild);
    }
    element.setAttribute("id", Math.floor(Math.random()*10000));
    element.innerHTML = editor.root.innerHTML;
    //Create new quill section
    var NewRow = document.createElement("div");
    NewRow.setAttribute("class","row");

    var newTextColumn = document.createElement('section');
    newTextColumn.setAttribute("class","text-column");
    
    var newQuillContainer = document.createElement("div");
    newQuillContainer.setAttribute("class", "quillcontainer");
    newQuillContainer.setAttribute("id", "quillcontainer");

    var newQuillTarget = document.createElement('div');
    newQuillTarget.setAttribute("id", "QuillTarget");

    var newButtonColumn = document.createElement("div");
    newButtonColumn.setAttribute("class","button-column");
    
    var newButtonContainer = document.createElement("div");
    newButtonContainer.setAttribute("class","ctr");

    var newButton1 = document.createElement("input");
    newButton1.setAttribute("type","button");
    newButton1.setAttribute("value","Edit");

    var newButton2 = document.createElement("input");
    newButton2.setAttribute("type","button");
    newButton2.setAttribute("value","X");
    newButtonContainer.appendChild(newButton1);
    newButtonContainer.appendChild(newButton2);


    newQuillContainer.appendChild(newQuillTarget);

    newTextColumn.appendChild(newQuillContainer);
    newButtonColumn.appendChild(newButtonContainer);
    NewRow.appendChild (newTextColumn);
    NewRow.appendChild(newButtonColumn);

    var rows = document.getElementsByClassName('row');
    rows[0].parentNode.insertBefore(NewRow, rows[rows.length - 1]);
    let newEditor = new Quill('#QuillTarget', options);
    console.log("");
}


