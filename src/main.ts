// export {};
// async function getData() {
//   const data = await fetch("https://api.origamid.dev/json/transacoes.json");
//   const json = await data.json();
//   console.log(json);

//   renderData(json);
// }

// type Produtos = [
//   {
//     "Cliente Novo": 0 | 1;
//     Data: string;
//     Email: string;
//     "Forma de Pagamento": "Boleto" | "Cartão de Crédito";
//     ID: number;
//     Nome: string;
//     Status:
//       | "Paga"
//       | "Recusada pela operadora de cartão"
//       | "Aguardando Pagamento";
//     "Valor (R$)": number;
//   }
// ];

// function renderData(item: Produtos) {
//   console.log(item[0]["Forma de Pagamento"]);

//   let total: number = 0;
//   if (item && item instanceof Array) {
//     for (var i = 0; i <= item.length; i++) {
//       if (item[i]) {
//         let numero: number = parseInt(
//           item[i]["Valor (R$)"].toString(10).replace("-", "")
//         );

//         if (numero) {
//           total += numero;
//         }
//       }

//       if (i % 2 == 0 && item[i]) {
//         document.body.innerHTML += `
//         <nav class="red">
//         <div class="data" >${item[i].Data}</div>
//         <div class="email">${item[i].Email}</div>
//         <div class="Forma_de_Pagemento">${item[i]["Forma de Pagamento"]}</div>
//         <div class="ID">${item[i].ID}</div>
//         <div class="Nome">${item[i].Nome}</div>
//         <div class="Status">${item[i].Status}</div>
//         <div class="valor">${item[i]["Valor (R$)"]}</div>
//         <div class="Cliente">${item[i]["Cliente Novo"]}</div>
//         <nav>`;
//       } else if (item[i]) {
//         document.body.innerHTML += `
//         <nav class="blue">
//         <div class="data" >${item[i].Data}</div>
//         <div class="email">${item[i].Email}</div>
//         <div class="Forma_de_Pagemento">${item[i]["Forma de Pagamento"]}</div>
//         <div class="ID">${item[i].ID}</div>
//         <div class="Nome">${item[i].Nome}</div>
//         <div class="Status">${item[i].Status}</div>
//         <div class="valor">${item[i]["Valor (R$)"]}</div>
//         <div class="Cliente">${item[i]["Cliente Novo"]}</div>
//         <nav>`;
//       }
//     }
//   }

//   const tagTotal = document.querySelector("#total") as HTMLParagraphElement;

//   if (tagTotal) {
//     tagTotal.innerText = `${total}`;
//   }
// }

// getData();

import fetchData from "./fetchData";
import normalizarTransacao from "./normalizarTransacao";

async function handleData() {
  const data = await fetchData<TransacaoAPI[]>(
    "https://api.origamid.dev/json/transacoes.json"
  );
  if (!data) return;
  const transacoes = data.map(normalizarTransacao);
  
}
handleData();
