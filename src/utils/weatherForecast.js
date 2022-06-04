import request from 'request'

export function getForecast(coordinates,callback) {

    const latitude = coordinates.latitude.toString()
    const longitude = coordinates.longitude.toString()
    const url = 'http://api.weatherstack.com/current?access_key=e37a71f60173805ff8911419b65c6eb1&query=' + latitude + ',' + longitude
    //getting weather information for a place
    request({ url : url, json : true},(error,response) => {

        if(error) {
            //if there is now network or any system related issues this will be printed
            // console.log("Error message : "+ error)
            //console.log("Unable to connect to weatherstack. Check your network and try again!")
            callback("Unable to connect to weatherstack. Check your network and try again!",undefined)
        } else if(response.body.error) {
            //executes when input/url is invalid
            //console.log("Unable to find the required Location")
            callback("Unable to find the required Location",undefined)
        } else{
            //console.log(response.body)
            //Parse the json and convert it into string
            // console.log('statusCode:', response && response.statusCode) // Print the response status code if a response was received
            const details = response.body
            //console.log(details)
            //printing weather in asentence
            //console.log(details.current.weather_descriptions[0]+". Temperature is "+details.current.temperature+" degree celsius and it feels like "+details.current.feelslike+" degree celsius")
            callback(undefined,"It is "+details.current.weather_descriptions[0]+". Temperature is "+details.current.temperature+" degree celsius and it feels like "+details.current.feelslike+" degree celsius. Chances of rain is " + details.current.precip + "%")
        }
    })
    }