export const create = (req, res) => {
  res.send({ message: "create handler" });
};

export const findAll = (req, res) => {
  res.send({ message: "findAll handler" });
};

export const findOne = (req, res) => {
  res.send({ message: `findOne handler ${req.params.id}` });
};

export const update = (req, res) => {
  res.send({ message: `update handler ${req.params.id}` });
};

export const remove = (req, res) => {
  res.send({ message: `delete handler ${req.params.id}` });
};

export const removeAll = (req, res) => {
  res.send({ message: "deleteAll handler" });
};
