module.exports = localDB => {
  const _checkUsers = async (req, res) => {
    res.send(localDB.users);
  };

  return _checkUsers;
};
