// Edamam related variable
var appKey = "3ede82a48f3b73939f6b5d34debc9f2a";
var appID = "89d029e6";
var accessPoint = "https://api.edamam.com/api/recipes/v2?type=public&q=";
var recipeSearchForm = $("#searchForm");
var resultDiv = $(".resultbox");
var alert = $('.alert');
var nextPageBtn = $('.next-btn');
var prevPageBtn = $('.prev-btn');

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
        displayerror();
    } else {
        $(".intro").fadeOut();
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

    api(apiUrl, ingredientValue, cusineValue);
}

function api(apiUrl, ingredientValue, cusineValue){
    $.get(apiUrl).then(function(response){
        var recipeInfo = response.hits;
        var nextPage = response._links.next.href;
         var prev = apiUrl;
        

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
                    '<div class="cell large-3 carbs"><p>Carbs: ' + carbsCount + '</span></p></div>'  +
                    '<div class="cell large-3 fats"><p>Fats: ' + fatCount + '</span></p></div>'  +
                    '</div>' +
                    '</div>'
            );
        });

        nextPageBtn.empty();
        nextPageBtn.append(
            '<button class="success button nextBtn" value=' + nextPage + ' data-ingrident=' + ingredientValue + ' data-cuisine=' + cusineValue + ' data-prev=' + prev + '>Next Page</button>'
        );
    });
}

prevPageBtn.click(function(e) {
    var apiUrl = e.target.value;
    ingredientValue = $('.nextBtn').data('ingrident');
    cusineValue = $('.nextBtn').data('cuisine');
    var prev = $('.nextBtn').data('prev');
    
    api(apiUrl, ingredientValue, cusineValue);
    prevPageBtn.empty();
    prevPageBtn.append(
        '<button class="success button nextBtn" value=' + prev + '>Previous Page</button>'
    );
});
nextPageBtn.click(function(e) {
    var apiUrl = e.target.value;
    ingredientValue = $('.nextBtn').data('ingrident');
    cusineValue = $('.nextBtn').data('cuisine');
    var prev = $('.nextBtn').data('prev');
    $('.nextBtn').data('cuisine');
    
    api(apiUrl, ingredientValue, cusineValue);
    prevPageBtn.empty();
    prevPageBtn.append(
        '<button class="success button nextBtn" value=' + prev + '>Previous Page</button>'
    );

});


function playID(cuisine){
    if(cuisine == 'Asian'){
        var playlistId = 'PLjYB2kiPKGP_SncwuTJtiCuSx1a5uuaBD';
    }
    else if(cuisine == 'American'){
        var playlistId = 'PLjYB2kiPKGP-bPS_3qjHl9-oTthR285sK';
    } 
    else if(cuisine == 'British'){
        var playlistId = 'PLjYB2kiPKGP9-8lxJ8f0AOJjd4CBVmuZn';
    } 
    else if(cuisine == 'Caribbean'){
        var playlistId = 'PLjYB2kiPKGP9VuaRh5VWsicG00CedpB27';
    } 
    else if(cuisine == 'Chinese'){
        var playlistId = 'PLfy0DLB0T_kiMZ8i3AGeQWGouY5BwIP1v';
    }
    else if(cuisine == 'European'){
        var playlistId = 'PLjYB2kiPKGP9lf8LbSYrNFujmXjvWlD3w';
    }
    else if(cuisine == 'Eastern Europe'){
        var playlistId = 'PLjYB2kiPKGP_Q6WZt1cuBCvwXumEuqXwF';
    } 
    else if (cuisine == 'Indian') {
        var playlistId = 'PLfy0DLB0T_kiAzis2XTsDQ984Q-H3rzT_';
    }
    else if (cuisine == 'Japanese') {
        var playlistId = 'PLjYB2kiPKGP_OkrtXWN8_xr9s-XX2dDy_';
    }
    else if (cuisine == 'Kosher') {
        var playlistId = 'PLjYB2kiPKGP-e_OfxDBg9AcLt51vdc6kP';
    }
    else if (cuisine == 'Mediterranean') {
        var playlistId = 'PLfy0DLB0T_kjw_3rAMCYG_BuHZEoBtk0_';
    }
    else if (cuisine == 'South American') {
        var playlistId = 'PLfy0DLB0T_kha8HJtD_XGyBR26_cv3RGN';
    }
    else if (cuisine == 'Mexican') {
        var playlistId = 'PLjYB2kiPKGP-XJoE4-p-Txz8Qzao2J6r8';
    }
    else if (cuisine == 'Middle Eastern') {
        var playlistId = 'PLjYB2kiPKGP_FQ13e_9qbH4BS6NkL_MJR';
    }
    else if (cuisine == 'Nordic') {
        var playlistId = 'PLjYB2kiPKGP_7WgOZwjrtZAdvLxbRW4XK';
    }
    else if (cuisine == 'Italian') {
        var playlistId = 'PLjYB2kiPKGP8-FZZ0GBmx42YleV0bdBIm';
    }
    else if (cuisine == 'French') {
        var playlistId = 'PLjYB2kiPKGP-d3JNG_Lhk3S-cNq920nNk';
    }
    else{
        var playlistId = 'PLjYB2kiPKGP-nRvChATwXXYO1x4NwZea6';
    }

    var ytApiUrl =  ytAccessPoint + partandmaxResults + '&playlistId=' + playlistId + '&key=' + youtubekey;

    $.getJSON(ytApiUrl, function(data){

        ytDiv.empty();
        var yt_id = data.items[0].snippet.resourceId.videoId;
        mainVid(yt_id);
    });
}

function mainVid(yt_id) {
    ytDiv.append('<iframe src="https://www.youtube.com/embed/' + yt_id + '?autoplay=1" frameborder="0" allowfullscreen></iframe>');
}