

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
    database('SELECT * FROM AVALIACAO').then(result => {
        resposta({ resposta: result });
    }).catch(erro => {
        resposta({ resposta: erro });
    });
});

inserirRota('/teste_delete', (dados, resposta) => {
    console.log(dados);
    database('DELETE FROM NOTA').then(result => {
        resposta({ resposta: result });
    }).catch(erro => {
        resposta({ resposta: erro });
    });
});

inserirRota('/teste_truncate', (dados, resposta) => {
    console.log(dados);
    database('TRUNCATE * FROM NOTA').then(result => {
        resposta({ resposta: result });
    }).catch(erro => {
        resposta({ resposta: erro });
    });
});