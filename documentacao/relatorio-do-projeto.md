# Relatório do projeto 
## Backend:
•	<strong>Escolha de Tecnologia:</strong> Optei por C# ASP.NET Core devido à sua robustez, desempenho e por oferecer uma ampla gama de bibliotecas, frameworks e ferramentas disponíveis para auxiliar no desenvolvimento de aplicativos web, incluindo acesso a bancos de dados e autenticação. Além de ter o swagger que facilita a documentação da API.<br>
•	<strong>Estrutura do Código:</strong> Utilizei o padrão MVC para organizar o código de forma clara, facilitando a manutenção, extensibilidade e testabilidade do sistema.<br>
•	<strong>Banco de Dados:</strong> no projeto foi utilizado SQLServer por ser um banco mais robusto com suporte na AWS.<br>
## Frontend:
•	<strong>Escolha de Tecnologia:</strong> Optei por React com Vite devido ao ambiente de desenvolvimento rápido e à capacidade de componentização, proporcionando páginas com melhor usabilidade e código mais claro.<br>
•	<strong>Integração com Backend:</strong> Utilizei axios para realizar chamadas à API RESTful, pela facilidade de uso, garantindo uma comunicação eficiente entre frontend e backend.<br>
•	<strong>Armazenamento do Token:</strong> Para armazenar o token de autenticação usei o local storage, garantindo persistência entre sessões.<br>
•	<strong>Estilização:</strong> Escolhi o Sass para estilização pela sua capacidade de modularização e reutilização de estilos, o que permitiu manter um código limpo e organizado facilitando a manutenção e escalabilidade do frontend.<br>
## Problemas Enfrentados:
•	<strong>Escolha banco de dados:</strong> A priori tinha escolhido o SQLite pela simplicidade de configuração e uso, mas como não tem suporte na RDL da AWS seria necessário fazer a migração para outro banco quando fosse fazer a implementação, então mudei para o SqlServer.<br>
•	<strong>Testes de Integração:</strong> Depois que fiz a mudança de banco de dados tive que alterar os testes pois da forma que estava dava conflito com o banco de dados, dizia que já existia um banco criado.<br>
•	<strong>Outra Tecnologia:</strong> Tentei também desenvolver um front-end com AngularJS, interface que tive que aprender do zero, então enfrentei algumas dificuldades em deixa-la com a usabilidade desejada. <br>
•	<strong>AWS:</strong> Tive dificuldades em subir o projeto utilizando o EC2 na AWS, o servidor Windows criado era muito devagar, dificultando rodar o código.
