const express = require('express')
const app = express()
const fs = require('fs')

app.set('view engine','ejs')

app.get('/',function(req,res){
    fs.readdir(`./uploads`,{withFileTypes:true},function(err,files){
        files.forEach(function(file){
            if(file.isDirectory()){
                console.log("true");  
            }
            else console.log("false")
        })
        console.log(files)
        res.render("index",{files})
    })
})
 
app.get(`/note/:name`,function(req,res){
    fs.readFile(`./uploads/${req.params.name}`,function(err,data){
        res.render("note",{description:data,name:req.params.name})
    })
})

app.get('/new-notes',function(req,res){
    res.render("new-notes.ejs")
})

app.get('/creatednote',function(req,res){
    fs.writeFile(`./uploads/${req.query.title}`,req.query.description,function(err){
        if(err) console.log(err)
            else console.log("completed")
    })
    res.redirect('/')
})


app.get('/delete/:name',function(req,res){
    fs.unlink(`./uploads/${req.params.name}`,function(err){
    if (err) console.log(err)
    else res.redirect('/')
    })
    
})


app.get('/edit/:name',function(req,res){
    fs.readFile(`./uploads/${req.params.name}`,function(err,data){
        if(err) console.log(err)
        else res.render("edit",{description:data , name:req.params.name})
    })
})

app.get('/editedfile',function(req,res){
    fs.writeFile(`./uploads/${req.query.title}`,req.query.description,function(err){
        if(err) console.log(err)
            else res.redirect('/')
    })
})
 

app.listen(4000,function(){
    console.log("Server is running on port 4000")
})
