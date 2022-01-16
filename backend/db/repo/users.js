const db = require('../../db');
class Users {
  static async findOne(id) {
    try {
      const { rows } = await db.query(
        `
        SELECT *
        FROM users
        WHERE id = $1
        `,
        [id]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async update(id, cols) {
    let query = ['UPDATE users'];
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

module.exports = Users;
