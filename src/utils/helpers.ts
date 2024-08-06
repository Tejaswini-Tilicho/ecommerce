export const validateEmail = (email: any) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password: any) => {
  if (!(password.length >= 8 && password.length <= 15)) {
    return false;
  }
  if (password.indexOf(" ") !== -1) {
    return false;
  }
  let count = 0;
  for (let i = 0; i <= 9; i++) {
    if (password.indexOf(i) !== -1) {
      count = 1;
    }
  }
  if (count === 0) {
    return false;
  }
  let specialArray = [
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "_",
    "+",
    "-",
    "=",
    "{",
    "}",
    "[",
    "]",
    ":",
    '"',
    ";",
    "'",
    "|",
    "\\",
    "<",
    ">",
    ",",
    ".",
    "/",
    "`",
    "~",
  ];
  let charCount = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password[i];
    if (specialArray.includes(char)) {
      charCount += 1;
    }
  }
  if (charCount === 0) {
    return false;
  }

  count = 0;
  for (let i = 65; i <= 90; i++) {
    if (password.indexOf(String.fromCharCode(i)) !== -1) {
      count = 1;
    }
  }
  if (count === 0) {
    return false;
  }
  count = 0;
  for (let i = 97; i <= 122; i++) {
    if (password.indexOf(String.fromCharCode(i)) !== -1) {
      count = 1;
    }
  }
  if (count === 0) {
    return false;
  }
  return true;
};

export const validateText = (
  text: string,
  minLength: number,
  maxLength: number
) => {
  return text.length >= minLength && text.length <= maxLength;
};

export const validateNumber = (
  number: number,
  minLength: number,
  maxLength: number
) => {
  const length = number.toString().length;
  return length >= minLength && length <= maxLength;
};

export const calculateTotalAmount = (products: any[]) => {
  let amount = 0;

  products?.forEach((product) => {
    const totalPrice = product?.price * product?.quantity;
    amount += totalPrice;
  });

  return amount;
};
