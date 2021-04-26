const xhttp = new XMLHttpRequest();
let params = "";
let id = 0;
let endPoint = "https://chanzomuema.com/COMP351/labs/server"

function add() {

    let div = document.createElement("div");
    div.id = id;

    let div2 = document.createElement("div");

    let e1 = document.createElement("textarea");
    e1.id = 'quote'
    e1.name = 'quote';
    e1.style.height = "80px"
    e1.style.width = "200px"

    let e2 = document.createElement("input");
    e2.type = 'button';
    e2.id = 'delete';
    e2.value = "Delete"
    e2.style.margin = "5px";

    e2.onclick = function () {
        del();
        id--
        div2.remove()
    }

    let e3 = document.createElement("input");
    e3.type = 'button';
    e3.id = 'save';
    e3.value = "Save"
    e3.style.margin = "5px";

    e3.onclick = function () {
        post();
    }
    id++

    let e4 = document.createElement("input");
    e4.type = 'button';
    e4.id = 'change';
    e4.value = "Change Quote"
    e4.style.margin = "5px";

    e4.onclick = function () {
        put();
    }

    params = e1;

    div2.appendChild(e1);
    div2.appendChild(e2);
    div2.appendChild(e3);
    div.appendChild(div2);

    document.getElementById("main").appendChild(div);

}

function del() {

    let obj = {
        id: id,
    };

    xhttp.open("DELETE", endPoint, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(JSON.stringify(obj));
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

        }
    };
}

function post() {

    console.log("starting to post");
    let obj = {
        id: id,
        body: JSON.stringify(params.value)
    };


    xhttp.open("POST", endPoint, true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send(JSON.stringify(obj));

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

        }
    };
}

function put() {

    let obj = {
        id: id,
        body: JSON.stringify(params.value)
    };


    xhttp.open("PUT", endPoint, true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send(JSON.stringify(obj));

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

        }
    };
}

document.getElementById("add").onclick = function () {
    add();
}