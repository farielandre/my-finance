let expensesData = [1000, 500, 200]
let incomeData = [2000, 1500]

const despesasCanvas = document.getElementById('chart_expenses')
const receitasCanvas = document.getElementById('chart_incomes')

const despesasChart = new Chart(despesasCanvas, {
  type: 'bar',
  data: {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [{
      label: 'Despesas de Abril',
      data: expensesData,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
      barRadius: 0.4,
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
})

const receitasChart = new Chart(receitasCanvas, {
  type: 'bar', 
  data: {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'], 
    datasets: [{
      label: 'Receitas de Abril',
      data: incomeData,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
      barRadius: 0.4,
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
})

function updateCharts(expenses, incomes) {
  expensesData = expenses
  incomeData = incomes
  despesasChart.data.datasets[0].data = expenses
  receitasChart.data.datasets[0].data = incomes
  despesasChart.update()
  receitasChart.update()
}
