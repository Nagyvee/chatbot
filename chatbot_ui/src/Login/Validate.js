export const validate = ({ name, email, password }, isLogging) => {
    const errors = {};
    
    const nameRegex = /^[A-Za-z\s]{2,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,24}$/;
  
    if (!isLogging && !nameRegex.test(name)) {
      errors.name = "Name should contain only letters and spaces, with a minimum of 2 characters.";
    }
    if (!emailRegex.test(email)) {
      errors.email = "Invalid email format.";
    }
    if (!passwordRegex.test(password)) {
      errors.password = "Password should be 8-24 characters long, contain at least one letter and one number.";
    }
  
    return errors;
  };

  export const setTokenToLocal = (tkn) => {
    localStorage.setItem('chat_tkn', tkn)
  }
  