const INVALID_CPFS = [
  "00000000000",
  "11111111111",
  "22222222222",
  "33333333333",
  "44444444444",
  "55555555555",
  "66666666666",
  "77777777777",
  "88888888888",
  "99999999999",
];

export const validateCpf = (cpf: string): boolean => {
  let sum;
  let rest;
  sum = 0;

  if (INVALID_CPFS.includes(cpf)) return false;

  for (let i = 1; i <= 9; i++) sum += Number(cpf.substring(i - 1, i)) * (11 - i);
  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== Number(cpf.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) sum += Number(cpf.substring(i - 1, i)) * (12 - i);
  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== Number(cpf.substring(10, 11))) return false;
  return true;
};

export const normalizeCpf = (cpf: string): string => {
  return cpf.replace(/[^\d]/g, "");
};

export const normalizePhone = (phone: string): string => {
  return phone.replace(/[^\d]/g, "");
};
