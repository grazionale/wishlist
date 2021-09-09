Este projeto tem como **objetivo permitir que outras aplicações salvem favoritos de clientes**, com o uso de uma API externa que fornece os produtos. 

Foi utilizado **RabbitMq como Message Broker** para servir a aplicação com uma **fila chamada ***product-external***** onde irá receber atualizações dos produtos e ser consumida por essa aplicação. 
Esta API possuí **autenticação e autorização**, mas para fins didáticos, o endpoint **/api/users** é público, assim qualquer um pode se cadastrar e fazer o uso do restante da API informando o access token gerado em **/api/auth**.
### Documentação da api
https://documenter.getpostman.com/view/6210463/U16gP79F#959c6092-1a16-43cb-a48c-b6ca18a54549

### URL de produção
https://product-wishlist.herokuapp.com/api

### RabbitMq de produção
Foi utilizado o Amazon Mq com RabbitMq para ser o message broker desta aplicação. Para fins didáticos, no painel, é possível enviar uma mensagem de atualização de produto para que a aplicação faça o consumo da mesma.

1. Acesse
https://b-6d416a88-5ec9-48a2-9be2-2a401500f74b.mq.us-east-2.amazonaws.com
2. Efetuei o login informando as credenciais
3. Clique em Queues
4. Escolha a queue product-external
5. Clique em publish message
6. Preencha o payload com um JSON válido seguindo o modelo abaixo
7. Clique em publish message
8. Pronto, agora a aplicação irá consumir essa mensagem e atualizar o produto

### Modelo de payload
```
{
  "integrationId": "36132ff2-8694-317d-543b-352ce73502cc",
  "title": "Assento Sanitário Conhaque Translúcido",
  "price": 250.30,
  "image": "http://challenge-api.luizalabs.com/images/36132ff2-8694-317d-543b-352ce73502cc.jpg"
}
```
*Obs: Solicitar as credenciais de acesso enviando um e-mail para gabrielgrazionale@hotmail.com e informando o motivo da solicitação*
# Executando em máquina local
É possível executar o projeto de duas formas, sendo a primeira rodando tudo via Docker(recomendável) e a segunda rodando a API separadamente.

## Primeira forma - via Docker
### Pré-requisitos
- Docker
- Docker Compose
- Porta 3333 disponível
### Executando o projeto
```
  yarn up
```
*Obs: O comando **yarn up** irá fazer o build do projeto, rodar as migrations e por fim levantar todos os containers utilizando o docker-compose.*

Aguarde até o log aparecer:
```
wishlist-api         | Database connection success. Connection name: 'default' Database: 'wishlist'
wishlist-api         | Server running at http://localhost:3333/api
```
## Segunda forma - Manualmente
Esta forma é mais indicada para quem quer continuar o desenvolvimento do projeto, pois nela é utilizado a biblioteca ts-node-dev que faz o reload da aplicação quando alterado o código fonte.
### Pré-requisitos
- Instância de banco de dados Postgres
- Instância de RabbitMq

*Obs: é possível criar ambas instâncias utilizando o docker-compose, conforme demonstrado nos passos 2 e 3 respectivamente*
### Primeiro passo
1. Configure o .env na raiz do projeto conforme o exemplo abaixo:
```
PORT=3333
DB_HOST=localhost
DB_PORT=5532
DB_NAME=wishlist
DB_USERNAME=postgres
DB_PASSWORD=postgres
JWT_SECRET=your_secret
JWT_EXPIRES_IN=1d
AMQP_RABBITMQ=amqp://admin:1@localhost
```
*Obs: na raiz do projeto contém um .env.example*

**AMQP_RABBITMQ**: variável de ambiente com o host e porta para o RabbitMq que iremos configurar no segundo passo.

**DB_***: variáveis de ambiente para o banco de dados Postgres que iremos configurar no terceiro passo.

### Segundo passo
Este projeto conta com um container de **RabbitMq** para que seja possível efetuar a atualização dos produtos vindos da API externa através de uma fila.

Para criar esse container, basta executar o comando:
```
docker-compose up -d rabbitmq
```
O Rabbitmq estará disponível em: http://localhost:15672

Usuário: admin

Senha: 1
### Terceiro passo
Este projeto conta com um container de banco de dados **Postgres**. 

Para criar esse container, basta executar o comando:
```
docker-compose up -d wishlist-database
```
O Potsgres estará disponível em: http://localhost:5532
### Quarto passo
1. Instale as depêndecias
```
yarn install
```
2. Execute as migrations
```
yarn typeorm migration:run
```
3. Execute o projeto
```
yarn dev
```
# Rodando os testes
Este projete contém testes **unitários** e de **integração**. Os testes unitários foram feitos principalmente nas services, onde encontra-se toda regra de negócio. Nos testes unitários foi utilizado **mock dos repositórios**, enquanto nos testes de integração, nos controllers, foi utilizado o banco de dados **SQLite em memória**.

1. Instale as depêndecias
```
yarn install
```
2. Execute os testes
```
yarn test --coverage
```