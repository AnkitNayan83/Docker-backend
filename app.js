const express = require("express")
const pool = require("./db");
const port = 5555;

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
    try {
        const table = await pool.query("SELECT * FROM schools");
        res.status(200).json({
            message: "Data fetched successfully",
            data: table.rows,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
})

app.post("/", async (req, res) => {
    try {
        const { student_name, address, age } = req.body;
        await pool.query("INSERT INTO schools (student_name,address,age) VALUES ($1,$2,$3)", [student_name, address, age])
        res.status(201).json({
            success: true,
            message: "Student added successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
})

app.get("/setup",async (req,res)=>{
    try {
        await pool.query("CREATE TABLE schools(id SERIAL PRIMARY KEY, student_name VARCHAR(30), address VARCHAR(50), age INTEGER)")
        res.status(201).json({
            success: true,
            message: "School table created successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
})

app.listen(port, () => {
    console.log("Server has started on port " + port);
})