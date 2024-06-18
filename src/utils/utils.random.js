export const generateRandomCode = () => {
  let code = '';
  for (let i = 0; i < 8; i++) {
    let randomAscii = Math.floor(Math.random() * (122 - 48 + 1)) + 48;
    while (
      (randomAscii >= 60 && randomAscii <= 64) ||
      (randomAscii >= 91 && randomAscii <= 96)
    ) {
      randomAscii = Math.floor(Math.random() * (122 - 48 + 1)) + 48;
    }
    code += String.fromCharCode(randomAscii);
  }
  return code;
};
