import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM disciplina";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addUser = (req, res) => {
  const q =
    "INSERT INTO disciplina(`matricula`, `av1`, `av2`, `av3`) VALUES(?)";
  const values = [req.body.matricula, req.body.av1, req.body.av2, req.body.av3];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Usuário criado com sucesso");
  });
};

export const updateUser = (req, res) => {
  const q =
    "UPDATE disciplina SET `matricula` = ?, `av1` = ?, `av2` = ?, `av3` = ? WHERE `id` = ?";

  const values = [req.body.matricula, req.body.av1, req.body.av2, req.body.av3];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário atualizado com sucesso");
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM disciplina WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário deletado com sucesso");
  });
};
