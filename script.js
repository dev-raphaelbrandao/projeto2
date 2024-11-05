let transacoes = [];

function emitirFatura() {
    const cliente = document.getElementById('cliente').value;
    const servico = document.getElementById('servico').value;
    const preco = document.getElementById('preco').value;

    if (cliente && servico && preco) {
        const faturaHTML = `
            <h2>Fatura Emitida</h2>
            <p><strong>Cliente:</strong> ${cliente}</p>
            <p><strong>Serviço:</strong> ${servico}</p>
            <p><strong>Preço:</strong> R$ ${parseFloat(preco).toFixed(2)}</p>
        `;
        document.getElementById('faturaEmitida').innerHTML = faturaHTML;
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function adicionarTransacao() {
    const descricao = document.getElementById('descricao').value;
    const tipo = document.getElementById('tipo').value;
    const valor = parseFloat(document.getElementById('valor').value);

    if (descricao && tipo && valor) {
        const novaTransacao = { descricao, tipo, valor, id: Date.now() };
        transacoes.push(novaTransacao);
        atualizarTabela();
        calcularSaldo();
        document.getElementById('financeForm').reset();
    } else {
        alert('Por favor, preencha todos os campos da transação.');
    }
}

function atualizarTabela() {
    const tabela = document.getElementById('tabelaTransacoes').querySelector('tbody');
    tabela.innerHTML = '';

    transacoes.forEach(transacao => {
        const row = tabela.insertRow();
        row.innerHTML = `
            <td>${transacao.descricao}</td>
            <td>${transacao.tipo}</td>
            <td>R$ ${transacao.valor.toFixed(2)}</td>
            <td>
                <button onclick="editarTransacao(${transacao.id})">Editar</button>
                <button onclick="removerTransacao(${transacao.id})">Remover</button>
            </td>
        `;
    });
}

function editarTransacao(id) {
    const transacao = transacoes.find(t => t.id === id);
    if (transacao) {
        document.getElementById('descricao').value = transacao.descricao;
        document.getElementById('tipo').value = transacao.tipo;
        document.getElementById('valor').value = transacao.valor;
        removerTransacao(id);  // Remove para que possa ser adicionada como nova após edição
    }
}

function removerTransacao(id) {
    transacoes = transacoes.filter(transacao => transacao.id !== id);
    atualizarTabela();
    calcularSaldo();
}

function calcularSaldo() {
    let saldo = 0;

    transacoes.forEach(transacao => {
        saldo += transacao.tipo === 'entrada' ? transacao.valor : -transacao.valor;
    });

    document.getElementById('saldoTotal').textContent = saldo.toFixed(2);
}

function exportarExcel() {
    const planilha = [
        ["Descrição", "Tipo", "Valor"],
        ...transacoes.map(transacao => [transacao.descricao, transacao.tipo, `R$ ${transacao.valor.toFixed(2)}`])
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(planilha);

    XLSX.utils.book_append_sheet(wb, ws, "Transações");
    XLSX.writeFile(wb, "transacoes_manicure.xlsx");
}
