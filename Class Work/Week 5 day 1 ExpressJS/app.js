const express = require("express");
const { status } = require("express/lib/response");
const app = express();
const Product = require("./model/product");
const { success, failure } = require("./util/common");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get("/products/:id/:name",(req,res)=>{
//     const {id,name} = req.params;
//     console.log(id,name);
//     // console.log(req.method);
//     return res.status(200).send({message: "Hello world"});
// });


//---------------------------Get All---------------------------------------
app.get("/products/getAll", async (req, res) => {
  try {
    const result = await Product.getAll();
    console.log(success);
    if (result.success) {
      return res.status(200).send(success("Get all works", result));
    } else {
      return res.status(400).send(failure("Failed to fetch data"));
    }
  } catch (error) {
    console.log("Here catch");
    return res.status(500).send(failure("Server failed"));
    // return res.end();
  }
});

//-----------------------------getOneById-------------------------------------
app.get("/products/getByID", async (req, res) => {
  try {
    const { id } = req.query;
    console.log(id);
    const result = await Product.getOneById(id);
    console.log(result);
    if (result.success) {
      console.log(result);
      return res
        .status(200)
        .send(success("Data fetched successfully", result.data));
    } else {
      return res.status(400).send(failure("ID does not exist"));
    }
  } catch (error) {
    return res.status(500).send(failure("server error"));
  }
});

//-------------------------Create---------------------------------------------
app.post("/products/create", async (req, res) => {
  try {
    // console.log("bodyyy",req.body);
    const result = await Product.create(req.body);
    // console.log(result);
    // console.log("adadadad",result);
    if (result.success) {
      console.log(result);
      return res
        .status(200)
        .send(success("Data created successfully", req.body));
    } else {
      return res.status(400).send(failure("Input error"));
    }
  } catch (error) {
    return res.status(500).send(failure("serverrr error"));
  }
});

//-------------------------delete by ID---------------------------------------------
app.delete("/products/deleteById/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.deleteById(id);
    if (result.success === true && result.errors !== undefined) {
      console.log(result);
      return res.status(400).send(failure("Id not valid, Can not delete data"));
    } else if (result.success === true && result.data !== undefined) {
      return res
        .status(200)
        .send(success("id: " + id + " was successfully deleted"));
    }
  } catch (error) {
    return res.status(500).send(failure("server error"));
  }
});

//--------------------------------update by ID---------------------------------------------
app.put("/products/updateById/:id", async (req, res) => {
  try {
    const result = await Product.updateById();
    if (result.success) {
      console.log(result);
      return res.status(200).send(success("successfully updated data", result));
    } else {
      return res
        .status(400)
        .send(failure("Can not update the data", result.error));
    }
  } catch (error) {
    return res.status(500).send(failure("server error"));
  }
});

//--------------------------------get total value---------------------------------------------
app.get("/products/getTotalValue", async (req, res) => {
  try {
    const result = await Product.getTotal();
    console.log(success);
    if (result.success) {
      return res.status(200).send(success("Get all works", result.data));
    } else {
      return res.status(400).send(failure("Failed to fetch data"));
    }
  } catch (error) {
    console.log("Here catch");
    return res.status(500).send(failure("Server failed"));
    // return res.end();
  }
});

//--------------------------------get Products By userID---------------------------------------------
app.get("/products/getProductsUsingUserID", async (req, res) => {
  try {
    const { id } = req.query;
    console.log("....", id);
    const result = await Product.getProductsByUserId(id);
    console.log(success);
    if (result.success === true) {
      return res.status(200).send(success("Get all works", result));
    } else {
      return res.status(400).send(failure("User ID does not exist"));
    }
  } catch (error) {
    console.log("Here catch", error);
    return res.status(500).send(failure("Server failed"));
    // return res.end();
  }
});

//--------------------------------Sorting By Price---------------------------------------------
app.get("/products/sortingByPrice", async (req, res) => {
  try {
    const { sortingMethod } = req.query;
    //   console.log("....",id);
    const result = await Product.sortingByPrice(sortingMethod);
    console.log(success);
    if (result.success === true) {
      return res.status(200).send(success("Most Favorite Author", result));
    } else {
      return res.status(400).send(failure("Sorting can not done"));
    }
  } catch (error) {
    console.log("Here catch", error);
    return res.status(500).send(failure("Server failed"));
  }
});

//--------------------------------getting favorite author by userID---------------------------------------------
app.get("/products/gettingFavAuthByUserID", async (req, res) => {
  try {
    const { id } = req.query;
    //   console.log("....",id);
    const result = await Product.gettingFavAuthByUserID(id);
    console.log(success);
    if (result.success === true) {
      return res.status(200).send(success("Favorite Authors are:", result));
    } else {
      return res.status(400).send(failure("User ID does not exist"));
    }
  } catch (error) {
    console.log("Here catch", error);
    return res.status(500).send(failure("Server failed"));
  }
});

////------------------------------getting Top average rated manga---------------------------------------
app.get("/products/getTopManga", async (req, res) => {
  try {
    const { numberOfManga } = req.query;
    //   console.log("....",id);
    const result = await Product.getHighestRatedMangas(numberOfManga);
    console.log(success);
    if (result.success === true) {
      return res
        .status(200)
        .send(success("Average Highest rated Manga:", result));
    } else {
      return res
        .status(400)
        .send(failure("Can not get the highest rated manga"));
    }
  } catch (error) {
    console.log("Here catch", error);
    return res.status(500).send(failure("Server failed"));
  }
});

app.post("/product", (req, res) => {
  const { message, id } = req.body;
  console.log(message, id);
  return res.status(200).send({ message: "POST request successfull" });
});
app.get("/products", (req, res) => {
    const { id, name } = req.query;
    console.log(id, name);
    // console.log(req.method);
    return res.status(200).send({ message: "Hello world" });
  });

app.use("*", (req, res) => {
  return res.status(500).send({ message: "invalid URL" });
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
// app.post();
