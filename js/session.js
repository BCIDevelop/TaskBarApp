const form=document.querySelector('.form-container')
const inputs=document.querySelectorAll('.input-container__input')
const label=document.querySelectorAll('label')  
const errorIcon=document.querySelectorAll('.material-symbols-outlined')
const errorText=document.querySelectorAll('.text-error')
const passwordEye =document.getElementsByClassName('input_containar__password--active')
const passwordEyeDisabled = document.getElementsByClassName('input_containar__password--disable')
const toast = document.querySelector('.main-container__wrapper')
import users_model from '../models/users.js'


function invalidEffect(index){
    if(label[index].classList.contains('invalid')){
        label[index].classList.remove('invalid')
        label[index].offsetWidth
        label[index].classList.add('invalid')
    } else label[index].classList.add('invalid')
    errorIcon[index].style.display='block'
    errorText[index].style.display='flex'
}
form.onsubmit=(e)=>{
    e.preventDefault()
    for(let i=0;i<e.srcElement.children.length-1;i++){  
       if( !e.srcElement[i].validity.valid){
         invalidEffect(i)
         return
       }
    }
    const userData=[]
    inputs.forEach((element)=>{
        userData.push(element.value)
    })
    /* Buscamos el usuario en la base datos(localStorage) */
    try {
        const record = users_model.findOne({
            where:{
                email: userData[0]
            }
        })
        if(!record) throw new Error("No existe el usuario")
        /* Si el usuario existe procedemos a verificar su password*/    
        if(record.password !== userData[1]) throw new Error("Clave incorrecta");
        /* Enviamos al cliente lo necesario */
        let {email,picture,user_id,...rest} = record
        if(!picture) picture = null
        const loggedUser = {email,picture,user_id}
        /*Finalmente procedemos a loguearlo para eso guardaremos en registro en localStorage */
        localStorage.setItem('user',JSON.stringify(loggedUser))
        window.location = 'home.html'

    } catch (error) {
        toast.style.display='block'
        const alerText =document.querySelector('.alert__description')
        alerText.innerHTML = error
        console.log(`Error: ${error}`)
        setTimeout(()=>{    
            toast.style.display='none'
        },2500)
    }
}
inputs.forEach((elements,index)=>{
    // Evento para cuando cambia el valor del input
    elements.addEventListener('change',(e)=>{
        if (!e.target.validity.valid) {
          invalidEffect(index)  
        }else {
            label[index].classList.remove('invalid')
            if(index==0){
                errorIcon[index].style.display='none'
                errorText[index].style.display='none'
            }
            
        }    
        if(e.target.value!=''){
            elements.classList.add('animation-input')
        }else  elements.classList.remove('animation-input')
    })
})

passwordEye[0].addEventListener('click',()=>{
    
    passwordEyeDisabled[0].style.display = 'block'
    passwordEye[0].style.display='none'
    const inputPassword = inputs[1]
    inputPassword.setAttribute('type','text')
})
passwordEyeDisabled[0].addEventListener('click',()=>{
    passwordEye[0].style.display = 'block'
    passwordEyeDisabled[0].style.display='none'
    const inputPassword = inputs[1]
    inputPassword.setAttribute('type','password')
})