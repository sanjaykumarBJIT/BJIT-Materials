const fs = require("fs");
class Product {
  getAll() {
    const data = fs.readFileSync("./data/manga.json", "utf-8");
    return JSON.parse(data);
  }

  //////////////////////finding element by id
    getOneById(id)
    {
      const jsondata = this.getAll();
      const data = jsondata.filter((e) => {
            return e.id === id;
      });

    //   console.log(jsondata.find(product => product.id === id));

      return data;
    }

    //////////////////////adding element at the last position

  add(product) {
    const jsonData = JSON.parse(fs.readFileSync("./data/manga.json", "utf-8"));
    // const newData = { id: data.length + 1, ...product };
    const newData = {...product, id: jsonData[jsonData.length - 1].id + 1};
    jsonData.push(newData);
    //console.log(jsonData);
    fs.writeFileSync("./data/manga.json",JSON.stringify(jsonData));
  }
}

module.exports = new Product();