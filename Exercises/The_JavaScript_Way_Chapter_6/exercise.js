//1.Adding character experience

    // TODO: create the character object here
    let aurora = {
        name: "Aurora",
        health: 150,
        strength: 25,
        xp:0,

        // Return the character description
        describe() {
            return `${this.name} has ${this.health} health points, ${this
            .strength} as strength, and ${this.xp} XP points`;
        }
    };

    // Aurora is harmed by an arrow
    aurora.health -= 20;

    // Aurora equips a strength necklace
    aurora.strength += 10;

    // Aurora learn a new skill
    aurora.xp += 15;

    console.log(aurora.describe());


//2.Modeling a dog

    let dog = {
            name: "Fang",
            species: "boarhound",
            size: 75,
            xp:0,

            // Return the character description
            bark() {
                return `Grrr! Grrr!`;
            }
        };

    console.log(`${dog.name} is a ${dog.species} dog measuring ${dog.size}`);
    console.log(`Look, a cat! ${dog.name} barks: ${dog.bark()}`);

//3.Modeling a circle

    let r = Number(prompt("Enter the circle radius:"));

    // TODO: create the circle object here
    let circle = {
        radius: r,

        circumference(){
            return 2 * Math.PI * this.radius;
        },

        area(){
            return this.radius * this.radius * Math.PI;
        }
    }

    console.log(`Its circumference is ${circle.circumference()}`);
    console.log(`Its area is ${circle.area()}`);

//Modeling a bank account

    let account = {
        name:"Alex",
        balance:0,

        credit(value){
            this.balance += value;
        },

        describe(){
            return `owner: ${this.name}, balance ${this.balance}`;
        }
    }

    console.log(account.describe());

    account.credit(250);

    account.credit(-80);

    console.log(account.describe());