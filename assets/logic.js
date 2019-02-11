//YUMMLY ID variables....................................
var mainCourse = '';
var chooseDiet = '';
var addIngredient = '';
var excludeIngredient = '';
var Allergy = '';
var Cuisine = '';  
var appID = 'ad9dde64';
var apiKey = 'dd23675598c15c270213370a7b95f878';
var Calories=[];
var Potassium=[];
var SaturatedFat=[];
var NutritionEstimateArray=[0,0,0,0,0,0,0,0,0,0,0]

$( document ).ready(function() {
    //$('.IngredientShow').hide();
    document.getElementById('searchForm').addEventListener('submit', function(e) {
        document.getElementById("recipe-button").click();
        e.preventDefault(); 
    }, false);
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
            var jokeP = $(".joke-text").text(joke.text);
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
            var triviaP = $(".trivia-text").text(trivia.text);
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
                           //console.log(resultRecipeLength);
                           var recipeTitleP=$("<h1>");
                           var recipeTitleName=resultRecipe.name;
                               recipeTitleP.append(recipeTitleName); 
                               recipeTitleP.append(recipeTitleP);
                               $("#RecipeTitle").append(recipeTitleP);
                               $("#RecipeTitle").append('<h1> Ingredients</h1>');

                           var orderedList = $("<ol>");
                          for(var i=0;i<resultRecipeLength; i++){
                              var orderedListItem = $("<li>");
                               orderedListItem.append(resultRecipe.ingredientLines[i]); 
                               orderedList.append(orderedListItem);
                               $("#picture-boxes-Recipe").append(orderedList);
                                 
                          }       
                        /*/.....stefans attempt to add site references......
                        var recipeSiteSource = results.matches.sourceSiteUrl;
                        for(var s=0; s<)
                        console.log(recipeSiteSource);
                        var recipeSite = $("<h4>");
                        recipeSite.addClass("source-site");  
                        var recipeSiteSource = results.matches.sourceSiteUrl;
                        recipeSite.append(recipeSiteSource);
                        recipeSite.append(recipeSite);
                        $("#source-site").append(recipeSite);
                        $("#source-site").append('<h4> Site </h4>');
                           var returnTitle = resultsRecipe.recipeName.length;

                           console.log(results.matches[j].hostedMediumUrl);
                           var recipeSource = results.matches[j].sourceDisplayName;
                           var recipeSourceUrl = results.matches[j].sourceRecipeUrl;
                           var recipeSiteUrl = results.matches[j].sourceSiteUrl;
                                console.log(recipeSource);
                                console.log(recipeSourceUrl);  
                                console.log(recipeSiteUrl);             
                                var picImage = results.matches[j].hostedMediumUrl;
                                var RecipeIdPar=results.matches[j].id;
                                var anchorTagImage = $("<div>");
                                var textAnchorTag = $("<div>");
                        //create div for single reutrn item.
                                var searchResults = $("<div>");
                        //create <p> tag for returnTitles.
                                var p = $("<p>")*/
                       
                    
                    
                        var nutritionEstimateLength=resultRecipe.nutritionEstimates.length;    
                        for(var k=0;k<nutritionEstimateLength; k++){
                            var NutritionEstimate=resultRecipe.nutritionEstimates[k].attribute;
                        switch(NutritionEstimate) {
                            case 'FAT_KCAL':
                             // console.log(resultRecipe.nutritionEstimates[k].value);
                              NutritionEstimateArray[0]=resultRecipe.nutritionEstimates[k].value;
                              break;
                            case "K":
                           // console.log(resultRecipe.nutritionEstimates[k].value);
                            NutritionEstimateArray[1]=resultRecipe.nutritionEstimates[k].value;
                              // code block
                              break;
                              case "FASAT":
                              // code block
                              NutritionEstimateArray[2]=resultRecipe.nutritionEstimates[k].value;
                              break;
                              case 'STARCH':
                              //console.log(resultRecipe.nutritionEstimates[k].value);
                              NutritionEstimateArray[3]=resultRecipe.nutritionEstimates[k].value;
                              break;
                            case "GLUS":
                           // console.log(resultRecipe.nutritionEstimates[k].value);
                            NutritionEstimateArray[4]=resultRecipe.nutritionEstimates[k].value;
                              // code block
                              break;
                              case 'FE':
                             // console.log(resultRecipe.nutritionEstimates[k].value);
                              NutritionEstimateArray[5]=resultRecipe.nutritionEstimates[k].value;
                              break;
                            case "TOCPHA":
                           // console.log(resultRecipe.nutritionEstimates[k].value);
                            NutritionEstimateArray[6]=resultRecipe.nutritionEstimates[k].value;
                              // code block
                              break;
                              case "FAMS":
                              // code block
                              NutritionEstimateArray[7]=resultRecipe.nutritionEstimates[k].value;
                              break;
                              case 'CHOCDF':
                              //console.log(resultRecipe.nutritionEstimates[k].value);
                              NutritionEstimateArray[8]=resultRecipe.nutritionEstimates[k].value;
                              break;
                              case "VITK":
                              // console.log(resultRecipe.nutritionEstimates[k].value);
                            NutritionEstimateArray[9]=resultRecipe.nutritionEstimates[k].value;
                                // code block
                               break;
                               case "CA":
                                 // code block
                                NutritionEstimateArray[10]=resultRecipe.nutritionEstimates[k].value;
                                 break;
                                 case 'MG':
                                 //console.log(resultRecipe.nutritionEstimates[k].value);
                                 NutritionEstimateArray[11]=resultRecipe.nutritionEstimates[k].value;
                                 break;
                              
                            default:
                              // code block
                          }
               

                         }        drawchart(recipeTitleName);      
                    
                         
                });
    }
