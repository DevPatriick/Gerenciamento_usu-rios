class User {

    // Aqui estou definindo o que cada usuário vai ter
    constructor(name, gender, birth, country, email, password, photo, admin){
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

    get name(){
        return this._name
    }

    get gender(){
        return this._gerder
    }

    get birth(){
        return this._birth
    }

    get country(){
        return this._country
    }

    get email(){
        return this._email
    }

    get password(){
        return this._password
    }

    get photo(){
        return this._photo
    }

    set photo(value){
        return this._photo = value;
    }

    get admin(){
        return this._admin
    }

    get register(){
        return this._register
    }

    

}