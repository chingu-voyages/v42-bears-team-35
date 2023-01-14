// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function validateDate(dateString: string): boolean {
  const dateToCheck = new Date(dateString);
  if (dateToCheck.toString() === "Invalid Date") return false;
  return dateToCheck instanceof Date;
}
