import express from 'express';
import fs from 'fs'
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    next();
})

// Reads JSON file
const readFile = (filename) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) {
                console.log(err)
            }

            const result = JSON.parse(data)
            resolve(result)
        })
    })
}

// Returns said JSON file in http://localhost:3005/expenses
app.get('/expenses', async (req,res) => {
    readFile('./backend/data/expenses.json')
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send('Error')
        })
})

app.listen(3005, () => {
    console.log('backend server connected')
})