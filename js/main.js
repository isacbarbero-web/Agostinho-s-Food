const produtos = [
            {
                id: 1,
                nome: "Agostinho Smash Burguer",
                categoria: "hamburgueres",
                preco: 32.90,
                descricao: "Dois hambúrgueres smash 100g de fraldinha, cheddar duplo derretido, bacon crocante em cubos e maionese artesanal da casa.",
                imagem: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
                badge: "Mais Vendido",
                badgeColor: "highlight",
                rating: 4.9,
                opcionais: [
                    { id: "opt1", nome: "Queijo Cheddar Extra", preco: 4.50 },
                    { id: "opt2", nome: "Bacon Crocante Extra", preco: 5.00 },
                    { id: "opt3", nome: "Molho Especial Agostinho", preco: 3.50 }
                ]
            },
            {
                id: 2,
                nome: "X-Salada Tradicional Gourmet",
                categoria: "hamburgueres",
                preco: 24.90,
                descricao: "Hambúrguer artesanal 160g, queijo prato fatiado, alface americana fresca, tomate maduro e maionese temperada no pão brioche.",
                imagem: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80",
                badge: "Clássico",
                badgeColor: "",
                rating: 4.8,
                opcionais: [
                    { id: "opt1", nome: "Hambúrguer Adicional 160g", preco: 9.00 },
                    { id: "opt2", nome: "Ovo Frito na Manteiga", preco: 3.00 }
                ]
            },
            {
                id: 3,
                nome: "Burguer Monster Bacon",
                categoria: "hamburgueres",
                preco: 38.90,
                descricao: "Triple burguer 300g de carne, muito bacon crisp, cebola empanada super crocante e molho barbecue defumado.",
                imagem: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80",
                badge: "Destaque",
                badgeColor: "gold",
                rating: 5.0,
                opcionais: [
                    { id: "opt1", nome: "Pequena porção de batata de acompanhamento", preco: 8.00 }
                ]
            },
            {
                id: 4,
                nome: "Pizza Calabresa Especial",
                categoria: "pizzas",
                preco: 49.90,
                descricao: "Calabresa artesanal fatiada fina, cebola roxa caramelizada, azeitonas azapa, molho de tomate pelado e orégano fresco.",
                imagem: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80",
                badge: "Favorito",
                badgeColor: "highlight",
                rating: 4.9,
                opcionais: [
                    { id: "opt1", nome: "Borda Recheada de Catupiry Original", preco: 10.00 },
                    { id: "opt2", nome: "Borda Recheada de Cheddar", preco: 10.00 }
                ]
            },
            {
                id: 5,
                nome: "Pizza 4 Queijos Premium",
                categoria: "pizzas",
                preco: 54.90,
                descricao: "Combinação perfeita de muçarela especial, gorgonzola suave, provolone defumado e o legítimo catupiry.",
                imagem: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&auto=format&fit=crop&q=80",
                badge: "Chef",
                badgeColor: "",
                rating: 4.8,
                opcionais: [
                    { id: "opt1", nome: "Borda Recheada de Catupiry", preco: 10.00 }
                ]
            },
            {
                id: 6,
                nome: "Batata Frita Suprema Cheddar & Bacon",
                categoria: "porcoes",
                preco: 29.90,
                descricao: "Porção generosa de 500g de batata frita bem crocante por fora e macia por dentro, coberta com creme de cheddar e bacon.",
                imagem: "https://www.receitasja.com.br/wp-content/uploads/2026/06/Batata-frita-com-cheddar-e-bacon-1024x576.jpg",
                badge: "Mais Pedido",
                badgeColor: "gold",
                rating: 4.9,
                opcionais: [
                    { id: "opt1", nome: "Molho de Alho Extra", preco: 3.00 }
                ]
            },
            {
                id: 7,
                nome: "Frango a Passarinho Crocante",
                categoria: "porcoes",
                preco: 36.90,
                descricao: "Cortes de frango marinados em ervas finas, fritos até dourarem perfeitamente, polvilhados com alho crocante e salsinha.",
                imagem: "https://images.unsplash.com/photo-1562967914-608f82629710?w=600&auto=format&fit=crop&q=80",
                badge: "Porção Família",
                badgeColor: "",
                rating: 4.7,
                opcionais: [
                    { id: "opt1", nome: "Fatias de Limão Siciliano Extra", preco: 2.00 }
                ]
            },
            {
                id: 8,
                nome: "Coca-Cola Original 2L",
                categoria: "bebidas",
                preco: 12.00,
                descricao: "Garrafa de 2 Litros trincando de gelada para acompanhar seu pedido.",
                imagem: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80",
                badge: "Geladinha",
                badgeColor: "",
                rating: 5.0,
                opcionais: []
            },
             {
                id: 4,
                nome: "Soda Italiana",
                categoria: "Soda",
                preco: 49.90,
                descricao: "Calabresa artesanal fatiada fina, cebola roxa caramelizada, azeitonas azapa, molho de tomate pelado e orégano fresco.",
                imagem: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80",
                badge: "Favorito",
                badgeColor: "highlight",
                rating: 4.9,
                opcionais: [
                    { id: "opt1", nome: "Borda Recheada de Catupiry Original", preco: 10.00 },
                    { id: "opt2", nome: "Borda Recheada de Cheddar", preco: 10.00 }
                ]
            },
            {
                id: 9,
                nome: "Suco Natural de Laranja 500ml",
                categoria: "bebidas",
                preco: 9.00,
                descricao: "Suco 100% fruta natural espremido na hora, sem adição de conservantes ou água.",
                imagem: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&auto=format&fit=crop&q=80",
                badge: "Natural",
                badgeColor: "",
                rating: 4.9,
                opcionais: []
            },
            {
                id: 10,
                nome: "Pudim Tradicional de Leite Condensado",
                categoria: "sobremesas",
                preco: 12.90,
                descricao: "Fatia generosa de pudim super cremoso e sem furinhos, banhado em calda de caramelo dourado.",
                imagem: "https://tse2.mm.bing.net/th/id/OIP.psAaZtJ9_V6Py-SsmOqJBAHaEB?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
                badge: "Delícia",
                badgeColor: "gold",
                rating: 5.0,
                opcionais: []
            },
            {
                id: 11,
                nome: "Grand Gateau com Sorvete",
                categoria: "sobremesas",
                preco: 22.90,
                descricao: "Petit gateau quente com recheio cremoso que escorre ao cortar, servido com picolé e calda de chocolate.",
                imagem: "https://tse4.mm.bing.net/th/id/OIP.ksTg8JBuDXO4T0TSX5o8MAHaD4?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
                badge: "Sobremesa VIP",
                badgeColor: "highlight",
                rating: 4.9,
                opcionais: []
            },
            {
                id: 11,
                nome: "Cheese Cake",
                categoria: "sobremesas",
                preco: 33.90,
                descricao: "A melhor sobremesa que o agostinho ja comeu!",
                imagem: "https://cookedbymia.com/wp-content/uploads/2025/05/2-Classic-New-York-Cheesecake.webp",
                badge: "Sobremesa VIP",
                badgeColor: "highlight",
                rating: 4.9,
                opcionais: []
            }
            
        ];

        /* ==========================================================================
           ESTADO DA APLICAÇÃO
           ========================================================================== */
        let carrinho = [];
        let categoriaAtual = 'todos';
        let descontoPorcentagem = 0;
        let cupomAplicado = "";
        const taxaEntrega = 7.00;
        const metaFreteGratis = 60.00;

        // Estado do Modal de Customização
        let produtoModalAtual = null;
        let quantidadeModal = 1;
        let opcionaisSelecionadosModal = [];

        /* ==========================================================================
           INICIALIZAÇÃO & EVENTOS
           ========================================================================== */
        document.addEventListener("DOMContentLoaded", () => {
            renderizarCardapio(produtos);

            // Gatilho do carrinho
            document.getElementById("cartTriggerBtn").addEventListener("click", abrirCarrinho);
            document.getElementById("cartDrawerBackdrop").addEventListener("click", (e) => {
                if (e.target.id === "cartDrawerBackdrop") fecharCarrinho();
            });

            // Busca em tempo real
            document.getElementById("searchInput").addEventListener("input", (e) => {
                const termo = e.target.value.toLowerCase().trim();
                const filtrados = produtos.filter(p =>
                    (categoriaAtual === 'todos' || p.categoria === categoriaAtual) &&
                    (p.nome.toLowerCase().includes(termo) || p.descricao.toLowerCase().includes(termo))
                );
                renderizarCardapio(filtrados);
            });
        });

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
                    ${p.badge ? `<span class="card-badge ${p.badgeColor}">${p.badge}</span>` : ''}
                    <div class="product-img-wrapper">
                        <img src="${p.imagem}" alt="${p.nome}" loading="lazy">
                        <div class="rating-pill">
                            <i class="fas fa-star"></i> ${p.rating.toFixed(1)}
                        </div>
                    </div>
                    <div class="card-body">
                        <h3 class="card-title">${p.nome}</h3>
                        <p class="card-desc">${p.descricao}</p>
                        <div class="card-footer">
                            <div class="card-price">R$ ${p.preco.toFixed(2).replace('.', ',')}</div>
                            <div class="btn-group">
                                ${p.opcionais && p.opcionais.length > 0 ?
                                    `<button class="btn-opt" onclick="abrirModalProduto(${p.id})">Opções</button>` : ''}
                                <button class="btn-add" onclick="adicionarRapido(${p.id})">
                                    <i class="fas fa-plus"></i> Add
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                grid.appendChild(card);
            });
        }

        /* ==========================================================================
           FILTRAGEM DE CATEGORIAS
           ========================================================================== */
        function filtrarCategoria(categoria) {
            categoriaAtual = categoria;

            // Atualizar classes dos botões
            document.querySelectorAll(".cat-item").forEach(btn => {
                if (btn.getAttribute("onclick").includes(`'${categoria}'`)) {
                    btn.classList.add("active");
                } else {
                    btn.classList.remove("active");
                }
            });

            const termo = document.getElementById("searchInput").value.toLowerCase().trim();
            const filtrados = produtos.filter(p =>
                (categoria === 'todos' || p.categoria === categoria) &&
                (p.nome.toLowerCase().includes(termo) || p.descricao.toLowerCase().includes(termo))
            );

            // Atualizar título
            const titulos = {
                'todos': 'Nosso Cardápio Completo do Agosto',
                'hamburgueres': 'Hambúrgueres Artesanais do Agosto 🍔',
                'pizzas': 'Pizzas Especiais do Agosto 🍕',
                'porcoes': 'Porções Crocantes do Agosto 🍟',
                'bebidas': 'Bebidas Geladas do Agosto 🥤',
                'sobremesas': 'Sobremesas Especiais do Agosto 🍨'
            };
            document.getElementById("categoryTitle").textContent = titulos[categoria] || 'Nosso Cardápio';

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
                            <input type="checkbox" onchange="toggleOpcionalModal('${opt.id}')">
                            <span>${opt.nome}</span>
                        </div>
                        <span class="extra-price">+ R$ ${opt.preco.toFixed(2).replace('.', ',')}</span>
                    `;
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
                idCart: Date.now(),
                idProduto: produtoModalAtual.id,
                nome: produtoModalAtual.nome,
                imagem: produtoModalAtual.imagem,
                precoBase: produtoModalAtual.preco,
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
                    idCart: Date.now(),
                    idProduto: prod.id,
                    nome: prod.nome,
                    imagem: prod.imagem,
                    precoBase: prod.preco,
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
                        <img src="${item.imagem}" alt="${item.nome}" class="cart-item-img">
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.nome}</div>
                            ${extrasText ? `<div class="cart-item-extras">${extrasText}</div>` : ''}
                            <div class="cart-item-price">R$ ${(item.precoUnitarioFinal * item.quantidade).toFixed(2).replace('.', ',')}</div>
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
                    itemsContainer.appendChild(row);
                });
            }

            // Cálculos
            const subtotal = carrinho.reduce((acc, i) => acc + (i.precoUnitarioFinal * i.quantidade), 0);
            const valorDesconto = subtotal * descontoPorcentagem;
            const frete = (subtotal >= metaFreteGratis || carrinho.length === 0) ? 0 : taxaEntrega;
            const totalFinal = Math.max(0, subtotal - valorDesconto + frete);

            // Atualização da barra de progresso de frete grátis
            const shippingText = document.getElementById("shippingText");
            const progressBar = document.getElementById("progressBarFill");

            if (subtotal >= metaFreteGratis) {
                shippingText.textContent = "🎉 Você ganhou Frete GRÁTIS!";
                progressBar.style.width = "100%";
            } else {
                const faltam = metaFreteGratis - subtotal;
                shippingText.textContent = `Adicione R$ ${faltam.toFixed(2).replace('.', ',')} para Frete Grátis`;
                const porcentagem = (subtotal / metaFreteGratis) * 100;
                progressBar.style.width = `${porcentagem}%`;
            }

            // Exibir textos
            document.getElementById("subtotalVal").textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
            document.getElementById("discountVal").textContent = `- R$ ${valorDesconto.toFixed(2).replace('.', ',')}`;
            document.getElementById("shippingVal").textContent = frete === 0 ? "GRÁTIS" : `R$ ${frete.toFixed(2).replace('.', ',')}`;
            document.getElementById("totalVal").textContent = `R$ ${totalFinal.toFixed(2).replace('.', ',')}`;
        }

        /* ==========================================================================
           CUPONS E TROCO
           ========================================================================== */
        function aplicarCupom() {
            const input = document.getElementById("couponInput").value.trim().toUpperCase();
            if (input === "AGOSTINHO10") {
                descontoPorcentagem = 0.10;
                cupomAplicado = "AGOSTINHO10 (10% OFF)";
                exibirToast("Cupom de 10% aplicado!", "ticket-alt");
            } else if (input === "PRIMEIRA15") {
                descontoPorcentagem = 0.15;
                cupomAplicado = "PRIMEIRA15 (15% OFF)";
                exibirToast("Cupom de 15% aplicado!", "ticket-alt");
            } else {
                descontoPorcentagem = 0;
                cupomAplicado = "";
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
        function finalizarPedidoWhatsApp() {
            if (carrinho.length === 0) {
                exibirToast("Seu carrinho está vazio!", "shopping-bag");
                return;
            }

            const nome = document.getElementById("clientName").value.trim();
            const endereco = document.getElementById("clientAddress").value.trim();
            const pagamento = document.getElementById("paymentMethod").value;
            const troco = document.getElementById("changeInput").value.trim();

            if (!nome || !endereco) {
                exibirToast("Preencha nome e endereço de entrega!", "exclamation-circle");
                return;
            }

            let msg = `*🍔 NOVO PEDIDO - AGOSTINHO'S FOOD 🍔*\n\n`;
            msg += `*Cliente:* ${nome}\n`;
            msg += `*Endereço:* ${endereco}\n`;
            msg += `*Forma de Pagamento:* ${pagamento}\n`;
            if (pagamento === "Dinheiro" && troco) {
                msg += `*Troco para:* ${troco}\n`;
            }
            msg += `\n*ITENS DO PEDIDO:*\n`;

            carrinho.forEach(item => {
                msg += `• *${item.quantidade}x ${item.nome}* - R$ ${(item.precoUnitarioFinal * item.quantidade).toFixed(2).replace('.', ',')}\n`;
                if (item.extras.length > 0) {
                    msg += `   └ Adicionais: ${item.extras.map(e => e.nome).join(', ')}\n`;
                }
                if (item.observacao) {
                    msg += `   └ Obs: ${item.observacao}\n`;
                }
            });

            const subtotal = carrinho.reduce((acc, i) => acc + (i.precoUnitarioFinal * i.quantidade), 0);
            const valorDesconto = subtotal * descontoPorcentagem;
            const frete = subtotal >= metaFreteGratis ? 0 : taxaEntrega;
            const totalFinal = Math.max(0, subtotal - valorDesconto + frete);

            msg += `\n*RESUMO DA COMPRA:*\n`;
            msg += `Subtotal: R$ ${subtotal.toFixed(2).replace('.', ',')}\n`;
            if (descontoPorcentagem > 0) {
                msg += `Cupom (${cupomAplicado}): -R$ ${valorDesconto.toFixed(2).replace('.', ',')}\n`;
            }
            msg += `Taxa de Entrega: ${frete === 0 ? "GRÁTIS" : `R$ ${frete.toFixed(2).replace('.', ',')}`}\n`;
            msg += `*TOTAL FINAL: R$ ${totalFinal.toFixed(2).replace('.', ',')}*\n\n`;
            msg += `_Pedido gerado pelo site oficial do Agostinho's Food_`;

            const fone = "5519999998888"; // Número do restaurante
            window.open(`https://wa.me/${fone}?text=${encodeURIComponent(msg)}`, "_blank");
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
                <span>${mensagem}</span>
            `;
            container.appendChild(toast);

            setTimeout(() => {
                toast.remove();
            }, 3000);
        }