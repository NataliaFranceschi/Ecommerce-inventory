# Ecommerce Invertory
Desenvolvimento de um módulo para gerenciar o inventário dos produtos de um ecommerce.
## Backend
### Tecnologias Utilizadas
•	C# ASP.NET Core <br>
•	Swagger para documentação da API <br>
•	Autenticação JWT <br>
•	Banco de dados SQLite <br>
### Instruções de Instalação
1.	Clone o repositório do projeto em sua máquina local.
2.	Certifique-se de ter o .NET Core SDK instalado em sua máquina. Se não, você pode baixá-lo [aqui](https://dotnet.microsoft.com/en-us/download).
3.	Navegue até o diretório do backend do projeto.
4.	Execute o comando <strong> dotnet restore </strong>para instalar as dependências do projeto.
5.	Execute o comando <strong> dotnet ef database </strong> update para aplicar as migrações do banco de dados.
6.	Adicione no User Secrets uma chave "Secret" que será utilizada para assinar e verificar a autenticidade do token. Recomenda-se um comprimento mínimo de 256 bits (32 bytes) para o valor do secret.
7.	Execute o comando <strong> dotnet run </strong> para iniciar o servidor backend. Por padrão, ele estará disponível em https://localhost:5150.
### Documentação da API
A documentação da API pode ser acessada através do Swagger. Visite https://localhost:7137/swagger/index.html para visualizar todas as rotas disponíveis, seus parâmetros e especificações de retorno.
### Autenticação
A autenticação na API é feita utilizando tokens JWT. Para obter acesso às rotas protegidas, você deve incluir o token JWT no cabeçalho Authorization nas requisições HTTP. Um usuário administrador com as credenciais admin@admin.com e senha admin foi adicionado automaticamente ao banco de dados para fins de teste.
## Frontend
### Tecnologias Utilizadas
•	React com Vite para desenvolvimento rápido <br>
•	Axios para fazer chamadas à API RESTful <br>
•	Sass para estilização <br>
### Instruções de Instalação
1.	Certifique-se de ter o Node.js e o npm instalados em sua máquina. Se não, você pode baixá-los [aqui](https://nodejs.org/).
2.	Navegue até o diretório do frontend do projeto.
3.	Execute o comando <strong> npm install </strong> para instalar as dependências do projeto.
4.	Execute o comando <strong> npm run dev </strong> para iniciar o servidor de desenvolvimento. Por padrão, ele estará disponível em http://localhost:5173/.
### Utilização
Após iniciar o servidor de desenvolvimento do frontend, você poderá acessar a interface de usuário básica através do navegador. Uma página de login irá aparecer e utilizando o usuário para teste citado acima será possível realizar operações CRUD nos produtos do inventário.

![inventory](ecommerce-inventory.gif)

## Implementação AWS
### 1. Migração do Banco de Dados para o SQL Server: (O AWS RDS não suporta SQLite diretamente)
•	Exporte os dados do banco de dados SQLite para um formato compatível com o SQL Server, como um arquivo .sql.<br>
•	No Console AWS, navegue até o serviço AWS Database Migration Service (DMS).<br>
•	Crie uma nova tarefa de migração, apontando o banco de dados de origem para o arquivo .sql exportado e configurando o destino como uma instância do Amazon RDS com SQL Server.<br>
•	Execute a tarefa de migração e verifique se ela é concluída com sucesso.<br>
### 2. Implantação do Backend:
•	Acesse o console da AWS e vá para o serviço EC2. <br>
• Crie uma nova instância EC2 com uma imagem do Windows Server.<br>
• Certifique-se de abrir as portas necessárias (exemplo, porta 5150 para o servidor backend).<br>
•	Conecte-se à instância EC2 via SSH (no caso de Linux) ou RDP (no caso de Windows).<br>
•	Instale o .NET Core SDK na instância EC2 seguindo as instruções da Microsoft.<br>
•	Clone o repositório do projeto no diretório desejado na instância EC2.<br>
•	Atualize a string de conexão do banco de dados no projeto ASP.NET Core para apontar para a instância do Amazon RDS com SQL Server.<br>
•	Execute os comandos necessários para restaurar as dependências do projeto e iniciar o servidor backend.<br>
### 3. Implantação do Frontend:
• Construa o aplicativo React executando o comando <strong>npm run build</strong>.<br>
• Vá para o serviço S3 no console da AWS.<br>
• Crie um novo bucket S3 para armazenar os arquivos estáticos do frontend.<br>
• Faça upload dos arquivos de construção para um bucket S3.<br>
• Configure o bucket S3 para hospedar um site estático e defina as políticas de acesso conforme necessário.<br>
• Configure o frontend para fazer chamadas à API RESTful do backend hospedado na instância EC2.<br>

## Segurança
É recomendado a mudança da chave Secret para o AWS Secrets, mas para isso algumas alterações devem ser feitas.<br>

### 1. Criar um Novo Segredo no AWS Secrets Manager:
• Acesse o Console do AWS Secrets Manager.<br>
• Clique em "Store a new secret".<br>
• Selecione "Other type of secrets".<br>
• Insira o nome e a descrição do seu segredo.<br>
• No campo "Secret key/value", insira a sua chave secreta JWT. Certifique-se de que a chave seja armazenada de forma segura e mantenha sua confidencialidade.<br>
### 2. Configurar as Permissões de Acesso:
• Configure as permissões de acesso para o seu segredo, especificando quais entidades ou serviços têm permissão para acessá-lo.<br>
### 3. Atualizar o Código do Backend:
• No código do seu backend, atualize a lógica responsável por recuperar a chave secreta para que ela busque no AWS Secrets Manager em vez de nos User Secrets.<br>
• Utilize o SDK do AWS Secrets Manager para fazer a chamada e recuperar a chave secreta durante a inicialização da aplicação.<br>
