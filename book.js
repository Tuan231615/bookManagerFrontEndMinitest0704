function getAllBook() {
$.ajax({
    type: "GET",
    url: "http://localhost:8080/books",
    success: function (data) {
        let content = "";
        for (let i = 0; i < data.length; i++) {
            content += `<tr>
<td>${data[i].id}</td>
<td>${data[i].code}</td>
<td>${data[i].name}</td>
<td>${data[i].author}</td>
<td>${data[i].price}</td>
<td><button onclick="editById(${data[i].id})">Edit</button></td>
<td><button onclick="deleteById(${data[i].id})">Delete</button></td>
                        </tr>`
        }
        document.getElementById("content").innerHTML = content;
    }
})
}
getAllBook()
function createNewBook() {
    event.preventDefault()
    let code = document.getElementById("code").value;
    let name = document.getElementById("name").value;
    let author = document.getElementById("author").value;
    let price = document.getElementById("price").value;
    let newBook = {
        code: code,
        name: name,
        author: author,
        price: price
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data :JSON.stringify(newBook),
        type: "POST",
        url: "http://localhost:8080/books/create",
        success: function (data) {
            getAllBook();
            alert("Create new book successfully!");
        }
    })
}
function deleteById(id) {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/books/" + id,
        success: function (data){
            getAllBook();
            alert("Delete book successfully!");
        }
    })
}
function editById(id) {
    event.preventDefault()
    let code = document.getElementById("code").value;
    let name = document.getElementById("name").value;
    let author = document.getElementById("author").value;
    let price = document.getElementById("price").value;
    let newBook = {
        code: code,
        name: name,
        author: author,
        price: price
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(newBook),
        type: "PUT",
        url: "http://localhost:8080/books/" + id,
        success: function (data) {
            getAllBook();
            alert("Edit book successfully!");
        }
    })
}
function totalPriceBook() {
    $.ajax({
        type: "GET",
        dataType: "JSON",
        url: "http://localhost:8080/books/",
        success: function (data) {

            let total = 0;
            for (let i = 0; i < data.length; i++) {
                total += `<tr><td>${data[i].price}</td></tr>`;
            }
            console.log(total)
            document.getElementById("context").value = total;
        }
    })
}
totalPriceBook()