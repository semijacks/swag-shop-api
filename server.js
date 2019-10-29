var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var db = mongoose.connect("mongodb://localhost/swag-shop");

var Product = require("./model/product");
var WishList = require("./model/wishlist");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/product", function(request, response) {
  var product = new Product();
  product.title = request.body.title;
  product.price = request.body.price;
  product.save(function(err, savedProduct) {
    if (err) {
      response.status(500).send({ error: "Could not save product" });
    } else {
      response.status(200).send(savedProduct);
    }
  });
});

app.listen(3001, function() {
  console.log("Swag Shop API running at port 3001!....");
});
