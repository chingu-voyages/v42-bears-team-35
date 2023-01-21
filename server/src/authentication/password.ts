import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

async function hashPassword(password: string): Promise<string> {
  const salt: string = await bcrypt.genSalt(SALT_ROUNDS);
  const hashedPassword: string = await bcrypt.hashSync(password, salt);
  return hashedPassword;
}

async function validatePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export { hashPassword, validatePassword };
