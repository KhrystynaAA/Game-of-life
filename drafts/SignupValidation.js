function Validation(values){
    
    let error = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}/

    if(values.name === ""){
        error.name = "Name shouldn't be empty";
    }
    else{
        error.name="";
    }

    if(values.email === ""){
        error.email = "Email shouldn't be empty";
    }
    else if(!email_pattern.test(values.email)){
        error.email = "Email didn't match";
    }
    else{
        error.email="";
    }

    if(values.password === ""){
        error.password = "Password shouldn't be empty";
    }
    else if(!password_pattern.test(values.password)){
        error.password = "Password should have 8 and more signs with letters in lowcase and uppercase";
    }
    else{
        error.password="";
    }
    return error;

}
export default Validation;