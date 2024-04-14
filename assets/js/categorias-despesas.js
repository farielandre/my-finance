// Obter o modal
const modal = document.getElementById("categorias-popup");

// Obter o elemento <span> que fecha o modal
const closeBtn = document.getElementsByClassName("categorias-popup-fechar")[0];

// Quando o usuário clica no botão, abre o modal
document.querySelector(".categorias-despesas-add").addEventListener("click", function () {
    modal.style.display = "block";
});

// Quando o usuário clica no <span> (x), fecha o modal
closeBtn.onclick = function () {
    modal.style.display = "none";
}

// Quando o usuário clica em qualquer lugar fora do modal, fecha-o
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Salvar categoria
document.getElementById("saveCategory").addEventListener("click", function () {
    const categoryName = document.getElementById("categoryName").value;
    if (categoryName.trim() !== "") {
        adicionarCategoria(despesasLista, categoryName);
        modal.style.display = "none";
    }
});

// Selecionar a lista de categorias de despesas
const despesasLista = document.querySelector(".app-categorias-despesas .categorias-despesas-lista");

// Função para adicionar uma nova categoria
function adicionarCategoria(lista, nome) {
    if (nome) {
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
}

// Adicionando event listeners aos botões de adicionar nova categoria
document.querySelector(".categorias-despesas-add").addEventListener("click", function () {
    modal.style.display = "block";
});

// Carregar categorias do Local Storage ao carregar a página
function carregarCategorias() {
    const categoriasDespesas = JSON.parse(localStorage.getItem('categoriasDespesas')) || [];
    categoriasDespesas.forEach(function (categoria) {
        criarItemCategoria(categoria, despesasLista);
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
