function validarCpf(cpf) {
    const cpfLimpo = cpf.replace(/\D/g, '');
    return cpfLimpo.length === 11;
}

function validarNome(nome) {
    return nome.trim() !== "" && isNaN(parseFloat(nome));
}

function validarIdade(idade) {
    const idadeNumerica = parseInt(idade, 10); 
    return idadeNumerica >= 18;
}

function validarAltura(altura) {
    const alturaNumerica = parseFloat(altura); 
    return (alturaNumerica > 0 && alturaNumerica < 2.5);
}

function criarTitulo(){
    const tituloElement = document.getElementById("titulo")
    tituloElement.innerText = "RESULTADO :"
}

function mostrarErro(elementoEscolhido) {
    const erroElement = document.getElementById(`${elementoEscolhido}Erro`);
    erroElement.innerText = `${elementoEscolhido} INVÁLIDO(A)`.toUpperCase();
}

function validarCampo(tipoResultado, elementoEscolhido, idElement, validacaoGenerica) {
    const valor = document.getElementById(elementoEscolhido).value;
    const resultadoElement = document.getElementById(idElement);
    const erroElement = document.getElementById(`${elementoEscolhido}Erro`);

    resultadoElement.innerText = ''; 

    if (validacaoGenerica(valor)) {
        resultadoElement.innerText = `${tipoResultado}: ${valor}`.toUpperCase();
        erroElement.innerText = ''; 
    } else {
        mostrarErro(elementoEscolhido);
    }
}

function validarCorPele() {
    const resultadoCorPele = document.getElementById("corPele").value;
    const resultElement = document.getElementById("resultadoCorPele");
    const corPele = resultadoCorPele === "BR" ? "BRANCO" : 
                    resultadoCorPele === "NG" ? "NEGRO" : "PARDO";
    resultElement.innerText = `|COR DA PELE: ${corPele}`;
}

const formulario = document.getElementById('formulario');
formulario.addEventListener('submit', function(event) {
    event.preventDefault(); 
    criarTitulo(); 
    validarCampo("|CPF", "cpf", "resultadoCpf", validarCpf);
    validarCampo("|NOME", "nome", "resultadoNome", validarNome);
    validarCampo("|IDADE", "idade", "resultadoIdade", validarIdade);
    validarCampo("|ALTURA", "altura", "resultadoAltura", validarAltura);
    validarCorPele();
});
