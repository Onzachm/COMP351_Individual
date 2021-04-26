const xhttp = new XMLHttpRequest();
let params = "";
let divCount = 0;
let endPoint = "https://chanzomuema.com/COMP351/labs/individual/server";
let storage = [];

function fill() {
    xhttp.open("GET", endPoint, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            storage = JSON.parse(this.responseText);
            console.log(JSON.parse(this.responseText));
        }
    };
}

fill();

console.log[storage[0]];

setTimeout(() => {
    for (i = 0; i < storage.length; i++) {

        add(storage[i].id, storage[i].quote);
        divCount++;
    }
}, 2000);

function add(id, quote) {

    let div = document.createElement("div");

    let div2 = document.createElement("div");
    if (id === undefined) {
        divCount++;
        div2.id = divCount;
    }
    else div2.id = id;

    let e1 = document.createElement("textarea");
    e1.id = 'quote';
    e1.name = 'quote';
    e1.style.height = "80px";
    e1.style.width = "200px";
    if (quote === undefined) {
        e1.innerHTML = "";
    }
    else e1.innerHTML = quote;

    let e2 = document.createElement("input");
    e2.type = 'button';
    e2.id = 'delete';
    e2.value = "Delete";
    e2.style.margin = "5px";

    e2.onclick = function () {
        del();
        divCount--;
        div2.remove();
    };

    let e3 = document.createElement("input");
    e3.type = 'button';
    e3.id = 'save';
    e3.value = "Save";
    e3.style.margin = "5px";

    e3.onclick = function () {
        post();
    };

    let e4 = document.createElement("input");
    e4.type = 'button';
    e4.id = 'change';
    e4.value = "Change Quote";
    e4.style.margin = "5px";

    e4.onclick = function () {
        put();
    };

    params = e1;

    div2.appendChild(e1);
    div2.appendChild(e2);
    div2.appendChild(e3);
    div.appendChild(div2);

    document.getElementById("main").appendChild(div);

}

function del() {

    let obj = {
        id: divCount,
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
        id: divCount,
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
        id: divCount,
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