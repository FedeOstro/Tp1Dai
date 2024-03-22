import EventController from "./src/controllers/event-controller.js";

const app = express(); 
app.use(express.json()); 
const port = 3508;

app.use("/event", EventController);