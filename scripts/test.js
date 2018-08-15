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

