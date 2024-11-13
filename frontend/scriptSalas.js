document.addEventListener('DOMContentLoaded', function() {
    const salasTable = document.getElementById('salasTable').getElementsByTagName('tbody')[0];

    
    function carregarSalas() {
        fetch('http://localhost:3040/salas')
            .then(response => response.json())
            .then(data => {
                salasTable.innerHTML = '';
                data.forEach(sala => {
                    const row = salasTable.insertRow();
                    row.insertCell(0).textContent = sala.nome;
                    row.insertCell(1).textContent = sala.capacidade;
                    row.insertCell(2).textContent = sala.localizacao;
                    row.insertCell(3).textContent = sala.ativo ? "Ativa" : "Inativa";
                    
                    const actionsCell = row.insertCell(4);
                    
                   
                    const actionButton = document.createElement('button');
                    actionButton.textContent = sala.ativo ? "Desativar" : "Reativar";
                    actionButton.classList.add("btn");
                    actionButton.addEventListener('click', () => {
                        const action = sala.ativo ? 'desativar' : 'reativar';
                        fetch(`http://localhost:3040/salas/${action}/${sala.id}`, { method: 'POST' })
                            .then(() => carregarSalas());
                    });
                    actionsCell.appendChild(actionButton);
                    
                  
                    const updateButton = document.createElement('button');
                    updateButton.textContent = "Atualizar";
                    updateButton.classList.add("btn");
                    updateButton.addEventListener('click', () => {
                       
                        document.getElementById('nome').value = sala.nome;
                        document.getElementById('capacidade').value = sala.capacidade;
                        document.getElementById('localizacao').value = sala.localizacao;

                        
                        salaForm.setAttribute('data-id', sala.id);
                    });
                    actionsCell.appendChild(updateButton);
                });
            });
    }

    
    carregarSalas();

   
    const salaForm = document.getElementById('salaForm');
    salaForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const id = salaForm.getAttribute('data-id'); 
        const nome = document.getElementById('nome').value;
        const capacidade = document.getElementById('capacidade').value;
        const localizacao = document.getElementById('localizacao').value;

        const url = id ? `http://localhost:3040/salas/atualizar/${id}` : 'http://localhost:3040/salas/adicionar';

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, capacidade, localizacao })
        })
        .then(response => {
            console.log("Resposta do servidor: ", response);
            if (!response.ok) {
                return response.json().then(error => {
                    throw new Error(error.error || 'Erro ao salvar sala');
                });
            }
            return response.json();
        })
        .then(() => {
            salaForm.reset();
            salaForm.removeAttribute('data-id'); 
            carregarSalas();
        })
        .catch(error => {
            console.error(error); 
            alert('Erro ao salvar sala: ' + error.message); 
        });
    });
});
