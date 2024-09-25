model = document.getElementById("model");
exit = document.getElementById("exit");
search = document.getElementById("search");
section = document.getElementsByClassName("section")[0];
container = document.getElementById("container");
let buttons = document.getElementById("button");

exit.addEventListener("click", NonDisplayModel);
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
                        <button class="bt" onclick="displayModel(${meal})" data-bt-${i}>See Details</button>
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

function displayModel(i) {
    buttons = document.getElementsByClassName("bt");
    model.style.display = "block";
    console.log(i.meal.strMeal)

}

function NonDisplayModel() {
    model.style.display = "none";
}