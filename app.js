const express = require('express')
const mongoose = require('mongoose')
const app =  express();
const bodyParser = require('body-parser');
const { application } = require('express');


mongoose.connect('mongodb+srv://Sampleapi:Shivam@cluster0.aut97y9.mongodb.net/').then(() => {
    console.log("Connected with MongoDB");
}).catch((err) => {
    console.log(err);
});


app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json())

// scehme layout
const productSchema = new mongoose.Schema({
    name : String,
    description: String,
    price: Number
})

const Product = new mongoose.model("Product", productSchema)

//  creating a product
app.post("/api/v1/product/new", async(req,res)=>{
    
  const product =   await Product.create(req.body);
res.status(201).json({
    success: true,
    product
})

})


//  reading all the product
app.get("/api/v1/products", async(req,res)=>{
    const products = await Product.find();

    res.status(201).json({
        success: true,
        products
    })
})

//  update product

app.put("/api/v1/product/:id", async(req,res)=>{
    let product = await Product.findById(req.params.id);

    product = await Product.findByIdAndUpdate(req.params.id, req.body , {
        new: true,
        useFindAndModify : false,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        product
    })
})
//  delete product

app.delete("/api/v1/product/:id", async (req, res) => {


     const product = await Product.findById(req.params.id);
     
    if(!product){
     return   res.status(501).json({
            success : false,
            message: "Proudct is not find"
        })
    }

    await product.deleteOne({ _id: req.params.id });


    res.status(201).json({
        success: true,
        message: "The product is deleted sucesfully"
    })
   })

app.listen(7000, ()=>{
    console.log("Server is running at http://localhost:7000")
})