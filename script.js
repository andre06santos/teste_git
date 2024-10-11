const cpf = document.getElementById('cpf')
const nome = document.getElementById('nome')
const altura = document.getElementById('altura')
const idade = document.getElementById('idade')
let errorMessages = []


addEventListener("submit", (e) => {
    e.preventDefault()
    isValidForm() ? createDataList() : showErrorMessages()
    cleanInputs()
    errorMessages = []

    
})


const validateCpf = () => {
    return cpf.value.length == 11
}

const validateNome = () => {
    return nome.value.length > 0
}

const validateAltura = () => {
    return altura.value > 0
}

const validateIdade = () => {
    return idade.value > 0
}

const validateCor = () => {
    const select = document.querySelector('#corPele')
    let listaCores = []
    for (let i = 0; i < select.options.length; i++){
        listaCores.push(select.options[i].value)
    }
    let corSelecionada = document.getElementById('corPele').value
    let corValida = listaCores.includes(corSelecionada)

    if (corValida){
        return true
    } else{
        createErrorMessages(corSelecionada)
    }
    return corValida
}

const createErrorMessages = () => {
    if (!validateCpf()){
        errorMessages.push('CPF inválido')
    } 
    if (!validateNome()){
        errorMessages.push('Nome inválido')
    } 
    if (!validateAltura()){
        errorMessages.push('Altura inválida')
    } 
    if (!validateIdade()){
        errorMessages.push('Idade inválida')
    } 
    if (!validateCor()){
        errorMessages.push('Cor inválida')
    }
    
}

const showErrorMessages = () => {
    if (isValidForm()){
        return
    }
    createErrorMessages()
    let text = ''
    for (let error of errorMessages){
        text += error + '\n'
    }
    alert(text)
}

const createDataList = () => {
    let container = document.getElementById("showForm")
    let list = document.createElement('ul')
    container.appendChild(list)

    let elementos = []
    
    validateCpf() ? elementos.push("CPF: " + document.getElementById('cpf').value) : null
    validateNome() ? elementos.push("Nome: " + document.getElementById('nome').value) : null
    validateIdade() ? elementos.push("Idade: " + document.getElementById('idade').value) : null
    validateAltura() ? elementos.push("Altura: " + document.getElementById('altura').value) : null
    let select = document.getElementById('corPele')
    validateCor() ? elementos.push("Cor da pele: " + select.options[select.selectedIndex].text) : null

    if (isValidForm()){
        for (let elemento of elementos){
            let li = document.createElement('li')
            li.innerText = elemento
            list.appendChild(li)
        }
    }

}

const isValidForm = () => {
    return validateAltura() && validateCor() && validateCpf() && validateCpf() && validateIdade() && validateNome()
}

const cleanInputs = () => {
    cpf.value = ''
    nome.value = ''
    idade.value = ''
    altura.value = ''
}