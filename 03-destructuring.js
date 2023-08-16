const Deadpool = {
	name: 'Wade',
	lastName: 'Winston',
	nickName: 'Deadpool',
	power: 'Regeneration',
	getName() {
		return `${ this.name }, ${ this.lastName} ${ this.power }`
	}
}

const { name, lastName, power, age = 50 } = Deadpool
console.log( name, lastName, power, age )

const printHero = ({ name, lastName, power, age = 10 }) => {
	console.log( name, lastName, power, age )
}

printHero( Deadpool )

// Destructuring in Arrays
const heroes = ['Deadpool', 'Superman', 'Batmna']
const hero1 = heroes[0]
const hero2 = heroes[1]
const hero3 = heroes[2]
console.log(hero1, hero2, hero3)

const [h1, h2, h3] = heroes
console.log(h1, h2, h3)

const [, , heroe_3] = heroes
console.log(heroe_3)
