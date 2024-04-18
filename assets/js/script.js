document.addEventListener('DOMContentLoaded', function() {
    const descricaoInput = document.getElementById('descricao');
    const categoriaInput = document.getElementById('categoria');
    const valorInput = document.getElementById('valor');
    const dataInput = document.getElementById('data');
    const adicionarDespesaBtn = document.getElementById('adicionarDespesa');
    const divDespesas = document.getElementById('despesas');

    adicionarDespesaBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const descricao = descricaoInput.value.trim();
        const categoria = categoriaInput.value.trim();
        const valor = parseFloat(valorInput.value.trim());
        const data = dataInput.value.trim();

        if (!descricao || !categoria || isNaN(valor) || valor <= 0 || !data) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

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
        divDespesas.innerHTML = '';
        despesas.forEach((despesa, index) => {
            let despesaDiv = document.createElement('div');
            const { descricao, categoria, valor, data } = despesa;
            despesaDiv.textContent = `Despesa ${index + 1}: Descrição: ${descricao}. Categoria: ${categoria}. Valor: R$ ${valor}. Data: ${data}`;
            divDespesas.appendChild(despesaDiv);
        });
    }

    // Exibir as despesas ao carregar a página
    exibirDespesa();

    window.addEventListener('beforeunload', function() {
        localStorage.removeItem('despesas');
    });
});
