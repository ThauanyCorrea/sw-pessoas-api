-- Criar um banco de dados chamado pessoas_api	
-- Criar a tabela pessoas

create table pessoas (
codigo serial not null primary key, 
nome varchar(50) not null,
idade integer not null);

-- inserir alguns registros
insert into pessoas (nome, idade) values ('thauany', 22),('larisa', 25),('daniel', 25);
