var id = ""
    while(id.length < 5){
    id = id + Math.floor((Math.random() * 10)).toString();
    console.log(id);
    }
    console.log(id.length);