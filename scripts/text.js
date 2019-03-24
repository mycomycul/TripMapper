/*TODO: swap set attribute with .className
 *Create method for setting multiple attributes
 *Prevent quill change when clicking edit on currently edited section - add secction # to all elements all the time
 *Reduce map width when sticky
 *Fix Delete Row*/


var options = {
    debug: 'info',
    placeholder: 'Compose an epic...',
    theme: 'snow'
}
//do this in document ready function so that editor is local and can be reused
$(document).ready(function () {
    let newRow = CreateRow(RandomId(5));
    let newSectionButton = document.getElementById('newsectionbutton');
    document.body.insertBefore(newRow, newSectionButton);
    let editor = new Quill('#QuillTarget', options);
    document.getElementById('googleMap1').style.position = "";
})

//STICKY FEATURES
window.onscroll = function () { stickyHeader() };
// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function stickyHeader() {
    let map = document.getElementById("mapcontainer");
    let header = document.getElementById("header").offsetHeight;
    let sectionTop = document.getElementsByClassName("row")[1].offsetTop;

    // Get the offset position of the navbar
    var sticky = map.offsetTop;
    let w = window.pageYOffset;
    if (window.pageYOffset > header + 18) {
        map.classList.add("sticky");
        map.style.position = "fixed";
        document.getElementsByClassName('row')[1].style.paddingTop = "400px";
    } else {
        map.classList.remove("sticky");
        map.style.position = "";
        map.style.overflow = "hidden";
        document.getElementsByClassName('row')[1].style.paddingTop = "0px";

    }
}
//TODO: Iterative instead of randomIDs to ensure no duplication
function RandomId(size) {
    var id = ""
    while (id.length < size) {
        id = id + Math.floor((Math.random() * 10)).toString();
        console.log(id);
    }
    console.log(id.length);
    return id;
}





//QUILL  and SECTION FUNCTIONALITY
//TODO: Create Factory
function addNewSection() {

    //Get text editor contents and destroy
    var quillContents = document.getElementsByClassName('ql-editor')[0].innerHTML;
    var TextSection = document.getElementById('quillcontainer').parentNode;
    var newSectionId = TextSection.id;
    TextSection.removeChild(TextSection.childNodes[0]);

    //Append quill content to text column
    TextSection.childNodes[0].insertAdjacentHTML('beforebegin',quillContents);

    // TextSection.innerHTML = quillContents;
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
    NewRow.id = "row-" + newSectionId;
    NewRow.setAttribute("ondrop", "drop(event)");
    NewRow.setAttribute("ondragover", "allowDrop(event)");
    NewRow.setAttribute("draggable", "true");
    NewRow.setAttribute("ondragstart", "drag(event)");
    //Text Column elements
    let newTextColumn = document.createElement('section');
    newTextColumn.className = "text-column";
    newTextColumn.id = "text-" + newSectionId;
    let rowInfo = document.createElement("div");
    rowInfo.setAttribute("class", "row-info");
    rowInfo.id = ("rowinfo-" + newSectionId);
    rowInfo.innerHTML = "Click 'Map' Button and then on the map to set Coordinates";

    newTextColumn.appendChild(CreateQuillContainer());
    newTextColumn.appendChild(rowInfo);


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
    newButtonContainer.appendChild(deleteButton);
    newButtonColumn.appendChild(newButtonContainer);


    //Assemble Row
    NewRow.appendChild(newTextColumn);
    NewRow.appendChild(newButtonColumn);
    return NewRow;
}
function EditSection(sectionEditButton) {
    var sectionToEditId = sectionEditButton.id.replace("edit-", "");
    var editedSectionId = document.getElementById('quillcontainer').parentNode.id.replace("text-", "");
    
    //Check to make sure you are trying to edit a section that is currently being edited
    if (sectionToEditId != editedSectionId) {
        //Get Quill contents and remove
        var quillContents = document.getElementsByClassName('ql-editor')[0].innerHTML;
        var editedSection = document.getElementById('quillcontainer').parentNode;
            editedSection.removeChild(editedSection.childNodes[0]);
            editedSection.childNodes[0].insertAdjacentHTML('beforebegin',quillContents);
            // editedSection.insertBefore(quillContents,editedSection.childNodes[0]);
        //Prepare Quill Section
        let sectionToEdit = document.getElementById("text-" + sectionToEditId);
        var rowData = sectionToEdit.lastChild;
        sectionToEdit.removeChild(sectionToEdit.lastChild);  
        let sectionToEditHtml = sectionToEdit.innerHTML;
        var pasteOrNot = new Boolean(sectionToEdit.textContent != "");
     
        sectionToEdit.innerHTML = "";
        sectionToEdit.appendChild(CreateQuillContainer());
        sectionToEdit.appendChild(rowData);
        
        //Attach Quill
        let editor = new Quill('#QuillTarget', options);

        // editor.setText(sectionToEditHtml);
        if (pasteOrNot == true){
        editor.root.innerHTML = sectionToEditHtml;
        }
    }
}
function DeleteSection(childbutton) {
    var deleteConfirm = confirm("Are you sure you want to delete this section?");
    if (deleteConfirm == true) {
        var SectionId = childbutton.id.replace("delete-", "");
        document.getElementById("row-" + SectionId).remove();
    }
}

function CreateQuillContainer() {
    let newQuillContainer = document.createElement("div");
    newQuillContainer.className = "quillcontainer";
    newQuillContainer.setAttribute("id", "quillcontainer");
    let newQuillTarget = document.createElement('div');
    newQuillTarget.setAttribute("id", "QuillTarget");
    newQuillContainer.appendChild(newQuillTarget);
    return newQuillContainer;
}

//SECTION DRAG AND DROP FUNCTIONS

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var target = ev.target;
    while (!target.classList.contains("row")) {
        target = target.parentNode;
    }
    document.body.insertBefore(document.getElementById(data), target);
    // ev.target.appendChild();
}
function allowDrop(ev) {
    ev.preventDefault();
}

//GOOGLE MAP FUNCTIONS

function isElementOnScreen(element){
    let boundingBox = element.getBoundingClientRect
    var onScreen = (boundingBox.top >= 0) && (boundingBox.bottom <= window.innerHeight);
    return onScreen;
}

/**
 * @description Changes from light theme to dark theme
 * @param {Object} elem - Object holding and passing the current status of the page
 */
function ChangeLightMode(elem) {
    if (elem.dataset.value == "darkmode") {
        
        elem.dataset.value = "lightmode"
        document.body.className = "darkmode"
        // document.getElementById('light-icon-rays').classList.add("rays-darkmode");
        elem.classList.add("light-mode-icon-darkmode");
    }
    else {
        elem.dataset.value = "darkmode"
        document.body.className = "lightmode"
        elem.classList.remove("light-mode-icon-darkmode");
    }
}

