class UserController {

    // Colocando meus atributos e colocando os parametros que tenho que receber que no caso é o id
    // do formulário
    constructor(formId, tableId) {

        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);
        
        // chamando o metodo ao instanciar o UserController
        this.submit()

    }

    // Aqui estou pegando o formEl que vai ser o id do formulário que veio como parametro e fazendo o
    // evento de submit
    // ao clicar no button ele não vai carregar a página por causa do preventDefault()
    // e vai executar o metodo addLine que por parametro recebe o metodo getValue())
    submit(){

        this.formEl.addEventListener("submit", (event) => {
            event.preventDefault();
            this.addLine(this.getValue());
        
        })
    }

     
    // Aqui eu estou percorrendo o meu formulário pelo formEl e validando qual gender está marcado
    // Ao percorrer estou retornando neste metodo os valores que estão dentro dos campos do formulário.
    getValue() {

        this.formEl.elements.forEach(function (field, index) {
            if (field.name == "gender") {
                if (field.checked === true) { // ou apenas field.checked
                    user[field.name] = field.name;
                }

            } else {

                user[field.name] = field.value;

            }
        });

        return new User(
            user.name,
            user.gender,
            user.birth,
            user.country,
            user.email,
            user.password,
            user.photo,
            user.admin
        );

    }

     // Neste metodo eu recebo o parametro dataUser que seria as informações preenchidas no formulário 
     // e crio o elemento com o template string
    addLine(dataUser, tableId) {

        this.tableEl.innerHTML = `
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
    
    }

}