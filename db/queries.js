import pool from "./pool.js";

// Some useless messy queries here
class Queries {
  constructor() {}

  // --------INSERT queries-------

  async addUser(values, next) {
    try {
      await pool.query(
        "INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)",
        [values.firstName, values.lastName, values.userName, values.password]
      );
    } catch (err) {
      return next(err);
    }
  }
  async addMessage(values, next) {
    try {
      await pool.query(
        "INSERT INTO messages (title, text, timestamp, user_id) VALUES ($1, $2, $3, $4)",
        [values.title, values.text, values.timestamp, values.user_id]
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
      const { rows } = await pool.query(
        "SELECT message_id, title, text, to_char(timestamp, 'MON-DD-YYYY') as timestamp, username FROM messages INNER JOIN users ON messages.user_id = users.user_id"
      );
      return rows;
    } catch (err) {
      return next(err);
    }
  }

  // --------UPDATE queries-------

  async updateMemberShip(value, userId, next) {
    try {
      await pool.query(
        "UPDATE users SET membership_status = ($1) WHERE user_id = ($2)",
        [value, userId]
      );
    } catch (err) {
      next(err);
    }
  }

  // --------UPDATE queries-------

  async deleteMessage(messageId, next) {
    try {
      await pool.query("DELETE FROM messages WHERE message_id = ($1)", [
        messageId,
      ]);
    } catch (err) {
      next(err);
    }
  }
}

const queries = new Queries();
export default queries;
