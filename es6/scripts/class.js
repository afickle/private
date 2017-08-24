class Animal {
	constructor() {
		this.type = 'animal'
	}
	says(say) {
		console.log(this.type + ' says ' + say)
	}
}

let animal = new Animal();
animal.says('hello');

// super() is necessary
class Cat extends Animal {
	constructor() {
		super();
		this.type = 'cat';
	}
}

let cat = new Cat();
cat.says('hello');