//FIREBASE FUNCTION
            $(document).ready(function () {
                if ($('#newContact').length > 0) {
                    contactScript('forcontact');
                }
            });
        
            function contactScript(value) {
                var a = {
                    apiKey: "AIzaSyBN-RamSUys4RiUKy7k4taVK-uu8Db5cSk",
                    authDomain: "groupfoodsearch.firebaseapp.com",
                    databaseURL: "https://groupfoodsearch.firebaseio.com",
                    projectId: "groupfoodsearch",
                    storageBucket: "groupfoodsearch.appspot.com",
                    messagingSenderId: "636824267861"
                };
                firebase.initializeApp(a);
                var b = firebase.database().ref("messages");
                $("#newContact").submit(function (a) {
                $(this), console.log("Submit to Firebase");
                    var c = $("#name").val(),
                        d = $("#email").val(),
                        e = $("#message").val(),
                        f = { name: c, email: d, message: e };
                    return b.push(f).then(function (a) {
                        $(".sucess").css("display", "block"),
                            $(".sucess-none").css("display", "none")
                    }), !1
                })
            }



 function drawchart(recipeTitleName ){
    
// Create the chart
Highcharts.chart('container', {
    chart: {
        type: 'column',
        width:900,
        height:300
    },
    title: {
        text: recipeTitleName
    },    
    xAxis: {
        type: 'category'
    },
    yAxis: {
        title: {
            text: 'Nutrition content'
        }

    },
    legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: '{point.y:.1f}'
            }
        }
    },

    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of total<br/>'
    },

    "series": [
        {
            "name": "Nutrition Estimate",
            "colorByPoint": true,
            "data": [
                {
                    "name": "Fat Cal",
                    "y": NutritionEstimateArray[0]
                },
                {
                    "name": "K",
                    "y": NutritionEstimateArray[1]
                },
                {
                    "name": "Saturated Fat",
                    "y": NutritionEstimateArray[2]
                },
                {
                    "name": "Starch",
                    "y": NutritionEstimateArray[3]
                },
                {
                    "name": "Glucose",
                    "y": NutritionEstimateArray[4]
                }
                
            ]
        }
    ]
});
 }

        //CHANGE FOR GIT

