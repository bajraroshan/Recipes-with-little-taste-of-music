var appKey = "3ede82a48f3b73939f6b5d34debc9f2a";
var appID = "89d029e6";
var accessPoint = "https://api.edamam.com/api/recipes/v2?type=public&q=";
var recipeSearchForm = $("#searchForm");
var resultDiv = $(".resultbox");
var cuisineType = ['American', 'Asian', 'British', 'Caribbean', 'Central Europe']


// Form Submit ( Tap Enter or Click Search Button)
recipeSearchForm.on('submit', function(e){
    e.preventDefault();
    var ingredientValue = $("#ingredient").val();
    var cusineValue = $("#cusine").val();
    if(ingredientValue.length == 0 || cusineValue == 0){
      alert.html('Please enter a valid Ingrident or/and Cusine. <strong>ingredient or/and Cusine</strong> cannot be blank.').fadeTo(2000, 500).fadeOut(500);
    } else {
        recipeMain(ingredientValue, cusineValue);

        pagination();
    }

    
  });

function recipeMain(ingredientValue, cusineValue) {
    var apiUrl =  accessPoint + ingredientValue + '&app_id=' + appID + '&app_key=' + appKey + '&cuisineType=' + cusineValue;
    
    $.get(apiUrl).then(function(response){
        var recipeInfo = response.hits;
        resultDiv.empty();
        
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
                    '<div class="recipe-single_">' +
                        '<h3>' + recipeTitle + '</h3>' +
                        '<img src=' + recipeImage + ' alt="recipe for' + recipeTitle + '" />' +
                        '<ul class="ingredient-list">' + 
                        ingridentsNew +
                        '</ul>' +
                        '<div>' + energyCount + '</div>'  +
                        '<div>' + protienCount + '</div>'  +
                        '<div>' + carbsCount + '</div>'  +
                        '<div>' + fatCount + '</div>'  +
                    '</div>'
            );
        });
    });
}

function pagination() {
    $(resultDiv).pagination({
        // items: 100,
        itemsOnPage: 5,
        cssStyle: 'light-theme'
    });
}