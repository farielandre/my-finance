document.getElementById('formdespesa').addEventListener('submit', function(e) {
    e.preventDefault();
    let descricao = document.getElementById('descricao').value;
    let categoria = document.getElementById('categoria').value;
    let valor = document.getElementById('valor').value;
    let data = document.getElementById('data').value;
    adicionarDespesa(descricao, categoria, valor, data);
    exibirDespesa();
});

function adicionarDespesa(descricao, categoria, valor, data) {
    let despesas = JSON.parse(localStorage.getItem('despesas')) || [];
    let despesa = { descricao, categoria, valor, data };
    despesas.push(despesa);
    localStorage.setItem('despesas', JSON.stringify(despesas));
}

function exibirDespesa() {
    let despesas = JSON.parse(localStorage.getItem('despesas')) || [];
    let divdespesas = document.getElementById('despesas');
    divdespesas.innerHTML = '';
    despesas.forEach((despesa, index) => {
        let despesaDiv = document.createElement('div');
        despesaDiv.textContent = `Despesa ${index + 1}: Descrição: ${despesa.descricao}. Categoria: ${despesa.categoria}. Valor: R$ ${despesa.valor}. Data: ${despesa.data}`;
        divdespesas.appendChild(despesaDiv);
    });
}
