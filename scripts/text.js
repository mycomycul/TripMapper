var options = {
    debug: 'info',
    placeholder: 'Compose an epic...',
    theme: 'snow'
}
//do this in document ready function so that editor is local and can be reused
var editor = new Quill('#QuillTarget', options);

function addNewSection() {
    // var newSection = document.createElement("section");
    // newSection.setAttribute("id", Math.floor(Math.random()*10000));
    // newSection.innerHTML = editor.root.innerHTML;


    var element = document.getElementById('quillcontainer').parentNode;
    while (element.lastChild) {
        element.removeChild(element.lastChild);
    }
    element.setAttribute("id", Math.floor(Math.random()*10000));
    element.innerHTML = editor.root.innerHTML;
    var newQuillRow = document.createElement("div");
    newQuillRow.setAttribute("class","row");

    var newSection = document.createElement('section');
    newSection.setAttribute("class","text-column");
    
    var newQuillContainer = document.createElement("div");
    newQuillContainer.setAttribute("class", "quillcontainer");
    newQuillContainer.setAttribute("id", "quillcontainer");

    var newQuillTarget = document.createElement('div');
    newQuillTarget.setAttribute("id", "QuillTarget");

    newQuillContainer.appendChild(newQuillTarget);
    newSection.appendChild(newQuillContainer);
    newQuillRow.appendChild(newSection);
    var rows = document.getElementsByClassName('row');
    rows[0].parentNode.insertBefore(newQuillRow, rows[rows.length - 1]);
    let newEditor = new Quill('#QuillTarget', options);
    console.log("");
}


