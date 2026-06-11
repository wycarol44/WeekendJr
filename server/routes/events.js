import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import EventssController from '../controllers/events.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

router.get('/', EventssController.getEvents)

router.get('/:eventId', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../public/event.html'))
})

export default router
