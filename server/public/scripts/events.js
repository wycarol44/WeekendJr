const formatEventTime = time => {
    return new Date(time).toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    })
}

const createFilterOption = (value, label) => {
    const option = document.createElement('option')
    option.value = value
    option.textContent = label
    return option
}

const getFilterValues = () => {
    const ageFilter = document.getElementById('age-filter')
    const categoryFilter = document.getElementById('category-filter')
    const zipFilter = document.getElementById('zip-filter')
    const radiusFilter = document.getElementById('radius-filter')

    return {
        age: ageFilter ? ageFilter.value : '',
        category: categoryFilter ? categoryFilter.value : 'All',
        zip: zipFilter ? zipFilter.value.trim() : '',
        radius: radiusFilter ? radiusFilter.value : '3'
    }
}

const buildEventsUrl = () => {
    const filters = getFilterValues()
    const query = new URLSearchParams()

    if (filters.age) query.set('age', filters.age)
    if (filters.category && filters.category !== 'All') query.set('category', filters.category)
    if (filters.zip) query.set('zip', filters.zip)
    if (filters.zip && filters.radius) query.set('radius', filters.radius)

    return query.toString() ? `/events?${query.toString()}` : '/events'
}

const renderFilters = events => {
    const mainContent = document.getElementById('main-content')
    const filterContainer = document.createElement('section')
    filterContainer.classList.add('filter-container')

    const categoryFilter = document.createElement('select')
    categoryFilter.id = 'category-filter'
    categoryFilter.appendChild(createFilterOption('All', 'All event types'))

    const categories = [...new Set(events.map(event => event.category))]
    categories.forEach(category => {
        categoryFilter.appendChild(createFilterOption(category, category))
    })

    const ageFilter = document.createElement('input')
    ageFilter.id = 'age-filter'
    ageFilter.type = 'number'
    ageFilter.min = '0'
    ageFilter.max = '99'
    ageFilter.placeholder = 'Child age'

    const zipFilter = document.createElement('input')
    zipFilter.id = 'zip-filter'
    zipFilter.type = 'text'
    zipFilter.inputMode = 'numeric'
    zipFilter.maxLength = '5'
    zipFilter.placeholder = 'ZIP code'

    const radiusFilter = document.createElement('select')
    radiusFilter.id = 'radius-filter'
    radiusFilter.appendChild(createFilterOption('3', 'Within 3 miles'))
    radiusFilter.appendChild(createFilterOption('5', 'Within 5 miles'))
    radiusFilter.appendChild(createFilterOption('10', 'Within 10 miles'))
    radiusFilter.appendChild(createFilterOption('25', 'Within 25 miles'))

    const applyButton = document.createElement('button')
    applyButton.textContent = 'Filter'
    applyButton.addEventListener('click', renderEvents)

    const resetButton = document.createElement('button')
    resetButton.textContent = 'Reset'
    resetButton.addEventListener('click', () => {
        categoryFilter.value = 'All'
        ageFilter.value = ''
        zipFilter.value = ''
        radiusFilter.value = '3'
        renderEvents()
    })

    filterContainer.appendChild(categoryFilter)
    filterContainer.appendChild(ageFilter)
    filterContainer.appendChild(zipFilter)
    filterContainer.appendChild(radiusFilter)
    filterContainer.appendChild(applyButton)
    filterContainer.appendChild(resetButton)
    mainContent.appendChild(filterContainer)
}

const renderEventCards = events => {
    const mainContent = document.getElementById('main-content')
    const cardContainer = document.createElement('section')
    cardContainer.classList.add('card-container')

    if (events.length) {
        events.forEach(event => {
            const card = document.createElement('div')
            card.classList.add('card')

            const topContainer = document.createElement('div')
            topContainer.classList.add('top-container')

            const bottomContainer = document.createElement('div')
            bottomContainer.classList.add('bottom-container')

            topContainer.style.backgroundImage = `url(${event.image})`

            const name = document.createElement('h3')
            name.textContent = event.name
            bottomContainer.appendChild(name)

            const time = document.createElement('p')
            time.textContent = formatEventTime(event.time)
            bottomContainer.appendChild(time)

            const ageGroup = document.createElement('p')
            ageGroup.textContent = `${event.category} • Ages ${event.minAge}-${event.maxAge}`
            bottomContainer.appendChild(ageGroup)

            const address = document.createElement('p')
            address.textContent = event.zip
            bottomContainer.appendChild(address)

            const link = document.createElement('a')
            link.textContent = 'View Details >'
            link.setAttribute('role', 'button')
            link.href = `/events/${event.id}`
            bottomContainer.appendChild(link)

            card.appendChild(topContainer)
            card.appendChild(bottomContainer) 
            cardContainer.appendChild(card)
        })
    }
    else {
        const message = document.createElement('h2')
        message.textContent = 'No events match those filters.'
        cardContainer.appendChild(message)
    }

    mainContent.appendChild(cardContainer)
}

const renderEvents = async () => {
    const response = await fetch(buildEventsUrl())
    const events = await response.json()

    if (!window.allEvents) {
        const allEventsResponse = await fetch('/events')
        window.allEvents = await allEventsResponse.json()
    }

    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''

    renderFilters(window.allEvents)
    renderEventCards(events)
}

renderEvents()
