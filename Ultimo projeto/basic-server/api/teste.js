

inserirRota('/teste_busca', (dados, resposta) => {
    console.log(dados);
    database('SELECT * FROM PESSOA').then(result => {
        resposta({ resposta: result });
    }).catch(erro => {
        resposta({ resposta: erro });
    });
});