const formatEventTime = time => {
    return new Date(time).toLocaleString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    })
}

const renderEvent = async () => {
    const requestedID = parseInt(window.location.href.split('/').pop())
    const response = await fetch('/events')
    const data = await response.json()

    const eventContent = document.getElementById('event-content')
    let event

    if (data) {
        event = data.find(event => event.id === requestedID)
    }

    if (event) {
        document.getElementById('image').src = event.image
        document.getElementById('image').alt = event.name
        document.getElementById('name').textContent = event.name
        document.getElementById('organizer').textContent = 'Hosted by: ' + event.organizer
        document.getElementById('time').textContent = 'Time: ' + formatEventTime(event.time)
        document.getElementById('address').textContent = 'Address: ' + event.address
        document.getElementById('category').textContent = 'Type: ' + event.category
        document.getElementById('ageGroup').textContent = `Best For: ${event.ageGroup} (ages ${event.minAge}-${event.maxAge})`
        document.getElementById('description').textContent = event.description

        document.title = `WeekendJr - ${event.name}`
    }
    else {
        const message = document.createElement('h2')
        message.textContent = 'No Details Available'
        eventContent.appendChild(message)
    }
}

renderEvent()
