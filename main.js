(function() {
    const button = {
        attack: document.getElementById('attack'),
        healing: document.getElementById('healing')
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

    button.healing.addEventListener('click', function() {
        changePokemonsHP(10, false);
        render();
    });

    button.attack.addEventListener('click', function () {
        changePokemonsHP(10, true);
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

    function random(max) {
        return Math.ceil(Math.random() * max);
    }

    function changePokemonsHP(maxHP, isAttack) {
        pokemons.forEach(function(pokemon) {
            const deltaHP = random(maxHP);
            if (isAttack) {
                pokemon.hp -= deltaHP;
            } else {
                pokemon.hp += deltaHP;
            }
            if (pokemon.hp < 0) {
                pokemon.hp = 0;
            } else if (pokemon.hp > 100) {
                pokemon.hp = 100;
            }
        });
    }
}());
