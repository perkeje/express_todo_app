class User {
  constructor(id, email, pass,confirmed) {
    this.id = id;
    this.email = email;
    this.pass = pass;
    this.confirmed = confirmed
  }
}

module.exports = User;
