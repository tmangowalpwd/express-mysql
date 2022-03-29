const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

// Untuk baca file .env
dotenv.config()

const PORT = process.env.PORT

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("<h1>Welcome to jcwd2002 ecommerce API</h1>")
})

const { productRoutes, titanicRoutes } = require("./routes")

app.use("/products", productRoutes)
app.use("/titanic", titanicRoutes)

app.listen(PORT, () => {
  console.log("Listening in port", PORT)
})
