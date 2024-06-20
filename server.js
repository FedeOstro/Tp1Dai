import express from "express"
import EventController from "./src/controllers/event-controller.js";
import UserController from "./src/controllers/user-controller.js";
import ProvinciasController from "./src/controllers/provincias-controller.js";
import LocationController from "./src/controllers/location-controller.js"
import CategoryController from "./src/controllers/category-constroller.js";
const app = express(); 
app.use(express.json()); 
const port = 3408;

app.use("/event", EventController);
app.use("/user", UserController);
app.use("/provincia", ProvinciasController);
app.use("/location", LocationController)
app.use("/event-category", CategoryController)

app.listen(port, () =>{
    console.log("Anda el server")
})