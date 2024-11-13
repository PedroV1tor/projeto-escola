document.addEventListener('DOMContentLoaded', function() {
    const professoresTable = document.getElementById('professoresTable').getElementsByTagName('tbody')[0];

    function carregarProfessores() {
        fetch('http://localhost:3040/professores')
            .then(response => response.json())
            .then(data => {
                professoresTable.innerHTML = '';
                data.forEach(professor => {
                    const row = professoresTable.insertRow();
                    row.insertCell(0).textContent = professor.nome;
                    row.insertCell(1).textContent = professor.email;
                    row.insertCell(2).textContent = professor.especialidade;
                    row.insertCell(3).textContent = professor.ativo ? "Ativo" : "Inativo";
                    
                    const actionsCell = row.insertCell(4);
                    
                    const actionButton = document.createElement('button');
                    actionButton.textContent = professor.ativo ? "Desativar" : "Reativar";
                    actionButton.classList.add("btn");
                    actionButton.addEventListener('click', () => {
                        const action = professor.ativo ? 'desativar' : 'reativar';
                        fetch(`http://localhost:3040/professores/${action}/${professor.id}`, { method: 'POST' })
                            .then(() => carregarProfessores());
                    });
                    actionsCell.appendChild(actionButton);
                    
                    const updateButton = document.createElement('button');
                    updateButton.textContent = "Atualizar";
                    updateButton.classList.add("btn");
                    updateButton.addEventListener('click', () => {

                        document.getElementById('nome').value = professor.nome;
                        document.getElementById('email').value = professor.email;
                        document.getElementById('especialidade').value = professor.especialidade;

                        professorForm.setAttribute('data-id', professor.id);
                    });
                    actionsCell.appendChild(updateButton);
                });
            });
    }

    carregarProfessores();
   
    const professorForm = document.getElementById('professorForm');
    professorForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const id = professorForm.getAttribute('data-id'); 
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const especialidade = document.getElementById('especialidade').value;

        const url = id ? `http://localhost:3040/professores/atualizar/${id}` : 'http://localhost:3040/professores/adicionar';

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, especialidade })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao salvar professor');
            }
            return response.json();
        })
        .then(() => {
            professorForm.reset();
            professorForm.removeAttribute('data-id');
            carregarProfessores();
        })
        .catch(error => {
            console.error(error); 
            alert('Erro ao salvar professor: ' + error.message); 
        });
    });
});
