const express = require('express')
const cors = require('cors')

require('dotenv').config()

const mongoConfig = require('./config')

const Mail = require("./models/Mail")

mongoConfig()

const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')

const { authorize } = require('./middleware/authMiddleware')

const app = express()

const PORT = 8080

app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/api/users', authorize, userRoutes)

// "index" route
app.get('/api/mails', async (req, res) => {
    try {
        console.log("its working")
        const mails = await Mail.find()
        res.status(200).json(mails)
        
    } catch(err) {
        console.log(err.message)
        res.status(400).json(err)
    }
})

// "create" route
app.post('/api/mails', async (req, res) => {
    try {
        console.log('POST /api/mails')
        console.log(req.body)
        const mails = await Mail.create(req.body)
        res.status(200).json(mails)
    } catch(err) {
        console.log(err.message)
        res.status(400).json(err)
    }
})

// "show" route

app.get('/api/mails/:id', async (req, res) => {
    try {
        console.log("its working")
        const mails = await Mail.findById(req.params.id)
        res.status(200).json(mails)
        
    } catch(err) {
        console.log(err.message)
        res.status(400).json(err)
    }
})

// "delete" route
app.delete('/api/mails/:id', async (req, res) => {
    try {
        console.log('DELETE /api/mails/:id')
        await Mail.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'successfully deleted' })
    } catch(err) {
        console.log(err.message)
        res.status(400).json(err)
    }
})

// "update" route
app.put('/api/mails/:id', async (req, res) => {
    try {
        console.log('PUT /api/mails/:id')
        await Mail.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({ message: 'successfully updated' })
    } catch(err) {
        console.log(err.message)
        res.status(400).json(err)
    }
})

app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT)
})

