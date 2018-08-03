var options = {
    debug: 'info',
    placeholder: 'Compose an epic...',
    theme: 'snow'
    }

var editor = new Quill('#QuillTarget',options);

function newSection(){
var newSection = document.createElement("section");

newSection.innerHTML = editor.root.innerHTML;

var target = document.getElementById('QuillTarget').parentElement;
target.insertBefore(newSection,target.firstChild);
}
