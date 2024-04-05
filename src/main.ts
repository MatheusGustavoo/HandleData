import Estatisticas from "./Estatisticas";
import fetchData from "./fetchData";
import normalizarTransacao from "./normalizarTransacao";

async function handleData() {
  const data = await fetchData<TransacaoAPI[]>(
    "https://api.origamid.dev/json/transacoes.json"
  );
  if (!data) return;
  const transacoes = data.map(normalizarTransacao);
  preencherTabela(transacoes);
  preencherEstatisticas(transacoes);
  // console.log(transacoes);
}
handleData();

function preencherTabela(transacao: Transacao[]): void {
  const tabela = document.querySelector("#transacoes tbody");
  if (!tabela) return;
  // console.log(transacao);

  transacao.forEach(transacao => {
    tabela.innerHTML += `
    <tr>
      <td>${transacao.nome}</td>
      <td>${transacao.email}</td>
      <td>R$ ${transacao.moeda}</td>
      <td>${transacao.pagamento}</td>
      <td>${transacao.status}</td>
    </tr>
  `;
  });
}

const total = document.querySelector("#total span") as HTMLSpanElement;
const credito = document.querySelector("#credito span") as HTMLSpanElement;
const boleto = document.querySelector("#boleto span") as HTMLSpanElement;
function preencherEstatisticas(transacao: Transacao[]): void {
  const data = new Estatisticas(transacao);
  total.innerText = data.total().toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  credito.innerText = String(data.pagamento()["Cartão de Crédito"]);
  boleto.innerText = String(data.pagamento()["Boleto"]);
  console.log(data.status());
  console.log(data.pagamento()["Cartão de Crédito"]);
}
