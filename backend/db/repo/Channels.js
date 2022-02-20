const db = require('..');
class Channels {
  static async findOneById(id) {
    try {
      const { rows } = await db.query(
        `
        SELECT *
        FROM channels
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
        SELECT *
        FROM channels
        ORDER BY name
        `,
        []
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async create(channel) {
    try {
      const { rows } = await db.query(
        `
        INSERT INTO channels (user_id, name, description)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        [channel.user_id, channel.name, channel.description]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async update(id, cols) {
    let query = ['UPDATE channels'];
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

module.exports = Channels;
