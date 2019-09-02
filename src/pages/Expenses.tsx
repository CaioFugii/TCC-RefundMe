import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../models";
import { Button, Input } from "semantic-ui-react";
import { Modal } from "../components/modal";

import * as moment from "moment";

import { ExpensesModel } from "../models/Expenses";

import ModalExpenses from "./ModalExpenses";

import ModalUpdateExpense from "./ModalUpdateExpense";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faPaperclip,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { loadRequest } from "../store/ducks/expenses/actions";
import { formatNumber } from "../helper/formatNumber";
import { removeExpense } from "../store/ducks/expenses/actions";
import ModalRefunds from "./ModalRefunds";
import { toggleLoader } from "../store/ducks/app/actions";

const Expenses: React.FC = (props: any) => {
  const [modalExpenses, setModalExpenses] = useState(false);
  const [modalRefunds, setModalRefunds] = useState(false);
  const [array, setArray]: any = useState([]);
  const [ModalDeleteExpense, setDeleteModal] = useState(false);
  const [modalUpdateExpense, setUpdateModal] = useState(false);
  const [disable, setDisable] = useState(true);
  const [id, setId] = useState("");
  const [item, setItem] = useState();
  const dispatch = useDispatch();
  const { data: expense } = useSelector(
    (state: ApplicationState) => state.expenses
  );

  console.log(expense);
  const expenses = expense.filter(
    item =>
      item.status === "Em aberto" || item.status === "Reembolso solicitado"
  );

  console.log(expenses);

  useEffect(() => {
    dispatch(loadRequest());
  }, []);

  const openExpensesModal = () => {
    setModalExpenses(true);
  };

  const closeExpensesModal = () => {
    setModalExpenses(false);
  };

  const openRefundsModal = () => {
    setModalRefunds(true);
  };

  const closeRefundsModal = () => {
    setModalRefunds(false);
    setDisable(true);
  };

  const openUpdateModal = (item: any) => {
    const data = item.date.substring(0, 10);
    item.date = data;
    setItem(item);
    setUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setUpdateModal(false);
    setItem({});
    dispatch(loadRequest());
  };

  const openDeleteModal = (id: string) => {
    setDeleteModal(true);
    setId(id);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  const checkBadge = (status: any) => {
    switch (status) {
      case "Reembolso solicitado":
        return "badge bg-default";
      case "Em aberto":
        return "badge bg-info";
    }
  };

  const handleDelete = () => {
    dispatch(removeExpense(id));
    closeDeleteModal();
  };

  const refundsArray = async (item: any, checked: boolean) => {
    let id = item._id;
    let auxArray = array;

    if (checked === true) {
      auxArray.push(item._id);
      setArray(auxArray);
      setDisable(false);
    } else {
      let index = auxArray.findIndex((item2: any) => id == item2);
      auxArray.splice(index, 1);
      setArray(auxArray);
      array.length == 0 ? setDisable(true) : setDisable(false);
    }
    // console.log(array)
  };

  const renderFooterDeleteModal = () => {
    return (
      <div className="modal-footer text-center">
        <div className="col-group">
          <div className="col-6 text-left">
            <Button
              onClick={() => closeDeleteModal()}
              className="btn btn-danger"
            >
              Cancelar
            </Button>
          </div>

          <div className="col-6 text-right">
            <Button onClick={() => handleDelete()} className="btn btn-success">
              Sim, cancelar
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="expenses-or-refunds-buttons">
        <Button
          // className="btn btn-create-new"
          className="btn"
          onClick={() => openExpensesModal()}
        >
          <FontAwesomeIcon icon={faEdit} />
          Criar nova despesa
        </Button>
        <Button
          // className="btn btn-create-new"
          className="btn"
          disabled={disable}
          onClick={() => openRefundsModal()}
        >
          <FontAwesomeIcon icon={faEdit} />
          Solicitar Reembolso
        </Button>
      </div>
      <div className="create-expenses-or-refunds col-12">
        <table className="table table-striped">
          <thead>
            <tr>
              <th> </th>
              <th>Data</th>
              <th>Classificação</th>
              <th>Usuário</th>
              <th>Status</th>
              <th>Valor</th>
              <th>Editar</th>
              <th>Excluir</th>
              <th>Anexo</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((item: ExpensesModel, index) => (
              <tr key={index}>
                <td className="text-center">
                  {item.status === "Em aberto" && (
                    <input
                      onChange={(e: any) =>
                        refundsArray(item, e.target.checked)
                      }
                      type="checkbox"
                    />
                  )}
                </td>
                <td className="text-center">
                  {moment.default(item.date).format("DD/MM/YYYY")}
                </td>
                <td className="text-center">{item.classification}</td>
                <td className="text-center">{item.owner.name}</td>
                <td className="text-center">
                  <span className={checkBadge(item.status)}>{item.status}</span>
                </td>
                <td className="text-center">R$ {formatNumber(item.value)}</td>

                <td className="text-center">
                  {item.status === "Em aberto" && (
                  <button onClick={() => openUpdateModal(item)}>
                    <FontAwesomeIcon
                      icon={faEdit}
                      style={{ cursor: "pointer" }}
                    />
                  </button>
                  )}
                </td>
                <td className="text-center">
                  {item.status === "Em aberto" && (
                  <button onClick={() => openDeleteModal(item._id)}>
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ cursor: "pointer" }}
                    />
                  </button>
                  )}
                </td>
                
                <td className="text-center">
                  {item.file && (
                  <a href={item.file} target="_blank">
                    <FontAwesomeIcon icon={faPaperclip} />
                  </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        {modalExpenses && (
          <ModalExpenses
            visible={modalExpenses}
            close={() => closeExpensesModal()}
          />
        )}
      </div>
      <div>
        {modalRefunds && (
          <ModalRefunds
            visible={modalRefunds}
            data={array}
            close={() => closeRefundsModal()}
          />
        )}
      </div>
      <div>
        {modalUpdateExpense && (
          <ModalUpdateExpense
            visible={modalUpdateExpense}
            despesa={item}
            close={() => closeUpdateModal()}
          />
        )}
      </div>
      <div>
        {ModalDeleteExpense ? (
          <Modal
            renderFooter={renderFooterDeleteModal}
            className="modal-depositar"
            title="Cancelar despesa"
            close={() => closeDeleteModal()}
          >
            <form className="form-new-expense">
              <div className="col-12">
                <h1>Deseja prosseguir com o cancelamento?</h1>
              </div>
            </form>
          </Modal>
        ) : null}
      </div>
    </>
  );
};

export default Expenses;
