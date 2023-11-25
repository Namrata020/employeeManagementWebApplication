const express=require("express");
var myrouter=express.Router();
var connection=require("../db/dbconnectivity");

myrouter.get("/Employee",function(req,resp){
    connection.query("select * from Employee",(err,data,feilds)=>{
        if(err){
            resp.status(500).send("No Data Found");
        }else{
            resp.render("index",{empdata:data})
        }
    })
});

myrouter.get("/addemp",function(req,resp){
    resp.render("add-emp");
})

myrouter.post("/insertemp",function(req,resp){
    connection.query("insert into Employee values(?,?,?,?)",[req.body.emp_id,req.body.ename,req.body.age,req.body.salary],(err,result)=>{
        if(err){
            resp.status(500).send("No Data Added");
        }else{
            resp.redirect("/Employee")
        }
    })
})

myrouter.get("/deleteemp/:empid",function(req,resp){
    connection.query("delete from Employee where emp_id=?",[req.params.empid],(err,result)=>{
        if(err){
            resp.status(500).send("No Data Deleted");
        }else{
            resp.redirect("/Employee")
        }
    })
})

module.exports=myrouter;