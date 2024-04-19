var btnAbrirPopupDespesas = document.getElementById('btnAbrirPopupDespesas');
var btnAbrirPopupReceitas = document.getElementById('btnAbrirPopupReceitas');
var modalPopupDespesas = document.getElementById('modalPopupDespesas');
var modalPopupReceitas = document.getElementById('modalPopupReceitas');
var formDespesaContainer = document.getElementById('formDespesaContainer');
var formReceitaContainer = document.getElementById('formReceitaContainer');


btnAbrirPopupDespesas.addEventListener('click', function() {
    modalPopupDespesas.style.display = 'block';
   
});

btnAbrirPopupReceitas.addEventListener('click', function() {
    modalPopupReceitas.style.display = 'block';
    formReceitaContainer.style.display = 'block';
});