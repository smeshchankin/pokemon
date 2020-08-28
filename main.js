(function() {
    const button = {
        attack: document.getElementById('attack'),
        healing: document.getElementById('healing')
    };

    const players = [
        {
            name: 'Player',
            pokemons: [
                {
                    name: 'Pikachu',
                    health: document.querySelector('#player .health'),
                    healthValue: document.querySelector('#player .hp-value'),
                    hp: 100
                }
            ]
        },
        {
            name: 'Enemy',
            pokemons: [
                {
                    name: 'Charmander',
                    health: document.querySelector('#enemy .health'),
                    healthValue: document.querySelector('#enemy .hp-value'),
                    hp: 100
                }
            ]
        }
    ];

    button.healing.addEventListener('click', function() {
        changePokemonsHP(10, false);
        render();

        this.disabled = true;
    });

    button.attack.addEventListener('click', function () {
        changePokemonsHP(10, true);
        render();

        const msg = null;
        if (players[0].pokemons[0].hp === 0 && players[1].pokemons[0].hp === 0) {
            msg = 'Frendship wins!';
        } else if (players[0].pokemons[0].hp === 0) {
            msg = players[1].name + ' win!';
        } else if (players[1].pokemons[0].hp === 0) {
            msg = players[0].name + ' win!';
        }

        if (msg) {
            alert(msg);
            init();
        }
    });

    init();

    function init() {
        players.forEach(function(player) {
            player.pokemons.forEach(function(pokemon) {
                pokemon.hp = 100;
            });
        });
        render();

        button.healing.disabled = false;
    }

    function render() {
        players.forEach(function(player) {
            player.pokemons.forEach(function(pokemon) {
                pokemon.health.style.width = pokemon.hp + '%';
                pokemon.healthValue.textContent = pokemon.hp + ' / 100';
            });
        });
    }

    function random(max) {
        return Math.ceil(Math.random() * max);
    }

    function changePokemonsHP(maxHP, isAttack) {
        players.forEach(function (player) {
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
        });
    }
}());
