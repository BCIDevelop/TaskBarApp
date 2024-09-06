const toast = document.querySelector('.main-container__wrapper')
const form=document.querySelector('.form-container')
const inputs=document.querySelectorAll('.input-container__input')
const label=document.querySelectorAll('label')  
const errorIcon=document.querySelectorAll('.material-symbols-outlined')
const errorText=document.querySelectorAll('.text-error')

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
form.onsubmit=(e)=>{
    e.preventDefault()
    for(let i=0;i<e.srcElement.children.length-1;i++){  
       if( !e.srcElement[i].validity.valid){
         invalidEffect(i)
         return
       }
    }
    const alerText =document.querySelector('.alert__description')
    alerText.innerHTML = 'Se mando correo satisfactoriamente'
    toast.style.display='block'
    setTimeout(()=>{
        toast.style.display='none'
    },2500)
}