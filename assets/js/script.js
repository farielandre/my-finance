const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const tbody1 = document.querySelector('tbody1')
const sValor = document.querySelector('#m-valor')
const sDescricao = document.querySelector('#m-descricao')
const sData = document.querySelector('#m-data')
const btnSalvar = document.querySelector('#btnSalvar')

var sFiltro_mes = document.querySelector('m-mes_filtro')
var sFiltro_ano = document.querySelector('m-ano_filtro')

var sprocurar_expenses = document.querySelector('m-search_expenses')
var sprocurar_incomes = document.querySelector('m-search_incomes')

let filtro
let seletor
let itens
let id
var expenses
let incomes
let balance
var eixoX_expenses = []
var eixoY_expenses = []
var eixoX_incomes = []
var eixoY_incomes = []

function openModal(buttonId, edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
    filtro = 0
  }
  if (buttonId === 'button1') {
    seletor = 1;

  } else if (buttonId === 'button2') {
    seletor = 2;

  }

  if (edit) {
    sValor.value = itens[index].valor
    sDescricao.value = itens[index].descricao
    sData.value = itens[index].data
    id = index
  } else {
    sValor.value = ''
    sDescricao.value = ''
    sData.value = ''
  }
}

function editItem(index) {
  openModal(undefined, true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
  criarGrafico(eixoX_expenses, eixoY_expenses, eixoX_incomes, eixoY_incomes);
}

function insertItem(selec, item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td class="tabela-descricao">${item.descricao}</td>
    <td>R$ ${item.valor}</td>
    <td>${item.data}</td>
    <td>
      <button class="tabela-botao-acao editar" title="Editar" onclick="editItem(${index})"><i class="fa-solid fa-pencil"></i></button>
      <button class="tabela-botao-acao excluir" title="Excluir" onclick="deleteItem(${index})"><i class="fa-solid fa-trash"></i></button>
    </td>
  `
  if (selec === 1) {
    tbody.appendChild(tr)

  } else if (selec === 2) {
    tbody1.appendChild(tr)
  }
}

btnSalvar.onclick = e => {
  if (sValor.value == '' || sDescricao.value == '' || sData.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].valor = sValor.value
    itens[id].descricao = sDescricao.value
    itens[id].data = sData.value
  } else {
    itens.push({ 'seletor': seletor, 'valor': sValor.value, 'descricao': sDescricao.value, 'data': sData.value })
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()

  id = undefined
  location.reload();
}

function loadItens() {

  expenses = 0
  incomes = 0
  balance = 0
  itens = getItensBD()
  eixoY_expenses = []
  eixoX_incomes = []
  eixoY_incomes = []

  tbody.innerHTML = ''
  tbody1.innerHTML = ''

  itens.forEach((item, index) => {

    const dta = item.data.split('-')

    if ((sFiltro_mes == null || sFiltro_mes == "" || parseInt(sFiltro_mes) === parseInt(dta[1])) && (sFiltro_ano == null || sFiltro_ano == "" || parseInt(sFiltro_ano) === parseInt(dta[0]))) {

      if (item.seletor === 1) {
        if (sprocurar_expenses == null || sprocurar_expenses == "" || sprocurar_expenses === item.descricao) {
          expenses = expenses + parseFloat(item.valor)
          eixoX_expenses.push(item.valor)
          eixoY_expenses.push(item.data)
          insertItem(item.seletor, item, index)
        }
      }

      else if (item.seletor === 2) {
        if (sprocurar_incomes == null || sprocurar_incomes == "" || sprocurar_incomes === item.descricao) {
          insertItem(item.seletor, item, index)
          incomes = incomes + parseFloat(item.valor)
          eixoX_incomes.push(item.valor)
          eixoY_incomes.push(item.data)
        }
      }
      else {
      }
    }
  }
  )

  balance = incomes - expenses
  document.getElementById('expenses').innerHTML = expenses;
  document.getElementById('incomes').innerHTML = incomes;
  document.getElementById('balance').innerHTML = balance;
  criarGrafico(eixoX_expenses, eixoY_expenses, eixoX_incomes, eixoY_incomes);
}

function criarGrafico(dados_expenses, labels_expenses, dados_incomes, labels_incomes) {

  // Verifica se o Chart.js está disponível
  if (typeof Chart === 'undefined') {
    console.error('Chart.js não encontrado. Certifique-se de incluir a biblioteca no seu projeto.');
    return;
  }

  // Configurações do gráfico
  var ctx = document.getElementById('chart_expenses').getContext('2d');

  if (window.chart_expenses instanceof Chart) {
    window.chart_expenses.destroy();
  }

  window.chart_expenses = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels_expenses,
      datasets: [{
        label: 'Dados',
        data: dados_expenses,
        backgroundColor: '#EA4A4A',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

  var ctx1 = document.getElementById('chart_incomes').getContext('2d');
  if (window.chart_incomes instanceof Chart) {
    window.chart_incomes.destroy();
  }

  window.chart_incomes = new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: labels_incomes,
      datasets: [{
        label: 'Dados',
        data: dados_incomes,
        backgroundColor: '#5EBC4F',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()

document.getElementById('m-mes_filtro').addEventListener('keyup', function (e) {
  var key = e.which || e.keyCode;
  if (key == 13) { // código da tecla ente

    sFiltro_mes = document.getElementById('m-mes_filtro').value;
    loadItens(); // atualiza a filtragem

  }
});

document.getElementById('m-ano_filtro').addEventListener('keyup', function (e) {
  var key = e.which || e.keyCode;
  if (key == 13) { // código da tecla enter

    sFiltro_ano = document.getElementById('m-ano_filtro').value;
    loadItens(); // atualiza a filtragem


  }
});

document.getElementById('m-search_expenses').addEventListener('keyup', function (e) {
  var key = e.which || e.keyCode;
  if (key == 13) { // código da tecla enter

    sprocurar_expenses = document.getElementById('m-search_expenses').value;
    loadItens(); // atualiza a filtragem


  }
});

document.getElementById('m-search_incomes').addEventListener('keyup', function (e) {
  var key = e.which || e.keyCode;
  if (key == 13) { // código da tecla enter

    sprocurar_incomes = document.getElementById('m-search_incomes').value;
    loadItens(); // atualiza a filtragem

  }
});