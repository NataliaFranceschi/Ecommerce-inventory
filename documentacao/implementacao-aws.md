# Implementação AWS

#### A AWS disponibiliza diversos serviços que possibilitam subir um projeto para nuvem. Para projetos menores o EC2 é ideal pois permite aos usuários alugar computadores virtuais para executar seus próprios aplicativos. Entretanto para maior escalabilidade a AWS disponibiliza outros serviços com melhor desempenho. Em seguida, coloquei duas formas para subir esse projeto, com maior e menor escalabilidade.

## Opção com EC2
•	Acesse o console da AWS e vá para o serviço EC2. <br>
•	Crie uma nova instância EC2 com uma imagem do Windows Server.<br>
•	Conecte-se à instância EC2 via SSH (no caso de Linux) ou RDP (no caso de Windows).<br>
•	Instale o .NET Core SDK na instância EC2 seguindo as instruções da Microsoft.<br>
•	Clone o repositório do projeto no diretório desejado na instância EC2.<br>
•	Crie um User Secrets no backend com as chaves especificadas no README.<br>
•	Acesse o console da AWS e vá para o serviço RDS. <br>
•	Crie uma instância do banco de dados SQL Server na AWS RDS e configure para conectar-se a ao recurso de computação EC2 criado.<br>
•	Atualize a string de conexão do banco de dados no projeto ASP.NET Core para apontar para a instância do Amazon RDS com SQL Server.<br>
•	Substitua o uso de "localhost" no código frontend e backend pelo endereço IP público do EC2. Isso inclui a configuração do Axios e qualquer outra biblioteca ou configuração que faça referência ao endereço do servidor.<br>
•	Execute os comandos necessários para restaurar as dependências do projeto e iniciar o servidor backend e frontend.<br>

## Opção utilizando vários serviços da AWS
### 1. Banco de Dados:
•	Acesse o console da AWS e navegue até o serviço RDS.<br>
•	Crie uma nova instância de banco de dados SQL Server com as configurações necessárias (tamanho da instância, versão do banco de dados, nome de usuário e senha).<br>
•	Anote o endpoint do banco de dados, nome de usuário e senha para serem utilizados na configuração do backend.<br>
### 2. Backend:
•	No console da AWS, acesse o serviço Lambda.<br>
•	Crie uma nova função Lambda para o backend.<br>
•	Faça o upload do código do backend para a função Lambda.<br>
•	Configure a função Lambda para acessar o banco de dados RDS criado anteriormente.<br>
•	Acesse o serviço API Gateway no console da AWS.<br>
•	Crie uma nova API REST no API Gateway.<br>
•	Crie recursos e métodos na API de acordo com as rotas do backend.<br>
•	Configure os métodos para integrar com a função Lambda criada.<br>
•	Deploy a API Gateway.<br>
### 3. Autenticação JWT:
•	Crie um User Pool no Amazon Cognito para gerenciar os usuários da aplicação.<br>
•	Configure um App Client no User Pool para sua aplicação e habilite a geração de tokens JWT.<br>
•	No backend:<br>
•	Utilize a SDK do Cognito para autenticar usuários e validar tokens JWT recebidos.<br>
•	Implemente login, logout e registro de usuários utilizando as APIs do Cognito.<br>
•	Configure permissões da função Lambda para acessar o Cognito.<br>
### 4. Frontend:
•	No console da AWS, acesse o serviço S3.<br>
•	Crie um novo bucket S3 para hospedar o site estático.<br>
•	Faça o upload do código do frontend para o bucket S3.<br>
•	Habilite o hosting de site estático no bucket S3 e configure as opções necessárias, como arquivo de índice e erro.<br>
•	Configure a política de bucket para permitir acesso público ao conteúdo.<br>


