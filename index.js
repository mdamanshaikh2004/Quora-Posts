const express = require("express");

const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
let posts = [{
    id: uuidv4(),
    username: "aman",
    content: "hi"
}, {
    id: uuidv4(),
    username: " nawaz ",
    content: "hello"
}, {
    id: uuidv4(),
    username: "zishan",
    content: "bye"

}]

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
app.get("/", (req, res) => {
    res.send("Quora Posts API is running ");
});
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});
app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts");

});
app.get("/posts/news", (req, res) => {
    res.render("news.ejs");
});
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
});
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newcontent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newcontent;
    res.redirect("/posts");
});
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });

});
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});