let people = [
    {name : 'Ujang', age:30},
    {name : 'Jangu', age:20},
    {name : 'Ajung', age:35},
];

console.log(people);

let peopleAbove25 = people.filter(person => person.age > 25);

console.log(peopleAbove25);