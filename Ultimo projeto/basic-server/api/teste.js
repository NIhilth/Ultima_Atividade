

inserirRota('/teste_busca', (dados, resposta) => {
    console.log(dados);
    database('SELECT * FROM NOTA').then(result => {
        resposta({ resposta: result });
    }).catch(erro => {
        resposta({ resposta: erro });
    });
});

inserirRota('/teste_delete', (dados, resposta) => {
    console.log(dados);
    database('DELETE FROM TESTE WHERE ID = 1').then(result => {
        resposta({ resposta: result });
    }).catch(erro => {
        resposta({ resposta: erro });
    });
});

