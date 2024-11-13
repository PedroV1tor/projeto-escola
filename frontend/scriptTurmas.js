document.addEventListener('DOMContentLoaded', function() {
    const turmasTable = document.getElementById('turmasTable').getElementsByTagName('tbody')[0];
    const professorSelect = document.getElementById('professorId');
    const disciplinaSelect = document.getElementById('disciplinaId');
    const salaSelect = document.getElementById('salaId');

    // Função para carregar turmas
    function carregarTurmas() {
        fetch('http://localhost:3040/turmas')
            .then(response => response.json())
            .then(data => {
                turmasTable.innerHTML = '';
                data.forEach(turma => {
                    const row = turmasTable.insertRow();
                    row.insertCell(0).textContent = turma.nome;
                    row.insertCell(1).textContent = turma.periodo;
                    row.insertCell(2).textContent = turma.Professor.nome;  
                    row.insertCell(3).textContent = turma.Disciplina.nome; 
                    row.insertCell(4).textContent = turma.Sala.nome;       
                    row.insertCell(5).textContent = turma.ativo ? "Ativa" : "Inativa";
                    
                    const actionsCell = row.insertCell(6);
                    
                  
                    const actionButton = document.createElement('button');
                    actionButton.textContent = turma.ativo ? "Desativar" : "Reativar";
                    actionButton.classList.add("btn");
                    actionButton.addEventListener('click', () => {
                        const action = turma.ativo ? 'desativar' : 'reativar';
                        fetch(`http://localhost:3040/turmas/${action}/${turma.id}`, { method: 'POST' })
                            .then(() => carregarTurmas());
                    });
                    actionsCell.appendChild(actionButton);
                    
                    
                    const updateButton = document.createElement('button');
                    updateButton.textContent = "Atualizar";
                    updateButton.classList.add("btn");
                    updateButton.addEventListener('click', () => {
                        
                        document.getElementById('nome').value = turma.nome;
                        document.getElementById('periodo').value = turma.periodo;
                        document.getElementById('professorId').value = turma.professorId; 
                        document.getElementById('disciplinaId').value = turma.disciplinaId; 
                        document.getElementById('salaId').value = turma.salaId; 

                       
                        turmaForm.setAttribute('data-id', turma.id);
                    });
                    actionsCell.appendChild(updateButton);
                });
            });
    }

   
    function carregarProfessores() {
        fetch('http://localhost:3040/professores')
            .then(response => response.json())
            .then(data => {
                
                professorSelect.innerHTML = '<option value="">Selecione um Professor</option>'; 
                data.forEach(professor => {
                    const option = document.createElement('option');
                    option.value = professor.id;
                    option.textContent = professor.nome;
                    professorSelect.appendChild(option);
                });
            });
    }

    function carregarDisciplinas() {
        fetch('http://localhost:3040/disciplinas')
            .then(response => response.json())
            .then(data => {
                
                disciplinaSelect.innerHTML = '<option value="">Selecione uma Disciplina</option>'; 
                data.forEach(disciplina => {
                    const option = document.createElement('option');
                    option.value = disciplina.id;
                    option.textContent = disciplina.nome;
                    disciplinaSelect.appendChild(option);
                });
            });
    }

    function carregarSalas() {
        fetch('http://localhost:3040/salas')
            .then(response => response.json())
            .then(data => {
                
                salaSelect.innerHTML = '<option value="">Selecione uma Sala</option>'; 
                data.forEach(sala => {
                    const option = document.createElement('option');
                    option.value = sala.id;
                    option.textContent = sala.nome;
                    salaSelect.appendChild(option);
                });
            });
    }

    
    carregarTurmas();
    carregarProfessores();
    carregarDisciplinas();
    carregarSalas();

    
    const turmaForm = document.getElementById('turmaForm');
    turmaForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const id = turmaForm.getAttribute('data-id'); 
        const nome = document.getElementById('nome').value;
        const periodo = document.getElementById('periodo').value;
        const professorId = document.getElementById('professorId').value;
        const disciplinaId = document.getElementById('disciplinaId').value;
        const salaId = document.getElementById('salaId').value;

        const url = id ? `http://localhost:3040/turmas/atualizar/${id}` : 'http://localhost:3040/turmas/adicionar';

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, periodo, professorId, disciplinaId, salaId })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao salvar turma');
            }
            return response.json();
        })
        .then(() => {
            turmaForm.reset();
            turmaForm.removeAttribute('data-id'); 
            carregarTurmas();
        })
        .catch(error => {
            console.error(error); 
            alert('Erro ao salvar turma: ' + error.message); 
        });
    });
});
