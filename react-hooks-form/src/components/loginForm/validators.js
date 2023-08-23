export const nameValidator = name =>{
    if (!name){
        return'Enter your name';
    }else if (!new RegExp (/^[A-Za-z]+$/).test(name)) {
        return'Incorrect name format';

    }
    return '';
};

export const emailValidator = email =>{
    if (!email){
        return'Enter your email';
    }else if (!new RegExp (/\S+@\S+\.\S+/).test(email)){
        return'Incorrecct email format';
    }
    return'';
};

export const messageValidator = messageBox =>{
    if (!messageBox){
        return'Enter your message';
    }else if (messageBox < 0){
        return'Message box cannot be empty';
    }
    return'';
};