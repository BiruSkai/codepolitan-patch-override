const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

comments= [
        {id: uuidv4(), day: "Monday", lesson: "maths"},
        {id: uuidv4(), day: "Tuesday", lesson: "physics"},
        {id: uuidv4(), day: "Wednesday", lesson: "sport"},
        {id: uuidv4(), day: "Thursday", lesson: "biology"},
        {id: uuidv4(), day: "Friday", lesson: "computer"},
        {id: uuidv4(), day: "Saturday", lesson: "music"},
        {id: uuidv4(), day: "Sunday", lesson: "free"}
];
app.get("/comments/create", (req, res) => {
        res.render("comments/create")
});

app.get("/comments", (req, res) => {
        res.render("comments/index", {comments})
})

app.post("/comments", (req, res) => {
        const {day, lesson} = req.body;
        comments.push({day, lesson, id: uuidv4()});
        res.redirect("/comments");
});

app.get("/comments/:id", (req, res) => {
        const {id} = req.params;
        const comment = comments.find(comment => comment.id === id)
        res.render("comments/show", {comment});  
});

app.get("/comments/:id/edit", (req, res) => {
        const {id} = req.params;
        const comment = comments.find(comment => comment.id === id)
        res.render("comments/edit", {comment});  
});



app.patch("/comments/:id", (req, res) => {
        const {id} = req.params;
        const newDay = req.body.day;
        const newLesson = req.body.lesson;
        const foundComment = comments.find(c => c.id === id);
        foundComment.day = newDay;
        foundComment.lesson = newLesson;
        res.redirect("/comments");
})

app.get("/order", (req, res) => {
        res.send("GET order response")
})

app.post("/order", (req, res) => {
        const {username, number} = req.body;
        res.send(`${username} - ${number}`);
})

app.listen(8080, () => {
        console.log("Server is listening on http://localhost:8080")
})