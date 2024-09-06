import {userModel} from '../model/user.js'

class UsersModel{
    
    constructor(){
        if(new.target === Users){
            throw new Error("This is an abstract class");
        }
    }
    
    static #verifyBody(body){
        if(!body.password || !body.email) return false
        const password = body.password
        const email = body.email
        if(typeof(password) !== typeof(userModel.password) || typeof(email) !== typeof(userModel.email)) return false
        return true
    }
    static #verifyUserExists(body){
        /* Verificamos que las llaves existan y si existen verifamos que tengan el mismo tipo de datp*/
        const keys = Object.keys(body)
        for (const key of keys) {
            if (!(key in userModel) || (typeof(userModel[key]) !== typeof(body[key]))) return false;
        }
        return true


    }
    static create(body){
        if(!this.#verifyBody(body)) throw new Error("Verifica tus datos")
        const userCreated = {...body}
        const userId = crypto.randomUUID()
        userCreated.user_id = userId;
        /* Procedemos a guardar */
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        /* Procemos a verificar si el usuario existe */
        if(users.some(element=> element.email == userCreated.email)) throw new Error("Usuario ya existe")
        users.push(userCreated)
        localStorage.setItem('users',JSON.stringify(users))
    }

    static findOne(queryObj){
        /* Verificamos la estructura de query object */
        /* Predicate where */
        if(!queryObj.where) throw new Error("Verifica tu query")
        const userCreated = {...queryObj.where}
        /* Antes de hacer la consulta verificamos la data a consultar  */
        if(!this.#verifyUserExists(userCreated)) throw new Error("Verifica tus datos")
        /* Consultamos a la "base de datos"(localStorage) */
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        let userFinded = users.find(element=>{
            const keys = Object.keys(userCreated)
            for (const key of keys) {
                if (element[key] !== userCreated[key]) return false;
            }
            return true
        } )
        userFinded = userFinded  ? userFinded : null 
        return userFinded
    }

    static findAll(queryObj){
        /* Verificamos si tiene o no un queryObj */
        if(!queryObj){
            /* Caso no encontramos el predicate debemos devolver todo los registros */
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            return users
        }
        if(!queryObj.where) throw new Error("Verifica tu query")
        /* Caso exista el predicate verificaremos el predicate */
        if(!this.#verifyUserExists(queryObj.where)) throw new Error("Verifica tus datos")
        /* Consultamos a la base de datos (localStorage)*/
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const usersFinded = users.filter(element => {
            const keys = Object.keys(queryObj.where);
            let elementFinded = true;
            for (const key of keys) {
                if (element[key] !== queryObj.where[key]) {
                    elementFinded = false;
                    break;
                }
            }
            return elementFinded; 
        });
        return usersFinded
    }

    

}
export default UsersModel