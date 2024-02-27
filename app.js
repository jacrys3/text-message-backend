import express from 'express'

const app = express()

app.get('/api/data', (req, res) => {
  res.json({ message: 'HI' })
})

export default app
