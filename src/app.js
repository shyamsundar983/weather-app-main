// Steps after creating a folder

// 1)npm init -y 
// 2)npm install package_name 
// 3)add {type : module} in package.json file 

import express from 'express'
import hbs from 'hbs'

//importing utils
import request from 'request'
import {getForecast} from './utils/weatherForecast.js'
import {getCoordinates} from './utils/Geocode.js'

//they remove __Filename in ES so we need to use this 4 lines of code
//https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let app = express()

// console.log(__filename)
// console.log(__dirname)
//now try to go to static folder
// console.log(path.join(__dirname,'../static'))

//paths to xpress config
const path_to_static = path.join(__dirname,'../static')
const views_path = path.join(__dirname, '../templates/views')
const partials_path = path.join(__dirname, '../templates/partials')


//Path in node.js to add the static path here to access html pages using abs path
//how to access html and other static files in our script
//https://expressjs.com/en/starter/static-files.html

//to get access to static files and images **imp
app.use(express.static(path_to_static))

//set up handlebars engine and views directory location
//for view engine set up dynamic content in HTML
app.set('views',views_path)
app.set('view engine', 'hbs')

//partials setting using hbs
hbs.registerPartials(partials_path)

// //base(root) url
app.get('',(req,res) => {
    //passind dynamic content
    res.render('index.hbs',{
        name : "Shyam Sundar",
        title : "Weather App"
    })
    })
 //res.send("Hello this is root page")
 //now render this using html or css
//  res.send("<h1>Hello this is root page</h1>")
// })

// //add routes to base url using same server port
// app.get('/about',(req,res) => {
//     res.send("Hello this is about page")
//    })

app.get('/help',(req,res) => {
  res.render('help.hbs',{
    helpText : "Contact for help",
    name : "Shyam Sundar",
    title : "About me"
  })
//res.send("Hello this is help page") static 
})

app.get('/forecast',(req,res) => {
    //catching the request sent by the user
    const loc = req.query 
    if(loc.location) {
       //return res.send(loc.location)
       // //calling getCoordinates()
        getCoordinates(loc.location,(error,data) => {
            if(error) {
                res.send({error : error})

            } else{
                getForecast(data,(error,forecast) => {
                    if(error) {
                        res.send({error : error})
                    } else {
                        res.send({
                            location : loc.location,
                            address : data.location,
                            forecast : forecast
                        })
                    }
                })
            } 
            }
        )
    } else {
    res.send({
        error : "Please enter Location"
    })    
    }
    })

  //  http://localhost:3000/forecast/?location=visakhapatnam

//passing forecast as json to view it in browser(we do the same in API)
//If the user wants to get other than these routes then we use *(wild card matcher)  to throw error not found
app.get('/help/*',(req,res) => {
    res.render('404.hbs',{
      error:"Article inside help not found!"
    })
  //res.send("Hello this is help page") static 
  })

app.get('*',(req,res) => {
    res.render('404.hbs',{
      error:"PAGE NOT FOUND!"
    })
  //res.send("Hello this is help page") static 
  })

//calling the server 
app.listen(3000,() => {
    console.log('setting up a new server in port 3000')
})