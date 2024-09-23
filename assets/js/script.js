const form = document.querySelector('form');
const input = document.querySelector('input');
const textError = document.querySelector('.error');

const tamagotchiWrapper = document.querySelector('.tamagotchi-content');
const tamagotchiName = document.querySelector('.tamagotchi_name p');
const tamagotchiSleep = document.querySelector('.tamagotchi_sleep span');

const tamagotchiHealth = document.querySelector('.tamagotchi_health span');
const tamagotchiFood = document.querySelector('.tamagotchi_food span');

const sleepBtn = document.querySelector('.sleepBtn');
const healthBtn = document.querySelector('.healthBtn');
const eatBtn = document.querySelector('.eatBtn');

const tamagotchiImg = document.querySelector('img');

const progressSleep = document.querySelector('.tamagotchi_sleep progress');
const progressHealth = document.querySelector('.tamagotchi_health progress');
const progressFood = document.querySelector('.tamagotchi_food progress');
const gameOver = document.querySelector('.gameOver');

function Tamagotchi() {
    // Initialisation des propriétés de base du tamagotchi
    this.sleep = 100;
    this.health = 100;
    this.food = 100;
    let newThis = this;

    // Gestion de la diminution de la nourriture au fil du temps
    this.removeFood = function () {
        // Réduit la nourriture de 1 toutes les 7 secondes
        setInterval(() => {
            const minusFood = newThis.food--;
            progressFood.value = minusFood;
            
            // Change l'image si la nourriture atteint 50
            if (minusFood === 50) {
                tamagotchiImg.classList.add('swingImg');
                tamagotchiImg.src = 'assets/img/tamagotchi_sad.png';
            } else if (minusFood == 0) {
                // Empêche la nourriture de devenir négative
                newThis.food = 0;
                tamagotchiFood.textContent = minusFood + "%";
            } else {
                tamagotchiFood.textContent = minusFood + "%";
            }
        }, 7000);

        // Ajoute de la nourriture lorsque l'utilisateur clique sur le bouton "Manger"
        eatBtn.addEventListener('click', function () {
            tamagotchiImg.classList.remove('swingImg');

            // Augmente la nourriture de manière aléatoire
            newThis.food += Math.floor(Math.random() * newThis.food);
            progressFood.value = newThis.food;

            // Vérifie que la nourriture reste dans les limites (0 à 100)
            if (newThis.food >= 100) {
                newThis.food = 100;
                progressFood.value = 100;
            } else if (newThis.food <= 0) {
                newThis.health = 0;
                progressHealth.value = 0;
            }

            const minusNewThis = newThis.food--;
            tamagotchiFood.textContent = minusNewThis + "%";
        });
    };

    // Gestion de la diminution de la santé au fil du temps
    this.removeHealth = function () {
        // Réduit la santé de 1 toutes les 9 secondes
        setInterval(() => {
            const minusHealth = newThis.health--;
            progressHealth.value = minusHealth;

            // Change l'image si la santé atteint 50
            if (minusHealth == 50) {
                tamagotchiImg.src = 'assets/img/tamagotchi_sad.png';
                tamagotchiImg.classList.add('swingImg');
                tamagotchiHealth.textContent = minusHealth + "%";
            } else if (minusHealth == 0) {
                newThis.health = 0;
                tamagotchiHealth.textContent = minusHealth + "%";
            } else {
                tamagotchiHealth.textContent = minusHealth + "%";
            }
        }, 9000);

        // Redémarre la page si la santé tombe à 0 (game over)
        this.reloadPage();

        // Ajoute de la santé lorsque l'utilisateur clique sur le bouton "Soigner"
        healthBtn.addEventListener('click', function () {
            tamagotchiImg.src = 'assets/img/tamagotchi_happy.png';
            tamagotchiImg.classList.remove('swingImg');

            // Augmente la santé de manière aléatoire
            newThis.health += Math.floor(Math.random() * newThis.health);
            progressHealth.value = newThis.health;

            // Vérifie que la santé reste dans les limites (0 à 100)
            if (newThis.health >= 100) {
                newThis.health = 100;
                progressHealth.value = 100;
            } else if (newThis.health <= 0) {
                newThis.health = 0;
                progressHealth.value = 0;
            }

            const minusNewthis = newThis.health--;
            tamagotchiHealth.textContent = minusNewthis + "%";
        });
    };

    // Vérifie si la santé tombe à 0 pour afficher le game over et recharger la page
    this.reloadPage = function () {
        setInterval(() => {
            if (this.health === 0) {
                gameOver.classList.remove('hidden');
                // Recharge la page après 2 secondes
                setTimeout(() => {
                    location.reload();
                }, 2000);
            }
        }, 600);
    };

    // Gestion de la diminution du sommeil au fil du temps
    this.removeSleep = function () {
        // Réduit le sommeil de 1 toutes les 12 secondes
        setInterval(() => {
            const minusSleep = newThis.sleep--;
            progressSleep.value = minusSleep;

            // Change l'image si le sommeil atteint 50
            if (minusSleep === 50) {
                tamagotchiImg.classList.add('swingImg');
                tamagotchiImg.src = 'assets/img/tamagotchi_sad.png';
            } else if (minusSleep == 0) {
                newThis.sleep = 0;
                tamagotchiSleep.textContent = minusSleep + "%";
            } else {
                tamagotchiSleep.textContent = minusSleep + "%";
            }
        }, 12000);

        // Ajoute du sommeil lorsque l'utilisateur clique sur le bouton "Dormir"
        sleepBtn.addEventListener('click', function () {
            tamagotchiImg.src = 'assets/img/tamagotchi_happy.png';
            tamagotchiImg.classList.remove('swingImg');

            // Augmente le sommeil de manière aléatoire
            newThis.sleep += Math.floor(Math.random() * newThis.sleep);
            progressSleep.value = newThis.sleep;

            // Vérifie que le sommeil reste dans les limites (0 à 100)
            if (newThis.sleep >= 100) {
                newThis.sleep = 100;
                progressSleep.value = 100;
            } else if (newThis.sleep <= 0) {
                newThis.health = 0;
                progressHealth.value = 0;
            }

            const minusNewthis = newThis.sleep--;
            tamagotchiSleep.textContent = minusNewthis + "%";
        });
    };

    // Charge le tamagotchi en initialisant les événements
    this.load = function () {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Vérifie que l'input n'est pas vide ou trop long
            if (input.value === "") {
                alert('Veuillez remplir ce champ!');
                textError.classList.remove('hidden');
                textError.textContent = "Veuillez remplir ce champ!";
            } else if (input.value.length >= 12) {
                textError.textContent = "Maximum 12 caractères!";
                textError.classList.remove('hidden');
            } else {
                // Masque le formulaire et affiche le tamagotchi
                console.log(input.value);
                tamagotchiWrapper.classList.remove('hidden');
                form.classList.add('hidden');
                textError.classList.add('hidden');
                tamagotchiName.textContent = input.value;

                // Lance les fonctions de gestion du tamagotchi
                this.removeFood();
                this.removeSleep();
                this.removeHealth();
            }
        });
    };
}

// Crée une nouvelle instance de tamagotchi et démarre le jeu
const newTamagotchi = new Tamagotchi();
newTamagotchi.load();
