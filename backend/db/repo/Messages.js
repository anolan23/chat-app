const db = require('..');
class Messages {
  static async findOneById(id) {
    try {
      const { rows } = await db.query(
        `
        SELECT messages.*, users.name, users.photo
        FROM messages
        JOIN users ON users.id = messages.user_id
        WHERE id = $1

        `,
        [id]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async find() {
    try {
      const { rows } = await db.query(
        `
        SELECT messages.*, users.name, users.photo
        FROM messages
        JOIN users ON users.id = messages.user_id
        ORDER BY created_at 
        `,
        []
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async findByChannelId(id) {
    try {
      const { rows } = await db.query(
        `
        SELECT messages.*, users.name, users.photo
        FROM messages
        JOIN users ON users.id = messages.user_id
        WHERE channel_id = $1
        ORDER BY created_at
        `,
        [id]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async create(message) {
    try {
      const { rows } = await db.query(
        `
        WITH created_message AS (
          INSERT INTO messages (user_id, channel_id, body)
          VALUES ($1, $2, $3)
          RETURNING *
         )
         SELECT created_message.*, users.name, users.photo
         FROM created_message
         JOIN users ON users.id = created_message.user_id
        `,
        [message.user_id, message.channel_id, message.body]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async update(id, cols) {
    let query = ['UPDATE messages'];
    query.push('SET');

    // Create another array storing each set command
    // and assigning a number value for parameterized query
    let set = [];
    Object.keys(cols).forEach(function (key, i) {
      set.push(key + ' = ($' + (i + 2) + ')');
    });
    query.push(set.join(', '));

    // Add the WHERE statement to look up by id
    query.push('WHERE id = $1');
    query.push('RETURNING *');

    // Return a complete query string
    const builtQuery = query.join(' ');

    // Turn req.body into an array of values
    const colValues = Object.values(cols);

    try {
      const { rows } = await db.query(builtQuery, [id, ...colValues]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Messages;
