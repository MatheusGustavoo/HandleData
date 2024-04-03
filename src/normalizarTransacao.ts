declare global {
  interface TransacaoAPI {
    Status:
      | "Paga"
      | "Recusada pela operadora de cartão"
      | "Aguardando Pagamento";
    Nome: string;
    Data: string;
    "Cliente Novo": 0 | 1;
    "Valor (R$)": string;
    "Forma de Pagamento": "Boleto" | "Cartão de Crédito";
    ID: number;
    Email: string;
  }
}

interface Transacao {
  nome: string;
  data: Date;
  status: "Paga" | "Recusada pela operadora de cartão" | "Aguardando Pagamento";
  email: string;
  moeda: string;
  valor: number | null;
  novo: boolean;
  pagamento: "Boleto" | "Cartão de Crédito";
}
export default function normalizarTransacao(transacao: TransacaoAPI) {
  return {
    nome: transacao.Nome,
    data: data(transacao.Data),
    status: transacao.Status,
    email: transacao.Email,
    moeda: transacao["Valor (R$)"],
    valor: moedaParaNumero(transacao["Valor (R$)"]),
    novo: Boolean(transacao["Cliente Novo"]),
    pagamento: transacao["Forma de Pagamento"],
  };
}

/**
 * Recebe string "1.200,50" retorna number
 */
function data(texto: string): Date {
  const [data, tempo] = texto.split(" ")
  const[dia, mes, ano ] = data.split("/").map(Number)
  const[hora, minuto] = tempo.split(":").map(Number)
  const retorno = new Date(ano, mes-1, dia, hora, minuto)
return retorno
}
function moedaParaNumero(moeda: string): number | null {
  const numero = Number(moeda.replace(".", "").replace(",", "."));
  if (!isNaN(numero)) {
    return numero;
  } else {
    return null;
  }
}
