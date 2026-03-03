

let user;
let rabbit;


class User {

  //атрибут объекта
  name = "";

  //защищённый атрибут
  //по соглашению они начинаются с подчёркивания, но всё равно доступны. Инкапсуляции нет.	
  _age = 20;


  //Приватный атрибут
  //должны начинаться с #. 
  //Доступны только внутри класса (не видны в подклассах).
  #password;


  //Статический метод
  static staticMethod1() {    //аналогично назначению User.staticMethod = function() {...
    log2("staticMethod1 message");
    return true;
  }

  static createBob() {
    return new User("Bob");
  }

  //Статические свойства
  static desc = "Демо класс с основными фичами";



  constructor(name, pw) {
    this.name = name;

    if (pw) {
      //задание пароля через getter
      this.password = pw;
    }

    //чтобы получать доступ к this в обработчиках - необходимо использовать синтакис "() => {"
    $sel2.change(() => {
      le2("$sel2.val()");
    });

    User.staticMethod2 = () => {
      log2("staticMethod2 message");
      return false;
    }




  }

  sayHi() {
    log2(`hi, i'm ${this.name}, age is ${this.age}`);
  }

  printpw() {
    log2(`current password: ${this.#password}`);
  }


  //getter
  get age() {
    return this._age;
  }

	get fullName() {
	  return `${this.name} (${this.age})`;
	}	
	
  //setter
  set age(value) {
    if (value < 6) throw new Error("слишком маленький возраст");
    this._age = value;
  }

  set password(value) {
    if (value.length <= 3) throw new Error("Слишком короткий пароль!");
    this.#password = value;
  }

}




//---------------Наследование--------------------

class Animal {

  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  run(speed) {
    this.speed = speed;
    log2(`${this.name} бежит со скоростью ${this.speed}.`);
  }
  stop() {
    this.speed = 0;
    log2(`${this.name} стоит.`);
  }
}

// Наследуем от Animal
class Rabbit extends Animal {

  constructor(name, earLength) {
    super(name);
    this.earLength = earLength;
  }

  hide() {
    log2(`${this.name} прячется!`);
  }

  //переопределение метода
  stop() {
    super.stop();
    this.hide();
  }

}












