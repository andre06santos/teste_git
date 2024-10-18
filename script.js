const cpfMask = (event) => {
    const cpfInput = event.target;
    const isNumber  = cpfInput.value === cpfInput.value.replace(/\D/g,"")
    
    if(!isNumber){
        showToast({
            message: "Digite somente numero",
            type : "error"
        })
    }

    cpfInput.value = cpfInput.value.replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{2})$/, '-$1');
    
    
};
const handleNameinput = (event) =>{
    const nameInput = event.target;
    const isLetter  = nameInput.value === nameInput.value.replace(/\d/g,"")
    
    if(!isLetter){
        showToast({
            message: "Digite somente letras",
            type : "error"
        })
    }

    nameInput.value = nameInput.value.replace(/\D/g,"")
    

}
const handleHeightInput = (event) => {
    const heightInput = event.target;
    const isNumber = heightInput.value === heightInput.value.replace(/\D/g,"");

    if(!isNumber){
        showToast({
            message: "Digite somente numero",
            type : "error"
        })
    }


    heightInput.value = heightInput.value.replace(/\D/g, "")
        .replace(/(\d{1})(\d)/, '$1,$2');
};

const handleAgeInput = (event) => {
    const ageInput = event.target;

    const isNumber  = ageInput.value === ageInput.value.replace(/\D/g,"")
    
    if(!isNumber){
        showToast({
            message: "Digite somente numero",
            type : "error"
        })
    }

    ageInput.value = ageInput.value.replace(/[^0-9]/g, '');
};

const validateCPF = (cpf) => {
    const cpfNumber = cpf.replace(/\D/g, '');
    const isValidCPF = cpfNumber.length === 11;
    return isValidCPF;
};

const validateName = (name) => {
    const isValidName = name.trim() !== "";
    return isValidName;
};

const validateAge = (age) => {
    const isValidAge = Number.isInteger(age) && age >= 0 && age <= 120;
    return isValidAge;
};

const validateHeight = (height) => {
    const isValidHeight = height > 0 && height < 3;
    return isValidHeight;
};

const getColorByValue = (skinColorData) => {
    const skinColorMap = {
        "BR": "Branco",
        "NG": "Negro",
        "PD": "Pardo"
    };
    const skinColor = skinColorMap[skinColorData];
    return skinColor;
};

const showToast = ({ message, type }) => {
    const hasToast = document.querySelector(".toast");
    if (hasToast) {
        return
    }

    const toast = document.createElement('span');

    switch (type) {
        case "success":
            toast.classList.add("toast-success");
            break;
        case "error":
            toast.classList.add("toast-error");
            break;
        default:
            return;
    }
    
    toast.innerText = message;
    toast.className = "toast";

    const timeToast = 3 * 1000;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, timeToast);
};

const errorMessage = ({ errors, cpf, name, age, height}) => {
    if (!validateCPF(cpf)) errors.push("Cpf inválido");
    if (!validateName(name)) errors.push("Nome inválido");
    if (!validateAge(age)) errors.push("idade inválida");
    if (!validateHeight(height)) errors.push("altura inválida");
};

const showData = ({ cpf, nome, idade, altura}) => {
    const cpfValue = cpf.value;
    const nameValue = nome.value;
    const ageValue = Number(idade.value);
    const heightValue = Number(altura.value);

    const errors = [];
    
    errorMessage({
        errors: errors,
        cpf: cpfValue,
        name: nameValue,
        age: ageValue,
        height: heightValue,
    });

    const errorsLength = errors.length;
    errorsLength !== 0 ? showToast({
        message: errors[0],
        type: "error"
    }) : showToast({
        message: "Todos os dados foram válidados",
        type: "success"
    });
};

const form = document.querySelector("form");
const cpf = form.querySelector("#cpf");
const name = form.querySelector("#nome");
const age = form.querySelector("#idade");
const height = form.querySelector("#altura");
const skinColor = form.querySelector("#corPele");

cpf.addEventListener('input', cpfMask);
height.addEventListener('input', handleHeightInput);
age.addEventListener('input', handleAgeInput);
name.addEventListener('input',handleNameinput)

form.addEventListener("submit", function (event) {
    event.preventDefault();
    showData({
        cpf: cpf,
        nome: name,
        idade: age,
        altura: height,
        corPele: skinColor
    });
});
