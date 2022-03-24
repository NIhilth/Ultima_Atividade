

inserirRota('/teste_busca', (dados, resposta) => {
    console.log(dados);
    database(`UPDATE PESSOA SET RG = "3333333" where RG = "0303033"`).then(result => {
        resposta({ resposta: result });
    }).catch(erro => {
        resposta({ resposta: erro });
    });
});

inserirRota('/alterar', (dados, resposta) => {
    console.log(dados);
    database('SELECT * FROM PESSOA').then(result => {
        resposta({ resposta: result });
    }).catch(erro => {
        resposta({ resposta: erro });
    });
});

inserirRota('/teste_delete', (dados, resposta) => {
    console.log(dados);
    database('DELETE FROM AVALIACAO').then(result => {
        resposta({ resposta: result });
    }).catch(erro => {
        resposta({ resposta: erro });
    });
});

