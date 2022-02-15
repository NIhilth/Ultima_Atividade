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
    })
})

inserirRota('/ver_aluno', function (dados, resposta){
    database('SELECT * FROM ALUNO')
    .then(result =>{
        resposta(result)
    })
})

inserirRota('/usar_turma', function (dados, resposta){
    database('SELECT * FROM TURMA')
    .then(result =>{
        resposta(result)
    })
})

inserirRota('/usar_mateira', function (dados, resposta){
    database('SELECT * FROM MATERIA')
    .then(result =>{
        resposta(result)
    })
})

inserirRota('/ver_pessoa', function (dados, resposta){
    database('SELECT * FROM PESSOA')
    .then(result =>{
        resposta(result)
    })
})