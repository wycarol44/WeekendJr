import { pool } from './database.js'
import './dotenv.js'
import eventData from '../data/events.js'

const createEventsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS events;

        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            category VARCHAR(100) NOT NULL,
            ageGroup VARCHAR(100) NOT NULL,
            minAge INTEGER NOT NULL,
            maxAge INTEGER NOT NULL,
            time TIMESTAMP NOT NULL,
            address TEXT NOT NULL,
            zip VARCHAR(10) NOT NULL,
            latitude DECIMAL(10, 7) NOT NULL,
            longitude DECIMAL(10, 7) NOT NULL,
            image TEXT NOT NULL,
            description TEXT NOT NULL,
            organizer VARCHAR(255) NOT NULL
        );
    `

    try {
        await pool.query(createTableQuery)
        console.log('🎉 events table created successfully')
    } catch (err) {
        console.error('⚠️ error creating events table', err)
    }
}

const seedEventsTable = async () => {
    await createEventsTable()

    eventData.forEach((event) => {
        const insertQuery = {
            text: `
                INSERT INTO events (
                    name,
                    category,
                    ageGroup,
                    minAge,
                    maxAge,
                    time,
                    address,
                    zip,
                    latitude,
                    longitude,
                    image,
                    description,
                    organizer
                )
                VALUES (
                    $1, $2, $3, $4, $5, $6, $7,
                    $8, $9, $10, $11, $12, $13
                )
            `
        }

        const values = [
            event.name,
            event.category,
            event.ageGroup,
            event.minAge,
            event.maxAge,
            event.time,
            event.address,
            event.zip,
            event.latitude,
            event.longitude,
            event.image,
            event.description,
            event.organizer
        ]

        pool.query(insertQuery, values, (err) => {
            if (err) {
                console.error('⚠️ error inserting event', err)
                return
            }

            console.log(`✅ ${event.name} added successfully`)
        })
    })
}

seedEventsTable()