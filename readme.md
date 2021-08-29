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

