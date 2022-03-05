
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

database(`CREATE TABLE IF NOT EXISTS CURSO (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    NOME varchar(45) UNIQUE
    )`).then(result => {
    console.log("TABELA CURSO CRIADA COM SUCESSO")
}).catch(erro => {
    console.log("TABELA CURSO COM ERRO NA CRIAÇÃO")
});

database(`CREATE TABLE IF NOT EXISTS TURMA (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    SIGLA varchar(6) not null,
    NOME varchar(30) not null,
    PROFESSOR_REGENTE int not null,
    ID_CURSO INT NOT NULL,
    foreign key (PROFESSOR_REGENTE) references PROFESSOR(ID) on delete cascade on update cascade,
    foreign key (ID_CURSO) references CURSO(ID) on delete cascade on update cascade
    )`).then(result => {
    console.log("TABELA TURMA CRIADA COM SUCESSO")
}).catch(erro => {
    console.log("TABELA TURMA COM ERRO NA CRIAÇÃO")
});

database(`CREATE TABLE IF NOT EXISTS MATERIA (
    CODIGO INTEGER PRIMARY KEY AUTOINCREMENT,
    NOME varchar(30) not null ,
    CARGA_HORARIA int not null,
    ID_PROFESSOR int not null,
    ID_CURSO int not null,
    foreign key (ID_PROFESSOR) references PROFESSOR(ID) on delete cascade on update cascade,
    foreign key (ID_CURSO) references CURSO(ID) on delete cascade on update cascade
    )`).then(result => {
    console.log("TABELA MATERIA CRIADA COM SUCESSO")
}).catch(erro => {
    console.log("TABELA MATERIA COM ERRO NA CRIAÇÃO")
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

// database(`INSERT INTO PESSOA VALUES ('1111111', 'JOÃO HENRIQUE MEIRELES DA SILVA', 17, 'M', 'jaozinuauau@gmail.com', 'Joao_hm_Silva', 'jhms123456', false), ('2222222',  'DIEGO PLANINSCHECK', 16, 'M', 'dieguinDo846ULH0@gmail.com.br', 'Diego_Planin', 'diegaoMeuBom', false), ('3333333', 'BRUNO VERBINNEN', 23, 'M', 'brunohvc@gmail.com', 'bruno_hvc', 'bruninho', true), ('4444444', 'CAMILLY DE SOUZA PESSOTTI', 16, 'F', 'camillinhaDoBaile@gmail.com', 'camilly_pesso', 'kamikazeyey', false), ('5555555', 'BRUNA ALVES MAFRA', 17, 'F', 'bruninhaDoBaile@gmail.com', 'Bruna_Mafra', 'brujayuhu', false), ('6666666', 'LEANDRO JOSÉ SEBOLD DOS SANTOS', 20, 'M', 'leandrinhoDoCorre@gmail.com', 'Leandro_Santos', 'L30Z1K4KK', true), ('7777777',  'HENRIQUE COLE', 16, 'M', 'henriqueDoBalacobaco@gmail.com.br', 'Henrique_Cole', 'henri123456', false), ('8888888',  'ROMÁRIO HORNBURG', 27, 'M', 'romariao@gmail.com.br', 'Romario_burg', 'r0m4r10L0K0', true), ('9999999',  'JOHNATAN LUIZ OSTERLOH', 34, 'M', 'osterlohZJonny@gmail.com', 'Johnatan_Osterloh', 'jo4@ni*89t06', true), ('1212121',  'TATHIANA DUARTE DO AMARANTE', 32, 'F', 'tatyAmar@gmail.com', 'Tathiana_Duarte', 'tatyZ4k1040', true),
// ('1313131',  'VINÍCIUS  BONATTI BENNER', 16, 'M', 'TheBonatti.vini@gmail.com', 'Vinicius_Bonatti', 'v89i05n#$i', false), ('1414141',  'OTÁVIO AUGUSTO DOS SANTOS', 16, 'M', 'otaviu.Santos@gmail.com', 'Otavio_Augusto', 'o6%4ta0po', false), ('1515151', 'VYTOR AUGUSTO ROSA', 17, 'M', 'vitinhoGameplay@gmail.com.br', 'Vytor_Augusto', 'vitoror0', false), ('1616161', 'ESTER GIRELLI', 18, 'F', 'ester.Girelli@gmail.com', 'Ester_Girelli', 'esterzina', false),
//  ('1717171', 'EDUARDA BOLGENHAGEN DE CAMPOS', 18, 'F', 'dudinha.campos@hotmail.com','Eduarda_Campos', 'DuD4Op0*', false)
//         `)
//     .then(result => {
//         console.log("DADOS EM PESSOA CADASTRADOS COM SUCESSO ")
//     }).catch(erro => {
//         console.log("DADOS EM PESSOA NÃO CADASTRADOS ")
//     });

// database(`INSERT INTO PROFESSOR VALUES (null, '3333333'),  (null, '6666666'), (null, '8888888'), (null, '9999999'), (null, '1212121')
//     `)
//     .then(result => {
//         console.log("DADOS EM PROFESSOR CADASTRADOS COM SUCESSO ")
//     }).catch(erro => {
//         console.log("DADOS EM PROFESSOR NÃO CADASTRADOS  ")
//     });

    // database(`INSERT INTO CURSO VALUES (null,'Analista de Sistema'),(null,'Programador WEB')
    // `)
    // .then(result => {
    //     console.log("DADOS EM CURSO CADASTRADOS COM SUCESSO ")
    // }).catch(erro => {
    //     console.log("DADOS EM CURSO NÃO CADASTRADOS ")
    // });

// database(`INSERT INTO TURMA VALUES (null,'AS01', 'Analista de Sistemas 2022.1' , 3, 1), (null, 'PROW01', 'Programador WEB 2022.1',4, 2)
//     `)
//     .then(result => {
//         console.log("DADOS EM TURMA CADASTRADOS COM SUCESSO ")
//     }).catch(erro => {
//         console.log("DADOS EM TURMA NÃO CADASTRADOS ")
//     });

// database(`INSERT INTO MATERIA VALUES 
//     (null, 'PROGRAMAÇÃO WEB', 150, 1, 2), (null, 'METODOLOGIAS ÁGEIS', 80, 2, 1), (null, 'INFORMÁTICA BÁSICA', 100, 2, 2), (null, 'INFORMÁTICA BÁSICA', 100, 3, 1), (null, 'BANCO DE DADOS', 120, 4, 2), (null,'ANÁLISE DE SISTEMAS', 130, 5, 1)
//     `)
//     .then(result => {
//         console.log("DADOS EM MATERIA CADASTRADOS COM SUCESSO ")
//     }).catch(erro => {
//         console.log("DADOS EM MATERIA NÃO CADASTRADOS ")
//     });


// database(`INSERT INTO ALUNO VALUES (null, null, '1111111', 1), (null, null, '2222222', 1), (null, null, '4444444', 1),  (null, null, '5555555', 1),  (null, null, '1515151', 1), (null, null, '7777777', 2), (null, null, '1313131', 2), (null, null, '1414141', 2),  (null, null, '1616161', 2), (null, null, '1717171', 2)
// `)
//     .then(result => {
//         console.log("DADOS EM ALUNO CADASTRADOS COM SUCESSO ")
//     }).catch(erro => {
//         console.log("DADOS EM ALUNO NÃO CADASTRADOS ")
//     });

