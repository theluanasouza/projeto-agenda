document.addEventListener("DOMContentLoaded", function (){
    const form = document.querySelector("form");
    const input = document.querySelector('input[type="text"]');
    const lista = document.querySelector("ul");

    //carrega tarefas salvas
    const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    function salvarTarefas() {
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }

    function renderizarTarefas() {
        lista.innerHTML = "";
        tarefas.forEach((tarefa, index) => {
            const li = document.createElement("li");

            const botao = document.createElement("span");
            botao.textContent = tarefa.concluida ? "✔" : "○"
            botao.classList.add("marcar");
            botao.addEventListener("click", () => {
                tarefa.concluida = !tarefa.concluida;
                salvarTarefas();
                renderizarTarefas(); 
            });

            const textoTarefa = document.createElement ("span");
            textoTarefa.textContent = tarefa.texto;
            if (tarefa.concluida) {
                textoTarefa.classList.add("concluida");
            }

            const botaoExcluir = document.createElement("span");
            botaoExcluir.textContent = "🗑️";
            botaoExcluir.style.cursor = "pointer";
            botaoExcluir.style.marginLeft = "10px";
            botaoExcluir.addEventListener("click", () => {
                tarefas.splice(index, 1);
                salvarTarefas();
                renderizarTarefas();
            });

            li.appendChild(botao);
            li.appendChild(textoTarefa);
            li.appendChild(botaoExcluir);
            lista.appendChild(li);
        });
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const texto = input.value.trim();
        if (texto) {
            tarefas.push({ texto: texto, concluida: false});
            salvarTarefas();
            renderizarTarefas();
            input.value = "";
        }
    });

    renderizarTarefas();

});