// swap set attribute with .className


var options = {
    debug: 'info',
    placeholder: 'Compose an epic...',
    theme: 'snow'
}
//do this in document ready function so that editor is local and can be reused
$(document).ready(function(){
let newRow = CreateRow(RandomId(5));
document.body.insertBefore(newRow,document.body.childNodes[4]);
let editor = new Quill('#QuillTarget', options);
})

function addNewSection() {


    var quillContents= document.getElementsByClassName('ql-editor')[0].innerHTML;

    var element = document.getElementById('quillcontainer').parentNode;
    var newSectionId = element.id;
    while (element.lastChild) {
        element.removeChild(element.lastChild);
    }
    
    element.setAttribute("id", newSectionId);
    element.innerHTML = quillContents;

    var NewRow = CreateRow(newSectionId);

    var rows = document.getElementsByClassName('row');
    rows[0].parentNode.insertBefore(NewRow, rows[rows.length - 1]);
    let editor = new Quill('#QuillTarget', options);
    console.log("");
}
function CreateRow(newSectionId){
    var NewRow = document.createElement("div");
    NewRow.className="row";
    NewRow.id="row"+newSectionId;

    var newTextColumn = document.createElement('section');
    newTextColumn.className="text-column";
    newTextColumn.id=newSectionId;
    
    var newQuillContainer = document.createElement("div");
    newQuillContainer.className= "quillcontainer";
    newQuillContainer.setAttribute("id", "quillcontainer");

    var newQuillTarget = document.createElement('div');
    newQuillTarget.setAttribute("id", "QuillTarget");

    var newButtonColumn = document.createElement("div");
    newButtonColumn.className="button-column";
    
    var newButtonContainer = document.createElement("div");
    newButtonContainer.className="ctr";

    var newButton1 = document.createElement("input");
    newButton1.setAttribute("type","button");
    newButton1.setAttribute("value","Edit");
    newButton1.setAttribute("id",("edit-" + newSectionId));

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

    return NewRow;
}
function EditSection(elem){

}

