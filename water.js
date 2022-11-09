console.log('tut')

const distance = document.querySelector('#distance-input')
const gain = document.querySelector('#gain-input')
const weather = document.querySelector('#weather-input')
const altitude = document.querySelector('#altitude-input')
const weight = document.querySelector('#weight-input')
const totalWater = document.querySelector('#total-water')

const calculator = document.querySelector('.calculator')
// const waterForm = document.querySelector('.water-form')





function getWater(e) {
    e.preventDefault()
//    waterForm.innerHTML = ''

   
            let totalDistance = +distance.value * 20
            console.log(totalDistance)
            let totalGain = +gain.value / 16.66
            console.log(totalGain)
            let totalTemp = +weather.value - 80
            if (totalTemp > 0) {
                totalTemp = totalTemp / 20 * 120
            } else {
                totalTemp = 0
            }
            console.log(totalTemp)
            let totalAltitude = +altitude.value - 10000
            if (totalAltitude > 0) {
                totalAltitude = totalAltitude / 2000 * 120
            } else {
                totalAltitude = 0
            }
            console.log(totalAltitude)
            let totalWeight = +weight.value - 50
            if (totalWeight > 0) {
                totalWeight = totalWeight / 25 * 120
            } else {
                totalWeight = 0
            }
            console.log(totalWeight)
            let totalMinutes = totalDistance + totalGain + totalTemp + totalAltitude + totalWeight
          
            totalWater.innerHTML = (totalMinutes / 120).toFixed(2)
        }

// console.log(getWater(10, 2000, 80, 12000, 10))

calculator.addEventListener('submit', getWater)