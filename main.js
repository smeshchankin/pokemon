(function() {
    const button = {
        attack: document.getElementById('attack')
    };

    pokemons = [
        {
            name: document.querySelector('#player .name').textContent,
            health: document.querySelector('#player .health'),
            hp: 100
        },
        {
            name: document.querySelector('#enemy .name').textContent,
            health: document.querySelector('#enemy .health'),
            hp: 100
        }
    ];

    button.attack.addEventListener('click', function () {
        pokemons.forEach(function(pokemon) {
            pokemon.hp -= random(10);
            if (pokemon.hp < 0) {
                pokemon.hp = 0;
            }
        });
        render();

        if (pokemons[0].hp === 0 && pokemons[1].hp === 0) {
            alert('Frendship wins!');
            init();
        } else if (pokemons[0].hp === 0) {
            alert( pokemons[1].name + ' win!');
            init();
        } else if (pokemons[1].hp === 0) {
            alert( pokemons[0].name + ' win!');
            init();
        }

        render();

        function random(max) {
            return Math.ceil(Math.random() * max);
        }
    });

    init();

    function init() {
        pokemons.forEach(function(pokemon) {
            pokemon.hp = 100;
        });
        render();
    }

    function render() {
        pokemons.forEach(function(pokemon) {
            pokemon.health.style.width = pokemon.hp + '%';
        });
    }
}());
