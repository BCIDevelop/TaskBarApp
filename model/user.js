export class User {    
    constructor(nombre, password) {
        this.id = crypto.randomUUID();
        this.nombre = nombre;
        this.password = password;
        this.picture = ''
    }
}

export const userModel ={
    user_id: String(),
    email : String(),
    password: String(),
    picture: String(),
}
