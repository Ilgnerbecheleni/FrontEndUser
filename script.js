 // Obtém uma referência para o formulário
 const form = document.querySelector('form');

 // Manipula o evento de envio do formulário
 form.addEventListener('submit', function(event) {
   event.preventDefault(); // Impede o envio padrão do formulário

   // Obtém os valores dos campos de entrada
   const name = document.getElementById('nome').value;
   const email = document.getElementById('email').value;
   const telefone = document.getElementById('telefone').value;
   const cracha = document.getElementById('cracha').value;

   // Cria um objeto com os dados do formulário
   const data = {
     nome: name,
     email: email,
     telefone: telefone,
     cracha: cracha
   };

   // Envia os dados para o servidor utilizando o método Fetch
   fetch('http://localhost:3000/user', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(data)
   })
   .then(response => response.json())
   .then(data => {
     if (data.success) {
       successAlert.textContent = data.message;
       successAlert.classList.remove('d-none');
       errorAlert.classList.add('d-none');
       hideAlert(successAlert); // Ocultar o alerta de sucesso após 2 segundos
     } else {
       errorAlert.textContent = data.message;
       errorAlert.classList.remove('d-none');
       successAlert.classList.add('d-none');
       hideAlert(errorAlert); // Ocultar o alerta de erro após 2 segundos
     }
     console.log(data);
     load();
   })
   .catch(error => {
     errorAlert.textContent = 'Ocorreu um erro na requisição.';
     errorAlert.classList.remove('d-none');
     successAlert.classList.add('d-none');
     hideAlert(errorAlert); // Ocultar o alerta de erro após 2 segundos
     console.error('Erro:', error);
   });

   function hideAlert(alert) {
     setTimeout(function() {
       alert.classList.add('d-none');
     }, 4000);
   }
 });


const load = async ()=>{
  const dataTable = document.getElementById('data-table');
  const tbody = dataTable.querySelector('tbody');

  fetch('http://localhost:3000/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    tbody.innerHTML = ''
    data.forEach(item => {
      const newRow = tbody.insertRow();
      const nameCell = newRow.insertCell();
      const crachaCell = newRow.insertCell();
      const emailCell = newRow.insertCell();
      const telefoneCell = newRow.insertCell();
      nameCell.textContent = item.nome;
      crachaCell.textContent = item.cracha;
      emailCell.textContent = item.email;
      telefoneCell.textContent = item.telefone;
    });
  })
  .catch(error => {
    console.error('Erro:', error);
  });
}

load();