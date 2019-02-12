//YUMMLY ID variables....................................
var mainCourse = '';
var AllowedCourse='';
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
var NutritionEstimateArray=[0,0,0,0,0,0,0,0,0,0,0,0,0]

$( document ).ready(function() {
    //$('.IngredientShow').hide();
    document.getElementById('searchForm').addEventListener('submit', function(e) {
        document.getElementById("recipe-button").click();
        e.preventDefault(); 
    }, false);
    yummlyRecipe();
    ourJoke();
    ourTrivia()
});
$('#recipe-button').on('click', function(){
    mainCourse=$("#searchFoodInput").val(); console.log("mainCourse",mainCourse )
    Cuisine=$(".multiSel1").text();  
    ////Cuisine= Cuisine.substring(0, Cuisine.length - 1); 
    console.log("cuisine",Cuisine )
    //chooseDiet=$(".multiSel2").text();  
    AllowedCourse=$(".multiSel3").text(); 
  //  AllowedCourse= AllowedCourse.substring(0, AllowedCourse.length - 1); 
    console.log("AllowedCourse",AllowedCourse )
    Allergy=$(".multiSel4").text();  
    //Allergy= Allergy.substring(0, Allergy.length - 1);
     console.log("allergy",Allergy )
    excludeIngredient=$(".multiSel5").text(); 
  //  excludeIngredient= excludeIngredient.substring(0, excludeIngredient.length - 1);
    console.log("excludeIngredient",excludeIngredient );
    chooseDiet=$(".multiSel6").text(); 
   // chooseDiet= chooseDiet.substring(0, chooseDiet.length - 1);
    console.log("chooseDiet",chooseDiet )                              
      $("#trivia-header").html("");
      $("#joke-header").html("");   
      yummlyRecipe();
      ourJoke();
      ourTrivia();
      $('.IngridentShow').hide();

});

