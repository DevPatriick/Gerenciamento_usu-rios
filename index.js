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


let fields = document.querySelectorAll("#form-user-create [name]");

const user = {}

fields.forEach(function(field, index){

    if(field.name == "gender"){
        if(field.checked === true ){ // ou apenas field.checked
            user[field.name] = field.name;
        }
        
    } else{
        
        user[field.name] = field.value;

    }

});

console.log(user)
