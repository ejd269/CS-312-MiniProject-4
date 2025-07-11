// import dependencies
import express from "express";
import bodyParser from "body-parser";

// set up express server
const app = express();
const port = 3001;

// set up bodyparser to parse data
app.use(express.static("public"));
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req,res,next) => {
    res.append("Access-Control-Allow-Origin",["*"])
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

// create array for all posts
let posts = [];

// grab home page
app.get("/", async (req, res) => {
    
    try {
        
        // res.render("index.ejs", { posts });
        res.json({posts:posts});
    // error handling
    } catch (error) {
        console.error("Failed to complete request:", error.message);
        res.render("index.ejs", {
            error: error.message,
        })
    }
});

// when the form is submitted, update page with card and update posts array with post
app.post("/", async (req, res) => {
    try {
        console.log(req.body);
        posts.push(req.body);
        
        console.log(posts);
        // redirect to main page to refresh with new content
        res.redirect('/');

    // error handling
    } catch (error) {
        console.error("Failed to complete request:", error.message);
        res.render("index.ejs", {
            error: error.message,
        })
    }
});

// handling delete requests
app.post("/delete", (req, res) => {
    // grabs the particular post the user wants to delete via post ID
    const postId = req.body.id;
    // filters out post from the posts array
    posts = posts.filter(post => post.id !== postId);
    res.redirect("/");
});

// handling edit requests
app.post("/edit/:id", (req, res) => {
    // grab post via post id submitted through request parameter
    const postId = req.params.id;
    // find post in posts array
    const post = posts.find(post => post.id === postId);
    // logging purposes
    console.log(postId);
    // render edit page with the selected post
    res.render("edit.ejs", { post });
});

// submiting edit requests
app.post("/submitedit/:id", (req, res) => {
    // grab original post id since edit.ejs is loaded with original post
    const post = posts.find(post => post.id === req.params.id);
    // update post in posts array with the new content
    post.title = req.body.title;
    post.name = req.body.name;
    post.content = req.body.content;
    // redirect to main page
    res.redirect('/');
});

// start web server
app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});



/* ------------------------------------------------- *
Connect react.js (somehow)

Define backend routes to handle blog operations (i'm guessing edit, delete, etc)

Use fetch or Axios in react (are both accessible?) to call Node.js backend endpoints (blog operations)
    Test with API call

Use react components for signing in and signing up

Create a sign-up or sign-in page
    When credentials are submitted, it needs to go to backend
    (define what backend and frontend is)

Convert make post into a react component

Convert posts array to a react component
    use .map() method

Convert edit post into a react component

Convert delete post into a react component */