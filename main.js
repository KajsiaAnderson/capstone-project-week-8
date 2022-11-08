const form = document.querySelector('form')
const hikeList = document.querySelector('#hike-list')
const nameInput = document.querySelector('#name-input')


function handleSubmit(e) {
    e.preventDefault()

    if (nameInput.value < 1) {
        alert ('You must enter a hike name')
        return
    }

    
    let userRating = document.querySelector('input[name="rating"]:checked').value
    // let image = document.querySelector('#img')
    let body = {
        hike: nameInput.value,
        rating: +userRating,
        // imageUrl: image.value
    }

    axios.post('http://localhost:4455/hikes', body)
        .then(() => {
            nameInput.value = ''
            document.querySelector('#rating-one').checked = true
            getHikes()
        })
}

function deleteCard(id){
    axios.delete(`http://localhost:4455/hikes/${id}`)
        .then(() => getHikes())
        .catch(err => console.log(err))
}

function getHikes() {
    hikeList.innerHTML = ''

    axios.get('http://localhost:4455/hikes')
        .then(res => {
            res.data.forEach(elem => {
                let hikeCard = `<div class="hike-card">
                    <h2>${elem.hike}</h2>
                    <h3>Rating: ${elem.rating}/5</h3>
                    <button onclick="deleteCard(${elem.id})">Delete</button>
                    </div>
                `

                hikeList.innerHTML += hikeCard
            })
        })
}

getHikes()
form.addEventListener('submit', handleSubmit)