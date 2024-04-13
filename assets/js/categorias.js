// Selecionando a lista de categorias de despesas
const despesasLista = document.querySelector(".app-categorias-despesas .categorias-lista");

// Selecionando a lista de categorias de receitas
const receitasLista = document.querySelector(".app-categorias-receitas .categorias-lista");

// Função para adicionar uma nova categoria
function adicionarCategoria(lista) {
    const novaCategoriaNome = prompt("Digite o nome da nova categoria:");
    if (novaCategoriaNome) {
        const novoItem = document.createElement("li");
        novoItem.classList.add("categorias-item");
        novoItem.innerHTML = `
                <div class="categoria-nome">${novaCategoriaNome}</div>
                <div class="categorias-botoes-acoes">
                    <button class="acao-botao editar" title="Editar"><i class="fa-solid fa-pencil"></i></button>
                    <button class="acao-botao excluir" title="Excluir"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;
        lista.appendChild(novoItem);
        adicionarEventListeners(novoItem);
        salvarCategorias();
    }
}

// Função para remover uma categoria
function removerCategoria(item) {
    item.remove();
    salvarCategorias();
}

// Função para editar o nome de uma categoria
function editarCategoria(item) {
    const novoNome = prompt("Digite o novo nome da categoria:");
    if (novoNome) {
        const nomeCategoria = item.querySelector(".categoria-nome");
        nomeCategoria.textContent = novoNome;
        salvarCategorias();
    }
}

// Função para adicionar event listeners aos botões de ação
function adicionarEventListeners(item) {
    const botaoEditar = item.querySelector(".editar");
    const botaoExcluir = item.querySelector(".excluir");

    botaoEditar.addEventListener("click", function () {
        editarCategoria(item);
    });

    botaoExcluir.addEventListener("click", function () {
        removerCategoria(item);
    });
}

// Função para salvar as categorias no Local Storage
function salvarCategorias() {
    const categoriasDespesas = Array.from(despesasLista.querySelectorAll(".categoria-nome")).map(function (categoria) {
        return categoria.textContent;
    });
    localStorage.setItem('categoriasDespesas', JSON.stringify(categoriasDespesas));

    const categoriasReceitas = Array.from(receitasLista.querySelectorAll(".categoria-nome")).map(function (categoria) {
        return categoria.textContent;
    });
    localStorage.setItem('categoriasReceitas', JSON.stringify(categoriasReceitas));
}

// Adicionando event listeners aos botões de adicionar nova categoria
document.querySelector(".categorias-despesas-add").addEventListener("click", function () {
    adicionarCategoria(despesasLista);
});

document.querySelector(".categorias-receitas-add").addEventListener("click", function () {
    adicionarCategoria(receitasLista);
});

// Carregar categorias do Local Storage ao carregar a página
function carregarCategorias() {
    const categoriasDespesas = JSON.parse(localStorage.getItem('categoriasDespesas')) || [];
    categoriasDespesas.forEach(function (categoria) {
        criarItemCategoria(categoria, despesasLista);
    });

    const categoriasReceitas = JSON.parse(localStorage.getItem('categoriasReceitas')) || [];
    categoriasReceitas.forEach(function (categoria) {
        criarItemCategoria(categoria, receitasLista);
    });
}

// Função para criar um novo item de categoria
function criarItemCategoria(nome, lista) {
    const novoItem = document.createElement("li");
    novoItem.classList.add("categorias-item");
    novoItem.innerHTML = `
            <div class="categoria-nome">${nome}</div>
            <div class="categorias-botoes-acoes">
                <button class="acao-botao editar" title="Editar"><i class="fa-solid fa-pencil"></i></button>
                <button class="acao-botao excluir" title="Excluir"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
    lista.appendChild(novoItem);
    adicionarEventListeners(novoItem);
}

// Carregar categorias do Local Storage ao carregar a página
carregarCategorias();