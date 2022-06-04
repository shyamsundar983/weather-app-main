// //add a log to view it on browser
// console.log("I am from the browser side!")

// //this fetch works only on browser javascript fot getting json response from an api
// fetch("http://localhost:3000/forecast/?location=delhi").then((response) => {
//         response.json().then((data) => {
//             console.log(data)
//         })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    //which we are in touch with API for getting weather details
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch("http://localhost:3000/forecast/?location=" + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})