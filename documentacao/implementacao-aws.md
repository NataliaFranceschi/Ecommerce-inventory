# Implementa��o AWS

#### A AWS disponibiliza diversos servi�cos que possibilitam subir um projeto para nuvem. Para projetos menores o EC2 � ideal pois permite aos usu�rios alugar computadores virtuais para executar seus pr�prios aplicativos. Entretanto para maior escalabilidade a AWS disponibiliza outros servi�os com melhor desempenho. Em seguida, coloquei duas formas para subir esse projeto, com maior e menor escalabilidade.

## Op��o com EC2
�	Acesse o console da AWS e v� para o servi�o EC2. <br>
�	Crie uma nova inst�ncia EC2 com uma imagem do Windows Server.<br>
�	Conecte-se � inst�ncia EC2 via SSH (no caso de Linux) ou RDP (no caso de Windows).<br>
�	Instale o .NET Core SDK na inst�ncia EC2 seguindo as instru��es da Microsoft.<br>
�	Clone o reposit�rio do projeto no diret�rio desejado na inst�ncia EC2.<br>
�	Crie um User Secrets no backend com as chaves especificadas no README.<br>
�	Acesse o console da AWS e v� para o servi�o RDS. <br>
�	Crie uma inst�ncia do banco de dados SQL Server na AWS RDS e configure para conectar-se a ao recurso de computa��o EC2 criado.<br>
�	Atualize a string de conex�o do banco de dados no projeto ASP.NET Core para apontar para a inst�ncia do Amazon RDS com SQL Server.<br>
�	Substitua o uso de "localhost" no c�digo frontend e backend pelo endere�o IP p�blico do EC2. Isso inclui a configura��o do Axios e qualquer outra biblioteca ou configura��o que fa�a refer�ncia ao endere�o do servidor.<br>
�	Execute os comandos necess�rios para restaurar as depend�ncias do projeto e iniciar o servidor backend e frontend.<br>

## Op��o utilizando v�rios servi�os da AWS
### 1. Banco de Dados:
�	Acesse o console da AWS e navegue at� o servi�o RDS.<br>
�	Crie uma nova inst�ncia de banco de dados SQLServer com as configura��es necess�rias (tamanho da inst�ncia, vers�o do banco de dados, nome de usu�rio e senha).<br>
�	Anote o endpoint do banco de dados, nome de usu�rio e senha para serem utilizados na configura��o do backend.<br>
### 2. Backend:
�	No console da AWS, acesse o servi�o Lambda.<br>
�	Crie uma nova fun��o Lambda para o backend.<br>
�	Fa�a o upload do c�digo do backend para a fun��o Lambda.<br>
�	Configure a fun��o Lambda para acessar o banco de dados RDS criado anteriormente.<br>
�	Acesse o servi�o API Gateway no console da AWS.<br>
�	Crie uma nova API REST no API Gateway.<br>
�	Crie recursos e m�todos na API de acordo com as rotas do backend.<br>
�	Configure os m�todos para integrar com a fun��o Lambda criada.<br>
�	Deploy a API Gateway.<br>
### 3. Autentica��o JWT:
�	Crie um User Pool no Amazon Cognito para gerenciar os usu�rios da aplica��o.<br>
�	Configure um App Client no User Pool para sua aplica��o e habilite a gera��o de tokens JWT.<br>
�	No backend:
�	Utilize a SDK do Cognito para autenticar usu�rios e validar tokens JWT recebidos.<br>
�	Implemente login, logout e registro de usu�rios utilizando as APIs do Cognito.<br>
�	Configure permiss�es da fun��o Lambda para acessar o Cognito.<br>
### 4. Frontend:
�	No console da AWS, acesse o servi�o S3.<br>
�	Crie um novo bucket S3 para hospedar o site est�tico.<br>
�	Fa�a o upload do c�digo do frontend para o bucket S3.<br>
�	Habilite o hosting de site est�tico no bucket S3 e configure as op��es necess�rias, como arquivo de �ndice e erro.<br>
�	Configure a pol�tica de bucket para permitir acesso p�blico ao conte�do.<br>


