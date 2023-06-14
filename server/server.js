const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const salt = 10;

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST","GET"],
    credentials: true
}));
app.use(cookieParser());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
});

app.post('/signup', (req, res)=>{
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}/

    if(req.body.name === "") return res.json({Error: "Name shouldn't be empty"});
    if(req.body.email === ""){
        return res.json({Error: "Email shouldn't be empty"});
    }else if(!email_pattern.test(req.body.email)){
        return res.json({Error: "Email didn't match"});
        
    }if(req.body.password === ""){
         return res.json({Error: "Password shouldn't be empty"});
    }else if (!password_pattern.test(req.body.password)){
        return res.json({Error:"Password should have 8 and more signs with letters in lowcase and uppercase"});
    }
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";
        bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if(err) return res.json({Error: "Error for hassing password"});

        const values = [
            req.body.name,
            req.body.email,
            hash
        ]
        db.query(sql, [values], (err, result) => {
            if(err) return res.json({Error: "Inserting data Error in server"});
            return res.json({Status: "Success"});
        });
    });

});

app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM login WHERE email = ?';
    db.query(sql, [req.body.email], (err, data) => {
        
        if(err) return res.json({Error: "Login error in server"});
        if(data.length > 0){
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if(err) return res.json({Error: "Password compare error"});
                if(response){
                    const name = data[0].name;
                    const token = jwt.sign({name}, "jwt-secret-key", {expiresIn: '1d'});
                    res.cookie('token', token);
                    return res.json({Status: "Success"});
                }else{
                    return res.json({Error: "Password not matched"});
                
                }
            })
        }else{
            return res.json({Error: "No email existed"});
        }
        
    })
})
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.json({Message: "You are not authenticated"});
    }else{
        jwt.verify(token,"jwt-secret-key", (err, decoded) =>{
            if(err){
                return res.json({Message: "Token isn't okey"});
            }else{
                req.name = decoded.name;
                next();
            }
        })
    }
}
app.get('/autication', verifyUser, (req, res) => {
    return res.json({Status: "Success", name: req.name});
})

app.get('/logout', (req, res)=>{
    res.clearCookie('token');
    return res.json({Status: "Success"});
})
app.listen(8081, ()=>{
    console.log("Running...");
})