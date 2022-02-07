inserirRota('/buscar_usuario', function (dados, resposta){
console.log(dados);

database(`SELECT * FROM USER WHERE NICKNAME = "${dados.nickname}" AND PASSWORD = "  ${dados.password}"`)
    .then( result => {
        console.log("Usuário inserido com sucesso!")
        resposta({user: result[0]})
    }).catch(erro => {
        console.log('Erro ao inserir o usuário')
        resposta({erro: 'Erro ao inserir o usuário'})
    })
});

inserirRota('/criar_usuario', function (dados, resposta){
    console.log(dados)

    if(!dados.nome){
        return resposta({erro: 'É necessário preencher o nome'})
    }

    if(!dados.nickname){
        return resposta({erro: 'É necessário preencher o nickname'})
    }

    database(`INSERT INTO USER (NOME, NICKNAME) VALUES ("${dados.nome}","${dados.nickname}")`)
    .then( result => {
        console.log("Usuário inserido com sucesso!")
        resposta({message: 'Usuário inserido com sucesso!'})
    }).catch(erro => {
        console.log('Erro ao inserir o usuário')
        resposta({erro: 'Erro ao inserir o usuário'})
    })
})

// fetch('/api/buscar_usuario',
//  	{method:'POST', 
//     body: JSON.stringify({nome: "Henrioque", nickname: "HEN"}), 
//     headers: {'Content-Type': 'application/json'}
// }).then(function (result) {
//     return result.json()
// }).then(function (dados){
//     console.log(dados)
// }).catch(function (erro){
//     console.log(erro)
// })