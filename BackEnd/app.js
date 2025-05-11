const express = require("express");
const app = express();
const movieRoutes = require("./routes/movieRoutes");

app.use(express.json());

// Route gốc cho movie
app.use("/api/movies", movieRoutes);
// Catch all unknown routes (404 handler)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
