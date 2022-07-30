export const findUserByEmail = async (db, email) => {
    return db
        .collection('users')
        .findOne({email})
        .then((user) => user || null);
}