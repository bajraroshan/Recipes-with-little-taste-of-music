// Edamam related variable
var appKey = "3ede82a48f3b73939f6b5d34debc9f2a";
var appID = "89d029e6";
var accessPoint = "https://api.edamam.com/api/recipes/v2?type=public&q=";
var recipeSearchForm = $("#searchForm");
var resultDiv = $(".resultbox");

// Youtube related variable
var ytAccessPoint = "https://www.googleapis.com/youtube/v3/playlistItems";
var partandmaxResults = "?part=snippet&maxResults=1";
var youtubekey = "AIzaSyBd7uSG8_YQsVb1tJsSUQkYH1Lpq1TWANQ";
var ytDiv = $(".audio");


// Uppercase First Letter
const uppercaseWords = str => str.replace(/^(.)|\s+(.)/g, c => c.toUpperCase());


var cuisineType = ['American', 'Asian', 'British', 'Caribbean', 'Central Europe', 'Chinese', 'Eastern Europe', 'French', 'Indian', 'Italian', 'Japanese', 'Kosher', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'South American', 'South East Asian'];
$( "#cuisine" ).autocomplete({
    source: cuisineType
});


// Form Submit ( Tap Enter or Click Search Button)
recipeSearchForm.on('submit', function(e){
    e.preventDefault();
    // console.log('click');
    var ingredientValue = $("#ingredient").val();
    var cusineValue = $("#cuisine").val();
    if(ingredientValue.length == 0 || cusineValue == 0){
        displayerror()
        // 
    //   alert.html('Please enter a valid Ingrident or/and Cusine. <strong>ingredient or/and Cusine</strong> cannot be blank.').fadeTo(2000, 500).fadeOut(500);
    } else {
        recipeMain(ingredientValue, cusineValue);
        playID(cusineValue);
    }

    
  });

function displayerror() {
    var time = 5;
    var timerInterval = setInterval(function () {
        time--;
        document.querySelector('.errormessge').innerHTML ='Please enter a valid Cusine or item!'
        if (time === 0) {
            clearInterval(timerInterval);
            document.querySelector('.errormessge').innerHTML = "";
        }
    }, 1000);
}

function recipeMain(ingredientValue, cusineValue) {
    var apiUrl =  accessPoint + ingredientValue + '&app_id=' + appID + '&app_key=' + appKey + '&cuisineType=' + cusineValue;
    // console.log(apiUrl)
    $.get(apiUrl).then(function(response){
        var recipeInfo = response.hits;
        resultDiv.empty();
        resultDiv.append(
            '<div class="cell headertag1">Recipes for <span>' + uppercaseWords(ingredientValue) + '</span> in <span>' + uppercaseWords(cusineValue) + '</span> cuisine are: </div>'
        );
        
        $.each(recipeInfo, function(i) {
            var recipeImage = recipeInfo[i].recipe.image;
            var recipeTitle = recipeInfo[i].recipe.label;
            var ingredientsLines = recipeInfo[i].recipe.ingredientLines;
            var energyCount = Math.floor(recipeInfo[i].recipe.totalNutrients.ENERC_KCAL.quantity);
            var protienCount = Math.floor(recipeInfo[i].recipe.totalNutrients.PROCNT.quantity);
            var carbsCount = Math.floor(recipeInfo[i].recipe.totalNutrients.CHOCDF.quantity);
            var fatCount = Math.floor(recipeInfo[i].recipe.totalNutrients.FAT.quantity);
            
            
            var ingridentsNew = ingredientsLines.map((item)=>'<li>' + item + '</li>').join('');
            
            resultDiv.append(
                    '<div class="recipe-single">' +
                    '<div class="cell">' +
                    '<div class="grid-x  rightcontainerinput">' +
                    '<div class=" cell large-2 imagecard">' +
                    '<img src=' + recipeImage + ' alt="recipe for ' + recipeTitle + '" />' +
                    '</div>' +
                    '<div class="cell large-10 rightcontainerRecipes">' +
                    '<div class="grid-x">' +
                    '<div class=" cell recipetitle">' +
                    '<h3>' + recipeTitle + '</h3>' +
                    '</div>' +
                    '<div class="cell recipeingredients ">' +
                    '<ul class="ingredient-list">' + 
                    ingridentsNew +
                    '</ul>' +
                    '</div>' +
                    '<div class="cell">' +
                    '<div class="grid-x energy-result">' +
                    '<div class="cell large-6 calarios">' +
                    '<p>' + energyCount + ' <span class="calariostext">kcal</span></p>'  +
                    '</div>' +
                    '<div class="cell large-6  big3">' +
                    '<div class="grid-x">' +
                    '<div class="cell large-3 protein"><p>Protien: ' + protienCount + '</span></p></div>'  +
                    '<div class="cell large-3 carbs"><p>carbs: ' + carbsCount + '</span></p></div>'  +
                    '<div class="cell large-3 fats"><p>fat: ' + fatCount + '</span></p></div>'  +
                    '</div>' +
                    '</div>'
            );
        });
    });
}

// function pagination() {
//     $(resultDiv).pagination({
//         // items: 100,
//         itemsOnPage: 5,
//         cssStyle: 'light-theme'
//     });
// }

function playID(cuisine){
    if(cuisine == 'Asian' || cuisine == 'Chinese'){
        var playlistId = 'PLfy0DLB0T_kiMZ8i3AGeQWGouY5BwIP1v';
    } 
    else if (cuisine == 'Indian') {
        var playlistId = 'PLfy0DLB0T_kiAzis2XTsDQ984Q-H3rzT_';
    }
    else if (cuisine == 'Mediterranean') {
        var playlistId = 'PLfy0DLB0T_kjw_3rAMCYG_BuHZEoBtk0_';
    }
    else if (cuisine == 'South American') {
        var playlistId = 'PLfy0DLB0T_kha8HJtD_XGyBR26_cv3RGN';
    }
    else if (cuisine == 'Mexican') {
        var playlistId = 'PLfy0DLB0T_khPvDDRjjPDpCsoRBtBmPP3';
    }
    else if (cuisine == 'Middle Eastern') {
        var playlistId = 'PLfy0DLB0T_kj3tOlD-XEAlUPS5N68pWgQ';
    }
    else if (cuisine == 'Italian') {
        var playlistId = 'PLfy0DLB0T_kjQUGzUa1D7xkVBJa6Rr-mZ';
    }
    else if (cuisine == 'French') {
        var playlistId = 'PLfy0DLB0T_kjmrHHFZ8Ow0EuPdwKJwi2-';
    }
    

    var ytApiUrl =  ytAccessPoint + partandmaxResults + '&playlistId=' + playlistId + '&key=' + youtubekey;
    // console.log(ytApiUrl);

    $.getJSON(ytApiUrl, function(data){

        ytDiv.empty();
        var yt_id = data.items[0].snippet.resourceId.videoId;
        mainVid(yt_id);
        // resultsloop(data);
    });
}
function mainVid(yt_id) {
    ytDiv.append('<iframe src="https://www.youtube.com/embed/' + yt_id + '?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
}