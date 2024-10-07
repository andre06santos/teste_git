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

function criandoTitulo(){
    const tituloElement = document.getElementById("titulo")
    tituloElement.innerText = "RESULTADO :"
}

function erroGenerico(elementoEscolhido) {
    const erroElement = document.getElementById(`erro_${elementoEscolhido}`);
    erroElement.innerText = `${elementoEscolhido} INVÁLIDO(A)`.toUpperCase();
}

function resultadoGenerico(event, tipoResultado, elementoEscolhido, idElement, validacaoGenerica) {
    event.preventDefault(); 
    const valor = document.getElementById(elementoEscolhido).value;
    const resultadoElement = document.getElementById(idElement);
    const erroElement = document.getElementById(`erro_${elementoEscolhido}`);

    resultadoElement.innerText = ''; 

    if (validacaoGenerica(valor)) {
        resultadoElement.innerText = `${tipoResultado}: ${valor}`.toUpperCase();
        erroElement.innerText = ''; 
    } else {
        erroGenerico(elementoEscolhido);
    }
}

function resultadoCorPele() {
    const resultadoCorPele = document.getElementById("corPele").value;
    const resultElement = document.getElementById("resultadoCorPele");
    const corPele = resultadoCorPele === "BR" ? "BRANCO" : 
                    resultadoCorPele === "NG" ? "NEGRO" : "PARDO";
    resultElement.innerText = `|COR DA PELE: ${corPele}`;
}

const formulario = document.getElementById('formulario');
formulario.addEventListener('submit', function(event) {
    event.preventDefault(); 

    resultadoGenerico(event, "|CPF", "cpf", "resultadoCpf", validarCpf);
    resultadoGenerico(event, "|NOME", "nome", "resultadoNome", validarNome);
    resultadoGenerico(event, "|IDADE", "idade", "resultadoIdade", validarIdade);
    resultadoGenerico(event, "|ALTURA", "altura", "resultadoAltura", validarAltura);
    resultadoCorPele();
    criandoTitulo(); 
});
