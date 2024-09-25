model = document.getElementById("model");
search = document.getElementById("search");
section = document.getElementsByClassName("section")[0];
container = document.getElementById("container");
let buttons = document.getElementById("button");

search.addEventListener("click", DisplayProducts);
// buttons.addEventListener("click", DisplayModel);

function DisplayProducts() {
    let value = document.getElementById("input").value.trim();
    section.style.display = "block";
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`).
    then(response => response.json()).then(data => {
        container.innerHTML = "";
        if (data.meals) {
            data.meals.forEach((meal, i) => {
                let content = `
                        <div class="product">
                        <img src="${meal.strMealThumb}" alt="Meal-image">
                        <h3>${meal.strMeal}</h3>
                        <button class="bt" onclick="displayModel(${meal.idMeal})" data-bt-${i}>See Details</button>
                        </div>
                        `;
                container.innerHTML += content;

            });
        } else {
            container.innerHTML += "sory We Don't Have Any Meals With This Ingraient !!!!!!!!!";
        }
        value = "";
    });

}

function displayModel(idMeal, e) {
    let exit = "";
    model.style.display = "block";
    console.log(idMeal)
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`).
    then(response => response.json()).then(data => {
        model.innerHTML = "";
        console.log(data)
        if (data.meals) {
            data.meals.forEach((meal, i) => {
                let content = `<div class="contain">
                                <i class="fa-solid fa-xmark" id="exit"></i>
                                <h2>${meal.strMeal}</h2>
                                <h4>${meal.strCategory}</h4>
                                <p>${meal.strInstructions}</p>
                                <img src="${meal.strMealThumb}" alt=""><br>
                                <a href="https://youtu.be/ma2MkUt24Wo?si=PetLlXP5LSeUB_cn"> Watch Video</a>
                               </div>
                            `
                model.innerHTML = content;
                document.getElementById("exit").addEventListener("click", NonDisplayModel);

            });
        }
        // document.getElementById("exit").addEventListener("click", NonDisplayModel);

    })

}

function NonDisplayModel() {
    model.style.display = "none";
}