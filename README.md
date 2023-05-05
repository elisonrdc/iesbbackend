## Descrição

O projeto iesbbackend tem como finalidade a criação de um CRUD com express para avaliação final da disciplina "Desenvolvimento de Backend" do IESB NORTE, em Brasília/DF.

## Instalação

`npm install`

## PostgreSQL

```
CREATE ROLE elison WITH LOGIN CREATEDB PASSWORD '123@mudar';

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO elison;

GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO elison;

create table usuario (
  id serial primary key,
  nome varchar(30) not null,
  login varchar(20) not null,
  senha varchar(100) not null,
  data_nascimento date
);
```

## Parâmetros de conexão PostgreSQL
Arquivo pool.js, a partir da linha 4:
```
user: 'elison',
host: 'localhost',
database: 'postgres',
password: '123@mudar',
port: 5432,
```

## Uso

`node index.js`