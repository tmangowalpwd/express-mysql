const { db, dbQuery } = require("../database")

const productControllers = {
  getAllProducts: async (req, res) => {
    try {
      let sqlQuery = `SELECT * FROM products;`

      const dbResult = await dbQuery(sqlQuery);

      res.status(200).json({
        message: "Find all products",
        result: dbResult
      })
    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: "Server error"
      })
    }
  },
  createNewProduct: (req, res) => {
    try {
      const { product_name, price, stock, category } = req.body

      let sqlQuery = `
        INSERT INTO products VALUES 
        (0, "${product_name}", ${price}, "${category}", ${stock});
      `

      let replacementQuery = `
        INSERT INTO products VALUES 
        (0, ?, ?, ?, ?);
      `

      let replacements = [product_name, price, category, stock]

      db.query(replacementQuery, replacements, (err, result) => {
        if (err) throw err

        res.status(201).json({
          message: "Product created",
          result
        })
      })

      // db.query(sqlQuery, (err, result) => {
      //   if (err) throw err

      //   res.status(201).json({
      //     message: "Product created",
      //     result
      //   })
      // })
    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: "Server error"
      })
    }
  },
  editProductById: (req, res) => {
    try {
      const { product_name, price, stock, category } = req.body
      const productId = req.params.id

      let editQuery = ""

      if (product_name) {
        editQuery += `product_name = "${product_name}", `
      }

      if (price) {
        editQuery += `price = ${price}, `
      }

      if (stock) {
        editQuery += `stock = ${stock}, `
      }

      if (category) {
        editQuery += `category = "${category}", `
      }

      editQuery = editQuery.slice(0, -2);

      let sqlQuery = `UPDATE products SET ${editQuery} WHERE id = ${productId}`
      // UPDATE products SET product_name = "Kelapa Muda", category = "buah", WHERE id = 1

      db.query(sqlQuery, (err, result) => {
        if (err) throw err

        res.status(200).json({
          message: "Edit product",
          result
        })
      })
    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: "Server error"
      })
    }
  },
  deleteProductById: (req, res) => {
    try {
      let productId = req.params.id;

      let sqlQuery = `DELETE FROM products WHERE id = ?`

      let replacements = [productId]

      db.query(sqlQuery, replacements, (err, result) => {
        if (err) throw err;

        res.status(200).json({
          message: "Product deleted"
        })
      })
    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: "Server error"
      })
    }
  },
}

module.exports = productControllers