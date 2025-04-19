export const validateForm = (userDetails) => {
  let valid = true;
  let validateErrors = {
    name: "",
    email: "",
    mobile: "",
    city: "",
    password: "",
  };
  const { name, email, mobile, city, password } = userDetails;

  if (
    !/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(name) ||
    name.length < 2 ||
    name.length > 50
  ) {
    validateErrors.name =
      "Please enter a valid name (only letters, single space between words , 2 to 50 characters)";
    valid = false;
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    validateErrors.email = "*Please enter a valid email address";
    valid = false;
  }
  if (isNaN(mobile)) {
    validateErrors.mobile =
      "*Please enter a valid number (only digits allowed)";
    valid = false;
  } else if (!/^[6-9]\d{9}$/.test(mobile)) {
    validateErrors.mobile = "*Please enter a valid 10-digit mobile number";
    valid = false;
  }

  if (password.length < 8) {
    validateErrors.password = "*Password must be at least 8 characters long";
    valid = false;
  } else if (!/[A-Z]/.test(password)) {
    validateErrors.password =
      "*Password must contain at least one uppercase letter";
    valid = false;
  } else if (!/[a-z]/.test(password)) {
    validateErrors.password =
      "*Password must contain at least one lowercase letter";
    valid = false;
  } else if (!/\d/.test(password)) {
    validateErrors.password = "*Password must contain at least one number";
    valid = false;
  }

  Object.keys(userDetails).map((field) => {
    if (userDetails[`${field}`] === "") {
      valid = false;
      validateErrors[`${field}`] = `please enter ${field}`;
    }
  });

  return { valid, validateErrors };
};
