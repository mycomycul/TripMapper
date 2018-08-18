// swap set attribute with .className
// create CreateQuill() to replace in editsection and new section


var options = {
    debug: 'info',
    placeholder: 'Compose an epic...',
    theme: 'snow'
}
//do this in document ready function so that editor is local and can be reused
$(document).ready(function () {
    let newRow = CreateRow(RandomId(5));
    document.body.insertBefore(newRow, document.body.childNodes[4]);
    let editor = new Quill('#QuillTarget', options);
})

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
    //Contains text section and related buttons
    let NewRow = document.createElement("div");
    NewRow.className = "row";
    NewRow.id = "row" + newSectionId;
    NewRow.setAttribute("draggable","true");
    //Left Side Text Column
    let newTextColumn = document.createElement('section');
    newTextColumn.className = "text-column";
    newTextColumn.id = newSectionId;

    let newQuillContainer = CreateQuillContainer();
    //Right Side Button Column
    let newButtonColumn = document.createElement("div");
    newButtonColumn.className = "button-column";
    let newButtonContainer = document.createElement("div");
    newButtonContainer.className = "ctr";
    let EditButton = document.createElement("input");
    EditButton.setAttribute("type", "button");
    EditButton.setAttribute("value", "Edit");
    EditButton.setAttribute("id", ("edit-" + newSectionId));
    EditButton.setAttribute("onclick", "EditSection(this)");
    let DeleteButton = document.createElement("input");
    DeleteButton.setAttribute("type", "button");
    DeleteButton.setAttribute("value", "X");
    DeleteButton.id = "delete-" + newSectionId;
    DeleteButton.setAttribute("onclick", "DeleteSection(this)");

    //Append to left side

    newTextColumn.appendChild(newQuillContainer);
    //Assemble right side
    newButtonContainer.appendChild(EditButton);
    newButtonContainer.appendChild (DeleteButton);
    newButtonColumn.appendChild(newButtonContainer);
    //Combine columns
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
    //Prepare Section for quill API
    var sectionToEdit = document.getElementById(SectionId);
    var sectionToEditHtml = sectionToEdit.innerHTML;
    sectionToEdit.innerHTML = "";

    var newQuillContainer = document.createElement("div");
    newQuillContainer.className = "quillcontainer";
    newQuillContainer.setAttribute("id", "quillcontainer");
    var newQuillTarget = document.createElement('div');
    newQuillTarget.setAttribute("id", "QuillTarget");
    newQuillContainer.appendChild(newQuillTarget);
    sectionToEdit.appendChild(newQuillContainer);
    TextSection.innerHTML = quillContents;

    // let editor = new Quill(('#\\'+SectionId), options);
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