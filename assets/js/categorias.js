// Obter o popUpCategorias e o elemento <span> que fecha o popUp
const popUpCategoriasDespesas = document.getElementById("categorias-popup-despesas");
const popUpCategoriasReceitas = document.getElementById("categorias-popup-receitas");
const botaoFecharDespesas = document.querySelector(".categorias-popup-fechar-despesa");
const botaoFecharReceitas = document.querySelector(".categorias-popup-fechar-receita");

// Botao Add Despesas e Receitas abre o popUp
document.getElementById("categorias-despesas-add").addEventListener("click", function () {
    popUpCategoriasDespesas.style.display = "block";
});

document.getElementById("categorias-receitas-add").addEventListener("click", function () {
    popUpCategoriasReceitas.style.display = "block";
});

// Quando o usuário clica no X, fecha o popUp
botaoFecharDespesas.onclick = function () {
    popUpCategoriasDespesas.style.display = "none";
}

botaoFecharReceitas.onclick = function () {
    popUpCategoriasReceitas.style.display = "none";
}

// Quando o usuário clica em qualquer lugar fora do popUp, fecha ele
window.onclick = function (event) {
    if (event.target == popUpCategoriasDespesas) {
        popUpCategoriasDespesas.style.display = "none";
    }
    if (event.target == popUpCategoriasReceitas) {
        popUpCategoriasReceitas.style.display = "none";
    }
}

// Selecionar a lista de categorias de despesas e receitas
const despesasLista = document.getElementById("categorias-despesas-lista");
const receitasLista = document.getElementById("categorias-receitas-lista");

// Salvar categoria e fechar o popUp
document.getElementById("categorias-popup-salvar-despesa").addEventListener("click", function () {
    const categoriaNomeDespesa = document.getElementById("categoria-nome-despesa").value;
    if (categoriaNomeDespesa.trim() !== "") {
        adicionarCategoria(despesasLista, categoriaNomeDespesa);
        popUpCategoriasDespesas.style.display = "none";
    }
});

document.getElementById("categorias-popup-salvar-receita").addEventListener("click", function () {
    const categoriaNomeReceita = document.getElementById("categoria-nome-receita").value;
    if (categoriaNomeReceita.trim() !== "") {
        adicionarCategoria(receitasLista, categoriaNomeReceita);
        popUpCategoriasReceitas.style.display = "none";
    }
});

// Adicionar uma nova categoria
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

// Remover uma categoria
function removerCategoria(item) {
    item.remove();
    salvarCategorias();
}

// Editar o nome de uma categoria
function editarCategoria(item) {
    const novoNome = prompt("Digite o novo nome da categoria:");
    if (novoNome) {
        const nomeCategoria = item.querySelector(".categoria-nome");
        nomeCategoria.textContent = novoNome;
        salvarCategorias();
    }
}

// Adicionar event listeners aos botões de ação
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

// Salvar as categorias no Local Storage
function salvarCategorias() {
    const categoriasDespesas = Array.from(despesasLista.querySelectorAll(".categoria-nome")).map(function (categoria) {
        return categoria.textContent;
    });
    const categoriasReceitas = Array.from(receitasLista.querySelectorAll(".categoria-nome")).map(function (categoria) {
        return categoria.textContent;
    });
    localStorage.setItem('categoriasDespesas', JSON.stringify(categoriasDespesas));
    localStorage.setItem('categoriasReceitas', JSON.stringify(categoriasReceitas));
}

// Adicionando event listeners aos botões de adicionar nova categoria
document.getElementById("categorias-despesas-add").addEventListener("click", function () {
    popUpCategoriasDespesas.style.display = "block";
});

document.getElementById("categorias-receitas-add").addEventListener("click", function () {
    popUpCategoriasReceitas.style.display = "block";
});

// Carregar categorias do Local Storage ao carregar a página
function carregarCategorias() {
    const categoriasDespesas = JSON.parse(localStorage.getItem('categoriasDespesas')) || [];
    const categoriasReceitas = JSON.parse(localStorage.getItem('categoriasReceitas')) || [];
    categoriasDespesas.forEach(function (categoria) {
        criarItemCategoria(categoria, despesasLista);
    });
    categoriasReceitas.forEach(function (categoria) {
        criarItemCategoria(categoria, receitasLista);
    });
}

// Criar um novo item de categoria
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