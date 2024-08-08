# E-Commerce Backend
## AKA Internet Retail
## Installation
1. Clone the repository:
``` 
git clone https://github.com/LorenzoNolasco/internet_retail_backend
cd internet_retail_backend
```
2. Make an .env file with:
```
DB_DATABASE: ecommerce_db
DB_USER: postgres (if your are using pgAdmin 4)
DB_PASSWORD: {insert personal postgres password}
```
3. Navigate to db to install schema.sql for the database:
```
cd db
psql -U postgres
```
4. Install npm packages, enter seeds, and run server:
```
npm i && npm run seed && npm run start
```
5. Launch insomnia and run routes as http requests in insomnia:
  - Categories
    - Get All (GET): http://localhost:3001/api/categories
    - Get One (GET): http://localhost:3001/api/categories/{enter_valid_id}
    - Add One (POST): http://localhost:3001/api/categories
    - Update One (PUT): http://localhost:3001/api/categories/{enter_valid_id}
    - Delete One (DELETE): http://localhost:3001/api/categories/{enter_valid_id}
  - Products
    - Get All (GET): http://localhost:3001/api/products
    - Get One (GET): http://localhost:3001/api/products/{enter_valid_id}
    - Add One (POST): http://localhost:3001/api/products/
    - Update One (PUT): http://localhost:3001/api/products/{enter_valid_id}
    - Delete One (DELETE): http://localhost:3001/api/products/{enter_valid_id}
  - Tags
    - Get All (GET): http://localhost:3001/api/tags
    - Get One (GET): http://localhost:3001/api/tags/{enter_valid_id}
    - Add One (POST): http://localhost:3001/api/tags/
    - Update One (PUT): http://localhost:3001/api/tags/{enter_valid_id}
    - Delete One (DELETE): http://localhost:3001/api/tags/{enter_valid_id}
## Video
### Categories:
### Products:
### Tags:
