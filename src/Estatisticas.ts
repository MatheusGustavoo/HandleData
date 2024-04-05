type TransacaoValor = Transacao & { valor: number };
function filtrarValor(transacao: Transacao): transacao is TransacaoValor {
  return transacao.valor !== null;
}

export default class Estatisticas {
  private transacoes;
  total;
  pagamento;
  status;
  constructor(transacoes: Transacao[]) {
    this.transacoes = transacoes;
    this.total = this.setTotal;
    this.pagamento = this.setPagamento;
    this.status = this.setStatus;
  }
  private setTotal() {
    return this.transacoes.filter(filtrarValor).reduce((acc, atual) => {
      return acc + atual.valor;
    }, 0);
  }

  private setPagamento() {
    interface CountList {
      [key: string]: number;
    }
    this.transacoes.map(({ pagamento }) => pagamento);
    const pagamentos = this.transacoes.map(({ pagamento }) => pagamento);
    const total = pagamentos.reduce((acc: CountList, item) => {
      if (acc[item]) {
        acc[item] += 1;
        // console.log(acc[item]);
      } else {
        acc[item] = 1;
      }
      return acc;
    }, {});
    return total;
  }
  private setStatus() {
    interface CountList {
      [key: string]: number;
    }
    this.transacoes.map(({ pagamento }) => pagamento);
    const status = this.transacoes.map(({ status }) => status);

    const total = status.reduce((acc: CountList, item) => {
      if (acc[item]) {
        acc[item] += 1;
      } else {
        acc[item] = 1;
      }
      return acc;
    }, {});
    return total;
  }
}
