//YUMMLY ID variables....................................
var mainCourse = '';
var chooseDiet = '';
var addIngredient = '';
var excludeIngredient = '';
var Allergy = '';
var Cuisine = '';  
var appID = 'ad9dde64';
var apiKey = 'dd23675598c15c270213370a7b95f878';
$( document ).ready(function() {
    $('.IngridentShow').hide();

});
$('#recipe-button').on('click', function(){
    mainCourse=$("#searchFoodInput").val(); 
    chooseDiet=$(".multiSel1").text();  
    chooseDiet= chooseDiet.substring(0, chooseDiet.length - 1);                          
      $("#trivia-header").html("");
      $("#joke-header").html("");   
      yummlyRecipe();
      ourJoke();
      ourTrivia();
      $('.IngridentShow').hide();

});

$("#button-clear").click(function() {
$(".input-checkbox").prop("checked", false);
$(".multiSel").html(''); 
});


$("body").on("click", ".picture-boxes", function(){
$('.IngridentShow').show();
var RecipeIdPar=$(this).attr('recipieid');
yummlyRecipe2(RecipeIdPar);


});

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
    url: 'http://api.yummly.com/v1/api/recipes?_app_id='+appID+'&_app_key='+apiKey+'&q='+mainCourse+'&excludeIngredient[]='+excludeIngredient+addIngredient+'&allowedDiet[]='+chooseDiet+'&allowedAllergy[]='+Allergy+'&allowedCuisine[]='+Cuisine+'&maxResult=20&start=10&requirePictures=true',


    }).done(function (results) {
    console.log(results); 
    if ($("#picture-boxes").text().trim().length > 0){
        $("#picture-boxes").slick("unslick");
        $("#picture-boxes").empty();
    }
       var ResultsLength=results.matches.length; console.log(ResultsLength);
      for(var j=0;j<ResultsLength; j++){    
            console.log(results.matches[j].imageUrlsBySize);
               var returnTitle = results.matches[j].recipeName;
                    // console.log(returnTitle);                
                    var picImage = results.matches[j].smallImageUrls;
                    var RecipeIdPar=results.matches[j].id;
                    var anchorTagImage = $("<div>");
                    var textAnchorTag = $("<div>");
            //create div for single reutrn item.
                    var searchResults = $("<div>");
            //create <p> tag for returnTitles.
                    var p = $("<p>")
                    p.addClass("title-search");
                    if (returnTitle.length > 30) {
                        returnTitle = returnTitle.substring(0, 29)+"...";
                    }
                    p.text(returnTitle);
                   // console.log('p', picImage);
                   //textAnchorTag.attr("href",  "#");
                    textAnchorTag.attr("recipieid", RecipeIdPar)
                    textAnchorTag.attr("width", "120%");
                    textAnchorTag.append(p);
                    var returnImage = $("<img>");
                    returnImage.attr("src", picImage);
                    returnImage.attr("width", "300px");
                    returnImage.attr("recipieid", RecipeIdPar);
                    searchResults.addClass("picture-boxes col-4");
                    searchResults.attr("recipieid", RecipeIdPar);
                  // anchorTagImage.attr("href", "#");
                   anchorTagImage.attr("recipieid", RecipeIdPar);
                   // anchorTagImage.attr("target", "_blank");
                    anchorTagImage.append(returnImage);
                    searchResults.append(anchorTagImage);
                    searchResults.append(textAnchorTag);
                     $("#picture-boxes").prepend(searchResults); 
    }



                                    $("#picture-boxes").slick({
                                        dots: true,
                                        infinite: false,
                                        speed: 300,
                                        slidesToShow: 4,
                                        slidesToScroll: 4,
                                        responsive: [
                                        {
                                            breakpoint: 1024,
                                            settings: {
                                            slidesToShow: 3,
                                            slidesToScroll: 3,
                                            infinite: true,
                                            dots: true
                                            }
                                        },
                                        {
                                            breakpoint: 600,
                                            settings: {
                                            slidesToShow: 2,
                                            slidesToScroll: 2
                                            }
                                        },
                                        {
                                            breakpoint: 480,
                                            settings: {
                                            slidesToShow: 1,
                                            slidesToScroll: 1
                                            }
                                            
                                        }
        // You can unslick at a given breakpoint now by adding:
// settings: "unslick"
// instead of a settings object
                                                ]
                                                });


        var NumRecipe=results.matches.length;
            console.log("number of recipe"+ NumRecipe);
            for(i=0;i<NumRecipe; i++){
                var RecipeIdPar=results.matches[i].id;
                    //console.log("test recipe"+ results.matches[i].id);
                    //yummlyRecipe2(RecipeIdPar);
            }
    
});

}


function yummlyRecipe2(RecipeIdPar){
                $.ajax({
                    type: 'GET',
                    url: 'http://api.yummly.com/v1/api/recipe/'+RecipeIdPar+'?_app_id=ad9dde64&_app_key=dd23675598c15c270213370a7b95f878&maxResult=30&start=10',
                    
                    }).done(function (resultRecipe) {
                        console.log(resultRecipe);  
                        $("#picture-boxes-Recipe").html('');
                        $("#RecipeTitle").html('');
                           var resultRecipeLength=resultRecipe.ingredientLines.length; 
                           console.log(resultRecipeLength);
                           var recipeTitleP=$("<h1>");
                           var recipeTitleName=resultRecipe.name;
                               recipeTitleP.append(recipeTitleName); 
                               recipeTitleP.append(recipeTitleP);
                               $("#RecipeTitle").append(recipeTitleP);
                               $("#RecipeTitle").append('<h1> Ingredients</h1>')

                           
                           var orderedList = $("<ol>");
                          for(var i=0;i<resultRecipeLength; i++){ 
                                 
                              
                              var orderedListItem = $("<li>");
                               orderedListItem.append(resultRecipe.ingredientLines[i]); 
                               orderedList.append(orderedListItem);
                               $("#picture-boxes-Recipe").append(orderedList);
                                 
                        }
                    
                    
                                       
                    
                         
                });
    }

 