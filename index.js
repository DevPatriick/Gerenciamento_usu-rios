// // Variaveis
// let inputName = document.querySelector("#exampleInputName");
// // Ao inves de ter duas váriaveis eu posso usar o [name=gender] para ver as está 
// // marcada para não ter duas váriaveis e ao usar o [name=gender]:checked eu estou querendo buscar apenas os
// // selecionados
// let gender = document.querySelectorAll("#form-user-create [name=gender]:checked");
// // let inputGenderM= document.querySelector("#exampleInputGenderM");
// // let inputGenderF = document.querySelector("#exampleInputGenderF");
// console.log(gender)
// let inputBirth = document.querySelector("#exampleInputBirth");
// let inputCountry = document.querySelector("#exampleInputCountry");
// let inputEmail = document.querySelector("#exampleInputEmail1");
// let inputPassword = document.querySelector("#exampleInputPassword1");
// let inputFile = document.querySelector("#exampleInputFile");
// let admin = document.querySelector("#inputAdmin");
// let buttonSaveForms = document.querySelector(".btn");

// document.querySelector("#form-user-create button").forEach(function(){
//     this.addEventListener("click", function(){
//         alert("Deu certo")
//     })
// })



let fields = document.querySelectorAll("#form-user-create [name]");

const user = {}


function addLine(dataUser) {

    const trUser = document.createElement("tr")
    trUser.innerHTML = `
    <tr>
        <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
        <td>${dataUser.name}</td>
        <td>${dataUser.email}</td>
        <td>${dataUser.admin}</td>
        <td>${dataUser.birth}</td>
        <td>
            <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
            <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
        </td>
    </tr>`;

    document.getElementById("tableUser").appendChild(trUser)
}



document.getElementById("form-user-create").addEventListener("submit", function (event) {

    event.preventDefault();

    fields.forEach(function (field, index) {
        if (field.name == "gender") {
            if (field.checked === true) { // ou apenas field.checked
                user[field.name] = field.name;
            }

        } else {

            user[field.name] = field.value;

        }
    });

    addLine(user);

})
