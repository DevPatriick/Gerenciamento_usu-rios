class User {

    // Aqui estou definindo o que cada usuário vai ter
    constructor(name, gender, birth, country, email, password, photo, admin) {
        this._id;
        this._name = name;
        this._gerder = gender;
        this._birth = birth;
        this._country = country;
        this._email = email;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date()
    }

    // incluindo o get para buscar a informação

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get gender() {
        return this._gerder;
    }

    get birth() {
        return this._birth;
    }

    get country() {
        return this._country;
    }

    get email() {
        return this._email;
    }

    get password() {
        return this._password
    }

    get photo() {
        return this._photo;
    }

    set photo(value) {
        return this._photo = value;
    }

    get admin() {
        return this._admin;
    }

    get register() {
        return this._register;
    }

    loadFromJSON(json) {
        for (let name in json) {
            switch (name) {
                case '_register':
                    this[name] = new Date(json[name]);
                    break;
                default:
                    this[name] = json[name]
            }

        }
    }

    static getUserStorage() {
        let users = [];

        if (localStorage.getItem("users")) {  // Verifica se há dados de usuários no localStorage.
            users = JSON.parse(localStorage.getItem("users"));  // Converte os dados em um array de objetos.
        }

        return users;  // Retorna o array de usuários.
    }

    getNewID() {
        if (!window.id) window.id = 0;

        id++;

        return this.id;
    }

    save() {
        let users = User.getUserStorage();  // Obtém os usuários armazenados.
        if (this.id > 0) {
            users.map(u=>{

                if(u._id === this.id){
                    u = this;
                }
                return u;
            })
        } else {
            this._id = this.getNewID();
            users.push(this); 
        }
         // Adiciona o novo usuário.
        localStorage.setItem("users", JSON.stringify(users));  // Atualiza os usuários no localStorage.
    }



}