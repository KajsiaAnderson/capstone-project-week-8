const form = document.querySelector('form')
const hikeContainer = document.querySelector('#hike-container')
const nameInput = document.querySelector('#name-input')

const hikeCallback = ({ data: hikes }) => displayHikes(hikes)
const errCallback = err => console.log(err.response.data)

const getAllHikes = () => axios.get('http://localhost:4455/hikes').then(hikeCallback).catch(errCallback)
const createHike = body => axios.post('http://localhost:4455/hikes', body).then(hikeCallback).catch(errCallback)
const deleteHike = id => axios.delete(`http://localhost:4455/hikes/${id}`).then(hikeCallback).catch(errCallback)
// const updateHike = (id, type) => axios.put(`http://localhost:4455/hikes/${id}`, {type}).then(hikeCallback).catch(errCallback)



// const hikeList = document.querySelector('#utah-hikes-list')


// function getHikes() {
//     axios.get('http://localhost:4455/hikes')
//         .then(res => {
//             res.data.forEach(hike => {
//                 const option = document.createElement('option')
//                 option.setAttribute('value', hike['hikes_id'])
//                 option.textContent = country.name
//                 countrySelect.appendChild(option)
//             })
//         })
// }

// getHikes()



function handleSubmit(e) {
    e.preventDefault()

    // if (nameInput.value < 1) {
    //     alert ('You must enter a hike name')
    //     return
    // }

    let title = document.querySelector('#name-input')
    let rating = document.querySelector('input[name="ratings"]:checked')
    let imageUrl = document.querySelector('#img')
    let bodyObj = {
        title: nameInput.value,
        rating: rating.value,
        imageUrl: imageUrl.value
    }

    // axios.post('http://localhost:4455/hikes', body)
    //     .then(() => {
    //         nameInput.value = ''
    //         document.querySelector('#rating-one').checked = true
    //         getHikes()
    //     })
    createHike(bodyObj)

    title.value = ''
    rating.checked = false
    imageUrl.value = ''
}

function createHikeCard(hike) {
    const hikeCard = document.createElement('div')
    hikeCard.classList.add('hike-card')

    hikeCard.innerHTML = `<img alt='hike cover' src=${hike.imageURL} class="hike-cover"/>
    <p class="hike-title">${hike.title}</p>
    <div class="btns-container">
        <button onclick="updateHike(${hike.id}, 'minus')">-</button>
        <p class="hike-rating">${hike.rating} stars</p>
        <button onclick="updateHike(${hike.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteHike(${hike.id})">delete</button>
    `


    hikeContainer.appendChild(hikeCard)
}

function displayHikes(arr) {
    hikeContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createHikeCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllHikes()