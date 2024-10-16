const processarDados = (e) => {
    e.preventDefault()
    
    const cpfInput = document.getElementById('cpf')
    const nomeInput = document.getElementById('nome')
    const alturaInput = document.getElementById('altura')
    const idadeInput = document.getElementById('idade')
    const corInput = document.querySelector('#corPele')
    
    const inputs = [cpfInput, nomeInput, idadeInput, alturaInput, corInput]
    const inputsNames = ['Cpf', 'Nome', 'Idade', 'Altura', 'Cor da pele']
    const validationFunctions = [validateCpf, validateNome, validateIdade, validateAltura, validateCor]

    let errorMessages = createErrorMessages(inputs, inputsNames, validationFunctions)
    
    isValidForm(errorMessages) ? createDataList(inputs, inputsNames) : showErrorMessages(errorMessages)
    cleanInputs()
}

addEventListener("submit", processarDados)

const acceptOnlyNumbers = (e) => {
    containsOnlyLetters(e.target.value) && showToast("Digite apenas numeros!")
    e.target.value = e.target.value.replace(/\D/g, '')
}

const acceptOnlyText = (e) => {
    containsOnlyNumbers(e.target.value) && showToast("Digite apenas letras!")
    e.target.value = e.target.value.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ\s]/g, '')
}

document.getElementById('cpf').addEventListener('input', acceptOnlyNumbers)
document.getElementById('nome').addEventListener('input', acceptOnlyText)
document.getElementById('altura').addEventListener('input', acceptOnlyNumbers)
document.getElementById('idade') .addEventListener('input', acceptOnlyNumbers)


const showToast = (message) => {
    const toast = document.createElement('p')
    toast.innerText = message
    toast.className = 'toast'

    const time = 3000

    const hasToast = document.querySelector('.toast') !== null

    if (! hasToast){
        document.body.appendChild(toast)
    }

    setTimeout(() => {
        toast.remove()
    }, time)

}


const validateCpf = (cpfValue) => {
    const isLengthValid = cpfValue.length == 11 
    const isTypeValid  = containsOnlyNumbers(cpfValue)
    const isValidCpf = isLengthValid && isTypeValid
    return isValidCpf
}

const validateNome = (nomeValue) => {
    const isLengthValid = nomeValue.length > 0
    const isTypeValid = containsOnlyLetters(nomeValue) 
    const isValidNome = isLengthValid && isTypeValid
    return isValidNome
}

const validateAltura = (alturaValue) => {
    const isLengthValid = alturaValue > 0
    const isTypeValid  = containsOnlyNumbers(alturaValue)
    const isValidAltura = isLengthValid && isTypeValid
    return isValidAltura
}

const validateIdade = (idadeValue) => {
    const isLengthValid = idadeValue > 0
    const isTypeValid  = containsOnlyNumbers(idadeValue)
    const isValidIdade = isLengthValid && isTypeValid
    return isValidIdade
}

const validateCor = (corValue) => {
    const validColors = ['BR', 'PD', 'NG']
    const isValidCor = validColors.includes(corValue)
    return isValidCor
}


const createErrorMessages = (inputs, inputsNames, validationFunctions) => {
    let errorMessages = []
    
    for (let i = 0; i < inputs.length; i++){
        const actualValidationFunction = validationFunctions[i]
        const actualInput = inputs[i]

        if (!actualValidationFunction(actualInput.value)){
            errorMessages.push(`Campo de ${inputsNames[i]} com dados inválidos!`)
        }
    }
    
    return errorMessages
}

const showErrorMessages = (errorMessages) => {
    alert(errorMessages[0])
}

const createDataList = (inputs, inputsNames) => {
    const container = document.getElementById("showForm")
    const list = document.createElement('ul')
    
    if (container){
        const elementos = []
        
        for (let i = 0; i < inputs.length; i++){
            const actualInput = inputs[i]
            const actualInputName = inputsNames[i]
            const SKIN_COLOR = "Cor da pele"
            if (actualInputName !== SKIN_COLOR){
                elementos.push(`${actualInputName}: ` + actualInput.value)
            }
            else{
                const selectInput = document.getElementById('corPele')
                const corSelecionada = selectInput.options[selectInput.selectedIndex].text
                elementos.push(SKIN_COLOR + ": " + corSelecionada)
            }
        } 
        
        for (let elemento of elementos){
            let li = document.createElement('li')
            li.innerText = elemento
            list.appendChild(li)
        }
        
        container.appendChild(list)
    }

    document.body.appendChild(container)

}

const isValidForm = (errorMessages) => {
    return errorMessages.length == 0
}

const cleanInputs = () => {
    const form = document.getElementById('myForm')
    form.reset()
}


const containsOnlyNumbers = (str) => {
    return /[^a-zA-ZÀ-ÖØ-öø-ÿ\s]/g.test(str)
}

const containsOnlyLetters = (str) => {
    return /\D/g.test(str)
}
