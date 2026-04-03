const express = require("express");
const cors = require("cors");
const ticketRoutes = require("../backend/routes/ticketRoutes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use("/tickets", ticketRoutes);

app.get("/test", (req, res) => {
  res.json({ msg: "working" });
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});