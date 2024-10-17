const cpfMask = (event) => {
    const cpfInput = event.target;
    cpfInput.value = cpfInput.value.replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{2})$/, '-$1');
};

const handleHeightInput = (event) => {
    const heightInput = event.target;
    heightInput.value = heightInput.value.replace(/\D/g, "")
        .replace(/(\d{1})(\d)/, '$1,$2');
};

const handleAgeInput = (event) => {
    const ageInput = event.target;
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
    const existingToast = document.querySelector(".toast");
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('span');
    toast.innerText = message;

    switch (type) {
        case "success":
            toast.className = "toast toast-success";
            break;
        case "error":
            toast.className = "toast toast-error";
            break;
        default:
            return;
    }

    const timeToast = 3 * 1000;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, timeToast);
};

const errorMessage = ({ errors, cpf, name, age, height}) => {
    if (!validateCPF(cpf)) errors.push("CPF INVÁLIDO");
    if (!validateName(name)) errors.push("NOME INVÁLIDO");
    if (!validateAge(age)) errors.push("IDADE INVÁLIDA");
    if (!validateHeight(height)) errors.push("ALTURA INVÁLIDA");
};

const showData = ({ cpf, nome, idade, altura, corPele }) => {
    const cpfValue = cpf.value;
    const nameValue = nome.value;
    const ageValue = Number(idade.value);
    const heightValue = Number(altura.value);
    const skinColorValue = getColorByValue(corPele.value);

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
        message: "TODOS OS DADOS FORAM VÁLIDADOS",
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
