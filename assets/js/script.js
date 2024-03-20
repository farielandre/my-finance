document.getElementById('formConta').addEventListener('submit', function(e) {
    e.preventDefault();
    let descricao = document.getElementById('descricao').value;
    let categoria = document.getElementById('categoria').value;
    let valor = document.getElementById('valor').value;
    let vencimento = document.getElementById('vencimento').value;
    adicionarConta(descricao, categoria, valor, vencimento);
    exibirContas();
});

function adicionarConta(descricao, categoria, valor, vencimento) {
    let contas = JSON.parse(localStorage.getItem('contas')) || [];
    let conta = { descricao, categoria, valor, vencimento };
    contas.push(conta);
    localStorage.setItem('contas', JSON.stringify(contas));
}

function exibirContas() {
    let contas = JSON.parse(localStorage.getItem('contas')) || [];
    let divContas = document.getElementById('contas');
    divContas.innerHTML = '';
    contas.forEach((conta, index) => {
        let contaDiv = document.createElement('div');
        contaDiv.textContent = `Conta ${index + 1}: ${conta.descricao}, ${conta.categoria}, ${conta.valor}, ${conta.vencimento}`;
        divContas.appendChild(contaDiv);
    });
}
