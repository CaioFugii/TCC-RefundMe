import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ApplicationState, RefundsModel } from "../models";

import { Button } from "semantic-ui-react";

import ModalRefunds from "./ModalRefunds";
import * as moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { formatNumber } from "../helper/formatNumber";
import { Modal } from "../components";
import { removeRefund } from "../store/ducks/expenses/actions";
import { refundsRequest } from "../store/ducks/refunds/actions";
import UpdateRefund from "./UpdateRefund";

const Refunds: React.FC = (props: any) => {
  const [modalUpdateRefund, setUpdateModal] = useState(false);
  const [ModalDeleteRefund, setDeleteRefundModal] = useState(false);
  const [refundItem, setRefund] = useState()

  const [id, setId] = useState("");

  const { data: refunds } = useSelector(
    (state: ApplicationState) => state.refunds
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refundsRequest());
  }, []);
  
  let aux: number = 0;

  const openDeleteModal = (id: any) => {
    setDeleteRefundModal(true);
    setId(id);
  };

  const closeDeleteModal = () => {
    setDeleteRefundModal(false);
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

  const checkBadge = (status: any) => {
    switch (status) {
      case "aprovado":
        return "badge bg-success";
      case "reprovado":
        return "badge bg-danger";
      case "pendente aprovação":
        return "badge bg-warning";
      case "pagamento agendado":
        return "badge bg-info";
      case "cancelado":
        return "badge bg-default";
      case "pago":
        return "badge bg-primary";
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

  const openUpdate = (item:any) => {
    setRefund(item);
    setUpdateModal(true)
  }

  const closeUpdate = () => {
    setUpdateModal(false)
    dispatch(refundsRequest());
  }
  return (
    <>
    {modalUpdateRefund ? <UpdateRefund refund={refundItem} visible={modalUpdateRefund} notAbleEdit={false} close={() =>closeUpdate()} /> :  <div className="create-expenses-or-refunds col-12">
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="text-left">Data</th>
              <th>Título</th>
              <th>Usuário</th>
              <th>Responsável</th>
              <th className="text-center">Status</th>
              <th>Valor Total</th>
              <th>Editar</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {refunds.map((item: RefundsModel, index) => (
              <tr key={index}>
                <td className="text-left">
                  {moment.default(item.createdAt).format("DD/MM/YYYY")}
                </td>
                <td className="text-center">{item.title}</td>
                <td className="text-center">{item.owner.name}</td>
                <td className="text-center">{item.personInCharge.name}</td>
                <td className="text-center">
                  <span className={checkBadge(item.status)}>{item.status}</span>
                </td>
                {reducerRefunds(item.refunds)}

                <td className="text-center">
                  <button onClick={() => openUpdate(item)}>
                    {item.status === "pendente aprovação" && (
                      <FontAwesomeIcon
                        icon={faEdit}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </button>
                </td>

                <td className="text-center">
                  <button onClick={() => openDeleteModal(item._id)}>
                    {item.status === "pendente aprovação" && (
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </button>
                </td>
                

                {/* <td className="text-center">R$ {formatNumber(item.value)}</td> */}

                {/* <button onClick={() => openDeleteModal(item._id)}>
                      <td className="text-left">
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{ cursor: "pointer" }}
                        />
                      </td>
                    </button>  */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
}
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
  );
};

export default Refunds;
