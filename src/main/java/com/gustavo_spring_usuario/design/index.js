const API_BASE = window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "https://padaria-spring.onrender.com";

// Evento para sempre que mover o mouse no topo, abrir navbar
window.addEventListener("mousemove", function (event) {
    var navbar = document.getElementById("navbar");

    // Quando o mouse está a menos de 50px do topo, mostrar a navbar
    if (event.clientY < 50) {
        navbar.style.top = "0"; // Desce a navbar
    } else {
        navbar.style.top = "-60px"; // Esconde a navbar novamente
    }
});

// Evento para escutar os botões CRUD
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

// Evento para abrir Modal Usuario
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
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.classList.remove("show");
        }
    });

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

// Evento para abrir Modal Produto
document.addEventListener("DOMContentLoaded", () => {
    const modalProduto = document.getElementById("product-modal");
    const btnNovoProduto = document.getElementById("new-product");
    const btnEditarProduto = document.getElementById("edit-product");
    const spanCloseProduto = modalProduto.querySelector(".close");

    const inputNomeProduto = document.getElementById("nome-product");
    const inputPrecoProduto = document.getElementById("preco");


    // Abrir modal para novo produto (limpa os campos)
    btnNovoProduto.onclick = () => {
        limparFormulario();
        modalProduto.querySelector("h2").textContent = "Novo Produto";
        modalProduto.classList.add("show");
    };

    // Abrir modal para edição de usuário
    btnEditarProduto.onclick = () => {
        const checkboxSelecionada = document.querySelector('table input[type="checkbox"]:checked');
        if (!checkboxSelecionada) return;

        const row = checkboxSelecionada.closest("tr");
        const cells = row.querySelectorAll("td");

        // Preenche o formulário com os dados da tabela
        const idProduto = cells[1].textContent.trim();
        inputNomeProduto.value = cells[2].textContent.trim();
        inputPrecoProduto.value = cells[3].textContent.trim();


        modalProduto.setAttribute("data-product-id", idProduto);

        modalProduto.querySelector("h2").textContent = "Editar Produto";
        modalProduto.classList.add("show");
    };

    // Fechar modal ao clicar no X
    spanCloseProduto.onclick = () => {
        modalProduto.classList.remove("show");
    };

    // Fechar modal ao clicar fora
    window.addEventListener("click", (event) => {
        if (event.target === modalProduto) {
            modalProduto.classList.remove("show");
        }
    });

    function limparFormulario() {
        inputNomeProduto.value = "";
        inputPrecoProduto.value = "";
    }
});

// Evento para abrir Modal Compra
document.addEventListener("DOMContentLoaded", () => {
    const modalCompra = document.getElementById("purchase-modal");
    const btnNovoCompra = document.getElementById("new-purchase");
    const btnEditarCompra = document.getElementById("edit-purchase");
    const spanCloseCompra = modalCompra.querySelector(".close");

    const inputUsuarioId = document.getElementById("usuario-id");
    const inputProdutosId = document.getElementById("produtos-id");

    // Abrir modal para novo produto (limpa os campos)
    btnNovoCompra.onclick = () => {
        limparFormulario();
        modalCompra.querySelector("h2").textContent = "Nova Compra";
        modalCompra.classList.add("show");
        carregarUsuarios();
        carregarProdutos();

    };

    // Abrir modal para edição de compra
    btnEditarCompra.onclick = () => {
        const checkboxSelecionada = document.querySelector('table input[type="checkbox"]:checked');
        if (!checkboxSelecionada) return;

        const row = checkboxSelecionada.closest("tr");
        const cells = row.querySelectorAll("td");

        // Preenche o formulário com os dados da tabela
        const idCompra = cells[1].textContent.trim();
        inputUsuarioId.value = cells[2].textContent.trim();
        inputProdutosId.value = cells[3].textContent.trim();


        modalCompra.setAttribute("data-purchase-id", idCompra);

        modalCompra.querySelector("h2").textContent = "Editar Compra";
        modalCompra.classList.add("show");
    };

    // Fechar modal ao clicar no X
    spanCloseCompra.onclick = () => {
        modalCompra.classList.remove("show");
    };

    // Fechar modal ao clicar fora
    window.addEventListener("click", (event) => {
        if (event.target === modalCompra) {
            modalCompra.classList.remove("show");
        }
    });

    function limparFormulario() {
        inputUsuarioId.value  = "";
        inputProdutosId.value = "";
    }
});