$("#button-clear").click(function() {
$(".input-checkbox").prop("checked", false);
$(".multiSel1").html(''); 
$(".multiSel2").html(''); 
$(".multiSel3").html(''); 
$(".multiSel4").html(''); 
$(".multiSel5").html(''); 
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
    url: 'http://api.yummly.com/v1/api/recipes?_app_id='+appID+'&_app_key='+apiKey+'&q='+mainCourse+AllowedCourse +'&excludeIngredient[]='+excludeIngredient+chooseDiet+Allergy+Cuisine+'&maxResult=20&start=10&requirePictures=true',


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
                
                var p = $("<p>");   
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
                             var SourceLink=$("<div>");
                             SourceLink.append("<b>Source and Direction:</b>");
                            // var SourceALink=$("<a>");
                            // SourceALink.attr("href",resultRecipe.source.sourceRecipeUrl);
                             var SourceALink = $("<a/>", {
                                class : "id5",
                                name : "link",
                                href : resultRecipe.source.sourceRecipeUrl,
                                text :  resultRecipe.source.sourceDisplayName
                            });
                            var NumberOfServingDiv=$("<div>");
                            var NumberServing=resultRecipe.numberOfServings;
                            NumberOfServingDiv.append("<b>Number of Servings:</b> ");
                            NumberOfServingDiv.append(NumberServing);
                            var TimeToCookDiv=$("<div>");
                            var TimeToCook=resultRecipe.totalTime;                            
                            TimeToCookDiv.append("<b>Time to cook:</b> ");
                            TimeToCookDiv.append(TimeToCook);

                            
                           SourceALink.attr('target',"_blank");
                            //target="_blank",
                               SourceLink.append(SourceALink);
                              
                           var orderedList = $("<ol>");
                          for(var i=0;i<resultRecipeLength; i++){
                              var orderedListItem = $("<li>");
                               orderedListItem.append(resultRecipe.ingredientLines[i]); 
                               orderedList.append(orderedListItem);
                               $("#picture-boxes-Recipe").append(orderedList);                                                                 
                          }   
                          $("#picture-boxes-Recipe").prepend('<h1> Ingredients</h1>');                   
                          $("#picture-boxes-Recipe").append(NumberOfServingDiv);
                          $("#picture-boxes-Recipe").append(TimeToCookDiv);
                          $("#picture-boxes-Recipe").append(SourceLink);
                        

                          var FlavorsLength=resultRecipe.flavors;
                           var BitterAmount=resultRecipe.flavors.Bitter;                           
                           if(typeof(Bitter)== 'undefined'){
                            BitterAmount=0;
                           }
                           var MeatyAmount=resultRecipe.flavors.Meaty;                           
                           if(typeof(MeatyAmount)== 'undefined'){
                            MeatyAmount=0;
                           }
                           var PiquantAmount=resultRecipe.flavors.Piquant;                           
                           if(typeof(PiquantAmount)== 'undefined'){
                            PiquantAmount=0;
                           }
                           var SaltyAmount=resultRecipe.flavors.Salty;                           
                           if(typeof(SaltyAmount)== 'undefined'){
                            SaltyAmount=0;
                           }
                           var SourAmount=resultRecipe.flavors.Sour;                           
                           if(typeof(SourAmount)== 'undefined'){
                            SourAmount=0;
                           }                   
                           var SweetAmount=resultRecipe.flavors.Sweet;                           
                           if(typeof(SweetAmount)== 'undefined'){
                            SweetAmount=0;
                           }
                           document.getElementById('cns-status-box-number').innerHTML="No Data";
                           document.getElementById('cns-status-box-number2').innerHTML="No Data";
                        var nutritionEstimateLength=resultRecipe.nutritionEstimates.length;    
                        for(var k=0;k<nutritionEstimateLength; k++){
                            var NutritionEstimate=resultRecipe.nutritionEstimates[k].attribute;
                        switch(NutritionEstimate) {
                            case 'FAT_KCAL':                              
                           document.getElementById('cns-status-box-number').innerHTML=resultRecipe.nutritionEstimates[k].value;
                             var FatKal=resultRecipe.nutritionEstimates[k].value;
                           break;
                             case "K":                              
                           NutritionEstimateArray[0]=resultRecipe.nutritionEstimates[k].value;                              
                             break;
                          case "FASAT":                              
                           NutritionEstimateArray[1]=resultRecipe.nutritionEstimates[k].value;
                             break;
                             case 'STARCH':                              
                           NutritionEstimateArray[2]=resultRecipe.nutritionEstimates[k].value;
                             break;
                             case "GLUS":                              
                           NutritionEstimateArray[3]=resultRecipe.nutritionEstimates[k].value;
                             break;
                             case 'FE':                              
                           NutritionEstimateArray[4]=resultRecipe.nutritionEstimates[k].value;
                             break;
                             case "TOCPHA":                              
                           NutritionEstimateArray[5]=resultRecipe.nutritionEstimates[k].value;                              
                             break;
                             case "FAMS":                              
                           NutritionEstimateArray[6]=resultRecipe.nutritionEstimates[k].value;
                             break;
                             case 'CHOCDF':                              
                           NutritionEstimateArray[7]=resultRecipe.nutritionEstimates[k].value;
                             break;
                             case "VITK":                             
                           NutritionEstimateArray[8]=resultRecipe.nutritionEstimates[k].value;                                
                             break;
                             case "CA":                                 
                           NutritionEstimateArray[9]=resultRecipe.nutritionEstimates[k].value;
                             break;
                             case 'MG':                                 
                           NutritionEstimateArray[10]=resultRecipe.nutritionEstimates[k].value;
                             break;
                           case 'SUGAR':                                 
                           NutritionEstimateArray[11]=resultRecipe.nutritionEstimates[k].value;
                             break; 
                           case 'PROCNT':                               
                           NutritionEstimateArray[12]=resultRecipe.nutritionEstimates[k].value;
                             break;
                           case  "CHOLE":                                 
                           NutritionEstimateArray[13]=resultRecipe.nutritionEstimates[k].value;
                             break;
                            case  "ENERC_KCAL":   
                             document.getElementById('cns-status-box-number2').innerHTML=resultRecipe.nutritionEstimates[k].value;
                            break;
                             
                           default:
                           //if(FatKal=='undefiend'){ alert();
                            if(FatKal=='undefiend'){ alert();
                            document.getElementById('cns-status-box-number').innerHTML="Data unavailable";
                           }
                           //document.getElementById('cns-status-box-number').innerHTML=resultRecipe.nutritionEstimates[k].value;
                           //var FatKal=resultRecipe.nutritionEstimates[k].value;
                          }
               

                         }        drawchart(recipeTitleName);  
                         FlavorChart(BitterAmount, MeatyAmount, PiquantAmount, SaltyAmount, SourAmount,SweetAmount);    
                    
                         
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
                    "name": "Potassium",
                    "y": NutritionEstimateArray[0]
                },
                {
                    "name": "Saturated Fat",
                    "y": NutritionEstimateArray[1]
                },
                {
                    "name": "Starch",
                    "y": NutritionEstimateArray[2]
                },
                {
                    "name": "Glucose",
                    "y": NutritionEstimateArray[3]
                },
                {
                    "name": "Iron",
                    "y": NutritionEstimateArray[4]
                },
                {
                    "name": "Vitamin E",
                    "y": NutritionEstimateArray[5]
                },
                {
                    "name": "Fatty acids",
                    "y": NutritionEstimateArray[6]
                },
                {
                    "name": "Carbohydrate",
                    "y": NutritionEstimateArray[7]
                },
                {
                    "name": "Vitamin K",
                    "y": NutritionEstimateArray[8]
                },
                 {
                    "name": "Calcium",
                    "y": NutritionEstimateArray[9]
                },
                {
                    "name": "Magnisium",
                    "y": NutritionEstimateArray[10]
                },
                {
                    "name": "Sugar",
                    "y": NutritionEstimateArray[11]
                },
                {
                    "name": "Protein",
                    "y": NutritionEstimateArray[12]
                },
                {
                    "name": "Cholesterol",
                    "y": NutritionEstimateArray[13]
                } 
                
            ]
        }
    ]
});
 }


function FlavorChart(BitterAmount,MeatyAmount,PiquantAmount,SaltyAmount,SourAmount,SweetAmount){


    Highcharts.chart('Flavors-chart', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Flavor min 0 and Max 1'
        },
        subtitle: {
            text: 'Source: <a href="https://www.yummly.com/">Yummly</a>'
        },
        xAxis: {
            categories: ['Bitter', 'Meaty', 'Piquant', 'Salty', 'Sour','Sweet'],
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Flavor min 0 and Max 1',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' unit'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Flavor ',
             data: [BitterAmount, MeatyAmount, PiquantAmount, SaltyAmount, SourAmount,SweetAmount]
        }]
    });


}