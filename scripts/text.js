// swap set attribute with .className
//Create set multiple attribute method

var options = {
    debug: 'info',
    placeholder: 'Compose an epic...',
    theme: 'snow'
}
//do this in document ready function so that editor is local and can be reused
$(document).ready(function () {
    let newRow = CreateRow(RandomId(5));
    document.body.insertBefore(newRow, document.body.childNodes[6]);
    let editor = new Quill('#QuillTarget', options);
})

//PAGE FUNCTIONALITY FUNCTION

function RandomId(size){
    var id = ""
        while(id.length < size){
        id = id + Math.floor((Math.random() * 10)).toString();
        console.log(id);
        }
        console.log(id.length);
    return id;
    }
    function ChangeLightMode(elem){
        if (elem.value == "Darkmode"){
            elem.value = "Lightmode"
            document.body.className="darkmode"
        }
        else{
            elem.value = "Darkmode"
            document.body.className="lightmode"    
        }
    }

//QUILL  and SECTION FUNCTIONALITY

function addNewSection() {

    //Get text editor contents and destroy
    var quillContents = document.getElementsByClassName('ql-editor')[0].innerHTML;
    var TextSection = document.getElementById('quillcontainer').parentNode;
    var newSectionId = TextSection.id;
    while (TextSection.lastChild) {
        TextSection.removeChild(TextSection.lastChild);
    }
    //Append quill content to text column
    TextSection.innerHTML = quillContents;
    //Create new row, insert at end and attach quill editor
    var NewRow = CreateRow(RandomId(5));
    var rows = document.getElementsByClassName('row');
    rows[0].parentNode.insertBefore(NewRow, rows[rows.length - 1]);
    let editor = new Quill('#QuillTarget', options);
}
function CreateRow(newSectionId) {
    //Create rows for containing text and button columns
    let NewRow = document.createElement("div");
    NewRow.className = "row";
    NewRow.id = "row" + newSectionId;
    NewRow.setAttribute("ondrop","drop(event)");
    NewRow.setAttribute("ondragover","allowDrop(event)");
    NewRow.setAttribute("draggable","true");
    NewRow.setAttribute("ondragstart","drag(event)");


    //Text Column elements
    let newTextColumn = document.createElement('section');
    newTextColumn.className = "text-column";
    newTextColumn.id = newSectionId;

    newTextColumn.appendChild(CreateQuillContainer());
    //CreateButton column elements
    let newButtonColumn = document.createElement("div");
    newButtonColumn.className = "button-column";
    let newButtonContainer = document.createElement("div");
    newButtonContainer.className = "ctr";
    let mapButton = document.createElement("input");
    mapButton.setAttribute("type", "button");
    mapButton.setAttribute("value", "Map");
    mapButton.setAttribute("id", ("map-" + newSectionId));
    mapButton.setAttribute("onclick", "mapSection(this)");
    let editButton = document.createElement("input");
    editButton.setAttribute("type", "button");
    editButton.setAttribute("value", "Edit");
    editButton.setAttribute("id", ("edit-" + newSectionId));
    editButton.setAttribute("onclick", "EditSection(this)");
    let deleteButton = document.createElement("input");
    deleteButton.setAttribute("type", "button");
    deleteButton.setAttribute("value", "X");
    deleteButton.id = "delete-" + newSectionId;
    deleteButton.setAttribute("onclick", "DeleteSection(this)");
    //Assemble right side
    newButtonContainer.appendChild(mapButton);
    newButtonContainer.appendChild(editButton);
    newButtonContainer.appendChild (deleteButton);
    newButtonColumn.appendChild(newButtonContainer);

    //Assemble Row
    NewRow.appendChild(newTextColumn);
    NewRow.appendChild(newButtonColumn);
    return NewRow;
}
function EditSection(sectionEditButton) {

    var SectionId = sectionEditButton.id.replace("edit-", "");
    //Get Quill contents and remove
    var quillContents = document.getElementsByClassName('ql-editor')[0].innerHTML;
    var TextSection = document.getElementById('quillcontainer').parentNode;
    while (TextSection.lastChild) {
        TextSection.removeChild(TextSection.lastChild);
    }
    //Prepare Quill Section
    let sectionToEdit = document.getElementById(SectionId);
    let sectionToEditHtml = sectionToEdit.innerHTML;
    sectionToEdit.innerHTML = "";
    sectionToEdit.appendChild(CreateQuillContainer());
    TextSection.innerHTML = quillContents;
    //Attach Quill
    let editor = new Quill('#QuillTarget', options);
    editor.root.innerHTML = sectionToEditHtml;
}
function DeleteSection(childbutton) {
    var deleteConfirm = confirm("Are you sure you want to delete this seciton?");
    if (deleteConfirm == true) {
        var SectionId = childbutton.id.replace("delete-", "");
        document.getElementById("row" + SectionId).remove();
    }
}
function MoveSection(){

}
function CreateQuillContainer(){
    let newQuillContainer = document.createElement("div");
    newQuillContainer.className = "quillcontainer";
    newQuillContainer.setAttribute("id", "quillcontainer");
    let newQuillTarget = document.createElement('div');
    newQuillTarget.setAttribute("id", "QuillTarget");
    newQuillContainer.appendChild(newQuillTarget);
    return newQuillContainer;
}

//SECTION DRAG AND DROP FUNCTIONS

function drag(ev){
    ev.dataTransfer.setData("text",ev.target.id);
}
function drop(ev){
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var target = ev.target;
    while(!target.classList.contains("row")){
        target=target.parentNode;
    }
    document.body.insertBefore(document.getElementById(data), target);
    // ev.target.appendChild();
}
function allowDrop(ev) {
    ev.preventDefault();
}

//GOOGLE MAP FUNCTIONS

