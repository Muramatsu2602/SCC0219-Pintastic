const express = require('express');
const productsController = require("./controllers/productsController");
const mongoose = require('mongoose')
const bodyParser = require('body-parser');

// Import routes
// const productsRoutes = require('./server/routes/products');


// Create Express app
const app = express();

// Start the server
const port = process.env.PORT || 8080;

mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost/ExpressDB",{
  useNewUrlParser : true,
  useUnifiedTopology : true,
})

app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

app.route("/product").get((req,res,next) => {
  console.log(`Request from : ${req.originalUrl}`)
  console.log(`Request type : ${req.method}`)
  next();
},productsController.getAllProducts)
.post(productsController.addProduct)

app.route("/product/:productId")
.get(productsController.getProductById)
.put(productsController.updateProductById)
.delete(productsController.deleteProductById)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// const dbURI = 'mongodb://localhost:27017/mydatabase'; // Replace with your MongoDB connection string
// mongoose
//   .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((err) => {
//     console.error('Failed to connect to MongoDB', err);
//     process.exit(1);
//   });

// Routes
// app.use('/api/products', productsRoutes);

