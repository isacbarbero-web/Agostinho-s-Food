        /* ==========================================================================
           ESTADO DA APLICAÇÃO
           ========================================================================== */
        let carrinho = [];
        let categoriaAtual = 'todos';
        let produtos = [];
        let categorias = [];
        let cupons = [];
        let cupomAplicado = null;
        let taxaEntrega;
        let metaFreteGratis;
        let proximoIdCarrinho = 1;
        let ultimoPedido = "";
        let referenciaPedido = "";

        // Estado do Modal de Customização
        let produtoModalAtual = null;
        let quantidadeModal = 1;
        let opcionaisSelecionadosModal = [];

        /* ==========================================================================
           INICIALIZAÇÃO & EVENTOS
           ========================================================================== */
        document.addEventListener("DOMContentLoaded", () => {
            document.getElementById("cartTriggerBtn").addEventListener("click", abrirCarrinho);
            document.getElementById("cartDrawerBackdrop").addEventListener("click", (evento) => {
                if (evento.target.id === "cartDrawerBackdrop") fecharCarrinho();
            });
            document.getElementById("searchInput").addEventListener("input", () => {
                if (taxaEntrega !== undefined) filtrarCategoria(categoriaAtual);
            });
            carregarCardapio();
        });

        async function carregarCardapio() {
            const grid = document.getElementById("productsGrid");
            grid.textContent = "Carregando cardápio…";
            try {
                const resposta = await fetch("pages/cardapio.php");
                if (!resposta.ok) throw new Error("Cardápio indisponível.");
                const dados = await resposta.json();
                produtos = dados.produtos;
                categorias = dados.categorias;
                cupons = dados.cupons;
                taxaEntrega = dados.taxa_entrega;
                metaFreteGratis = dados.meta_frete_gratis;

                const icones = {
                    "Hambúrgueres": "hamburger",
                    "Pizzas": "pizza-slice",
                    "Porções": "drumstick-bite",
                    "Bebidas": "glass-cheers",
                    "Sobremesas": "ice-cream"
                };
                const filtros = document.getElementById("categoryFilters");
                categorias.forEach(categoria => {
                    const botao = document.createElement("button");
                    const icone = document.createElement("i");
                    icone.className = "fas fa-" + (icones[categoria.nome] || "border-all");
                    botao.className = "cat-item";
                    botao.dataset.categoria = categoria.id;
                    botao.appendChild(icone);
                    botao.append(" " + categoria.nome);
                    botao.addEventListener("click", () => filtrarCategoria(categoria.id));
                    filtros.appendChild(botao);
                });

                const ofertas = document.getElementById("couponList");
                cupons.forEach(cupom => {
                    const botao = document.createElement("button");
                    const codigo = document.createElement("strong");
                    codigo.textContent = cupom.codigo;
                    botao.className = "coupon-chip";
                    botao.append(cupom.percentual + "% OFF: ", codigo);
                    botao.addEventListener("click", () => copiarCupom(cupom.codigo));
                    ofertas.appendChild(botao);
                });
                filtrarCategoria("todos");
                atualizarCarrinhoUI();
            } catch (erro) {
                grid.textContent = "Não foi possível carregar o cardápio. ";
                const botao = document.createElement("button");
                botao.textContent = "Tentar novamente";
                botao.addEventListener("click", carregarCardapio);
                grid.appendChild(botao);
            }
        }

        /* ==========================================================================
           RENDERIZAÇÃO DO CARDÁPIO
           ========================================================================== */
        function renderizarCardapio(lista) {
            const grid = document.getElementById("productsGrid");
            grid.innerHTML = "";

            if (lista.length === 0) {
                grid.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
                        <i class="fas fa-search" style="font-size: 2.5rem; margin-bottom: 10px; opacity: 0.5;"></i>
                        <p>Nenhum item encontrado com o termo pesquisado.</p>
                    </div>
                `;
                return;
            }

            lista.forEach(p => {
                const card = document.createElement("div");
                card.className = "product-card";
                card.innerHTML = `
                    <div class="product-img-wrapper">
                        <img loading="lazy">
                        <div class="rating-pill">
                            <i class="fas fa-star"></i> ${p.rating.toFixed(1)}
                        </div>
                    </div>
                    <div class="card-body">
                        <h3 class="card-title"></h3>
                        <p class="card-desc"></p>
                        <div class="card-footer">
                            <div class="card-price">${formatarPreco(emCentavos(p.preco))}</div>
                            <div class="btn-group">
                                <button class="btn-opt">Opções</button>
                                <button class="btn-add"><i class="fas fa-plus"></i> Add</button>
                            </div>
                        </div>
                    </div>
                `;
                const imagem = card.querySelector("img");
                imagem.src = p.imagem;
                imagem.alt = p.nome;
                card.querySelector(".card-title").textContent = p.nome;
                card.querySelector(".card-desc").textContent = p.descricao;
                if (p.badge) {
                    const selo = document.createElement("span");
                    selo.className = "card-badge";
                    if (["Mais Vendido", "Favorito", "Sobremesa VIP"].includes(p.badge)) {
                        selo.classList.add("highlight");
                    } else if (["Destaque", "Mais Pedido", "Delícia"].includes(p.badge)) {
                        selo.classList.add("gold");
                    }
                    selo.textContent = p.badge;
                    card.prepend(selo);
                }
                const opcoes = card.querySelector(".btn-opt");
                if (p.opcionais.length > 0) {
                    opcoes.addEventListener("click", () => abrirModalProduto(p.id));
                } else {
                    opcoes.remove();
                }
                card.querySelector(".btn-add").addEventListener("click", () => adicionarRapido(p.id));
                grid.appendChild(card);
            });
        }

        /* ==========================================================================
           FILTRAGEM DE CATEGORIAS
           ========================================================================== */
        function filtrarCategoria(categoria) {
            categoriaAtual = categoria;

            document.querySelectorAll(".cat-item").forEach(botao => {
                botao.classList.toggle("active", botao.dataset.categoria === String(categoria));
            });
            if (taxaEntrega === undefined) return;
            const termo = document.getElementById("searchInput").value.toLowerCase().trim();
            const filtrados = produtos.filter(p =>
                (categoria === "todos" || p.categoria === categoria) &&
                (p.nome.toLowerCase().includes(termo) || p.descricao.toLowerCase().includes(termo))
            );

            const selecionada = categorias.find(grupo => grupo.id === categoria);
            document.getElementById("categoryTitle").textContent = selecionada ? selecionada.nome : "Nosso Cardápio";
            renderizarCardapio(filtrados);
        }

        /* ==========================================================================
           MODAL DE OPÇÕES DE PRODUTO
           ========================================================================== */
        function abrirModalProduto(id) {
            produtoModalAtual = produtos.find(p => p.id === id);
            if (!produtoModalAtual) return;

            quantidadeModal = 1;
            opcionaisSelecionadosModal = [];

            document.getElementById("modalImg").src = produtoModalAtual.imagem;
            document.getElementById("modalTitle").textContent = produtoModalAtual.nome;
            document.getElementById("modalDesc").textContent = produtoModalAtual.descricao;
            document.getElementById("modalObs").value = "";
            document.getElementById("modalQtyVal").textContent = "1";

            // Renderizar adicionais
            const extrasList = document.getElementById("modalExtrasList");
            extrasList.innerHTML = "";

            if (!produtoModalAtual.opcionais || produtoModalAtual.opcionais.length === 0) {
                extrasList.innerHTML = `<p style="font-size:0.83rem; color:var(--text-muted);">Este item não possui adicionais.</p>`;
            } else {
                produtoModalAtual.opcionais.forEach(opt => {
                    const div = document.createElement("label");
                    div.className = "extra-item";
                    div.innerHTML = `
                        <div class="extra-left">
                            <input type="checkbox">
                            <span></span>
                        </div>
                        <span class="extra-price">+ R$ ${opt.preco.toFixed(2).replace('.', ',')}</span>
                    `;
                    div.querySelector("input").addEventListener("change", () => toggleOpcionalModal(opt.id));
                    div.querySelector("span").textContent = opt.nome;
                    extrasList.appendChild(div);
                });
            }

            atualizarPrecoTotalModal();
            document.getElementById("productModal").classList.add("active");
        }

        function fecharModalProduto() {
            document.getElementById("productModal").classList.remove("active");
        }

        function toggleOpcionalModal(optId) {
            const opt = produtoModalAtual.opcionais.find(o => o.id === optId);
            if (!opt) return;

            const idx = opcionaisSelecionadosModal.findIndex(o => o.id === optId);
            if (idx > -1) {
                opcionaisSelecionadosModal.splice(idx, 1);
            } else {
                opcionaisSelecionadosModal.push(opt);
            }
            atualizarPrecoTotalModal();
        }

        function alterarQtdModal(mudanca) {
            quantidadeModal += mudanca;
            if (quantidadeModal < 1) quantidadeModal = 1;
            document.getElementById("modalQtyVal").textContent = quantidadeModal;
            atualizarPrecoTotalModal();
        }

        function atualizarPrecoTotalModal() {
            if (!produtoModalAtual) return;
            const somaExtras = opcionaisSelecionadosModal.reduce((acc, o) => acc + o.preco, 0);
            const total = (produtoModalAtual.preco + somaExtras) * quantidadeModal;
            document.getElementById("modalTotalPrice").textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
        }

        function confirmarAdicaoModal() {
            if (!produtoModalAtual) return;

            const obs = document.getElementById("modalObs").value.trim();
            const somaExtras = opcionaisSelecionadosModal.reduce((acc, o) => acc + o.preco, 0);
            const precoUnitarioFinal = produtoModalAtual.preco + somaExtras;

            carrinho.push({
                idCart: proximoIdCarrinho++,
                idProduto: produtoModalAtual.id,
                nome: produtoModalAtual.nome,
                imagem: produtoModalAtual.imagem,
                precoUnitarioFinal: precoUnitarioFinal,
                quantidade: quantidadeModal,
                extras: [...opcionaisSelecionadosModal],
                observacao: obs
            });

            fecharModalProduto();
            atualizarCarrinhoUI();
            exibirToast(`Adicionado ao pedido: ${produtoModalAtual.nome}`, 'shopping-bag');
        }

        /* ==========================================================================
           ADIÇÃO RÁPIDA (SEM MODAL)
           ========================================================================== */
        function adicionarRapido(id) {
            const prod = produtos.find(p => p.id === id);
            if (!prod) return;

            // Verificar se já existe exatamente esse produto sem adicionais no carrinho
            const existente = carrinho.find(item => item.idProduto === id && item.extras.length === 0 && !item.observacao);

            if (existente) {
                existente.quantidade += 1;
            } else {
                carrinho.push({
                    idCart: proximoIdCarrinho++,
                    idProduto: prod.id,
                    nome: prod.nome,
                    imagem: prod.imagem,
                    precoUnitarioFinal: prod.preco,
                    quantidade: 1,
                    extras: [],
                    observacao: ""
                });
            }

            atualizarCarrinhoUI();
            exibirToast(`${prod.nome} adicionado!`, 'check-circle');
        }

        /* ==========================================================================
           CONTROLE DO CARRINHO LATERAL
           ========================================================================== */
        function abrirCarrinho() {
            document.getElementById("cartDrawerBackdrop").classList.add("active");
        }

        function fecharCarrinho() {
            if (document.getElementById("checkoutBtn").disabled) return;
            document.getElementById("cartDrawerBackdrop").classList.remove("active");
        }

        function alterarQtdCarrinho(idCart, mudanca) {
            const item = carrinho.find(i => i.idCart === idCart);
            if (item) {
                item.quantidade += mudanca;
                if (item.quantidade <= 0) {
                    carrinho = carrinho.filter(i => i.idCart !== idCart);
                }
            }
            atualizarCarrinhoUI();
        }

        function removerItemCarrinho(idCart) {
            carrinho = carrinho.filter(i => i.idCart !== idCart);
            atualizarCarrinhoUI();
            exibirToast("Item removido do carrinho", 'trash');
        }

        /* ==========================================================================
           ATUALIZAÇÃO DE INTERFACE E CÁLCULOS DO CARRINHO
           ========================================================================== */
        function atualizarCarrinhoUI() {
            // Animação no botão do carrinho
            const cartBtn = document.getElementById("cartTriggerBtn");
            cartBtn.classList.add("pulse");
            setTimeout(() => cartBtn.classList.remove("pulse"), 400);

            // Quantidade total de itens
            const qtdTotal = carrinho.reduce((acc, i) => acc + i.quantidade, 0);
            document.getElementById("cartBadge").textContent = qtdTotal;

            // Lista de itens no Drawer
            const itemsContainer = document.getElementById("drawerCartItems");
            itemsContainer.innerHTML = "";

            if (carrinho.length === 0) {
                itemsContainer.innerHTML = `
                    <div style="text-align: center; padding: 60px 20px; color: var(--text-muted);">
                        <i class="fas fa-shopping-basket" style="font-size: 3rem; margin-bottom: 12px; opacity: 0.3;"></i>
                        <p style="font-weight: 700;">Seu carrinho está vazio.</p>
                        <p style="font-size: 0.85rem;">Adicione delícias do cardápio para fazer seu pedido!</p>
                    </div>
                `;
            } else {
                carrinho.forEach(item => {
                    const row = document.createElement("div");
                    row.className = "cart-item-row";

                    let extrasText = item.extras.map(e => e.nome).join(", ");
                    if (item.observacao) {
                        extrasText += (extrasText ? " | Obs: " : "Obs: ") + item.observacao;
                    }

                    row.innerHTML = `
                        <img class="cart-item-img">
                        <div class="cart-item-details">
                            <div class="cart-item-name"></div>
                            ${extrasText ? '<div class="cart-item-extras"></div>' : ''}
                            <div class="cart-item-price">${formatarPreco(emCentavos(item.precoUnitarioFinal) * item.quantidade)}</div>
                            <div class="cart-item-controls">
                                <button onclick="alterarQtdCarrinho(${item.idCart}, -1)">-</button>
                                <span>${item.quantidade}</span>
                                <button onclick="alterarQtdCarrinho(${item.idCart}, 1)">+</button>
                            </div>
                        </div>
                        <button class="remove-item-btn" onclick="removerItemCarrinho(${item.idCart})">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    `;
                    const imagem = row.querySelector("img");
                    imagem.src = item.imagem;
                    imagem.alt = item.nome;
                    row.querySelector(".cart-item-name").textContent = item.nome;
                    if (extrasText) row.querySelector(".cart-item-extras").textContent = extrasText;
                    itemsContainer.appendChild(row);
                });
            }

            const { subtotal, desconto, frete, total } = calcularResumo();
            const shippingText = document.getElementById("shippingText");
            const progressBar = document.getElementById("progressBarFill");

            if (subtotal >= metaFreteGratis) {
                shippingText.textContent = "🎉 Você ganhou Frete GRÁTIS!";
                progressBar.style.width = "100%";
            } else {
                shippingText.textContent = "Adicione " + formatarPreco(metaFreteGratis - subtotal) + " para Frete Grátis";
                progressBar.style.width = (subtotal / metaFreteGratis * 100) + "%";
            }
            document.getElementById("subtotalVal").textContent = formatarPreco(subtotal);
            document.getElementById("discountVal").textContent = "- " + formatarPreco(desconto);
            document.getElementById("shippingVal").textContent = frete === 0 ? "GRÁTIS" : formatarPreco(frete);
            document.getElementById("totalVal").textContent = formatarPreco(total);
        }

        function emCentavos(valor) {
            return Math.round(valor * 100);
        }

        function formatarPreco(centavos) {
            return "R$ " + (centavos / 100).toFixed(2).replace(".", ",");
        }

        function calcularResumo() {
            let subtotal = 0;
            carrinho.forEach(item => {
                subtotal += emCentavos(item.precoUnitarioFinal) * item.quantidade;
            });
            const desconto = cupomAplicado ? Math.round(subtotal * cupomAplicado.percentual / 100) : 0;
            const frete = subtotal >= metaFreteGratis || carrinho.length === 0 ? 0 : taxaEntrega;
            return { subtotal, desconto, frete, total: subtotal - desconto + frete };
        }

        /* ==========================================================================
           CUPONS E TROCO
           ========================================================================== */
        function aplicarCupom() {
            if (taxaEntrega === undefined) {
                exibirToast("Aguarde o carregamento do cardápio.", "exclamation-circle");
                return;
            }
            const codigo = document.getElementById("couponInput").value.trim().toUpperCase();
            cupomAplicado = cupons.find(cupom => cupom.codigo.toUpperCase() === codigo);
            if (cupomAplicado) {
                exibirToast("Cupom de " + cupomAplicado.percentual + "% aplicado!", "ticket-alt");
            } else if (codigo !== "") {
                exibirToast("Cupom inválido!", "exclamation-circle");
            }
            atualizarCarrinhoUI();
        }

        function copiarCupom(codigo) {
            document.getElementById("couponInput").value = codigo;
            aplicarCupom();
            abrirCarrinho();
        }

        function toggleTrocoInput() {
            const metodo = document.getElementById("paymentMethod").value;
            const changeInput = document.getElementById("changeInput");
            if (metodo === "Dinheiro") {
                changeInput.style.display = "block";
            } else {
                changeInput.style.display = "none";
            }
        }

        /* ==========================================================================
           FINALIZAÇÃO E ENVIO VIA WHATSAPP
           ========================================================================== */
        function lerTroco(valor) {
            // Aceita R$ 50,00, 50,00 e 50.
            const texto = valor.replace(/^R\$\s*/, "").trim();
            if (!/^\d+(?:[,.]\d{1,2})?$/.test(texto)) return null;
            const centavos = emCentavos(Number(texto.replace(",", ".")));
            return centavos <= 9999999999 ? centavos : null;
        }

        function montarMensagem(pedido, resumo) {
            let msg = "*NOVO PEDIDO - AGOSTINHO'S FOOD*\n\n";
            msg += "*Cliente:* " + pedido.nome + "\n";
            msg += "*Endereço:* " + pedido.endereco + "\n";
            msg += "*Forma de Pagamento:* " + pedido.pagamento + "\n";
            if (pedido.troco !== null) {
                msg += "*Troco para:* " + formatarPreco(pedido.troco) + "\n";
            }
            msg += "\n*ITENS DO PEDIDO:*\n";

            carrinho.forEach(item => {
                const valorItem = formatarPreco(emCentavos(item.precoUnitarioFinal) * item.quantidade);
                msg += "• *" + item.quantidade + "x " + item.nome + "* - " + valorItem + "\n";
                if (item.extras.length > 0) {
                    msg += "   Adicionais: " + item.extras.map(extra => extra.nome).join(", ") + "\n";
                }
                if (item.observacao) msg += "   Obs: " + item.observacao + "\n";
            });

            msg += "\n*RESUMO DA COMPRA:*\nSubtotal: " + formatarPreco(resumo.subtotal) + "\n";
            if (cupomAplicado) {
                msg += "Cupom (" + cupomAplicado.codigo + "): -" + formatarPreco(resumo.desconto) + "\n";
            }
            msg += "Taxa de Entrega: " + (resumo.frete === 0 ? "GRÁTIS" : formatarPreco(resumo.frete)) + "\n";
            msg += "*TOTAL FINAL: " + formatarPreco(resumo.total) + "*";
            return msg;
        }

        async function finalizarPedidoWhatsApp() {
            if (carrinho.length === 0) {
                exibirToast("Seu carrinho está vazio!", "shopping-bag");
                return;
            }

            const nome = document.getElementById("clientName").value.trim();
            const endereco = document.getElementById("clientAddress").value.trim();
            const pagamento = document.getElementById("paymentMethod").value;
            const campoTroco = document.getElementById("changeInput").value.trim();

            if (!nome || !endereco) {
                exibirToast("Preencha nome e endereço de entrega!", "exclamation-circle");
                return;
            }
            let troco = null;
            if (pagamento === "Dinheiro" && campoTroco !== "") {
                troco = lerTroco(campoTroco);
                if (troco === null) {
                    exibirToast("Informe um valor válido para troco, como R$ 50,00.", "exclamation-circle");
                    return;
                }
            }

            const resumo = calcularResumo();
            const pedido = {
                nome, endereco, pagamento, troco,
                cupom: cupomAplicado ? cupomAplicado.codigo : "",
                total_centavos: resumo.total,
                itens: carrinho.map(item => ({
                    id_produto: item.idProduto,
                    quantidade: item.quantidade,
                    preco_unitario_centavos: emCentavos(item.precoUnitarioFinal),
                    observacao: item.observacao,
                    adicionais: item.extras.map(extra => extra.id)
                }))
            };
            const carga = JSON.stringify(pedido);
            if (carga !== ultimoPedido) {
                ultimoPedido = carga;
                referenciaPedido = Date.now() + "-" + Math.random();
            }
            pedido.referencia = referenciaPedido;
            const mensagem = montarMensagem(pedido, resumo);

            const controles = document.querySelectorAll("#cartDrawerBackdrop button, #cartDrawerBackdrop input, #cartDrawerBackdrop select");
            const status = document.getElementById("checkoutStatus");
            controles.forEach(controle => { controle.disabled = true; });
            document.getElementById("whatsappLink").hidden = true;
            status.textContent = "Registrando o pedido…";

            try {
                const resposta = await fetch("pages/salvar-pedido.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(pedido)
                });
                const dados = await resposta.json();
                if (!resposta.ok) {
                    status.textContent = dados.erro;
                    return;
                }

                const link = document.getElementById("whatsappLink");
                link.href = "https://wa.me/" + dados.whatsapp + "?text=" +
                    encodeURIComponent("*Pedido #" + dados.id_pedido + "*\n" + mensagem);
                link.hidden = false;
                status.textContent = "Pedido #" + dados.id_pedido + " registrado. Confira e envie a mensagem no WhatsApp.";
                carrinho = [];
                cupomAplicado = null;
                document.getElementById("couponInput").value = "";
                ultimoPedido = "";
                atualizarCarrinhoUI();
                window.location.href = link.href;
            } catch (erro) {
                status.textContent = "Não foi possível confirmar o registro. Tente novamente.";
            } finally {
                controles.forEach(controle => { controle.disabled = false; });
            }
        }

        /* ==========================================================================
           SISTEMA DE TOAST NOTIFICATIONS
           ========================================================================== */
        function exibirToast(mensagem, icone = 'info-circle') {
            const container = document.getElementById("toastContainer");
            const toast = document.createElement("div");
            toast.className = "toast";
            toast.innerHTML = `
                <i class="fas fa-${icone}"></i>
                <span></span>
            `;
            toast.querySelector("span").textContent = mensagem;
            container.appendChild(toast);

            setTimeout(() => {
                toast.remove();
            }, 3000);
        }
