class UserController {

    // Colocando meus atributos e colocando os parametros que tenho que receber que no caso é o id
    // do formulário
    constructor(formId, tableId) {

        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);

        // chamando o metodo ao instanciar o UserController
        this.submit();
        this.onEditCancel()

    }

    onEditCancel() {
        document.querySelector(".btn-defaut").addEventListener('click', (e) => {
            this.showPanelCreate();
        })
    }

    // Aqui estou pegando o formEl que vai ser o id do formulário que veio como parametro e fazendo o
    // evento de submit
    // ao clicar no button ele não vai carregar a página por causa do preventDefault()
    // e vai executar o metodo addLine que por parametro recebe o metodo getValue())
    submit() {

        this.formEl.addEventListener("submit", (event) => {
            event.preventDefault();
            let value = this.getValue();

            let btn = this.formEl.querySelector("[type=submit");

            btn.disabled = true;

            // aqui eu executo a função getPhoto chamando a função de callback, passo parametro da minha
            // função que é o content que é a minha imagem
            // value.photo recebe o content e depois executo o addLine para incluir no HTML

            // agora quando eu chamo o metodo getPhoto, eu uso o then para que depois que a promessa for
            // resolvida ele executa a função que recebe o contentno

            if (!value) {
                btn.disabled = false;
                return false;
            }

            this.getPhoto().then(
                (content) => {
                    value.photo = content;
                    this.addLine(value);
                    this.formEl.reset()
                    btn.disabled = false;
                },
                (e) => {
                    console.error(e)
                });

        })
    }

    // no fileReard estou instanciando o new FileReader(), logo depois eu coloco o atributo elements e nele 
    // filtro os elementos do meu Array para pegar apenas o campo com name photo
    // depois no atributo let file digo que ele recebe o elemento filtrado acima na posição 0 e o primeiro arquivo
    // do elemento
    // agora dentro do fileReard eu chamo o metodo onload para ele carregar a imagem para mim
    // e me retorna se ele foi concluído 
    // depois o fileReard.readAsDataURL ele lê o meu file e quando ele finaliza a leitura passa o callback


    // agora em vez que passar o callback como função eu estou retornando uma Promise, com os parametros
    // resolve e reject, quando o fileReard.onload der certo ele vai me mandar o resolve, e caso ele de errado
    // eu passo o onerror com o reject e o erro que ele der pelo atributo (e)

    getPhoto() {

        return new Promise((resolve, reject) => {
            let fileReard = new FileReader();

            let elements = [...this.formEl.elements].filter(item => {
                if (item.name === "photo") {
                    return item;
                }
            });

            let file = elements[0].files[0];

            fileReard.onload = () => {
                resolve(fileReard.result);
            }

            fileReard.onerror = (e) => {
                reject(e)
            }

            // tratei alguns erros caso o usuários não envie a foto, antes como ele estava esperando
            // receber algum parametro ele não criava o html, agora com o if()
            // eu digo que se o cliente mandar a foto ele exiba a que o usuário mandou
            //  se não mandar nada eu resolve minha promise enviando uma foto padrão de usuário

            if (file) {
                fileReard.readAsDataURL(file)
            } else {
                resolve('dist/profile-user.png')
            }

        })
    }


    // Aqui eu estou percorrendo o meu formulário pelo formEl e validando qual gender está marcado
    // Ao percorrer estou retornando neste metodo os valores que estão dentro dos campos do formulário.
    getValue() {

        const user = {};
        let isValid = true;


        [...this.formEl.elements].forEach(function (field, index) {

            if (['name', 'email', 'password'].indexOf(field.name) > -1 && !field.value) {
                field.parentElement.classList.add('has-error');
                isValid = false;
            }

            if (field.name == "gender") {
                if (field.checked === true) { // ou apenas field.checked
                    user[field.name] = field.name;
                }

            } else if (field.name == "admin") {
                user[field.name] = field.checked;
            } else {

                user[field.name] = field.value;

            }
        });

        if (!isValid) {
            return false;
        } else {
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



    }

    // Neste metodo eu recebo o parametro dataUser que seria as informações preenchidas no formulário 
    // e crio o elemento com o template string
    addLine(dataUser, tableId) {

        let tr = document.createElement('tr');

        tr.dataset.user = JSON.stringify(dataUser);

        tr.innerHTML = `
        
            <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${dataUser.admin ? "Sim" : "Não"}</td>
            <td>${Utils.dateFormat(dataUser.register)}</td>
            <td>
                <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
        `;

        tr.querySelector(".btn-edit").addEventListener('click', e => {
            let json = JSON.parse(tr.dataset.user);
            let form = document.querySelector("#form-user-uptade");

            for (let name in json) {
                let field = form.querySelector("[name=" + name.replace("_", "") + "]");

                if (field) {

                    switch (field.type) {
                        case 'file':
                            continue;
                            break;

                        case 'radio':
                            field = form.querySelector("[name=" + name.replace("_", "") + "][value=" + json[name] + "]");
                            field.checked = true;
                            break;

                        case 'checkbox':
                            field.checked = json[name];
                            break;

                        default:
                            field.value = json[name]
                    }

                }

            }

            this.showPanelUptade()

        })

        this.tableEl.appendChild(tr);

        this.uptadeCount();

    }

    showPanelCreate() {
        const boxpost = document.querySelector(".box-success")
        boxpost.style = "display:block"
        const boxput = document.querySelector(".box-primary")
        boxput.style = "display:none"
    }

    showPanelUptade() {
        const boxpost = document.querySelector(".box-success")
        boxpost.style = "display:none"
        const boxput = document.querySelector(".box-primary")
        boxput.style = "display:block"
    }

    uptadeCount() {

        let numberUser = 0;
        let numberAdmin = 0;
        [...this.tableEl.children].forEach(tr => {
            numberUser++;
            let users = JSON.parse(tr.dataset.user);
            if (users._admin) {
                numberAdmin++
            }
        })

        document.querySelector('#number-User').innerHTML = numberUser;
        document.querySelector('#number-Admin').innerHTML = numberAdmin
    }

}