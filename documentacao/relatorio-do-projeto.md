# Relat�rio do projeto 
## Backend:
�	<strong>Escolha de Tecnologia:</strong> Optei por C# ASP.NET Core devido � sua robustez, desempenho e por oferecer uma ampla gama de bibliotecas, frameworks e ferramentas dispon�veis para auxiliar no desenvolvimento de aplicativos web, incluindo acesso a bancos de dados e autentica��o. Al�m de ter o swagger que facilita a documenta��o da API.<br>
�	<strong>Estrutura do C�digo:</strong> Utilizei o padr�o MVC para organizar o c�digo de forma clara, facilitando a manuten��o, extensibilidade e testabilidade do sistema.<br>
�	<strong>Banco de Dados:</strong> no projeto foi utilizado SQLServer por ser um banco mais robusto com suporte na AWS.<br>
## Frontend:
�	<strong>Escolha de Tecnologia:</strong> Optei por React com Vite devido ao ambiente de desenvolvimento r�pido e � capacidade de componentiza��o, proporcionando p�ginas com melhor usabilidade e c�digo mais claro.<br>
�	<strong>Integra��o com Backend:</strong> Utilizei axios para realizar chamadas � API RESTful, pela facilidade de uso, garantindo uma comunica��o eficiente entre frontend e backend.<br>
�	<strong>Armazenamento do Token:</strong> Para armazenar o token de autentica��o usei o local storage, garantindo persist�ncia entre sess�es.<br>
�	<strong>Estiliza��o:</strong> Escolhi o Sass para estiliza��o pela sua capacidade de modulariza��o e reutiliza��o de estilos, o que permitiu manter um c�digo limpo e organizado facilitando a manuten��o e escalabilidade do frontend.<br>
## Problemas Enfrentados:
�	<strong>Escolha banco de dados:</strong> A priori tinha escolhido o SQLite pela simplicidade de configura��o e uso, mas como n�o tem suporte na RDL da AWS seria necess�rio fazer a migra��o para outro banco quando fosse fazer a implementa��o, ent�o mudei para o SqlServer.<br>
�	<strong>Testes de Integra��o:</strong> Depois que fiz a mudan�a de banco de dados tive que alterar os testes pois da forma que estava dava conflito com o banco de dados, dizia que j� existia um banco criado.<br>
�	<strong>Outra Tecnologia:</strong> Tentei tamb�m desenvolver um front-end com AngularJS, interface que tive que aprender do zero, ent�o enfrentei algumas dificuldades em deixa-la com a usabilidade desejada. <br>
�	<strong>AWS:</strong> Tive dificuldades em subir o projeto utilizando o EC2 na AWS, o servidor Windows criado era muito devagar, dificultando rodar o c�digo.
