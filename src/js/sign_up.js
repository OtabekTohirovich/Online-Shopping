export function SignUp(name, lastName, email, password, phone, address) {
  try {
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.address = address;
    this.phone = phone;
  } catch (err) {
    console.log(err);
  }
}
