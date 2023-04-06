import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();
  const verificarValorMinimo = (e) => {
    let { value } = e.target;
    var valorMaximo = 10;

    if (value > valorMaximo) {
      value = "";
      alert("O valor máximo permitido é " + valorMaximo);
    }
  };

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.matricula.value = onEdit.matricula;
      user.av1.value = onEdit.av1;
      user.av2.value = onEdit.av2;
      user.av3.value = onEdit.av3;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.matricula.value ||
      !user.av1.value ||
      !user.av2.value ||
      !user.av3.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          matricula: user.matricula.value,
          av1: user.av1.value,
          av2: user.av2.value,
          av3: user.av3.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          matricula: user.matricula.value,
          av1: user.av1.value,
          av2: user.av2.value,
          av3: user.av3.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    user.matricula.value = "";
    user.av1.value = "";
    user.av2.value = "";
    user.av3.value = "";

    setOnEdit(null);
    getUsers();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Matricula</Label>
        <Input name="matricula" />
      </InputArea>
      <InputArea>
        <Label>av1</Label>
        <Input onInput={(e) => verificarValorMinimo(e)} name="av1" />
      </InputArea>
      <InputArea>
        <Label>av2</Label>
        <Input onInput={(e) => verificarValorMinimo(e)} name="av2" />
      </InputArea>
      <InputArea>
        <Label>av3</Label>
        <Input onInput={(e) => verificarValorMinimo(e)} name="av3" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
