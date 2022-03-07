

inserirRota('/teste_busca', (dados, resposta) => {
    console.log(dados);
    database('SELECT * FROM ALUNO').then(result => {
        resposta({ resposta: result });
    }).catch(erro => {
        resposta({ resposta: erro });
    });
});