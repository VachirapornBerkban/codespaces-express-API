const express = require('express');
const bodyParser = require('body-parser');
var mysql = require('mysql');
const res = require('express/lib/response');
 
const app = express();
const port = 5001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
 
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE",
  );
  next();
});
app.use(express.json());
 
var con = mysql.createConnection({
  host: "korawit.ddns.net",
  user: "webapp",
  password: "secret2024",
  port: "3307",
  database: "shop",
});
 
con.connect(function(err){
  if(err) throw err;
});
 
app.get('/', (req, res) => {
  res.send('Hello World!');
})
 
app.get('/api/products',function(req,res){
  con.query("SELECT * FROM products",function(err,result,fields){
    if(err) throw res.status(400).send("No products found");
    console.log(result);
    res.send(result);
  });
})
 
app.get('/api/products/:id',function(req,res){
  const id = req.params.id;
  con.query("SELECT * FROM products where id="+id,function(err,result,fields){
    if(err) throw err;
    let product=result;
    if(result.length>0){
      res.status(400).send(`No products id: ${id} found`);
    }else{
      console.log(result);
      res.send(result);
    }
  });
})
 
app.post('/api/addproducts',function(req,res){
  const name=req.body.name;
  const price=req.body.price;
  const img=req.body.img;
   var sql ='INSERT INTO product (name,price,img) VALUES('${name}','${price}','${img}');
   con.query (sql,function(err,result){
    if(err) throw res.status(400).send("No products found");

    console.log(result);
    res.send(result);
   });
  });
});

app.delete('/api/addproduct/:id',function(req,res){
  const id=req.params.id;
  con.query("DELETE FROM product where id="+id,function(err,result,fields){
    if(err) throw err;
    con.query("SELECT * FROM products" ,function(err,result,fields){
      if(err) throw err;
      console.log(result);
      res.send(result);
    });
  });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  res.send(result);
})