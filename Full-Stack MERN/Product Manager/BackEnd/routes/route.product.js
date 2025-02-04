const ProductController = require('../controller/controller.product');
module.exports = function(app){
    app.post('/api/create', ProductController .CreateProduct);
    app.get('/api/products', ProductController .getAllProducts);
    app.get('/api/products/:id', ProductController .getProduct);
    app.put('/api/products/:id', ProductController .updateProduct);
    app.delete('/api/products/:id', ProductController .deleteProduct);

}
