window.addEventListener("mousemove", function (event) {
    var navbar = document.getElementById("navbar");

    // Quando o mouse está a menos de 50px do topo, mostrar a navbar
    if (event.clientY < 50) {
        navbar.style.top = "0"; // Desce a navbar
    } else {
        navbar.style.top = "-60px"; // Esconde a navbar novamente
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("user-modal");
    const btnNovo = document.getElementById("new-user");
    const btnEditar = document.getElementById("edit-user");
    const spanClose = document.querySelector(".modal .close");

    const inputNome = document.getElementById("nome");
    const inputCpf = document.getElementById("cpf");
    const inputEmail = document.getElementById("email");
    const inputTelefone = document.getElementById("telefone");
    const inputNascimento = document.getElementById("nascimento");

    // Abrir modal para novo usuário (limpa os campos)
    btnNovo.onclick = () => {
        limparFormulario();
        modal.querySelector("h2").textContent = "Novo Usuário";
        modal.classList.add("show");
    };

    // Abrir modal para edição de usuário
    btnEditar.onclick = () => {
        const checkboxSelecionada = document.querySelector('table input[type="checkbox"]:checked');
        if (!checkboxSelecionada) return;

        const row = checkboxSelecionada.closest("tr");
        const cells = row.querySelectorAll("td");

        // Preenche o formulário com os dados da tabela
        inputNome.value = cells[2].textContent.trim();
        inputCpf.value = cells[3].textContent.trim();
        inputEmail.value = cells[4].textContent.trim();
        inputTelefone.value = cells[5].textContent.trim();
        inputNascimento.value = formatarDataParaInput(cells[6].textContent.trim());

        modal.querySelector("h2").textContent = "Editar Usuário";
        modal.classList.add("show");
    };

    // Fechar modal ao clicar no X
    spanClose.onclick = () => {
        modal.classList.remove("show");
    };

    // Fechar modal ao clicar fora
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.classList.remove("show");
        }
    };

    function limparFormulario() {
        inputNome.value = "";
        inputCpf.value = "";
        inputEmail.value = "";
        inputTelefone.value = "";
        inputNascimento.value = "";
    }

    function formatarDataParaInput(data) {
        // Caso venha no formato dd/mm/yyyy e precise converter para yyyy-mm-dd
        if (data.includes("/")) {
            const [dia, mes, ano] = data.split("/");
            return `${ano}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;
        }
        return data;
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const checkboxes = document.querySelectorAll('table input[type="checkbox"]');
    const editBtn = document.getElementById("edit-user");
    const deleteBtn = document.getElementById("delete-user");

    function updateButtons() {
        const checkedCount = document.querySelectorAll('table input[type="checkbox"]:checked').length;

        if (checkedCount === 0) {
            editBtn.disabled = true;
            deleteBtn.disabled = true;
        } else if (checkedCount === 1) {
            editBtn.disabled = false;
            deleteBtn.disabled = false;
        } else {
            editBtn.disabled = true;
            deleteBtn.disabled = false;
        }
    }

    // Monitorar todas as checkboxes
    checkboxes.forEach(cb => cb.addEventListener("change", updateButtons));

    updateButtons(); // Inicializa o estado
});

document.getElementById("user-form").addEventListener("submit", async function (e) {

    e.preventDefault(); // Impede o envio do formulário padrão

    const usuario = {
        nome: document.getElementById("nome").value,
        cpf: document.getElementById("cpf").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,
        nascimento: document.getElementById("nascimento").value
    };

    try {

        // Enviar os dados do usuário para o backend
        // Depois verificar se precisa do localhost ou não
        const response = await fetch("http://localhost:8080/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        });

        if (!response.status === 201) {

            alert("Usuário cadastradp com sucesso!");
            document.getElementById("user-form").reset();
            window.location.reload(); // Recarrega a página para atualizar a tabela
        } else {
            alert("Erro ao cadastrar usuário. Tente novamente.");
        }
    } catch (error) {
        alert("Erro ao se comunicar com o servidor. Verifique a conexão.");
        console.error("Erro:", error);
    }

    // Fechar o modal
    //document.getElementById("user-moda

});

async function buscarUsuario() {
    const cpf = document.getElementById("search-input").value;

    try {
        const response = await fetch(`http://localhost:8080/usuarios/cpf=${cpf}`);
        if (response.ok) {
            const usuario = await response.json();

        }
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        alert("Erro ao buscar usuário. Verifique a conexão.");
    };

};

async function listarUsuarios() {
    try {
        const response = await fetch("http://localhost:8080/usuarios");
        if (response.ok) {
            const usuarios = await response.json();
            const tabela = document.getElementById("user-table");
            tabela.innerHTML = ""; // Limpa a tabela antes de popular
            usuarios.forEach(usuario => {
                const row = tabela.insertRow();
                row.innerHTML = `
                    <td><input type="checkbox"></td>
                    <td>${usuario.id}</td>
                    <td>${usuario.nome}</td>
                    <td>${usuario.cpf}</td>
                    <td>${usuario.email}</td>
                    <td>${usuario.telefone}</td>
                    <td>${new Date(usuario.data_nascimento).toLocaleDateString()}</td>
                `;
            });
        } else {
            console.error("Erro ao listar usuários:", response.statusText);
            alert("Erro ao carregar usuários. Tente novamente.");
        }
    } catch (error) {
        console.error("Erro ao se comunicar com o servidor:", error);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    listarUsuarios();
});

