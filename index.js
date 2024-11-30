const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const {v4:uuidv4} = require('uuid');
const methodOverride = require("method-override");
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.set("views engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts =[
    {   id:uuidv4(),
        username:"@apnaclg",
        content:"I love coding"
    },
    {   id:uuidv4(),
        username:"@shradhakhapra",
        content:"Hardwork is the key to success"
    },
    {   id:uuidv4(),
        username:"@sheetaltaank",
        content:"Towards the journey of success.."
    },
    {   id:uuidv4(),
        username:"@riyasharma",
        content:"Enjoying life !"
    },
];
app.get("/",(req,res)=>{
    res.send("server working ");
});
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});

});
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/posts",(req,res)=>{
    console.log(req.body);
    let {username,content}=req.body;
    let id= uuidv4();
    posts.push({id,username,content});
    // res.send("post request working");
    res.redirect("/posts");
});
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post = posts.find((p)=> id === p.id);
    console.log(post);
    
    res.render("show.ejs",{post});
});
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent = req.body.content;
    // console.log(id);
    let post = posts.find((p)=>id===p.id);
    post.content= newContent;
    // res.send("patch request working");
    res.redirect("/posts");
});
app.get("/posts/:id/edit",(req,res)=>{
    let {id}= req.params;
    let post = posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
});
app.delete("/posts/:id",(req,res)=>{
    let {id}= req.params;
    posts = posts.filter((p)=>id!==p.id);
    res.redirect("/posts");

});
app.listen(port,()=>{
    console.log("listening to port 8080");
});