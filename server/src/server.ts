import experess from "express";
import notesRoutes from "./routes/noteRoutes";
import connectDB from "./config/db";
import dotenv from "dotenv";
import http from "http";

dotenv.config();

const DB_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.njbghwa.mongodb.net/notes_db?retryWrites=true&w=majority&appName=Cluster0`;

const app = experess();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(experess.json());

app.use("/api/notes", notesRoutes);
const PORT = process.env.PORT || 5001;

async function startApp() {
  try {
    await connectDB(DB_URL);

    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log("Server started on port: " + PORT);
    });

  } catch (e) {
    console.log(e);
  }
}

startApp();