const express = require("express")

const router = express.Router()

router.get("/user", (req, res)=>{
    res.json({
        data: "Hello from user 2 route"
    })
})

module.exports = router