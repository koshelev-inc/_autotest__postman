


pm.test("Мой первый автотест", function () {
    pm.response.to.have.status(200);
});

pm.test("Body matches string Яндекс.Практикум", function () {
    pm.expect(pm.response.text()).to.include("Яндекс.Практикум");
});

pm.test("Response time is less than 50ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(50);
});




pm.test("Мой первый автотест", function () {
    pm.response.to.have.status(200);
});

pm.test("Body matches string Яндекс.Практикум", function () {
    pm.expect(pm.response.text()).to.include("Яндекс.Практикум");
});

pm.test("Response time is less than 50ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(50);
});

pm.test("Extract and save ID", function () {
    var jsonData = pm.response.json();
    var id = jsonData.id;
    
    pm.globals.set("characterId", id);
});

// Получаем ответ от сервера
var responseBody = pm.response.json();

// Проверяем наличие и тип свойств
if (Array.isArray(responseBody.pokemons_alive) && Array.isArray(responseBody.pokemons_in_pokeballs)) {
    // Получаем массив ID покемонов, находящихся в покеболлах
    var pokemonsInPokeballsIds = responseBody.pokemons_in_pokeballs.map(pokemon => pokemon.id);

    // Фильтруем массив живых покемонов, чтобы найти отсутствующие
    var missingPokemonIds = responseBody.pokemons_alive.filter(alivePokemonId => !pokemonsInPokeballsIds.includes(alivePokemonId));

    // Сохраняем строку отсутствующих покемонов в глобальные параметры Postman
    pm.globals.set("missingPokemonIds", missingPokemonIds.join(','));
} else {
    console.log("Required properties are missing or not in the expected format.");
}


var users = pm.response.json(); 
function shouldExcludeUser(user) {
    return user.trainer_name === "nagibator";
}


function shouldExcludePokemon(pokemon, excludedIds) {
    return excludedIds.includes(pokemon.id);
}


var excludedUserIds = pm.globals.get("excludedUserIds") || "";


var foundPokemonId = null;

for (var i = 0; i < users.length; i++) {
    var user = users[i];
    
    if (shouldExcludeUser(user)) {
        continue; // Пропускаем исключенных пользователей
    }

    var pokemonsInPokeballs = user.pokemons_in_pokeballs;

    var excludedPokemonIds = excludedUserIds.split(",");

 
    var filteredPokemons = pokemonsInPokeballs.filter(function(pokemon) {
        return !shouldExcludePokemon(pokemon, excludedPokemonIds);
    });

    if (filteredPokemons.length > 0) {
        foundPokemonId = filteredPokemons[0].id;
        excludedUserIds += "," + user.id; 
        break; 
    }
}


pm.globals.set("foundPokemonId", foundPokemonId);
pm.globals.set("excludedUserIds", excludedUserIds);




