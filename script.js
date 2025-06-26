//Quando a pagina recarregar/ busca as marcar
document.addEventListener("DOMContentLoaded", async function(){
    const marcaSelect = document.getElementById("marca");

    try{
        const response = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas`);
        const marcas = await response.json();


        marcas.forEach(marca =>{
            const option = document.createElement("option");
            option.value = marca.codigo; //Usa codigo da marca
            option.text = marca.nome; // Mostra o nome da marca
            marcaSelect.appendChild(option);
        });   
    }    catch(error){
        console.error("Erro ao carregar marcas:", error);
    }
    
});
//Quando o formulario for enviado 
document.getElementById("form-fipe").addEventListener("submit", async function(event) {
    const marcaSelect = document.getElementById("marca");
    const modelo = document.getElementById("modelo").value;
    const ano = document.getElementById("ano").value;
    const resultado = document.getElementById("resultado");

    const marcaCodigo = marcaSelect.value;
    console.log("Opções do select:", marcaSelect.options); // Adicione isso
    console.log("Código da marca selecionada:", marcaCodigo); // Adicione isso

    if (!marcaCodigo) {
        resultado.innerHTML = "Por favor, selecione uma marca!";
        return; // Para a execução se não houver código
    }

    try {
        const response = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaCodigo}/modelos`);
        const data = await response.json();
        const modelos = data.modelos;

        resultado.innerHTML = `Modelos disponíveis para ${marcaSelect.options[marcaSelect.selectedIndex].text}: ${modelos.map(m => m.nome).join(", ")}`;
    } catch (error) {
        resultado.innerHTML = "Erro ao consultar a API. Tente novamente!";
    }
});
// Função para carregar modelos
// Função para carregar os modelos quando a marca mudar
function carregarModelos() {
    const marcaSelect = document.getElementById("marca");
    const modeloSelect = document.getElementById("modelo");
    const marcaCodigo = marcaSelect.value;

    // Limpa os modelos e desativa até carregar
    modeloSelect.innerHTML = '<option value="">rdelo</option>';
    modeloSelect.disabled = true;

    if (marcaCodigo) {
        carregarModelosAsync(marcaCodigo); // Chama a função assíncrona
    }
}

// Função assíncrona para buscar os modelos
async function carregarModelosAsync(marcaCodigo) {
    const modeloSelect = document.getElementById("modelo");
    try {
        const response = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaCodigo}/modelos`);
        if (!response.ok) throw new Error("Erro na requisição: " + response.status);
        const data = await response.json();
        const modelos = data.modelos;

        // Preenche o menu de modelos
        modeloSelect.innerHTML = '<option value="">Selecione um modelo</option>'; // Limpa e adiciona opção padrão
        modelos.forEach(modelo => {
            const option = document.createElement("option");
            option.value = modelo.codigo;
            option.text = modelo.nome;
            modeloSelect.appendChild(option);
        });

        // Ativa o menu de modelos
        modeloSelect.disabled = false;
    } catch (error) {
        console.error("Erro ao carregar modelos:", error);
        modeloSelect.disabled = false; // Deixa acessível mesmo com erro
    }
}

// Quando a página carregar, busca as marcas
document.addEventListener("DOMContentLoaded", async function() {
    const marcaSelect = document.getElementById("marca");

    try {
        const response = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas`);
        if (!response.ok) throw new Error("Erro na requisição: " + response.status);
        const marcas = await response.json();

        marcas.forEach(marca => {
            const option = document.createElement("option");
            option.value = marca.codigo;
            option.text = marca.nome;
            marcaSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Erro ao carregar marcas:", error);
    }
});

// Quando o formulário for enviado
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("form-fipe");
    if (form) {
        form.addEventListener("submit", async function(event) {
            event.preventDefault();
            const marcaSelect = document.getElementById("marca");
            const modeloSelect = document.getElementById("modelo");
            const ano = document.getElementById("ano").value;
            const resultado = document.getElementById("resultado");

            const marcaCodigo = marcaSelect.value;
            const modeloCodigo = modeloSelect.value;

            // Verifica se os valores estão selecionados
            if (!marcaCodigo || !modeloCodigo || !ano) {
                resultado.innerHTML = "Por favor, selecione marca, modelo e ano!";
                return;
            }

            try {
                const anosResponse = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaCodigo}/modelos/${modeloCodigo}/anos`);
                if (!anosResponse.ok) throw new Error("Erro na requisição de anos: " + anosResponse.status);
                const anosData = await anosResponse.json();

                const anoSelecionado = anosData.find(a => a.nome === ano);
                if (!anoSelecionado) {
                    resultado.innerHTML = "Ano não encontrado!";
                    return;
                }

                const valorResponse = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaCodigo}/modelos/${modeloCodigo}/anos/${anoSelecionado.codigo}`);
                if (!valorResponse.ok) throw new Error("Erro na requisição de valor: " + valorResponse.status);
                const valorData = await valorResponse.json();

                // Corrige o acesso aos nomes das opções
                const marcaNome = marcaSelect.options[marcaSelect.selectedIndex].text || "Marca desconhecida";
                const modeloNome = modeloSelect.options[modeloSelect.selectedIndex].text || "Modelo desconhecido";

                resultado.innerHTML = `Valor do ${marcaNome} ${modeloNome} ${ano}: R$ ${valorData.Valor || "Não disponível"}`;
            } catch (error) {
                resultado.innerHTML = "Erro ao consultar a API. Tente novamente!";
                console.error(error);
            }
        });
    } else {
        console.error("Formulário não encontrado!");
    }
});
// Função para carregar os modelos quando a marca mudar
// Função para carregar os modelos quando a marca mudar
function carregarModelos() {
    const marcaSelect = document.getElementById("marca");
    const modeloSelect = document.getElementById("modelo");
    const anoSelect = document.getElementById("ano");
    const marcaCodigo = marcaSelect.value;

    // Limpa os modelos e anos e desativa
    modeloSelect.innerHTML = '<option value="">Selecione um modelo</option>';
    anoSelect.innerHTML = '<option value="">Selecione um ano</option>';
    modeloSelect.disabled = true;
    anoSelect.disabled = true;

    if (marcaCodigo) {
        carregarModelosAsync(marcaCodigo);
    }
}

