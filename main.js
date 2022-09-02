let users = [
    {
        name: '1',
        password: '1',
        age: 30,
        isLogin: false
    },
    {
        name: '2',
        password: '2',
        age: 33,
        isLogin: false
    },
    {
        name: 'User 3',
        password: 'pass125',
        age: 21,
        isLogin: false
    }
];
let messages = [];
// user script start 
// inSystem checker 
let inSystem = '';
function changeInSystemUser(userName='') {
    inSystem = userName;
    let h3 = document.querySelector('h3');
    inSystem ? h3.innerText = `User: ${inSystem} in system` : h3.innerText = 'No users in system'
}

// create user logic
function uniqChecker(userName){
    return users.some(item => item.name === userName)
}

function checkPassword(password, passwordConfirm) {
    return password === passwordConfirm;
}

function createUser() {
    let userName = prompt('Enter username');
    if(uniqChecker(userName)) {
        alert('User already exists');
        return;
    };
    let password = prompt('Enter password');
    let passwordConfirm = prompt('Enter password confirmation');
    if(!checkPassword(password, passwordConfirm)) {
        alert("Passwords don't match");
    };
    let age = +prompt('Enter age');
    let userObj = {
        name: userName,
        password: password,
        age: age,
        isLogin: false,
        message: {
            getMessages: [],
            sendMessages: [],
            id: Date.now(),
            
        }
    };
    users.push(userObj);
    alert('Created successfully');
    console.log(users);
};

// login logic
function getUserObj(userName) {
    return users.find(item => item.name === userName)
};

function checkUserPassword(userName, pass) {
    let user = getUserObj(userName);
    return user.password === pass;
};

function loginUser() {
    let userName = prompt('Enter username');
    if(!uniqChecker(userName)) {
        alert('User is not found');
        return;
    };
    let pass = prompt('Enter password');
    if(!checkUserPassword(userName, pass)) {
        alert('Password doesn\'t match this account');
        return;
    };
    let user = getUserObj(userName);
    user.isLogin = true;
    changeInSystemUser(userName);
};

// logout logic
function logOutUser() {
    let user = getUserObj(inSystem);
    user.isLogin = false;
    inSystem = '';
    changeInSystemUser('');
}

// delete account 
if (!inSystem) {
    alert("Only aurorized users can delete account");
  }
  let conf = confirm("Are you sure?");
  if (conf) {
    users = users.filter((accounts) => accounts.name != inSystem);
    changeInSystemUser("");
    console.log(users);
  }
// user script end 

// message script 
// create message logic 
function createMessage() {
    if (!inSystem) {
      alert("Only aurorized users can send message");
      return;
    }
    let from = prompt("Enter recipient");
    let message = prompt("Enter message");
    
    searchUser(from);
    function searchUser(from) {
      for (i of users) {
        if (i.name == from) {
          i.getMessages.push(message);
          alert("Successfuly created");
        }
      }
    }
    for (i of users) {
      if (inSystem == i.name) {
        i.sendMessages.push(message);
      }
    }
    console.log(users);
}

// delete message 
function getMessageObj(id) {
    return getMessages.find(item => item.id === id) 
};

function checkOwnerMessage(id) {
    let postObj = getMessageObj(id);
    return postObj && postObj.user === inSystem;
};

function deleteMessages() {
if(!inSystem) {
    alert('Only authorized users can delete a message');
    return;
};
let postId = +prompt('Enter post id');
if(!checkOwnerMessage(postId)) {
    alert('There is no message with this id, or you are not the author');
    return;
};
getMessages = getMessages.filter(item => item.id !== postId);
alert('Successfully deleted');
}