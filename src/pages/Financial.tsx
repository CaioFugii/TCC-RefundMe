import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState, RefundsModel } from "../models";
import { Button } from "semantic-ui-react";
import * as Yup from "yup";
import momentDate from "../helper/MomentDateSchemaType";

import * as moment from "moment";
import { Input } from "../components/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEye,
  faBan,
  faMoneyBillAlt
} from "@fortawesome/free-solid-svg-icons";

import { Modal } from "../components/modal";
import { refundsAllRequest } from "../store/ducks/refunds/actions";
import { formatNumber } from "../helper/formatNumber";
import UpdateRefund from "./UpdateRefund";
import { updateRefund } from "../store/ducks/refunds/actions";
import { useForm } from "../hooks";

interface DateForm {
  date: Date;
}

const Financial: React.FC = (props: any) => {
  const [modalScheduleFinancial, setScheduleModal] = useState(false);
  const [disable, setDisable] = useState(true);
  const [ModalCancelRefund, setCancelRefundModal] = useState(false);
  const [modalUpdateRefund, setUpdateModal] = useState(false);
  const [ModalPaidRefund, setPaidModal] = useState(false);
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

  const forPayment = refunds.filter(
    item =>
      item.status === "aprovado" ||
      item.status === "cancelado" ||
      item.status === "pagamento agendado"
  );

  let aux: number = 0;

  const initialDate = {
    date: ""
  };

  const dateSchema = Yup.object().shape({
    date: momentDate.format("DD/MM/YYYY").required()
  });

  const { handleChange, handleSubmit, errors, values } = useForm(
    initialDate,
    dateSchema
  );

  const openScheduleModal = () => {
    setScheduleModal(true);
  };

  const closeScheduleModal = () => {
    setScheduleModal(false);
    setDisable(true);
    setArray([]);
  };

  const checkBadge = (status: any) => {
    switch (status) {
      case "aprovado":
        return "badge bg-success";
      case "pagamento agendado":
        return "badge bg-warning";
      case "pago":
        return "badge bg-default";
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
    await setArray(forPayment.filter(item => item.checked === true));
  };

  const renderFooterCancelModal = () => {
    return (
      <div className="modal-footer text-center">
        <div className="col-group">
          <div className="col-6 text-left">
            <Button
              onClick={() => closeCancelRefund()}
              className="btn btn-danger"
            >
              Cancelar
            </Button>
          </div>

          <div className="col-6 text-right">
            <Button onClick={() => handleCancel()} className="btn btn-success">
              Sim, cancelar
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderFooterPaidModal = () => {
    return (
      <div className="modal-footer text-center">
        <div className="col-group">
          <div className="col-6 text-left">
            <Button onClick={() => closePaidModal()} className="btn btn-danger">
              Cancelar
            </Button>
          </div>

          <div className="col-6 text-right">
            <Button onClick={() => handlePaid()} className="btn btn-success">
              Sim, cancelar
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderFooterScheduleModal = () => {
    return (
      <div className="modal-footer text-center">
        <div className="col-group">
          <div className="col-6 text-left">
            <Button
              onClick={() => closeScheduleModal()}
              className="btn btn-danger"
            >
              Cancelar
            </Button>
          </div>

          <div className="col-6 text-right">
            <Button
              onClick={handleSubmit(saveDatePayment)}
              className="btn btn-success"
            >
              Agendar
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const handleCancel = () => {
    refundItem.status = "cancelado";
    dispatch(updateRefund(refundItem as RefundsModel));
    closeCancelRefund();
  };

  const handlePaid = () => {
    refundItem.status = "pago";
    dispatch(updateRefund(refundItem as RefundsModel));
    closePaidModal();
  };

  const saveDatePayment = (data: DateForm) => {
    array.map(async (item: any) => {
      item.datePayment = data.date;
      item.status = "pagamento agendado";
      await dispatch(updateRefund(item as RefundsModel));
    });
    setDisable(true);
    closeScheduleModal();
  };

  const openUpdate = (item: any) => {
    setRefund(item);
    setUpdateModal(true);
  };

  const closeUpdate = () => {
    setUpdateModal(false);
    dispatch(refundsAllRequest());
  };

  const openPaidModal = (item: any) => {
    setRefund(item);
    setPaidModal(true);
  };

  const closePaidModal = () => {
    setPaidModal(false);
    dispatch(refundsAllRequest());
  };

  const openCancelRefund = (item: any) => {
    setRefund(item);
    setCancelRefundModal(true);
  };

  const closeCancelRefund = () => {
    setCancelRefundModal(false);
    dispatch(refundsAllRequest());
  };

  return (
    <>
      {modalUpdateRefund ? (
        <UpdateRefund
          refund={refundItem}
          notAbleEdit={true}
          visible={modalUpdateRefund}
          close={() => closeUpdate()}
        />
      ) : (
        <>
          <Button
            className="btn btn-create-new"
            disabled={array.length > 0 ? false : true}
            onClick={() => openScheduleModal()}
          >
            <FontAwesomeIcon icon={faEdit} />
            Agendar pagamentos
          </Button>
          {/* <Button
            className="btn btn-create-new"
            disabled={array.length > 0 ? false : true}
            onClick={() => openScheduleModal()}
          > */}

          {/* </Button> */}
          <div className="create-expenses-or-refunds col-12">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th> </th>
                  <th className="text-left">Data</th>
                  <th>Pagamento agendado</th>
                  <th>Titulo</th>
                  <th>Solicitante</th>
                  <th>Responsável</th>
                  <th className="text-center">Status</th>
                  <th>Valor Total</th>
                </tr>
              </thead>
              <tbody>
                {forPayment.map((item: RefundsModel, index) => (
                  <tr key={index}>
                    {item.status === "aprovado" && (
                      <td className="text-center">
                        <Input
                          onClick={(e: any) =>
                            pushOrPopItem(item, e.target.checked)
                          }
                          type="checkbox"
                        />
                      </td>
                    )}
                    {item.status !== "aprovado" && (
                      <td className="text-center"></td>
                    )}
                    <td className="text-left">
                      {moment.default(item.createdAt).format("DD/MM/YYYY")}
                    </td>
                    {item.datePayment ? (
                      <td className="text-center">
                        {moment.default(item.datePayment).format("DD/MM/YYYY")}
                      </td>
                    ) : (
                      <td className="text-center">-----</td>
                    )}
                    <td className="text-center">{item.title}</td>
                    <td className="text-center">{item.owner.name}</td>
                    <td className="text-center">{item.personInCharge.name}</td>
                    <td className="text-center">
                      <span className={checkBadge(item.status)}>
                        {item.status}
                      </span>
                    </td>
                    {reducerRefunds(item.refunds)}
                    <button onClick={() => openUpdate(item)}>
                      <td className="text-left">
                        <FontAwesomeIcon
                          icon={faEye}
                          style={{ cursor: "pointer" }}
                        />
                      </td>
                    </button>
                    {item.status === "aprovado" && (
                      <button onClick={() => openCancelRefund(item)}>
                        <td className="text-left">
                          <FontAwesomeIcon
                            icon={faBan}
                            style={{ cursor: "pointer" }}
                          />
                        </td>
                      </button>
                    )}
                    {item.status === "pagamento agendado" && (
                      <button onClick={() => openPaidModal(item)}>
                        <td className="text-left">
                          <FontAwesomeIcon
                            icon={faMoneyBillAlt}
                            style={{ cursor: "pointer" }}
                          />
                        </td>
                      </button>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            {ModalCancelRefund ? (
              <Modal
                renderFooter={renderFooterCancelModal}
                title="Cancelar reembolso"
                close={() => closeCancelRefund()}
              >
                <form className="form-new-expense">
                  <div className="col-12">
                    <h1>
                      Deseja prosseguir com o cancelamento, uma vez cancelado o
                      reembolso não poderá ser refeito?
                    </h1>
                  </div>
                </form>
              </Modal>
            ) : null}
          </div>
          <div>
            {ModalPaidRefund ? (
              <Modal
                renderFooter={renderFooterPaidModal}
                title="Marcar como pago reembolso"
                close={() => closePaidModal()}
              >
                <form className="form-new-expense">
                  <div className="col-12">
                    <h1>Deseja marcar reembolso como pago?</h1>
                  </div>
                </form>
              </Modal>
            ) : null}
          </div>
          <div>
            {modalScheduleFinancial ? (
              <Modal
                renderFooter={renderFooterScheduleModal}
                title="Agendar pagamentos"
                close={() => closeCancelRefund()}
              >
                {/* <div className="col-12"> */}
                <div className="col-group">
                  <label htmlFor="input-date" className="text-left">
                    Data:
                  </label>
                  <Input
                    className="text-right"
                    defaultValue={initialDate.date}
                    mask={[
                      /\d/,
                      /\d/,
                      "/",
                      /\d/,
                      /\d/,
                      "/",
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/
                    ]}
                    name="date"
                    onChange={handleChange}
                    placeholder="__ /__ / ____"
                    type="text"
                    id="input-date"
                    style={{ fontSize: 16 }}
                  />
                  {errors.date && (
                    <span className="text-validation">
                      Coloque uma data válida
                    </span>
                  )}
                </div>
              </Modal>
            ) : null}
          </div>
        </>
      )}
    </>
  );
};

export default Financial;
