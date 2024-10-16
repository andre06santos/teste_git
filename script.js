// const cpfInput = document.getElementById('cpf')
// const nomeInput = document.getElementById('nome')
// const alturaInput = document.getElementById('altura')
// const idadeInput = document.getElementById('idade')
let errorMessages = []



const processarDados = (e) => {
    e.preventDefault()

    const cpfInput = document.getElementById('cpf')
    const nomeInput = document.getElementById('nome')
    const idadeInput = document.getElementById('idade') 
    const alturaInput = document.getElementById('altura')
    const colorSelect = document.querySelector('#corPele')
    
    
    const inputs = [cpfInput, nomeInput, idadeInput, alturaInput, colorSelect]
    const inputsNames = ['Cpf', 'Nome', 'Idade', 'Altura', 'Cor de pele']
    
    createErrorMessages(inputs, validationFunctions(), inputsNames)

    isValidForm() ? createDataList(inputs, inputsNames) : showErrorMessages()
    cleanInputs()
    errorMessages = []
}

addEventListener("submit", processarDados)

const acceptOnlyNumbers = (e) => {
    e.target.value = e.target.value.replace(/\D/g, '')
}

const acceptOnlyText = (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ\s]/g, '')
}


document.getElementById('cpf').addEventListener('input', acceptOnlyNumbers)
document.getElementById('nome').addEventListener('input', acceptOnlyText)
document.getElementById('idade') .addEventListener('input', acceptOnlyNumbers)
document.getElementById('altura').addEventListener('input', acceptOnlyNumbers)


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

const validateCor = () => {
    const colorSelect = document.querySelector('#corPele')
    const listaCores = []
    for (let i = 0; i < colorSelect.options.length; i++){
        listaCores.push(colorSelect.options[i].value)
    }
    const corSelecionada = colorSelect.value
    const corValida = listaCores.includes(corSelecionada)

    if (corValida){
        return true
    } else{
        createErrorMessages(corSelecionada)
    }
    return corValida
}

const createErrorMessages = (inputs, validationFunctions, inputsNames) => {

    for (let i = 0; i < inputs.length; i++){
        const actualValidationFunction = validationFunctions[i]
        const actualInput = inputs[i]

        if (actualInput !== 'Cor de pele')

            if (!actualValidationFunction(actualInput.value)){
                errorMessages.push(`Campo de ${inputsNames[i]} com dados inválidos!`)
            }
        else{
            validateCor()
        }
    }


    // if (!validateCpf(cpfInput.value)){
    //     errorMessages.push('CPF inválido')
    // } 
    // if (!validateNome(nomeInput.value)){
    //     errorMessages.push('Nome inválido')
    // } 
    // if (!validateAltura(alturaInput.value)){
    //     errorMessages.push('Altura inválida')
    // } 
    // if (!validateIdade(idadeInput.value)){
    //     errorMessages.push('Idade inválida')
    // } 
    // if (!validateCor()){
    //     errorMessages.push('Cor inválida')
    // }
    
}

const showErrorMessages = () => {
    if (isValidForm()){
        return
    }
    // createErrorMessages()
    let text = ''
    for (let error of errorMessages){
        text += error + '\n'
    }
    alert(text)
}

const createDataList = (inputs, inputsNames) => {
    const container = document.getElementById("showForm")
    const list = document.createElement('ul')
    
    if (container != null){
        container.appendChild(list)
        
        const elementos = []

        for (let i = 0; i < inputs.length; i++){
            const actualInput = inputs[i]
            const actualInputName = inputsNames[i]
            if (actualInputName !== 'Cor de pele'){
                elementos.push(`${actualInputName}: ` + actualInput.value)
            }
            else{
                const selectInput = document.getElementById('corPele')
                elementos.push("Cor da pele: " + selectInput.options[selectInput.selectedIndex].text)
            }
        }
        
        // validateCpf(cpfInput.value) ? elementos.push("CPF: " + cpfInput.value) : null
        // validateNome(nomeInput.value) ? elementos.push("Nome: " + nomeInput.value) : null
        // validateIdade(idadeInput.value) ? elementos.push("Idade: " + idadeInput.value) : null
        // validateAltura(alturaInput.value) ? elementos.push("Altura: " + alturaInput.value) : null
        // const selectInput = document.getElementById('corPele')
        // validateCor() ? elementos.push("Cor da pele: " + selectInput.options[selectInput.selectedIndex].text) : null
    

        for (let elemento of elementos){
            let li = document.createElement('li')
            li.innerText = elemento
            list.appendChild(li)
        }
        

    }


}

const isValidForm = () => {
    return errorMessages.length == 0
}

const cleanInputs = () => {
    cpf.value = ''
    nome.value = ''
    idade.value = ''
    altura.value = ''
}



const containsOnlyNumbers = (str) => {
    return /^\d+$/.test(str)
}

const containsOnlyLetters = (str) => {
    return /^\D+$/.test(str)
}


const validationFunctions = () => {
    return [validateCpf, validateNome, validateIdade, validateAltura, validateCor]
}
