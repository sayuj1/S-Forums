var express=require('express');
var app=express();
var mongoose=require('mongoose')
mongoose.connect("mongodb://localhost/sforums")
app.set("view engine", "ejs");
var categoriesSchema = new mongoose.Schema({
	category: String
})
var categories=mongoose.model("categories",categoriesSchema);
var listOfCategory=[];
categories.find(function(err,category){
	if(err){
		console.log(err);
	}
	else{
		for(var i=0;i<category.length;i++){
			listOfCategory.push(category[i]["category"]);
		}
	}
});

app.use(express.static("public"));	
app.get("/" ,function(req,res) { 	
	res.render("forums",{categories:listOfCategory});
});
app.get("/views/home.ejs" ,function(req,res) { 	
	res.render("home.ejs");
});
// var categorie=new categories({
// 	category : "Technology"
// });
// categorie.save(function(err,categorie){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log("Data Saved in Database");
// 	}
// });
// categories.remove({category:"Technology"},function(err,cate){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(cate);
// 	}
// });
app.listen(3000,function(req,res){
	console.log("connected");
});