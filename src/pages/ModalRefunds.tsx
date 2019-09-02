import React, { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import { options } from "../services/classification-options";

import { Modal, Input } from "../components";

import { RefundsModel } from "../models/Refunds";

import apiGaia from "../services/apiGaia";
import { useExpenses } from "../hooks";

import { postRefundRequest } from "../store/ducks/expenses/actions";
import * as Yup from "yup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import apiStark from "../services/apiStark";
import { useDispatch, useSelector } from "react-redux";
import { any } from "prop-types";
import { getUser } from "../services/auth";
import { getUserLogin } from "../store/selectors";
import { ApplicationState } from "../models";
import { AccountState } from "../store/ducks/account/types";
import { LoginState } from "../store/ducks/login/types";

interface OwnProps {
  visible: boolean;
  data: any;
  close(): void;
}

interface Users {
  _id: string;
  name: string;
  email: string;
}
const ModalRefunds: React.FC<OwnProps> = ({ visible, data, close }) => {
  const [users, setUsers]: any = useState([]);
  const dispatch = useDispatch();

  const getUsers = async () => {
    const { data } = await apiGaia.get(
      `users?code=SOq3etX/J9NefaAb8b8i79ZZu/rS5u9X9cppK5sY84K2JiZxtULCvw==`
    );
    setUsers(data);
  };

  const user = useSelector((state: ApplicationState) => state.account.data);

  const refunds: RefundsModel = {
    title: "",
    personInCharge: {
      _id: "",
      name: "",
      email: ""
    },     
    owner: {
      //@ts-ignore
      _id: user.id || user._id,
      name: user.name,
      email: user.email
    },
    refunds: []
  };

  useEffect(() => {
    getUsers();
  }, []);

  const renderFooter = () => (
    <div className="modal-footer text-center">
      <div className="col-group">
        <div className="col-6 text-left">
          <Button onClick={() => close()} className="btn btn-danger">
            <FontAwesomeIcon icon={faTimes} size="lg" className="icon-left" />
            Cancelar
          </Button>
        </div>
        <div className="col-6 text-right">
          <Button
            onClick={() => handleSubmit(data)}
            className="btn btn-success"
          >
            <FontAwesomeIcon icon={faPlus} size="lg" className="icon-left" />
            Criar
          </Button>
        </div>
      </div>
    </div>
  );

  const refundSchema = Yup.object().shape({
    title: Yup.string().required(),
    personInCharge: Yup.object().shape({
      _id: Yup.string().required(),
      name: Yup.string().required(),
      email: Yup.string().required()
    }),
    owner: Yup.object().shape({
      id: Yup.string().required(),
      name: Yup.string().required(),
      email: Yup.string().required()
    }),
    refunds: Yup.array().of(Yup.string().required())
  });

  const handleSubmit = async (data: any) => {
    refunds.refunds = data;
    await refundSchema.isValid(refunds).then((valid: any) => {
      dispatch(postRefundRequest(refunds));
      close();
    });
  };

  const handlePerson = (value: string) => {
    let user = JSON.parse(value);
    refunds.personInCharge._id = user._id;
    refunds.personInCharge.email = user.email;
    refunds.personInCharge.name = user.name;
  };

  const handleTitle = (value: string) => {
    refunds.title = value;
  };

  return visible ? (
    <Modal
      renderFooter={renderFooter}
      className="modal-depositar"
      title="Solicitar Reembolso"
      close={() => close()}
    >
      <form onSubmit={() => handleSubmit} className="form-new-expense">
        <div className="col-12">
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="input-name-refund">Título do reembolso:</label>
              <input
                type="text"
                placeholder={"Título do reembolso"}
                className="form-input"
                id="input-name-refund"
                onBlur={(e: any) => handleTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="select-responsible">
                Selecione o responsável:
              </label>
              <select
                name="responsavel"
                className="form-select"
                id="select-responsible"
                onBlur={(e: any) => handlePerson(e.target.value)}
              >
                <option selected disabled>
                  Selecione o responsável
                </option>
                {users.map((item: any) => (
                  <option key={item._id} value={JSON.stringify(item)}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  ) : null;
};

export default ModalRefunds;
