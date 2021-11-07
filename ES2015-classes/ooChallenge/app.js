class Vehicle{
  constructor( make, model, year){
    this.make  = make;
    this.model = model;
    this.year  = year;
  }
  honk(){
    return "Beep";
  }
  toString(){
    return `The vehicle is a  ${this.make} ${this.model} from ${this.year}`;
  }
}

class Car extends Vehicle{
  constructor(make, model, year){
    super(make, model, year);
    this.numWheels = 4;
  }
}

class Motorcycle extends Vehicle{
  constructor(make, model, year){
    super(make, model, year);
    this.numWheels = 2;
  }
  revEngine(){
    return "VROOM!";
  }
}

class Garage  {
  constructor(capacity) {
    this.capacity = capacity;
    this.vehicles = [];
  }
  add(vehicle){
    //Check the validity of the vehicle before pushing
    //let entries = [this.vehicles.make, this.vehicles.model];
    if ( !(vehicle instanceof(Vehicle)) ){
      return (`${vehicle} is not a valid Vehicle`);
    }
    if( this.capacity <= this.vehicles.length ){
      return (`sorry we are full`);
    }
    this.vehicles.push(vehicle);
    return ("vehicle added");
  }
}

console.log("*****************************");
console.log("Testing Garage Class Features")
let garage = new Garage(2);
console.log(garage.add(new Car("Hyundai", "Elantra", 2015))); // "Vehicle added!"
console.log(garage.add("Taco"));
console.log(garage.add(new Motorcycle("Honda", "Nighthawk", 2000)));
garage.vehicles;
console.log(garage.add(new Motorcycle("Honda", "Nighthawk", 2001)));
// "Sorry, we're full."

console.log("*****************************");
console.log("Testing Vehicle Class");
let myFirstVehicle = new Vehicle("Honda", "Monster Truck", 1999);
console.log(myFirstVehicle.honk());
console.log(myFirstVehicle.toString());

console.log("*****************************");
console.log("Testing Car Class");
let myFirstCar = new Car("Toyota", "Corolla", 2005);
console.log(myFirstCar.toString()); // "The vehicle is a Toyota Corolla from 2005."
console.log(myFirstCar.honk());     // "Beep."
console.log(myFirstCar.numWheels);  // 4

console.log("*****************************");
console.log("Testing Motorcycle Class");
let myFirstMotorcycle = new Motorcycle("Honda", "Nighthawk", 2000);
console.log(myFirstMotorcycle.toString());
// "The vehicle is a Honda Nighthawk from 2000."

console.log(myFirstMotorcycle.honk());     // "Beep."
console.log(myFirstMotorcycle.revEngine()); // "VROOM!!!"
console.log(myFirstMotorcycle.numWheels);  // 2
