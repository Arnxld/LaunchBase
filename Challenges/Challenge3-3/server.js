const express = require("express")
const nunjucks = require('nunjucks')
const courses = require('./data')

const server = express()

server.use(express.static("public"))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server,
    autoescape: false,
})

server.get('/', function(req, res) {
    const about = {
        img_url: "https://pbs.twimg.com/profile_images/953595371875422210/0pWsfSSp_400x400.jpg",
        name: "Rocketseat",
        description: "Levando o melhor conteúdo de desenvolvimento web ao mundo.",
        techs: [
            "React",
            "React Native",
            "NodeJS"
        ],
        links: [
            {name: "Github", url: "https://github.com/Rocketseat"},
            {name: "Github", url: "https://github.com/Rocketseat"},
            {name: "Github", url: "https://github.com/Rocketseat"},
    ]
    }
    res.render("principal", {about})
})

server.get('/courses', function(req, res) {
    res.render("courses", { courses })
})

server.get('/courses/:id', function(req,res) {
    const id = req.params.id

    const course = courses.find(function(course) {
        return course.id == id
    })

    if (!course) {
        return res.send("Este curso não existe")
    }

    return res.render("course", {course})
})

server.use(function(req, res) {
    res.status(404).render("not-found");
  })


server.listen(5000, function() {
    console.log('server is running')
})