let userEmail = 'rudrava'
let passWord = '1234'
let passLength = (passWord.length)

let emailCheck = function(userEmail){
    if (userEmail.includes('@')){
        return true
    }
    return false
}

let checkPassword = function (passWord){
    if (passWord.length > 6)
        return true
    return false
}
console.log(emailCheck(userEmail))
console.log(checkPassword(passWord))
