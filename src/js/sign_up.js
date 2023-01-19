export function SignUp(name, lastName, email, city, phone, address) {
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

export function OrderData(name, phone, address, city, zip, email) {
  try {
    this.name = name;
    this.phone = phone;
    this.address = address;
    this.city = city;
    this.zip = zip;
    this.email = email;
  } catch (err) {
    console.log(err);
  }
}

