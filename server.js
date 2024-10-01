// import dependencies
const express = require("express")
const app = express()
const mysql = require('mysql2')
const dotenv = require('dotenv')
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

// configure environment variables
dotenv.config();

// create a connection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

// test the connection
db.connect((err) => {
    // connection is not successsful
    if(err) {
        return console.log("Error connecting to the database: ", err)
    }

    // connection successful
    console.log("Successfully connected to MySQL: ", db.threadId)
})

app.get('/', (req, res) => {
    return res.render('index.html')
})

//  Question 1:  Retrieve all patients
app.get('/get-patients', (req, res) => {
    const getPatients = "SELECT patient_id, first_name, last_name, date_of_birth FROM patients"
    db.query(getPatients, (err, data) => {
        // if I have an error
        if(err) {
            console.log({err})
        }
        
        // res.status(200).render('data', { data })
        res.status(200).send(data)
    })
})

// Qustion 2: Retrieve all providers
app.get('/get-providers', (req, res) => {
    const getProviders = "SELECT first_name, last_name, provider_specialty FROM providers"
    db.query(getProviders, (err, data) => {
        // if I have an error
        if(err) {
            console.log({err})
        }
        
        // res.status(200).render('data', { data })
        res.status(200).send(data)
    })
})

// Question 3: Filter patients by First Name
app.get('/filter-patients', (req, res) => {
    const firstName = req.query.search
    const filterPatients = `SELECT * FROM patients WHERE first_name='${firstName}'`
    db.query(filterPatients, (err, data) => {
        // if I have an error
        if(err) {
            console.log({err})
        }
        
        // res.status(200).render('data', { data })
        res.status(200).send(data)
    })
})

// Question 4: Retrieve all providers by their specialty
app.get('/get-providers-speciality', (req, res) => {
    const specialty = req.query.search
    const getProvidersSpecialty = `SELECT * FROM providers WHERE provider_specialty='${specialty}'`
    db.query(getProvidersSpecialty, (err, data) => {
        // if I have an error
        if(err) {
            console.log({err})
        }
        
        // res.status(200).render('data', { data })
        res.status(200).send(data)
    })
})

// start and listen to the server
app.listen(3300, () => {
    console.log(`Server is running on port 3300...`)
})




