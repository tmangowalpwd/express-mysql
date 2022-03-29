const { titanicQuery } = require("../database");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const { page = 1, maxItemPerPage = 10 } = req.query

    const sqlQuery = `
      SELECT * FROM passengers LIMIT ${maxItemPerPage} OFFSET ${(page - 1) * maxItemPerPage}
    `

    const dbResult = await titanicQuery(sqlQuery);

    res.status(200).json({
      message: "Get passengers",
      result: dbResult
    })

  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "Server error"
    })
  }
})

module.exports = router