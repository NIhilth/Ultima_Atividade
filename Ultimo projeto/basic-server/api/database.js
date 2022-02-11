
database(`CREATE TABLE IF NOT EXISTS PESSOA (
    RG char(7) not null primary key,
    NOME varchar(45) not null,
    IDADE int not null,
    SEXO char(1) not null,
    EMAIL varchar(100),
    USUARIO varchar(15) not null,
    SENHA varchar(20) not null,
    PROFESSOR boolean not null
    )`).then(result => {
        console.log("TABELA PESSOA CRIADA COM SUCESSO")
}).catch(erro => {
    console.log("TABELA PESSOA COM ERRO NA CRIAÇÃO")
});

database(`CREATE TABLE IF NOT EXISTS PROFESSOR (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    RG_PESSOA char(7) not null UNIQUE,
    foreign key (RG_PESSOA) references PESSOA (RG) on delete cascade on update cascade
    )`).then(result => {
        console.log("TABELA PROFESSOR CRIADA COM SUCESSO")
}).catch(erro => {
    console.log("TABELA PROFESSOR COM ERRO NA CRIAÇÃO")
});


database(`CREATE TABLE IF NOT EXISTS MATERIA (
    CODIGO INTEGER PRIMARY KEY AUTOINCREMENT,
    NOME varchar(30) not null,
    CARGA_HORARIA int not null,
    ID_PROFESSOR int not null,
    foreign key (ID_PROFESSOR) references PROFESSOR(ID) on delete cascade on update cascade
    )`).then(result => {
        console.log("TABELA MATERIA CRIADA COM SUCESSO")
}).catch(erro => {
    console.log("TABELA MATERIA COM ERRO NA CRIAÇÃO")
});


database(`CREATE TABLE IF NOT EXISTS TURMA (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    NOME varchar(30) not null,
    PROFESSOR_REGENTE int not null,
    foreign key (PROFESSOR_REGENTE) references PROFESSOR(ID) on delete cascade on update cascade
    )`).then(result => {
        console.log("TABELA TURMA CRIADA COM SUCESSO")
}).catch(erro => {
    console.log("TABELA TURMA COM ERRO NA CRIAÇÃO")
});


database(`CREATE TABLE IF NOT EXISTS ALUNO (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    NOTA int,
    RG_PESSOA char(7) not null UNIQUE,
    ID_TURMA int not null,
    foreign key (RG_PESSOA) references PESSOA (RG) on delete cascade on update cascade,
    foreign key (ID_TURMA) references TURMA (ID) on delete cascade on update cascade
    )`).then(result => {
        console.log("TABELA ALUNO CRIADA COM SUCESSO")
}).catch(erro => {
    console.log("TABELA ALUNO COM ERRO NA CRIAÇÃO")
});

// database(`INSERT INTO PROFESSOR VALUES (null, '3333333'),  (null, '6666666'), (null, '8888888'), (null, '9999999'), (null, '1212121')
// `).then(result => {
//         console.log("DADOS CADASTRADOS COM SUCESSO ")
// }).catch(erro => {
//     console.log("DADOS NÃO CADASTRADOS ")
// });

