const fs = require("fs");

class Product{
    fetchAllData(){
        const data = fs.readFileSync("./data/manga.json");
        return JSON.parse(data);
    }

    deleteID(id){
        const jsonData = this.fetchAllData();
        const target = jsonData.findIndex(key => key.id === id);

        if(target!=-1){
            const updatedObject= jsonData.filter(index => index.id != id);
            console.log("Deleted data at: "+new Date().getHours() +" : "+ new Date().getMinutes() +" : "+ new Date().getSeconds())
            fs.writeFileSync("./data/manga.json",JSON.stringify(updatedObject));
        }

        else{
            console.log("Invalid Id");
        }
    }
    updateID(id,updateParameter){
        const jsonData = this.fetchAllData();
        const target = jsonData.findIndex(key => key.id === id);
        if(target!=-1){
            jsonData[target] = {...jsonData[target],...updateParameter};
            console.log("Updated data at: "+new Date().getHours() +" : "+ new Date().getMinutes() +" : "+ new Date().getSeconds())
            fs.writeFileSync("./data/manga.json",JSON.stringify(jsonData));
        }
        else{
            console.log("Invalid Id");
        }

        

    }
}




module.exports = new Product();