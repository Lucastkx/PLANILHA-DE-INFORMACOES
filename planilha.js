const dados = {
  
    teste:[
      "USG DO COTOVELO TESTE"
    ],
  
};

const informacoes = [
`INFORMACOES DE ENDERECO TESTE`,




];


const preparos = {
    preparo: [
`PREPARO TESTE`


    ],

    usg: [
`PREPARO TESTE`
    ],
    cintilografia:[
      `PREPARO TESTE`,


    ],
    intestinal:[
`                                                              <strong>📢 PREPARO INTESTINAL</strong><br>
PREPARO TESTE <br>
•`
    ],
    elastografia:[
      `PREPARO TESTE`
    ],

};

const autorizacao = {
  planos: [
    {
      nome: "PLANO TESTE / <br>Validade da guia: 60",
      usg_rx_densi: "Autorização prévia / RX não precisa",
      rm_tc: "Autorização prévia",
      cemupe: "Vem autorizado",
    },
    
  ],
  
};
const aceitamos = {
unimed:[`teste ok`,



],
}
const valor = {
     ultrassom:[
"VALOR ULTRASSOM TESTE $120.00",
     ],
     tomografia:[
      `
                                                     <strong>                COM CONTRASTE</strong>
                                                                                   `,
"TOMOGRAFIA TESTE C;C – $702.00",

`
                                                     <strong>            SEM CONTRASTE</strong>
                                                     `,

"TOMOGRAFIA TESTE S;C – $440.00",

     ],
     ressonancia:[
     `
                                                      <strong>                  COM CONTRASTE</strong>
                                                      `,
     
"RESSONANCIA TESTE C;C — $1000.00",


`  
                                                                <strong>SEM CONTRASTE</strong>
                                                                `,

"RESSONACIA TESTE S;C— $400.00",



     
     ],
     rx:[
      
"RX TESTE  $120.00",

     ],
     densimmg:[
      "DENSIOMETRIA TESTE (COLUNA E FEMUR)  $200.00",

     ],
     puncao:[
      
"PUNCAO TESTE $500.00"
     ],
     cintilografia:[
      
"CINTILOGRAFIA TESTE  $2300.00"
     ]
     
}

const tabela = document.getElementById("exames");

function preencherTabela(lista) {
    const thead = tabela.closest('table').querySelector('thead');
    
    // Ajusta o cabeçalho para 2 colunas
    thead.innerHTML = `<tr><th></th><th>Procedimento / Informação</th></tr>`;
    tabela.innerHTML = ""; 

    lista.forEach((item, i) => {
        tabela.innerHTML += `
        <tr>
            <td>${i + 1}</td>
            <td style="white-space: pre-wrap;">${item}</td>
        </tr>`;
    });
}
function preencherTabelaAutorizacao(lista) {
    const thead = tabela.closest('table').querySelector('thead');

    // Ajusta o cabeçalho para 4 colunas
    thead.innerHTML = `
      <tr>
        <th>Convênio</th>
        <th>USG / RX / Densi</th>
        <th>RM / TC</th>
        <th>Cemupe</th>
      </tr>
    `;
    
    tabela.innerHTML = ""; // Limpa o corpo (tbody)

    lista.forEach(plano => {
        tabela.innerHTML += `
          <tr>
            <td>${plano.nome}</td>
            <td>${plano.usg_rx_densi || "-"}</td>
            <td>${plano.rm_tc || "-"}</td>
            <td>${plano.cemupe || "-"}</td>
          </tr>
        `;
    });
}
// ================== SELECTS ==================
const selectMedico = document.getElementById("medico");
const selectInfo = document.getElementById("informacoes");
const selectPreparos = document.getElementById("Preparos");
const selectAutorizacao = document.getElementById("Autorizacao");
const selectValores = document.getElementById("Valores");
const selectAceitamos = document.getElementById("aceitamos");
const pesquisa = document.getElementById("exames");
const inputPesquisa = document.getElementById("pesquisa");

selectMedico.addEventListener("change", () => {
    selectInfo.value = "";
    selectPreparos.value = "";
    selectValores.value ="";
    selectAutorizacao.value = "";
    selectAceitamos.value = "";
    inputPesquisa.value = "";
    preencherTabela(dados[selectMedico.value] || []);
});

selectInfo.addEventListener("change", () => {
    selectMedico.value = "";
    selectPreparos.value = "";
    selectValores.value ="";
    selectAutorizacao.value = "";
    selectAceitamos.value = "";
    inputPesquisa.value = "";

    if (selectInfo.value === "info") preencherTabela(informacoes);
    else tabela.innerHTML = "";
});

selectPreparos.addEventListener("change", () => {
    selectMedico.value = "";
    selectInfo.value = "";
    selectValores.value ="";
    selectAutorizacao.value = "";
    selectAceitamos.value = "";
    inputPesquisa.value = "";
    preencherTabela(preparos[selectPreparos.value] || []);
});
selectAutorizacao.addEventListener("change", () => {
    selectMedico.value = "";
    selectInfo.value = "";
    selectPreparos.value = "";
    selectValores.value ="";
    selectAceitamos.value = "";
    inputPesquisa.value = "";

    if (selectAutorizacao.value === "liberacao") {
        preencherTabelaAutorizacao(autorizacao.planos);
    }else {
        tabela.innerHTML = "";
    }
});
selectValores.addEventListener("change", () => {
    selectMedico.value = "";
    selectInfo.value = "";
    selectPreparos.value = "";
    selectAutorizacao.value = "";
    selectAceitamos.value = "";
    inputPesquisa.value = "";
    preencherTabela(valor[selectValores.value] || []);

});
selectAceitamos.addEventListener("change",() =>{
  selectMedico.value = "";
    selectInfo.value = "";
    selectPreparos.value = "";
    selectAutorizacao.value = "";
    inputPesquisa.value = "";
    preencherTabela(aceitamos[selectAceitamos.value] || [])
});
inputPesquisa.addEventListener("input", () => {
    const texto = inputPesquisa.value.toLowerCase();// Converte para minúsculo para comparar melhor
    const linhas = document.querySelectorAll("#exames tr");

    linhas.forEach((linha) => {

        // ignora cabeçalho se existir
        if (linha.querySelector("th")) return;

        const conteudo = linha.textContent.toLowerCase();

        linha.style.display = conteudo.includes(texto) ? "" : "none";
    });
});