async function carregarUsuarios() {
    const response = await fetch(`${API_BASE}/usuario/all`);
    if (response.ok) {
        const usuarios = await response.json();
        const select = document.getElementById("usuario-id");

        // limpa antes de popular
        select.innerHTML = '<option value="">Selecione um usuário</option>';

        usuarios.forEach(u => {
            const option = document.createElement("option");
            option.value = u.id;  // id do banco
            option.textContent = `${u.nome} (ID: ${u.id})`; // texto exibido
            select.appendChild(option);
        });
    }
}

// async function carregarProdutos() {
//     const response = await fetch("http://localhost:8080/padaria/all");
//     if (response.ok) {
//         const produtos = await response.json();
//         const select = document.getElementById("produtos-id");
//
//         select.innerHTML = "";
//
//         produtos.forEach(p => {
//             const option = document.createElement("option");
//             option.value = p.id;
//             option.textContent = `${p.nome} (R$${p.preco})`;
//             select.appendChild(option);
//         });
//     }
// }

async function carregarProdutos() {
    const response = await fetch(`${API_BASE}/padaria/all`);
    if (response.ok) {
        const produtos = await response.json();
        const container = document.getElementById("produtos-id");

        container.innerHTML = "";

        produtos.forEach(p => {
            const label = document.createElement("label");
            label.style.display = "block";
            label.innerHTML = `
                <input type="checkbox" name="produtos" value="${p.id}"> ${p.nome} (R$${p.preco})
            `;
            container.appendChild(label);
        });
    }
}

function getProdutosSelecionados() {
    return Array.from(document.querySelectorAll("#produtos-id input[type=checkbox]:checked"))
        .map(cb => Number(cb.value));
}

// Função fechar modal
function fecharFormulario(idModal) {
    const modal = document.getElementById(idModal);
    if (modal) {
        modal.classList.remove("show");
    }
}

// Evento para escutar sempre que uma checkbox é ativada para logica dos botões
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

// Função escutar checkboxes
function setupCheckboxHandler(tableId, editBtnId, deleteBtnId) {
    const checkboxes = document.querySelectorAll(`#${tableId} input[type="checkbox"]`);
    const editBtn = document.getElementById(editBtnId);
    const deleteBtn = document.getElementById(deleteBtnId);

    function updateButtons() {
        const checkedCount = document.querySelectorAll(`#${tableId} input[type="checkbox"]:checked`).length;

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

    checkboxes.forEach(cb => cb.addEventListener("change", updateButtons));

    updateButtons(); // inicializa
}


// Função para aplicar os filtros na barra de pesquisa (nos 3 CRUDS, não utiliza banco)
function aplicarFiltro(inputId, tableId) {
    const searchInput = document.getElementById(inputId);
    const table = document.getElementById(tableId).getElementsByTagName("tbody")[0];

    searchInput.addEventListener("input", () => {
        const filter = searchInput.value.toLowerCase();
        const rows = table.getElementsByTagName("tr");

        for (let row of rows) {
            const cells = row.getElementsByTagName("td");
            let match = false;
            for (let i = 1; i < cells.length; i++) {
                if (cells[i].textContent.toLowerCase().includes(filter)) {
                    match = true;
                    break;
                }
            }
            row.style.display = match ? "" : "none";
        }
    });
}

// Evento para ativar nos três CRUDs os filtros
document.addEventListener("DOMContentLoaded", () => {
    listarUsuarios();
    aplicarFiltro("search-input-usuario", "user-table");
    aplicarFiltro("search-input-produtos", "product-table");
    aplicarFiltro("search-input-pedidos", "purchase-table");
});


// Cadastrar e Editar usuario
// Evento para escutar o submit do form da modal (cadastrar e editar)
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
                response = await fetch(`${API_BASE}/usuario?cpf=${cpf}`, {

                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(usuario)

                });

            } else {
                // Enviar os dados do usuário para o backend
                // Depois verificar se precisa do localhost ou não
                response = await fetch(`${API_BASE}/usuario`, {
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
                fecharFormulario("user-modal")
                listarUsuarios();
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

// Buscar usuario
// Função para buscar usuário (Não está sendo utilizada)
async function buscarUsuario() {
    const cpf = document.getElementById("search-input").value;

    try {
        const response = await fetch(`${API_BASE}/usuario?cpf=${cpf}`);
        if (response.ok) {
            const usuario = await response.json();

        }
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        alert("Erro ao buscar usuário. Verifique a conexão.");
    }
    ;

};

// Listar usuario
// Função para listar os usuarios na tabela
async function listarUsuarios() {
    try {
        const response = await fetch(`${API_BASE}/usuario/all`);
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

                setupCheckboxHandler("user-table", "edit-user", "delete-user");
            });
        } else {
            console.error("Erro ao listar usuários:", response.statusText);
            alert("Erro ao carregar usuários. Tente novamente.");
        }
    } catch (error) {
        console.error("Erro ao se comunicar com o servidor:", error);
    }
};
// Evento para sempre que a página atualizar, listar os usuarios
document.addEventListener("DOMContentLoaded", () => {
    listarUsuarios();
});

