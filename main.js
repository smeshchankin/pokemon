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
                    hp: 100,
                    maxHP: 100,
                    historyHP: []
                }
            ],
            hasLost: hasLost
        },
        {
            name: 'Enemy',
            pokemons: [
                {
                    name: 'Charmander',
                    health: document.querySelector('#enemy .health'),
                    healthValue: document.querySelector('#enemy .hp-value'),
                    hp: 100,
                    maxHP: 100,
                    historyHP: []
                }
            ],
            hasLost: hasLost
        }
    ];

    button.healing.addEventListener('click', function() {
        changePokemonsHP(10, 20, false);
        render();

        this.disabled = true;
    });

    button.attack.addEventListener('click', function () {
        changePokemonsHP(5, 10, true);
        render();

        let msg = null;
        if (players[0].hasLost() && players[1].hasLost()) {
            msg = 'Frendship wins!';
        } else if (players[0].hasLost()) {
            msg = players[1].name + ' win!';
        } else if (players[1].hasLost()) {
            msg = players[0].name + ' win!';
        }

        if (msg) {
            alert(msg);
            init();
        }
    });

    init();

    function hasLost() {
        return this.pokemons[0].hp === 0;
    }

    function init() {
        processPokemons(function(pokemon) {
            pokemon.hp = pokemon.maxHP;
            pokemon.historyHP = [];
        });
        render();

        button.healing.disabled = false;
    }

    function render() {
        processPokemons(function(pokemon) {
            pokemon.health.style.width = pokemon.hp + '%';
            pokemon.healthValue.textContent = pokemon.hp + ' / ' + pokemon.maxHP;
        });
    }

    function random(min, max) {
        return Math.ceil(min + Math.random() * (max - min));
    }

    function changePokemonsHP(minHP, maxHP, isAttack) {
        processPokemons(function(pokemon) {
            const deltaHP = random(minHP, maxHP);
            if (isAttack) {
                deltaHP = -Math.min(deltaHP, pokemon.hp);
            } else {
                deltaHP = Math.min(deltaHP, pokemon.maxHP - pokemon.hp);
            }

            pokemon.hp += deltaHP;
            pokemon.historyHP.push(deltaHP);
        });
    }

    function processPokemons(callback) {
        players.forEach(function (player) {
            player.pokemons.forEach(function(pokemon) {
                callback(pokemon);
            });
        });
    }
}());
