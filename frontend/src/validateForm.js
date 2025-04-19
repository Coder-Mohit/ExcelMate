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

  Object.keys(userDetails).map((field) => {
    if (userDetails[`${field}`] === "") {
      valid = false;
      validateErrors[`${field}`] = `please enter ${field}`;
    }
  });

  if (/^[a-bA-Z ]+$/.test(name)) {
    validateErrors.name =
      "please enter a valid name (no special symbols or digits allowed )";
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

  return { valid, validateErrors };
};
