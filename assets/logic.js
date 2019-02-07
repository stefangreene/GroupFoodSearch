//YUMMLY ID variables....................................
var mainCourse = '';
var chooseDiet = '';
var addIngredient = '';
var excludeIngredient = '';
var Allergy = '';
var Cuisine = '';  
var appID = 'ad9dde64';
var apiKey = 'dd23675598c15c270213370a7b95f878';


function ourJoke(){

//JOKE CALL SPOONACULAR...............
    $.ajax({
    type: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/jokes/random',
    headers: {
        "X-RapidAPI-Key":"591dbcc7d6mshdce628f7ef8a003p154387jsnfaa503cd34f9"
    },
        }).done(function(joke) {
            console.log(joke.text);
            var jokeP = $("<h>").text('Food Joke! '+joke.text);
            jokeP.addClass("joke-text");
            jokeP.append(joke);
            $("#joke-header").append(jokeP);
    });}

function ourTrivia(){

//JOKE CALL SPOONACULAR...............
    $.ajax({
    type: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/trivia/random',
    headers: {
         "X-RapidAPI-Key":"591dbcc7d6mshdce628f7ef8a003p154387jsnfaa503cd34f9"
    },
        }).done(function(trivia) {
            console.log(trivia.text);
            var triviaP = $("<h>").text('Trivia! '+trivia.text);
            triviaP.addClass("trivia-text");
            triviaP.append(trivia);
            $("#trivia-header").append(triviaP);
    });}

function yummlyRecipe(callData){

$.ajax({
    type: 'GET',
    url: 'http://api.yummly.com/v1/api/recipes?_app_id='+appID+'&_app_key='+apiKey+'&q='+mainCourse+'&excludeIngredient[]='+excludeIngredient+addIngredient+'&allowedDiet[]='+chooseDiet+'&allowedAllergy[]='+Allergy+'&allowedCuisine[]='+Cuisine+'&maxResult=10&start=10&requirePictures=true',


    }).done(function (result) {
        //console.log(result); 
        var NumRecipe=result.matches.length;
            console.log("number of recipe"+ NumRecipe);
            for(i=0;i<NumRecipe; i++){
                var RecipeIdPar=result.matches[i].id;
                    console.log("test recipe"+ result.matches[i].id);
                    yummlyRecipe2(RecipeIdPar);
            }
    
});}


function yummlyRecipe2(RecipeIdPar){

$.ajax({
    type: 'GET',
    url: 'http://api.yummly.com/v1/api/recipe/'+RecipeIdPar+'?_app_id=ad9dde64&_app_key=dd23675598c15c270213370a7b95f878&maxResult=30&start=10',
    
    }).done(function (result) {
        console.log(result);        
});}

$('#button-submit').on('click', function() {
   alert('Submission!');
})

$('#recipe-button').on('click', function(){
    
yummlyRecipe();
ourJoke();
ourTrivia();

});

$("#button-clear").click(function() {
        $(".input-checkbox").prop("checked", false);
         $(".multiSel").html(''); 
});

