import EventController from "./src/controllers/event-controller.js";
import UserController from "./src/controllers/user-controller.js";
import ProvinciasController from "./src/controllers/provincias-controller.js";

const app = express(); 
app.use(express.json()); 
const port = 3508;

app.use("/event", EventController);
app.use("/user", UserController);
app.use("/provincia", ProvinciasController);