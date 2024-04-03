const formDespesa = document.getElementById('formdespesa');
const descricaoInput = document.getElementById('descricao');
const categoriaInput = document.getElementById('categoria');
const valorInput = document.getElementById('valor');
const dataInput = document.getElementById('data');
const divDespesas = document.getElementById('despesas');

formDespesa.addEventListener('submit', function(e) {
    e.preventDefault();
    const descricao = getInputValue(descricaoInput);
    const categoria = getInputValue(categoriaInput);
    const valor = getInputValue(valorInput);
    const data = getInputValue(dataInput);
    adicionarDespesa(descricao, categoria, valor, data);
    exibirDespesa();
});


function getInputValue(inputElement) {
    return inputElement.value.trim() || "Não informado";
}

function adicionarDespesa(descricao, categoria, valor, data) {
    let despesas = JSON.parse(localStorage.getItem('despesas')) || [];
    let despesa = { descricao, categoria, valor, data };
    despesas.push(despesa);
    localStorage.setItem('despesas', JSON.stringify(despesas));
}

function exibirDespesa() {
    let despesas = JSON.parse(localStorage.getItem('despesas')) || [];
    divDespesas.innerHTML = '';
    despesas.forEach((despesa, index) => {
        let despesaDiv = document.createElement('div');
        const { descricao, categoria, valor, data } = despesa;
        despesaDiv.textContent = `Despesa ${index + 1}: Descrição: ${descricao}. Categoria: ${categoria}. Valor: R$ ${valor}. Data: ${data}`;
        divDespesas.appendChild(despesaDiv);
    });
}

window.addEventListener('beforeunload', function() {
    localStorage.removeItem('despesas');
});