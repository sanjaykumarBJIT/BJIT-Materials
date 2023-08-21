const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("saved", (e) => {
    console.log("A saved event occurred ",e);
})

emitter.emit("saved",{message:"GG"});