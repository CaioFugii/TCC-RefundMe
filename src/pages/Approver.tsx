import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState, RefundsModel } from "../models";
import { Button, Input } from "semantic-ui-react";

import { uploadFile } from "../services/uploadFile";

import * as moment from "moment";

import { ExpensesModel } from "../models/Expenses";

import ModalExpenses from "./ModalExpenses";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faPaperclip,
  faTrash
} from "@fortawesome/free-solid-svg-icons";

import { Modal } from "../components/modal";
import { useExpenses } from "../hooks";
import {
  refundsRequest,
  refundsAllRequest
} from "../store/ducks/refunds/actions";
import { formatNumber } from "../helper/formatNumber";
import ModalApprover from "./ModalApprover";
import { getRefunds } from "../store/ducks/refunds/sagas";
import { removeRefund } from "../store/ducks/expenses/actions";
import UpdateRefund from "./UpdateRefund";

const Approver: React.FC = (props: any) => {
  const [modalExpenses, setModal] = useState(false);
  const [disable, setDisable] = useState(true);
  const [ModalDeleteRefund, setDeleteRefundModal] = useState(false);
  const [modalUpdateRefund, setUpdateModal] = useState(false);
  const [id, setId] = useState("");
  const [array, setArray]: any = useState([]);
  const [refundItem, setRefund] = useState();
  // let array:any[] = []
  const dispatch = useDispatch();
  const { data: refunds } = useSelector(
    (state: ApplicationState) => state.refunds
  );

  useEffect(() => {
    dispatch(refundsAllRequest());
  }, []);

  const user = useSelector((state: ApplicationState) => state.account.data);

  //@ts-ignore
  const arrayAux = refunds.filter(item => item.personInCharge._id === user.id || item.personInCharge._id === user._id);
  const forApproval = arrayAux.filter(item => item.status !== 'pagamento agendado' && item.status !== 'pago' && item.status !== 'cancelado')

  let aux: number = 0;

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setDisable(true);
    setArray([]);
  };

  const checkBadge = (status: any) => {
    switch (status) {
      case "aprovado":
        return "badge bg-success";
      case "reprovado":
        return "badge bg-danger";
      case "pendente aprovação":
        return "badge bg-warning";
      case "cancelado":
        return "badge bg-default";
    }
  };

  const reducerRefunds = (arrayRefunds: any) => {
    let arrayAux: any = [0];
    arrayRefunds.filter((item: any) => {
      if (item.value >= 0) {
        arrayAux.push(item.value);
      }
      aux = arrayAux.reduce(reducer);
      aux.toFixed(2);
    });
    return <td className="text-center">R$ {formatNumber(aux)}</td>;
  };
  const reducer = (valorTotal: number, valor: number) => valorTotal + valor;

  const pushOrPopItem = async (item: any, value: boolean) => {
    item.checked = value;
    await setArray(forApproval.filter(item => item.checked == true));
  };

  const openDeleteModal = (id: any) => {
    setDeleteRefundModal(true);
    setId(id);
  };

  const closeDeleteModal = () => {
    setDeleteRefundModal(false);
  };

  const openUpdate = (item: any) => {
    setRefund(item);
    setUpdateModal(true);
  };

  const closeUpdate = () => {
    setUpdateModal(false);
    dispatch(refundsRequest());
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

  const handleDelete = () => {
    dispatch(removeRefund(id));
    closeDeleteModal();
  };
  return (
    <>
      {modalUpdateRefund ? (
        <UpdateRefund
          refund={refundItem}
          notAbleEdit={false}
          visible={modalUpdateRefund}
          close={() => closeUpdate()}
        />
      ) : (
        <>
          <Button
            className="btn btn-create-new"
            disabled={array.length > 0 ? false : true}
            onClick={() => openModal()}
          >
            <FontAwesomeIcon icon={faEdit} />
            Aprovar
          </Button>
          <div className="create-expenses-or-refunds col-12">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th> </th>
                  <th className="text-left">Data</th>
                  <th>Titulo</th>
                  <th>Usuário</th>
                  <th className="text-center">Status</th>
                  <th>Valor Total</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {forApproval.map((item: RefundsModel, index) => (
                  <tr key={index}>
                    {item.status === "pendente aprovação" && (
                      <td className="text-center">
                        <Input
                          onClick={(e: any) =>
                            pushOrPopItem(item, e.target.checked)
                          }
                          type="checkbox"
                        />
                      </td>
                    )}
                    {item.status !== "pendente aprovação" && (
                      <td className="text-center"></td>
                    )}
                    <td className="text-left">
                      {moment.default(item.createdAt).format("DD/MM/YYYY")}
                    </td>
                    <td className="text-center">{item.title}</td>
                    <td className="text-center">{item.owner.name}</td>
                    <td className="text-center">
                      <span className={checkBadge(item.status)}>
                        {item.status}
                      </span>
                    </td>
                    {reducerRefunds(item.refunds)}
                    {item.status === "pendente aprovação" && (
                      <>
                        <button onClick={() => openUpdate(item)}>
                          <td className="text-left">
                            <FontAwesomeIcon
                              icon={faEdit}
                              style={{ cursor: "pointer" }}
                            />
                          </td>
                        </button>
                        <button onClick={() => openDeleteModal(item._id)}>
                          <td className="text-left">
                            <FontAwesomeIcon
                              icon={faTrash}
                              style={{ cursor: "pointer" }}
                            />
                          </td>
                        </button>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            {modalExpenses && (
              <ModalApprover
                visible={modalExpenses}
                data={array}
                close={() => closeModal()}
              />
            )}
          </div>
          <div>
            {ModalDeleteRefund ? (
              <Modal
                renderFooter={renderFooterDeleteModal}
                className="modal-depositar"
                title="Cancelar reembolso"
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
      )}
    </>
  );
};

export default Approver;
