const express=require("express");
const hbs=require('hbs');

const Register=require('./mdoels/register');

const path=require('path');
const static_path=path.join(__dirname,'../public');
const template_path=path.join(__dirname,'../templates/views');
const partials_path=path.join(__dirname,'../templates/partials');


const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use(express.static(static_path));

// app.use(express.static(template_path));


app.set('view engine','hbs');
app.set('views',template_path);

hbs.registerPartials(partials_path); 

const port= 3000;

const mongoose=require('mongoose');

const url="mongodb://localhost:27017";
mongoose.connect(url,{
    
}).then(()=>{
    console.log("connection is successfull");
}).catch((err)=>{
    console.log(err);
})


// app.get("/",(req,res)=>{
//     res.send("Home page12");
// })

app.get("/",(req,res)=>{
    res.render("index");
})

app.get('/register',(req,res)=>{
    res.render('register');
})


app.post("/register", async (req, res) => {
    try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;

                    if(password === cpassword){
                        const registerEmployee = new Register({
                            firstname : req.body.firstname,
                            lastname  : req.body.lastname,
                            email     : req.body.email,
                            gender    : req.body.gender,
                            phone     : req.body.phone,
                            age       : req.body.age,
                            password  : password,
                            confirmpassword: cpassword
                        })
                        const registered = await registerEmployee.save();
                        res.status(201).render("index");
                    }else{
                        res.send("passwords are not matching")
                    }
                } catch (error) {
                    res.status(400).send(error);
                }
            });


app.listen(port,()=>{
    console.log(`server is running at port number ${port}`);
})