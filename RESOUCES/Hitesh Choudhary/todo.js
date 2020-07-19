/*              v1              */
// const todo=[]
// todo.push('Study js');
// todo.push('do hacker rank');
// todo.push('sleep');

// todo.forEach(function (todo, index){
//     console.log(`Task ${index + 1}: ${todo}`);
// })

/*************************  V2   ************************/

// let todo ={
//     Title:'monday',
//     left:5,
//     done:0
// }

// let add = function(todo,task){
//     todo.left=(todo.left + task)
// }
// let done = function(todo,did){
//     todo.done = todo.done +did
// }

// let summary = function(todo){
//     return (`${todo.Title} : \n -you have ${todo.left-todo.done} tasks left`)
// }
// add(todo, 4)
// done(todo,3)
// console.log(summary(todo))


/*************************  v3  using methods ************************/


let todo ={
    Title:'monday',
    left:0,
    done:0,

    add : function(tasks){
        this.left=this.left+tasks
    },

    did : function(did){
        if (did < this.left){
                    this.done=this.done + did
        }
        else{
            console.log('U cheating bruh')
        }
    },

    summary : function(){
        return `You have ${Math.abs(this.left - this.done)} tasks left`
    }
}


todo.add(5)
console.log(todo)
console.log(todo.summary())
todo.did(6)
console.log(todo.summary())
