inserirRota('/buscar_usuario', function (dados, resposta) {
    console.log(dados);

    database(`SELECT * FROM USER`)
        .then(result => {
            console.log("Usuário inserido com sucesso!")
            resposta({ list: result })
        }).catch(erro => {
            console.log('Erro ao inserir o usuário')
            resposta({ erro: 'Erro ao inserir o usuário' })
        })
});

inserirRota('/criar_usuario', function (dados, resposta) {
    console.log(dados)

    if (!dados.nome) {
        return resposta({ erro: 'É necessário preencher o nome' })
    }

    if (!dados.nickname) {
        return resposta({ erro: 'É necessário preencher o nickname' })
    }

    database(`INSERT INTO USER (NOME, NICKNAME) VALUES ("${dados.nome}","${dados.nickname}")`)
        .then(result => {
            console.log("Usuário inserido com sucesso!")
            resposta({ message: 'Usuário inserido com sucesso!' })
        }).catch(erro => {
            console.log('Erro ao inserir o usuário')
            resposta({ erro: 'Erro ao inserir o usuário' })
        })
})

inserirRota('/checar', function (dados, resposta) {
    database(`SELECT * FROM PESSOA `)
        .then(result => {
            const listaInfo = []
            for (i = 0; i < result.length; i++) {
                let user = result[i].USUARIO
                let password = result[i].SENHA
                let prof = result[i].PROFESSOR

                info = {
                    usuario: user,
                    senha: password,
                    validacao: prof
                }
                listaInfo.push(info)
            }
            resposta(listaInfo)
        }).catch(erro => {
            console.log('DEU BOSTA')
            resposta({ erro })
        })
})