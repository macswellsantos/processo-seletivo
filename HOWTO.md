# Configurações

Para executar este projeto da forma correta, as seguintes configurações devem ser realizadas.

## Banco de dados

Deve-se alterar as seguintes linhas no arquivo `persistence.xml` localizado no diretório **src/META-INF**:

    <property name="javax.persistence.jdbc.user" value="usuario" />
	<property name="javax.persistence.jdbc.password" value="senha" />
E inserir o usuario e a senha do banco configurado na seu ambiente.

### Criando a database

É necessário criar a database no MySQL chamada **funcionarios_prova** para que o programa possa ser executado corretamente.

### Executando o projeto
Basta apenas importar o projeto no Eclipse como projeto Maven e colocar para executar no servidor apache. 
