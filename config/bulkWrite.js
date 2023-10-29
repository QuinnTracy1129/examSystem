const bulkWrite = (req, res, Entity, success, action = "updateOne") => {
  let options = [];

  for (const item of req.body) {
    options.push({
      [action]: {
        filter: { _id: item._id },
        update: { $set: { ...item } },
      },
    });
  }

  Entity.bulkWrite(options)
    .then(() => {
      res.json({
        success,
        payload: req.body,
      });
    })
    .catch(error => res.status(400).json({ error: error.message }));
};

module.exports = bulkWrite;
