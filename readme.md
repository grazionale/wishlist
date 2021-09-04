### Antes de executar o projeto
1. Tenha em mãos uma instância de banco de dados postgres
1. Configure o .env com:
```
PORT=3333
DB_HOST=localhost
DB_PORT=5432
DB_NAME=wishlist
DB_USERNAME=postgres
DB_PASSWORD=postgres
```
***Obs: na raiz do projeto contém um .env.example***

## Como executar o projeto
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
yarn start
```
## Como rodar os testes
Este projete contém testes unitários e de integração. Os testes unitários foram feitos principalmente nas services, onde encontra-se toda regra de negócio. Nos testes unitários foi utilizado mock dos repositórios, enquanto nos testes de integração, nos controllers, foi utilizado o banco de dados SQLite em memória.

1. Instale as depêndecias
```
yarn install
```
2. Execute os testes
```
yarn test
```

## Como executar comandos do TypeOrm
Basta adicionar "yarn" antes do comando, exemplos:
```
yarn typeorm migration:run
```
```
yarn typeorm migration:generate -n CreateTableTest
```