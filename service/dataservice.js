const jwt=require("jsonwebtoken")

userDetails = {
  1000: { username: "Thomas", acno: 1000, password: "ab12", balance: 0, transaction: [] },
  1001: { username: "Dante", acno: 1001, password: "ab13", balance: 0, transaction: [] },
  1002: { username: "Sasha", acno: 1002, password: "ab14", balance: 0, transaction: [] },
  1003: { username: "Luke", acno: 1003, password: "ab15", balance: 0, transaction: [] }
}



//LOGIC FOR REGISTER

register = (acno, unname, pssw) => {
  if (acno in userDetails) {
    return {
      status: false,
      message: "user already present",
      statusCode: 404
    }
  }
  else {
    userDetails[acno] = { username: unname, acno, password: pssw, balance: 0, transaction: [] }
    return {
      status: true,
      message: "registered",
      statusCode: 200
    }
  }
}


// LOGIC FOR LOGIN
//.................

login = (acno, psw) => {
  if (acno in userDetails) {
    if (psw == userDetails[acno]["password"]) {
      //store current user
      currentuser = userDetails[acno]["username"]
      //we r storing acno of user whose login is succesful
      currentAcno = acno

      //TOKEN CREATION

      const token=jwt.sign({acno},"superkey123")


      return {
        status: true,
        message: "login success",
        statusCode: 200,
        currentuser,
        currentAcno,
        token
      }
    }
    else {
      return {
        status: false,
        message: "Incorrect password",
        statusCode: 404
      }
    }
  }
  else {
    return {
      status: false,
      message: "not registered yet",
      statusCode: 404
    }
  }
}


//LOGIC FOR DEPOSIT
// ...............

deposit = (acno, psw, ant) => {
  var amount = parseInt(ant)


  if (acno in userDetails) {
    if (psw == userDetails[acno]["password"]) {
      userDetails[acno]["balance"] += amount

      //Here we are pushing the deposit data to the transaction array
      userDetails[acno]["transaction"].push(
        {
          Type: "Credit",
          Amount: amount
        }
      )
      return {
        status: true,
        message: `Your a/c has been credited with amount ${amount}
        and the balance is ${userDetails[acno]["balance"]}`,
        statusCode: 200,
      }
    }
    else {
      return {
        status: false,
        message: "Incorrect Password",
        statusCode: 404
      }
    }

  }
  else {
    return {
      status: false,
      message: "Incorrect acno",
      statusCode: 404
    }
  }
}

//LOGIC FOR WITHDRAWAL
//....................

withdraw = (acnu, psd, ammt)=>{
  var amount1 = parseInt(ammt)


  if (acnu in userDetails) {
    if (psd == userDetails[acnu]["password"]) {
      if (amount1 <= userDetails[acnu]["balance"]) {
        userDetails[acnu]["balance"] -= amount1

        // We are pushing withdrawal data to the transaction array

        userDetails[acnu]["transaction"].push(
          {
            Type: "Debit",
            Amount: amount1
          }
        )

        // console.log(userDetails);

        return {
          status: true,
          message: `Your a/c has been debited with amount ${amount1}
          and the balance is ${userDetails[acnu]["balance"]}`,
          statusCode: 200,
        }
      }
      else {
        return{
          status: false,
          message: "Incorrect balance",
          statusCode: 404
        }
      }
    }
    else {
      return{
        status: false,
        message: "Incorrect acno",
        statusCode: 404
      }
    }

  }
  else {
    return{
      status: false,
      message: "Incorrect password",
      statusCode: 404
    }
  }
}

//LOGIC FOR TRANSACTION
//.......................

getTransaction=(acno)=>{

  return{
    status: true,
    transaction:userDetails[acno].transaction,
    statusCode: 200
  } 

}


module.exports = {
  register, login, deposit,withdraw,getTransaction

}


