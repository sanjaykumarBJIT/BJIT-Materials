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
            fs.writeFileSync("./data/manga.json",JSON.stringify(updatedObject));
            console.log(updatedObject);
        }

        // if(target!=-1){
        //     jsonData.splice(target, 1);
        //     fs.writeFileSync("./data/manga.json",JSON.stringify(jsonData));
        // }

        else{
            console.log("Invalid Id");
        }
    }
    updateID(id,updateParameter){
        const jsonData = this.fetchAllData();
        // console.log(jsonData.find(key => key.id === id));
        const target = jsonData.findIndex(key => key.id === id);
        
        // if(updateParameter.name!=null){
        //     target.name = updateParameter.name;
        // }

        if(target!=-1){
            jsonData[target] = {...jsonData[target],...updateParameter};
            console.log(jsonData);
            fs.writeFileSync("./data/manga.json",JSON.stringify(jsonData));
        }
        else{
            console.log("Invalid Id");
        }

        

    }
}




module.exports = new Product();