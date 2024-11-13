document.addEventListener('DOMContentLoaded', function() {
    const disciplinasTable = document.getElementById('disciplinasTable').getElementsByTagName('tbody')[0];

    function carregarDisciplinas() {
        fetch('http://localhost:3040/disciplinas')
            .then(response => response.json())
            .then(data => {
                disciplinasTable.innerHTML = '';
                data.forEach(disciplina => {
                    const row = disciplinasTable.insertRow();
                    row.insertCell(0).textContent = disciplina.nome;
                    row.insertCell(1).textContent = disciplina.descricao;
                    row.insertCell(2).textContent = disciplina.ativa ? "Ativa" : "Inativa";
                    
                    const actionsCell = row.insertCell(3);
                    
                    const actionButton = document.createElement('button');
                    actionButton.textContent = disciplina.ativa ? "Desativar" : "Reativar";
                    actionButton.classList.add("btn");
                    actionButton.addEventListener('click', () => {
                        const action = disciplina.ativa ? 'desativar' : 'reativar';
                        fetch(`http://localhost:3040/disciplinas/${action}/${disciplina.id}`, { method: 'POST' })
                            .then(() => carregarDisciplinas());
                    });
                    actionsCell.appendChild(actionButton);
                    
                    const updateButton = document.createElement('button');
                    updateButton.textContent = "Atualizar";
                    updateButton.classList.add("btn");
                    updateButton.addEventListener('click', () => {

                        document.getElementById('nome').value = disciplina.nome;
                        document.getElementById('descricao').value = disciplina.descricao;

                        disciplinaForm.setAttribute('data-id', disciplina.id);
                    });
                    actionsCell.appendChild(updateButton);
                });
            });
    }

    carregarDisciplinas();

    const disciplinaForm = document.getElementById('disciplinaForm');
    disciplinaForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const id = disciplinaForm.getAttribute('data-id'); 
        const nome = document.getElementById('nome').value;
        const descricao = document.getElementById('descricao').value;

        const url = id ? `http://localhost:3040/disciplinas/atualizar/${id}` : 'http://localhost:3040/disciplinas/adicionar';

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, descricao })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao salvar disciplinas');
            }
            return response.json();
        })
        .then(() => {
            disciplinaForm.reset();
            disciplinaForm.removeAttribute('data-id');
            carregarDisciplinas();
        })
        .catch(error => {
            console.error(error); 
            alert('Erro ao salvar disciplinaaaaaaa: ' + error.message); 
        });
    });
});
