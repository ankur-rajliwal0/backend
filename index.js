const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;

app.use(express.json());

app.use(cors());
var user = [];

app.post("/test", (req, res) => {
  var id = req.body.id;
  var pass = req.body.pass;
  var dummy = {
    id: id,
    pass: pass,
  };
  user.push(dummy);
  console.log(user);
  res.json({ users: user });
});

app.post("/signup", (req, res) => {
  var id = req.body.id;
  var pass = req.body.pass;
  var email = req.body.email;
  var num = req.body.num;
  var adress = req.body.adress;
  var dummy = {
    id,
    pass,
    email,
    num,
    adress,
    purchased: [],
    wishlist: [],
    addcart: [],
  };
  user.push(dummy);
  console.log(user);
  res.json({
    user,
  });
});

app.post("/login", (req, res) => {
  var id = req.body.id;
  var pass = req.body.pass;

  console.log({ id, pass });

  for (let i = 0; i < user.length; i++) {
    if (user[i].id == id)
      if (user[i].pass == pass) {
        console.log({
          message: `login successfull `,
          id: user[i].id,
          pass: user[i].pass,
          email: user[i].email,
          num: user[i].num,
          adress: user[i].adress,
        });
        res.json({
          message: `login successfull `,
          name: user[i].id,
          pass: user[i].pass,
          email: user[i].email,
          num: user[i].num,
          adress: user[i].adress,
        });
      } else {
        res.json({ message: "login fail" });
      }
    res.json({ message: "user not found " });
  }
});

app.post("/forgetpassword", (req, res) => {
  const id = req.body.id;
  const pass = req.body.pass;
  const newpass = req.body.newpass;

  for (let i = 0; i < user.length; i++) {
    if (user[i].id === id)
      if (user[i].pass === pass) {
        user[i].pass = newpass;
        console.log(user);
      } else {
        console.log({ message: "password is inncorect" });
      }
  }
});

var seller = [];
app.post("/sellersignup", (req, res) => {
  var id = req.body.id;
  var pass = req.body.pass;
  var num = req.body.num;
  var adress = req.body.adress;
  var email = req.body.email;
  var dummy = {
    id,
    pass,
    num,
    adress,
    email,
  };
  seller.push(dummy);
  console.log(dummy);
  res.json({
    message: "login successfully",
    dummy,
  });
});
app.post("/sellerlogin", (req, res) => {
  var id = req.body.id;
  var pass = req.body.pass;

  console.log({ id, pass });

  for (let i = 0; i < seller.length; i++) {
    if (seller[i].id == id)
      if (seller[i].pass == pass) {
        console.log({
          message: `login successfull `,
          id: seller[i].id,
          pass: seller[i].pass,
          email: seller[i].email,
          num: seller[i].num,
          adress: seller[i].adress,
        });
        res.json({
          message: `login successfull `,
          name: seller[i].id,
          pass: seller[i].pass,
          email: seller[i].email,
          num: seller[i].num,
          adress: seller[i].adress,
        });
      } else {
        res.json({ message: "login fail" });
      }
    res.json({ message: "user not found " });
  }
});
var products = [];
app.post("/allproducts", (req, res) => {
  var productid = req.body.productid;
  var name = req.body.name;
  var prize = req.body.prize;
  var image = req.body.image;
  var discription = req.body.discription;
  var dummy = {
    name,
    prize,
    image,
    discription,
    productid,
  };
  products.push(dummy);
  console.log(products);
  res.json(dummy);
});
app.get("/getproducts", (req, res) => {
  console.log(products);
  res.json(products);
});
const purchase = [];
app.post("/purchase", (req, res) => {
  const productid = req.body.productid;
  for (let i = 0; i < products.length; i++) {
    if (products[i].productid === productid) {
      purchase.push(products[i]);
      return res.json({
        purchase,
      });
    }
  }

  return res.json({
    message: "Failed to purchase",
  });
});
app.post("/userpurchased", (req, res) => {
  const id = req.body.id;
  const pass = req.body.pass;
  const productid = req.body.productid;

  for (i = 0; i < user.length; i++) {
    if (user[i].id === id)
      if (user[i].pass === pass) {
        for (j = 0; j < products.length; j++) {
          if (products[j].productid === productid) {
            user[i].purchased.push(products[j]);
            return res.json(user);
          }
        }
        return res.json({ message: "purchase failed " });
      }
    return res.json({ message: "log in failed" });
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
