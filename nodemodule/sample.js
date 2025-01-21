// const person={
//     name :"deepak kumar",
//     age :23,
//     isstudent:'Yes',
//     hobbies:['reading','dancing','painting']

// };
// console.log(person)

// //filter function
// const ages=[12,23,34,45,56]
// const result=ages.filter(checkfilter)

// function checkfilter(age){
//     //if(age<45)
//         return age<=45;
// }
// console.log(result)

// //by using of prompt we can take input from the users


var prompt=require('prompt-sync')();
const age =prompt("please enter your age");
if(age <18){
    console.log("you get a 20% discount")

}else {
    console.log("you get a 30% discount")
}


//pwd=> present work in directory