// Função para carregar os anos quando o modelo mudar
function carregarAnos() {
    const modeloSelect = document.getElementById("modelo");
    const anoSelect = document.getElementById("ano");
    const marcaSelect = document.getElementById("marca");
    const modeloCodigo = modeloSelect.value;
    const marcaCodigo = marcaSelect.value;

    // Limpa os anos e desativa até carregar
    anoSelect.innerHTML = '<option value="">Selecione um ano</option>';
    anoSelect.disabled = true;

    if (modeloCodigo && marcaCodigo) {
        carregarAnosAsync(marcaCodigo, modeloCodigo);
    }
}

// Função assíncrona para buscar os modelos
async function carregarModelosAsync(marcaCodigo) {
    const modeloSelect = document.getElementById("modelo");
    try {
        const response = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaCodigo}/modelos`);
        if (!response.ok) throw new Error("Erro na requisição de modelos: " + response.status);
        const data = await response.json();
        const modelos = data.modelos;

        modeloSelect.innerHTML = '<option value="">Selecione um modelo</option>';
        modelos.forEach(modelo => {
            const option = document.createElement("option");
            option.value = modelo.codigo;
            option.text = modelo.nome;
            modeloSelect.appendChild(option);
        });

        modeloSelect.disabled = false;
    } catch (error) {
        console.error("Erro ao carregar modelos:", error);
        modeloSelect.disabled = false;
    }
}

// Função assíncrona para buscar os anos
async function carregarAnosAsync(marcaCodigo, modeloCodigo) {
    const anoSelect = document.getElementById("ano");
    try {
        const response = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaCodigo}/modelos/${modeloCodigo}/anos`);
        if (!response.ok) throw new Error("Erro na requisição de anos: " + response.status);
        const data = await response.json();
        const anos = data;

        anoSelect.innerHTML = '<option value="">Selecione um ano</option>';
        anos.forEach(ano => {
            const option = document.createElement("option");
            option.value = ano.codigo;
            option.text = ano.nome;
            anoSelect.appendChild(option);
        });

        anoSelect.disabled = false;
    } catch (error) {
        console.error("Erro ao carregar anos:", error);
        anoSelect.disabled = false;
    }
}

// Quando a página carregar, busca as marcas
document.addEventListener("DOMContentLoaded", async function() {
    const marcaSelect = document.getElementById("marca");

    try {
        const response = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas`);
        if (!response.ok) throw new Error("Erro na requisição de marcas: " + response.status);
        const marcas = await response.json();

        marcaSelect.innerHTML = '<option value="">Selecione uma marca</option>';
        marcas.forEach(marca => {
            const option = document.createElement("option");
            option.value = marca.codigo;
            option.text = marca.nome;
            marcaSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Erro ao carregar marcas:", error);
    }
});

// Quando o formulário for enviado
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("form-fipe");
    if (form) {
        form.addEventListener("submit", async function(event) {
            event.preventDefault();
            const marcaSelect = document.getElementById("marca");
            const modeloSelect = document.getElementById("modelo");
            const anoSelect = document.getElementById("ano");
            const resultado = document.getElementById("resultado");

            const marcaCodigo = marcaSelect.value;
            const modeloCodigo = modeloSelect.value;
            const anoCodigo = anoSelect.value;

            // Verifica se os valores estão selecionados
            if (!marcaCodigo || !modeloCodigo || !anoCodigo) {
                resultado.innerHTML = "Por favor, selecione marca, modelo e ano!";
                return;
            }

            try {
                const valorResponse = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaCodigo}/modelos/${modeloCodigo}/anos/${anoCodigo}`);
                if (!valorResponse.ok) throw new Error("Erro na requisição de valor: " + valorResponse.status);
                const valorData = await valorResponse.json();

                // Corrige o acesso aos nomes com fallback
                const marcaNome = marcaSelect.options[marcaSelect.selectedIndex]?.text || "Marca desconhecida";
                const modeloNome = modeloSelect.options[modeloSelect.selectedIndex]?.text || "Modelo desconhecido";
                const anoNome = anoSelect.options[anoSelect.selectedIndex]?.text || "Ano desconhecido";

                resultado.innerHTML = `Valor do ${marcaNome} ${modeloNome} ${anoNome}: R$ ${valorData.Valor || "Não disponível"}`;
            } catch (error) {
                resultado.innerHTML = "Erro ao consultar a API. Tente novamente!";
                console.error(error);
            }
        });
    } else {
        console.error("Formulário não encontrado!");
    }
});