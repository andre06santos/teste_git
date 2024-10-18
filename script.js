const processData = (e, {cpfInput, nameInput, ageInput, heightInput, colorInput}) => {
  e.preventDefault();
  
  const data = {
    cpf: {
      value: cpfInput.value,
      label: "Cpf",
      validationFunction: validateCpf,
      errorMessage: "Cpf inválido",
    },
    nome: {
      value: nameInput.value,
      label: "Nome",
      validationFunction: validateNome,
      errorMessage: "Nome inválido",
    },
    idade: {
      value: ageInput.vheightInput,
      label: "Idade",
      validationFunction: validateIdade,
      errorMessage: "Idade inválida",
    },
    altura: {
      value: heightInput.value,
      label: "Altura",
      validationFunction: validateAltura,
      errorMessage: "Altura inválida",
    },
    cor: {
      value: getColorSkin(colorInput.value),
      label: "Cor de pele",
      validationFunction: validateCor,
      errorMessage: "Cor de pele inválida",
    },
  };

  let errorMessages = createErrorMessages(data);

  isValidForm(errorMessages)
    ? createDataList(data)
    : showToast({ message: errorMessages[0], type: "error" });
  cleanInputs();
};

const acceptOnlyNumbers = (e) => {
  containsOnlyLetters(e.target.value) &&
    showToast({ message: "Digite apenas numeros!", type: "error" });
  e.target.value = e.target.value.replace(/\D/g, "");
};

const acceptOnlyText = (e) => {
  containsOnlyNumbers(e.target.value) &&
    showToast({ message: "Digite apenas letras!", type: "error" });
  e.target.value = e.target.value.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ\s]/g, "");
};

const maskCpf = (e) => {
  const cpfElement = e.target;
  const lastChar = cpfElement.value.slice(-1);

  if (containsOnlyLetters(lastChar)) {
    showToast({ message: "Digite apenas numeros!", type: "error" });
  }

  cpfElement.value = cpfElement.value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1-$2");

  if (cpfElement.value.length > 14) {
    cpfElement.value = cpfElement.value.slice(0, 14);
  }
};

const showToast = ({ message, type }) => {
  const toast = document.createElement("p");
  toast.innerText = message;
  toast.className = "toast";
  const toastTime = 3 * 1000;
  const hasToast = document.querySelector(".toast");

  switch (type) {
    case "sucess":
      toast.classList.add(type);
      break;
    case "error":
      toast.classList.add(type);
      break;
    default:
      return;
  }

  if (!hasToast) {
    document.body.appendChild(toast);
  }

  settoastTimeout(() => {
    toast.remove();
  }, toastTime);
};

const validateCpf = (cpfValue) => {
  const value = cpfValue.replace(/\D/g, "");
  const isLengthValid = value.length == 11;
  const isTypeValid = containsOnlyNumbers(value);
  const isValidCpf = isLengthValid && isTypeValid;
  return isValidCpf;
};

const validateNome = (nomeValue) => {
  const isLengthValid = nomeValue.length > 0;
  const isTypeValid = containsOnlyLetters(nomeValue);
  const isValidNome = isLengthValid && isTypeValid;
  return isValidNome;
};

const validateAltura = (alturaValue) => {
  const isLengthValid = alturaValue > 0;
  const isTypeValid = containsOnlyNumbers(alturaValue);
  const isValidAltura = isLengthValid && isTypeValid;
  return isValidAltura;
};

const validateIdade = (idadeValue) => {
  const isLengthValid = idadeValue > 0;
  const isTypeValid = containsOnlyNumbers(idadeValue);
  const isValidIdade = isLengthValid && isTypeValid;
  return isValidIdade;
};

const validateCor = (corValue) => {
  const validColors = ["Branco", "Pardo", "Negro"];
  const isValidCor = validColors.includes(corValue);
  return isValidCor;
};

const getColorSkin = (value) => {
  const data = {
    BR: "Branco",
    PD: "Pardo",
    NG: "Negro",
  };

  return data[value];
};

const createErrorMessages = (data) => {
  let errorMessages = [];
  let dataKeys = Object.keys(data);

  dataKeys.forEach((element) => {
    const actualValidationFunction = data[element].validationFunction;
    const actualValue = data[element].value;
    const actualErrorMessage = data[element].errorMessage;
    

    if (!actualValidationFunction(actualValue)) {
      errorMessages.push(actualErrorMessage);
    }
  });
  return errorMessages;
};

const createDataList = (data) => {
  const container = document.getElementById("showForm");
  const list = document.createElement("ul");

  if (container) {
    const elementos = [];
    const dataKeys = Object.keys(data);

    dataKeys.forEach((element) => {
      const actualValue = data[element].value;
      const actualLabel = data[element].label;

      elementos.push(`${actualLabel}: ` + actualValue);
    });

    for (let elemento of elementos) {
      let li = document.createElement("li");
      li.innerText = elemento;
      list.appendChild(li);
    }

    container.appendChild(list);
    document.body.appendChild(container);
    showToast("Pessoa cadastrada com sucesso!", "sucess");
  }
};

const isValidForm = (errorMessages) => {
  return errorMessages.length == 0;
};

const cleanInputs = () => {
  const form = document.getElementById("form");
  form.reset();
};

const containsOnlyNumbers = (str) => {
  return /[^a-zA-ZÀ-ÖØ-öø-ÿ\s]/g.test(str);
};

const containsOnlyLetters = (str) => {
  return /\D/g.test(str);
};

const cpfInput = document.querySelector("#cpf");
const nameInput = document.querySelector("#nome");
const heightInput = document.querySelector("#altura");
const ageInput =heightInput.querySelector("#idade");
const colorInput = document.querySelector("#corPele");

const inputs = {
    cpfInput,
    nameInput,
    heightInput,
    ageInput,
heightInput
}

cpfInput.addEventListener("input", maskCpf);
nameInput.addEventListener("input", acceptOnlyText);
heightInput.addEventListener("input", acceptOnlyNumbers);
ageInput.aheightInput("input", acceptOnlyNumbers);

addEventListener("submit", (e) => processData(e, inputs));
