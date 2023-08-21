const events = require("events");
const emitter = new events();
const path = require("path");
const fs = require("fs");

emitter.on("backup", () => {
  let hour = new Date().getHours();
  let amPm = "";
  if (hour > 12) {
    hour = hour - 12;
    amPm = "PM";
  } else {
    amPm = "AM";
  }
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "data", "manga.json"), "utf-8")
  );

  const backup = JSON.parse(
    fs.readFileSync(path.join(__dirname, "backup", "manga.json"), "utf-8")
  );

  if (JSON.stringify(data) != JSON.stringify(backup)) {  
    if(data.length<backup.length){
        console.log(
            `Deleted at: ${hour} ${amPm} : ${new Date().getMinutes()} : ${new Date().getSeconds()} ${amPm} .......`
          );
    }
    console.log(
      `Updated at: ${hour} ${amPm} : ${new Date().getMinutes()} : ${new Date().getSeconds()} ${amPm} .......`
    );
    fs.writeFileSync(
      path.join(__dirname, "backup", "manga.json"),
      JSON.stringify(data)
    );
  } 
});

setInterval(() => {
  emitter.emit("backup");
}, 1000);
