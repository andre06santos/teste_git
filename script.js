const cpfMask = () =>{
    const cpfInput = document.querySelector("#cpf")

    cpfInput.addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '')               
            .replace(/(\d{3})(\d)/, '$1.$2')                         
            .replace(/(\d{3})(\d)/, '$1.$2')                       
            .replace(/(\d{2})$/, '-$1');                             
    });
}
const handleHeightInput = () =>{
    const heightInput = document.querySelector("#altura")

    heightInput.addEventListener('input',  function(){
        this.value = this.value.replace(/\D/g,"")
        .replace(/(\d{1})(\d)/, '$1,$2')                         
    })
}
const handleAgeInput = () => {
    const ageInput = document.querySelector("#idade");
    ageInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, ''); 
    });
}
const validateCPF = (cpf) => {
    const cpfNumber = cpf.replace(/\D/g, '');

    const isValidCPF = cpfNumber.length === 11

    return isValidCPF
}
const validateName = (name) => {
    const isValidName = name.trim() !== ""

    return isValidName
}
const validateAge = (age) => {
    const isValidAge = Number.isInteger(age) && age >=0 && age <= 120;

    return isValidAge
}
const validateHeigth = (heigth) => {
    const isValidHeigth  = heigth > 0 && heigth < 3
    
    return isValidHeigth
}
const validateSkinColor = (skinColor) => {
    const isValidSkinColor = skinColor !== undefined
    return isValidSkinColor
}

const skinColorConvert = (skinColorData) => {
    const skinColorObject = {
        "BR": "Branco",
        "NG": "Negro",
        "PD": "Pardo"
    };
    const skinColor = skinColorObject[skinColorData];
    return skinColor;
}
const showToast = (message,styleToast) =>{

    const toast = document.createElement('span')
    toast.innerText = message
    toast.className = styleToast

    const timeToast = 3 * 1000


    document.body.appendChild(toast)

    setTimeout(() => {
        toast.remove()
    },timeToast)

}
const erroMessage = ({errors,cpf,name,age,height,skinColor}) =>{
    if(!validateCPF(cpf))errors.push("CPF INVÁLIDO")
    
    if(!validateName(name))errors.push("NOME INVÁLIDO")
    
    if(!validateAge(age))errors.push("IDADE INVÁLIDA")
    
    if(!validateheight(height))errors.push("ALTURA INVÁLIDA")

    if(!validateSkinColor(skinColor))errors.push("COR DA PELE INVÁLIDA")
}

const showData = () => {
    const form = document.querySelector("form");
    const cpf = form.querySelector("#cpf");
    const name = form.querySelector("#nome");
    const age = form.querySelector("#idade");
    const height = form.querySelector("#altura");
    const skinColor = form.querySelector("#corPele");

    const cpfValue = cpf.value;
    const nameValue = name.value;
    const ageValue = Number(age.value);
    const heightValue = Number(height.value);
    const skinColorValue = skinColorConvert(skinColor.value);


    const userData = {
        errors : [],
        cpf  : cpfValue,
        name : nameValue,
        age  : ageValue,
        height : heightValue,
        skinColor : skinColorValue
    };

    erroMessage(userData)


    const errorsLength = userData.errors.length;
    console.log(userData.errors.length)
    errorsLength !== 0 ? showToast(userData.errors[0],"toast-erro") : showToast("CADASTRADO COM SUCESSO !!!")

}

const form = document.querySelector(".form")
const cpf = document.querySelector("#cpf")
const age = document.querySelector("#idade")
const height = document.querySelector("#altura")

form.addEventListener("submit", function (event) {
    event.preventDefault()
    showData()
})

cpf.addEventListener("input",cpfMask)

age.addEventListener("input",handleAgeInput)

height.addEventListener("input",handleHeightInput)

