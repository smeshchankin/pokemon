(function() {
    const button = {
        attack: document.getElementById('attack'),
        healing: document.getElementById('healing')
    };

    const player = {
        name: 'Player',
        pokemons: [
            {
                name: 'Pikachu',
                health: document.querySelector('#player .health'),
                healthValue: document.querySelector('#player .hp-value'),
                hp: 100
            }
        ]
    };
    const enemy = {
        name: 'Enemy',
        pokemons: [
            {
                name: 'Charmander',
                health: document.querySelector('#enemy .health'),
                healthValue: document.querySelector('#enemy .hp-value'),
                hp: 100
            }
        ]
    };

    button.healing.addEventListener('click', function() {
        changePokemonsHP(10, false);
        render();

        this.disabled = true;
    });

    button.attack.addEventListener('click', function () {
        changePokemonsHP(10, true);
        render();

        if (player.pokemons[0].hp === 0 && enemy.pokemons[0].hp === 0) {
            alert('Frendship wins!');
            init();
        } else if (player.pokemons[0].hp === 0) {
            alert(enemy.name + ' win!');
            init();
        } else if (enemy.pokemons[0].hp === 0) {
            alert(player.name + ' win!');
            init();
        }
    });

    init();

    function init() {
        player.pokemons.forEach(function(pokemon) {
            pokemon.hp = 100;
        });
        enemy.pokemons.forEach(function(pokemon) {
            pokemon.hp = 100;
        });
        render();

        button.healing.disabled = false;
    }

    function render() {
        player.pokemons.forEach(function(pokemon) {
            pokemon.health.style.width = pokemon.hp + '%';
            pokemon.healthValue.textContent = pokemon.hp + ' / 100';
        });
        enemy.pokemons.forEach(function(pokemon) {
            pokemon.health.style.width = pokemon.hp + '%';
            pokemon.healthValue.textContent = pokemon.hp + ' / 100';
        });
    }

    function random(max) {
        return Math.ceil(Math.random() * max);
    }

    function changePokemonsHP(maxHP, isAttack) {
        player.pokemons.forEach(function(pokemon) {
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

        enemy.pokemons.forEach(function(pokemon) {
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
