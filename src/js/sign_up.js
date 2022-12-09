export function SignUp(
  firstName,
  lastName,
  email,
  password,
  phone,
) {
  try {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  } catch (err) {
    console.log(err);
  }
}
