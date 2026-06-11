import eventData from '../data/events.js'

const knownZipCoordinates = {
    "10003": { latitude: 40.7318, longitude: -73.9891 },
    "10013": { latitude: 40.7195, longitude: -74.0048 },
    "10018": { latitude: 40.7552, longitude: -73.9931 },
    "10024": { latitude: 40.7864, longitude: -73.9754 },
    "10025": { latitude: 40.7987, longitude: -73.9667 },
    "11201": { latitude: 40.6955, longitude: -73.9936 },
    "11238": { latitude: 40.6794, longitude: -73.9632 },
    "11368": { latitude: 40.7498, longitude: -73.8517 }
}

const toRadians = degree => degree * Math.PI / 180

const getDistanceInMiles = (origin, event) => {
    const earthRadius = 3958.8
    const latitudeDifference = toRadians(event.latitude - origin.latitude)
    const longitudeDifference = toRadians(event.longitude - origin.longitude)
    const eventLatitude = toRadians(event.latitude)
    const originLatitude = toRadians(origin.latitude)

    const distanceFormula =
        Math.sin(latitudeDifference / 2) ** 2 +
        Math.cos(originLatitude) * Math.cos(eventLatitude) *
        Math.sin(longitudeDifference / 2) ** 2

    return 2 * earthRadius * Math.asin(Math.sqrt(distanceFormula))
}

const getEvents = (req, res) => {
    const { age, category, zip, radius } = req.query
    const requestedAge = Number(age)
    const requestedRadius = Number(radius)
    const origin = zip ? knownZipCoordinates[zip] : null

    const filteredEvents = eventData.filter(event => {
        const matchesAge = !age || (requestedAge >= event.minAge && requestedAge <= event.maxAge)
        const matchesCategory = !category || category === 'All' || event.category === category
        const matchesRadius = !zip || !origin || !radius || getDistanceInMiles(origin, event) <= requestedRadius

        return matchesAge && matchesCategory && matchesRadius
    })

    res.status(200).json(filteredEvents)
}

export default {
    getEvents
}