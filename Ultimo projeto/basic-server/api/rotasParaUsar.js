inserirRota('/checar', function (dados, resposta) {
    database(`SELECT * FROM PESSOA `)
        .then(result => {
            const listaInfo = []
            for (i = 0; i < result.length; i++) {
                let user = result[i].USUARIO
                let password = result[i].SENHA
                let prof = result[i].PROFESSOR
                let rg = result[i].RG

                info = {
                    usuario: user,
                    senha: password,
                    validacao: prof,
                    num: rg
                }
                listaInfo.push(info)
            }
            resposta(listaInfo)
        }).catch(erro => {
            console.log('DEU BOSTA')
            resposta({ erro })
        })
})

inserirRota('/ver_professor', function (dados, resposta){
    database('SELECT * FROM PROFESSOR')
    .then(result =>{
        resposta(result)
    }).catch(erro => {
        console.log('DEU BOSTA')
        resposta({ erro })
    })
})

inserirRota('/ver_aluno', function (dados, resposta){
    database('SELECT * FROM ALUNO')
    .then(result =>{
        resposta(result)
    }).catch(erro => {
        console.log('DEU BOSTA')
        resposta({ erro })
    })
})

inserirRota('/usar_turma', function (dados, resposta){
    database('SELECT * FROM TURMA')
    .then(result =>{
        resposta(result)
    }).catch(erro => {
        console.log('DEU BOSTA')
        resposta({ erro })
    })
})

inserirRota('/usar_materia', function (dados, resposta){
    database('SELECT * FROM MATERIA')
    .then(result =>{
        resposta(result)
    }).catch(erro => {
        console.log('DEU BOSTA')
        resposta({ erro })
    })
})

inserirRota('/ver_pessoa', function (dados, resposta){
    database('SELECT * FROM PESSOA')
    .then(result =>{
        resposta(result)
    }).catch(erro => {
        console.log('DEU BOSTA')
        resposta({ erro })
    })
})

inserirRota('/ver_curso', function (dados, resposta){
    database('SELECT * FROM CURSO')
    .then(result =>{
        resposta(result)
    }).catch(erro => {
        console.log('DEU BOSTA')
        resposta({ erro })
    })
})

inserirRota('/ver_nota', function (dados, resposta){
    database('SELECT * FROM NOTA')
    .then(result =>{
        resposta(result)
    }).catch(erro => {
        console.log('DEU BOSTA')
        resposta({ erro })
    })
})

inserirRota('/ver_prova', function (dados, resposta){
    database('SELECT * FROM AVALIACAO')
    .then(result =>{
        resposta(result)
    }).catch(erro => {
        console.log('DEU BOSTA')
        resposta({ erro })
    })
})

inserirRota('/alterar_pessoa', function (dados, resposta){
    database(`UPDATE PESSOA SET NOME = "${dados.NOME}", EMAIL = "${dados.EMAIL}", SENHA = "${dados.SENHA}", USUARIO = "${dados.USER}" where RG = "${dados.RG_ANTIGO}"`)
    .then(result =>{
        resposta(result)
    }).catch(erro => {
        console.log('DEU BOSTA')
        resposta({ erro })
    })
})

inserirRota('/checar_pessoa', function (dados, resposta){
    database(`SELECT * FROM PESSOA where USUARIO = "${dados.USER}" AND SENHA = "${dados.PASSWORD}"`)
    .then(result =>{
        resposta(result)
    }).catch(erro => {
        console.log('DEU BOSTA')
        resposta({ erro })
    })
})

inserirRota('/cadastrar_nota', function (dados, resposta){
    database(`INSERT INTO NOTA VALUES (null, "${dados.NOTA}", "${dados.ID_ALUNO}", "${dados.ID_TURMA}", "${dados.ID_AVALIACAO}")`)
    .then(result =>{
        resposta(result)
    }).catch(erro => {
        console.log('DEU BOSTA')
        resposta({ erro })
    })
})

inserirRota('/cadastrar_PROVA', function (dados, resposta){
    database(`INSERT INTO AVALIACAO VALUES (null, "${dados.CONTEUDO}", "${dados.DESCRICAO}", "${dados.PESO}")`)
    .then(result =>{
        resposta(result)
    }).catch(erro => {
        console.log('DEU BOSTA')
        resposta({ erro })
    })
})