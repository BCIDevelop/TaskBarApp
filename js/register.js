const form=document.querySelector('.form-container')
const inputs=document.querySelectorAll('.input-container__input')
const label=document.querySelectorAll('label')  
const errorIcon=document.querySelectorAll('.material-symbols-outlined')
const errorText=document.querySelectorAll('.text-error')
const passwordEye =document.querySelectorAll('.input_containar__password--active')
const passwordEyeDisabled = document.querySelectorAll('.input_containar__password--disable')
const toast = document.querySelector('.main-container__wrapper')

import users_model from '../models/users.js'

function invalidEffect(index){
    if(label[index].classList.contains('invalid')){
        label[index].classList.remove('invalid')
        label[index].offsetWidth
        label[index].classList.add('invalid')
    } else label[index].classList.add('invalid')
    if(index === 0){
        errorIcon[index].style.display='block'
    }
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
    /* Verify password */
    if(userData[1]!=userData[2]) {
        invalidEffect(2)
        return
    }
    /* Creamos el usuario */
    const userCreated = {email:userData[0],password:userData[1]}
    /* Accedemos a la "Base de datos(localStorage)" */
    try {
        users_model.create(userCreated)
        window.location = 'login.html'
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

passwordEye.forEach((element,index)=>{
        element.addEventListener('click',()=>{
        passwordEyeDisabled[index].style.display = 'block'
        passwordEye[index].style.display='none'
        const inputPassword = inputs[index+1]
        inputPassword.setAttribute('type','text')
    })
})
    
passwordEyeDisabled.forEach((element, index)=>{
        element.addEventListener('click',()=>{
        passwordEye[index].style.display = 'block'
        passwordEyeDisabled[index].style.display='none'
        const inputPassword = inputs[index+1]
        inputPassword.setAttribute('type','password')
    })
})