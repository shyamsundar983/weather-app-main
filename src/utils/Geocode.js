import nodeGeocoder from 'node-geocoder'

// const openstreetmap_url = 'https://nominatim.openstreetmap.org/search?addressdetails=1&q=Chennai&format=json'
export function getCoordinates(location,callback) {
let options = {
    provider: 'openstreetmap'
  }
let geoCoder = nodeGeocoder(options)
geoCoder.geocode(location)
  .then((res)=> {
    if(res.length === 0) {
        callback("Unable to find the required Location",undefined)
    } else {
    const data = {
    latitude : res[0].latitude,
    longitude : res[0].longitude,
    location : res[0].formattedAddress
    }
    callback(undefined,data)
  }
})
  .catch((err)=> {
    callback("Unable to connect to openstreetmap. Check your network and try again!",undefined)
  });
}