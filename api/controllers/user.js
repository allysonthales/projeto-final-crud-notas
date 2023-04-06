import { db } from "../db.js";

const calculaMedia = (req) => {
  return (Number(req.av1) * 4 + Number(req.av2) * 5 + Number(req.av3) * 6) / 15;
};

const defineSituacao = (media) => {
  if (media >= 7) {
    return "Aprovado";
  }
  return "Reprovado";
};

export const getUsers = (_, res) => {
  const q = "SELECT * FROM disciplina";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addUser = (req, res) => {
  const q =
    "INSERT INTO disciplina(`matricula`, `av1`, `av2`, `av3`, `media`, `situacao`) VALUES(?)";

  let media = calculaMedia(req.body);
  let situacao = defineSituacao(media);
  const values = [
    req.body.matricula,
    req.body.av1,
    req.body.av2,
    req.body.av3,
    media.toFixed(2),
    situacao,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Usuário criado com sucesso");
  });
};

export const updateUser = (req, res) => {
  const q =
    "UPDATE disciplina SET `matricula` = ?, `av1` = ?, `av2` = ?, `av3` = ?, `media` = ?, `situacao` = ? WHERE `id` = ?";
  let media = calculaMedia(req.body);
  let situacao = defineSituacao(media);
  const values = [
    req.body.matricula,
    req.body.av1,
    req.body.av2,
    req.body.av3,
    media.toFixed(2),
    situacao,
  ];

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