// Deletar Usuario
// Evento para escutar o button deletar usuario
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
            const response = await fetch(`${API_BASE}/usuario?cpf=${cpf}`, {
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


// Cadastrar/Editar produto
document.getElementById("product-form").addEventListener("submit", async function (e) {

        e.preventDefault(); // Impede o envio do formulário padrão

        const produto = {
            nome: document.getElementById("nome-product").value,
            preco: document.getElementById("preco").value
        };

        // const id = document.getElementById("user-modal").getAttribute("data-user-id");

        const id = document.getElementById("product-modal").getAttribute("data-product-id");
        console.log(id);

        try {

            let response;

            if (id) {
                response = await fetch(`${API_BASE}/padaria?id=${id}`, {

                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(produto)

                });

            } else {
                // Enviar os dados do usuário para o backend
                // Depois verificar se precisa do localhost ou não
                response = await fetch(`${API_BASE}/padaria`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(produto)
                });
            }

            if (response.ok) {
                alert(id ? "Produto editado com sucesso!" : "Produto cadastrado com sucesso!");
                document.getElementById("product-form").reset();
                fecharFormulario("product-modal");
                listarProdutos();
            } else {
                alert("Erro ao processar a requisição. Tente novamente.");
            }

        } catch
            (error) {
            alert("Erro ao se comunicar com o servidor. Verifique a conexão.");
            console.error("Erro:", error);
        }

        // Fechar o modal
        //document.getElementById("user-moda

    }
);

// Buscar produto

// Listar produto
async function listarProdutos() {
    try {
        const response = await fetch(`${API_BASE}/padaria/all`);
        if (response.ok) {
            const produtos = await response.json();
            const tabelaBody = document.querySelector("#product-table tbody");
            tabelaBody.innerHTML = ""; // Limpa a tabela antes de popular
            produtos.forEach(produto => {
                const row = tabelaBody.insertRow();
                row.innerHTML = `
                    <td style="text-align: center;">
                        <label class="custom-checkbox">
                            <input type="checkbox">
                            <span class="checkmark"></span>
                        </label>
                    </td>
                    <td>${produto.id}</td>
                    <td>${produto.nome}</td>
                    <td>${produto.preco}</td>
                `;

                setupCheckboxHandler("product-table", "edit-product", "delete-product");
            });
        } else {
            console.error("Erro ao listar os produtos:", response.statusText);
            alert("Erro ao carregar os produtos. Tente novamente.");
        }
    } catch (error) {
        console.error("Erro ao se comunicar com o servidor:", error);
    }
};
// Evento para sempre que a página atualizar, listar os usuarios
document.addEventListener("DOMContentLoaded", () => {
    listarProdutos();
});

// Deletar produto
document.getElementById("delete-product").addEventListener("click", async function () {
    const checkboxSelecionada = document.querySelector('table input[type="checkbox"]:checked');

    if (!checkboxSelecionada) {
        alert("Selecione um usuário para excluir.");
        return;
    }

    const row = checkboxSelecionada.closest("tr");
    const cells = row.querySelectorAll("td");

    const id = cells[1].textContent.trim();

    if (confirm(`Você tem certeza que deseja excluir o Produto com ID: ${id}?`)) {
        try {
            const response = await fetch(`${API_BASE}/padaria?id=${id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                alert("Produto excluído com sucesso!");
                listarProdutos();
            } else {
                alert("Erro ao excluir o produto. Tente novamente.");
            }
        } catch (error) {
            alert("Erro ao se comunicar com o servidor. Verifique a conexão.");
            console.error("Erro:", error);
        }
    }
});

// Cadastrar/Editar compra
document.getElementById("purchase-form").addEventListener("submit", async function (e) {

        e.preventDefault(); // Impede o envio do formulário padrão

        const compra = {
            usuarioId: document.getElementById("usuario-id").value,
            produtosIds: getProdutosSelecionados()
        };

        // const id = document.getElementById("user-modal").getAttribute("data-user-id");

        const idCompra = document.getElementById("purchase-modal").getAttribute("data-purchase-id");

        try {

            let response;

            if (idCompra) {
                response = await fetch(`${API_BASE}/compra?id=${idCompra}`, {

                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(compra)

                });

            } else {
                // Enviar os dados da compra para o backend
                // Depois verificar se precisa do localhost ou não
                response = await fetch(`${API_BASE}/compra`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(compra)
                });
            }

            if (response.ok) {
                alert(idCompra ? "Compra editada com sucesso!" : "Compra cadastrada com sucesso!");
                document.getElementById("purchase-form").reset();
                fecharFormulario("purchase-modal");
                listarCompras();
            } else {
                alert("Erro ao processar a requisição. Tente novamente.");
            }

        } catch
            (error) {
            alert("Erro ao se comunicar com o servidor. Verifique a conexão.");
            console.error("Erro:", error);
        }

    }
);

// Buscar compra

// Listar compra
async function listarCompras() {
    try {
        const response = await fetch(`${API_BASE}/compra/all`);
        if (response.ok) {
            const compras = await response.json();
            const tabelaBody = document.querySelector("#purchase-table tbody");
            tabelaBody.innerHTML = ""; // Limpa a tabela antes de popular
            compras.forEach(compra => {
                const row = tabelaBody.insertRow();
                row.innerHTML = `
                    <td style="text-align: center;">
                        <label class="custom-checkbox">
                            <input type="checkbox">
                            <span class="checkmark"></span>
                        </label>
                    </td>
                    <td>${compra.id}</td>
                    <td>${compra.usuario.nome}</td>
                    <td>${compra.produtos.map(p => p.nome).join(", ")}</td>
                    <td>${compra.valorTotal}</td>
                    <td>${compra.dataCompra}</td>
                `;

                setupCheckboxHandler("purchase-table", "edit-purchase", "delete-purchase");
            });
        } else {
            console.error("Erro ao listar as compras:", response.statusText);
            alert("Erro ao carregar as compras. Tente novamente.");
        }
    } catch (error) {
        console.error("Erro ao se comunicar com o servidor:", error);
    }
};
// Evento para sempre que a página atualizar, listar os usuarios
document.addEventListener("DOMContentLoaded", () => {
    listarCompras();
});

// Deletar compra
document.getElementById("delete-purchase").addEventListener("click", async function () {
    const checkboxSelecionada = document.querySelector('table input[type="checkbox"]:checked');

    if (!checkboxSelecionada) {
        alert("Selecione um usuário para excluir.");
        return;
    }

    const row = checkboxSelecionada.closest("tr");
    const cells = row.querySelectorAll("td");

    const id = cells[1].textContent.trim();

    if (confirm(`Você tem certeza que deseja excluir a Compra com ID: ${id}?`)) {
        try {
            const response = await fetch(`${API_BASE}/compra?id=${id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                alert("Produto excluído com sucesso!");
                listarCompras();
            } else {
                alert("Erro ao excluir o produto. Tente novamente.");
            }
        } catch (error) {
            alert("Erro ao se comunicar com o servidor. Verifique a conexão.");
            console.error("Erro:", error);
        }
    }
});
