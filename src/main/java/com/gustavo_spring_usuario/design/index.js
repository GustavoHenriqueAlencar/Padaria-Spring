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
    const clientesBtn = document.getElementById("usuario-btn");
    const produtosBtn = document.getElementById("produtos-btn");
    const pedidosBtn = document.getElementById("compras-btn");

    const clientesCrud = document.getElementById("usuario-crud");
    const produtosCrud = document.getElementById("produtos-crud");
    const pedidosCrud = document.getElementById("compras-crud");

    // Função para alterar o botão ativo e o conteúdo exibido
    function selecionarBotao(btn, crudSection) {
        // Remover a classe active de todos os botões e seções
        clientesBtn.classList.remove("active");
        produtosBtn.classList.remove("active");
        pedidosBtn.classList.remove("active");

        clientesCrud.style.display = "none";
        produtosCrud.style.display = "none";
        pedidosCrud.style.display = "none";

        // Adicionar a classe active ao botão clicado
        btn.classList.add("active");

        // Mostrar a seção do CRUD correspondente
        crudSection.style.display = "block";
    }

    // Quando o botão "Clientes" for clicado
    clientesBtn.addEventListener("click", () => {
        selecionarBotao(clientesBtn, clientesCrud);
    });

    // Quando o botão "Produtos" for clicado
    produtosBtn.addEventListener("click", () => {
        selecionarBotao(produtosBtn, produtosCrud);
    });

    // Quando o botão "Pedidos" for clicado
    pedidosBtn.addEventListener("click", () => {
        selecionarBotao(pedidosBtn, pedidosCrud);
    });

    // Definir o estado inicial como "Clientes"
    selecionarBotao(clientesBtn, clientesCrud);
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

        modal.setAttribute("data-user-cpf", inputCpf.value);

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

document.getElementById("user-form").addEventListener("submit", async function (e) {

        e.preventDefault(); // Impede o envio do formulário padrão

        const usuario = {
            nome: document.getElementById("nome").value,
            cpf: document.getElementById("cpf").value,
            email: document.getElementById("email").value,
            telefone: document.getElementById("telefone").value,
            dataNascimento: document.getElementById("nascimento").value
        };

       // const id = document.getElementById("user-modal").getAttribute("data-user-id");
    const cpf = document.getElementById("user-modal").getAttribute("data-user-cpf"); // Obtém o CPF do usuário a ser editado


    try {

            let response;

            if (cpf) {
                response = await fetch(`http://localhost:8080/usuario?cpf=${cpf}`, {

                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(usuario)

                });

            } else {
                // Enviar os dados do usuário para o backend
                // Depois verificar se precisa do localhost ou não
                response = await fetch("http://localhost:8080/usuario", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(usuario)
                });
            }

            if (response.ok) {
                alert(cpf ? "Usuário editado com sucesso!" : "Usuário cadastrado com sucesso!");
                document.getElementById("user-form").reset();
                window.location.reload(); // Recarrega a página para atualizar a tabela
            } else {
                alert("Erro ao processar a requisição. Tente novamente.");
            }

            // if (response.status === 201) {
            //
            //     alert("Usuário cadastrado com sucesso!");
            //     document.getElementById("user-form").reset();
            //     window.location.reload(); // Recarrega a página para atualizar a tabela
            // } else {
            //     alert("Erro ao cadastrar usuário. Tente novamente.");
            // }
        } catch
            (error) {
            alert("Erro ao se comunicar com o servidor. Verifique a conexão.");
            console.error("Erro:", error);
        }

        // Fechar o modal
        //document.getElementById("user-moda

    }
);



async function buscarUsuario() {
    const cpf = document.getElementById("search-input").value;

    try {
        const response = await fetch(`http://localhost:8080/usuario/cpf=${cpf}`);
        if (response.ok) {
            const usuario = await response.json();

        }
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        alert("Erro ao buscar usuário. Verifique a conexão.");
    }
    ;

};

async function listarUsuarios() {
    try {
        const response = await fetch("http://localhost:8080/usuario/all");
        if (response.ok) {
            const usuarios = await response.json();
            const tabelaBody = document.querySelector("#user-table tbody");
            tabelaBody.innerHTML = ""; // Limpa a tabela antes de popular
            usuarios.forEach(usuario => {
                const row = tabelaBody.insertRow();
                row.innerHTML = `
                    <td style="text-align: center;">
                        <label class="custom-checkbox">
                            <input type="checkbox">
                            <span class="checkmark"></span>
                        </label>
                    </td>
                    <td>${usuario.id}</td>
                    <td>${usuario.nome}</td>
                    <td>${usuario.cpf}</td>
                    <td>${usuario.email}</td>
                    <td>${usuario.telefone}</td>
                    <td>${new Date(usuario.dataNascimento).toLocaleDateString()}</td>
                `;

                checkboxCheck();
            });
        } else {
            console.error("Erro ao listar usuários:", response.statusText);
            alert("Erro ao carregar usuários. Tente novamente.");
        }
    } catch (error) {
        console.error("Erro ao se comunicar com o servidor:", error);
    }
};

document.getElementById("delete-user").addEventListener("click", async function () {
    const checkboxSelecionada = document.querySelector('table input[type="checkbox"]:checked');

    if (!checkboxSelecionada) {
        alert("Selecione um usuário para excluir.");
        return;
    }

    const row = checkboxSelecionada.closest("tr");
    const cells = row.querySelectorAll("td");

    const cpf = cells[3].textContent.trim();  // O CPF está na coluna 3

    if (confirm(`Você tem certeza que deseja excluir o usuário com CPF: ${cpf}?`)) {
        try {
            const response = await fetch(`http://localhost:8080/usuario?cpf=${cpf}`, {
                method: "DELETE"
            });

            if (response.ok) {
                alert("Usuário excluído com sucesso!");
                window.location.reload();  // Recarrega a página para atualizar a tabela
            } else {
                alert("Erro ao excluir o usuário. Tente novamente.");
            }
        } catch (error) {
            alert("Erro ao se comunicar com o servidor. Verifique a conexão.");
            console.error("Erro:", error);
        }
    }
});



document.addEventListener("DOMContentLoaded", () => {
    listarUsuarios();
});

async function checkboxCheck() {
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
};