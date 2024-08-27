import pool from "./pool.js";

// Some useless messy queries here
class Queries {
  constructor() {}

  // --------INSERT queries-------

  async insertUser(values, next) {
    try {
      await pool.query(
        "INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)",
        [values.firstName, values.lastName, values.userName, values.password]
      );
    } catch (err) {
      return next(err);
    }
  }

  // --------SELECT queries-------

  async getUserByUsername(username, next) {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE username = ($1)",
        [username]
      );
      return rows;
    } catch (err) {
      return next(err);
    }
  }
  async getUserById(id, next) {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE user_id = ($1)",
        [id]
      );
      return rows;
    } catch (err) {
      return next(err);
    }
  }
  async getAllMessages(next) {
    try {
      const { rows } = await pool.query("SELECT * FROM messages");
      return rows;
    } catch (err) {
      return next(err);
    }
  }
}

const queries = new Queries();
export default queries;
