import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { options } from "../services/classification-options";

import { Input } from "../components";
import { Modal } from "../components/modal/index";
import momentDate from "../helper/MomentDateSchemaType";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faPaperclip,
  faTrash,
  faEdit,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState, RefundsModel } from "../models";
import apiGaia from "../services/apiGaia";
import * as Yup from "yup";

import {savePdf} from '../helper/pdfMaker'

import { formatNumber } from "../helper/formatNumber";
import * as moment from "moment";
import { removeExpense, loadRequest } from "../store/ducks/expenses/actions";
import { updateRefund, refundsRequest } from "../store/ducks/refunds/actions";
import { useForm } from "../hooks";
import Refunds from "./Refunds";
import { updateExpense } from "../store/ducks/expenses/actions";
import ModalUpdateExpense from "./ModalUpdateExpense";
import ModalAddExpense from "./ModalAddExpense";
import { shape } from "prop-types";
interface OwnProps {
  refund: any;
  visible: boolean;
  notAbleEdit: boolean;
  close(): void;
}

const UpdateRefund: React.FC<OwnProps> = ({
  refund,
  notAbleEdit,
  close
}: OwnProps) => {
  const dispatch = useDispatch();
  const [users, setUsers]: any = useState([]);
  const [ModalDeleteRefund, setDeleteModal] = useState(false);
  const [AddExpenseModal, setAddExpenseModal] = useState(false);
  const [UpdateExpense, setUpdate] = useState(false);

  const [item, setItem] = useState();
  const [id, setId] = useState("");
  const user = useSelector((state: ApplicationState) => state.account.data);
  const refundTrigger = useSelector(
    (state: ApplicationState) => state.expenses.data
  );
  // const [teste, setTeste] = useState(refund.refunds);
  const [array, setArray] = useState(refund.refunds);

  const getUsers = async () => {
    const { data } = await apiGaia.get(
      `users?code=SOq3etX/J9NefaAb8b8i79ZZu/rS5u9X9cppK5sY84K2JiZxtULCvw==`
    );
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (item) {
      let aux: any = [];
      refund.refunds.map((refundId: any) => {
        let a = refundTrigger.find(item2 => item2._id == refundId._id);
        aux.push(a);
        setArray(aux);
      });
    }
  }, [refundTrigger]);

  const refundSchema = Yup.object().shape({
    title: Yup.string().required(),
    personInCharge: Yup.string().required(),
    datePayment: momentDate.format("DD/MM/YYYY")
  });

  const [initialState, setInitialState] = useState<RefundsModel>({
    ...refund,
    datePayment: moment.default(refund.datePayment).format("DD/MM/YYYY")
  });

  const { handleChange, handleSubmit, errors, values } = useForm(
    initialState,
    refundSchema
  );
console.log(refund)
  const [refundsDeletes, SetRefundsDeletes]: any = useState([]);
  const [refundsAdd, SetRefundsAdd]: any = useState([]);

  const handleSave = async () => {
    if (refundsDeletes.length > 0) {
      refundsDeletes.map((item: any) => {
        item.status = "Em aberto";
        dispatch(updateExpense(item));
      });
    }
    if (refundsAdd.length > 0) {
      refundsAdd.map((item: any) => {
        item.status = "Reembolso solicitado";
        dispatch(updateExpense(item));
      });
    }
    if (values.datePayment) {
      let auxDate = moment.default(values.datePayment, "DD/MM/YYYY");
      values.datePayment = moment.utc(auxDate).format();
    }
    const data = {
      _id: values._id,
      title: values.title,
      personInCharge:
        typeof values.personInCharge == "string"
          ? JSON.parse(values.personInCharge)
          : values.personInCharge,
      owner: values.owner,
      refunds: values.refunds,
      datePayment: values.datePayment
    };

    dispatch(updateRefund(data as RefundsModel));
    close();
  };

  const openDeleteModal = (id: string) => {
    setDeleteModal(true);
    setId(id);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  const openUpdateExpense = (item: any) => {
    setUpdate(true);
    setItem(item);
  };

  const closeUpdateExpense = () => {
    setUpdate(false);
  };

  const addExpenseModal = () => {
    setAddExpenseModal(true);
  };

  const closeAddExpenseModal = () => {
    setAddExpenseModal(false);
  };

  const handleDeleteExpense = () => {
    let aux = refundsDeletes;
    let index = array.findIndex((item: any) => id === item._id);
    aux.push(array[index]);
    SetRefundsDeletes(aux);
    array.splice(index, 1);
    setArray(array);
    setInitialState({ ...refund, refunds: array });
    closeDeleteModal();
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
            <Button
              onClick={() => handleDeleteExpense()}
              className="btn btn-success"
            >
              Sim, cancelar
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const addExpenseArray = async (arrayAdd: any) => {
    arrayAdd.map((item: any) => {
      let arrayAddtoUpdate = arrayAdd;
      let auxArray = array;
      auxArray.push(item);
      setArray(auxArray);
      SetRefundsAdd(arrayAddtoUpdate);
    });
  };

  return (
    <>
      <form className="form-new-expense">
        <div className="col-12">
          <div className="row">
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="input-date">Data de solicitação</label>
                <Input
                  type="text"
                  defaultValue={moment
                    .default(initialState.createdAt)
                    .format("DD/MM/YYYY")}
                  className="form-input"
                  disabled
                  style={{ cursor: "not-allowed" }}
                  id="input-date"
                />
              </div>
            </div>

            <div className="col-6">
              <div className="form-group">
                <label htmlFor="input-title">Título</label>
                <Input
                  type="text"
                  name="title"
                  onChange={handleChange}
                  disabled={notAbleEdit}
                  defaultValue={initialState.title}
                  className="form-input"
                  id="input-title"
                />
                {errors.title && (
                  <span className="text-validation">
                    É necessário inserir um título válido
                  </span>
                )}
              </div>
            </div>
            {notAbleEdit === true ? (
              <div className="col-3">
                <div className="form-group">
                  <label htmlFor="input-date">Data agendada do reembolso</label>
                  <Input
                    type="text"
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
                    name="datePayment"
                    disabled
                    onChange={handleChange}
                    style={{ cursor: "not-allowed" }}
                    defaultValue={initialState.datePayment}
                    className="form-input"
                    id="input-date"
                  />
                </div>
              </div>
            ) : null}
          </div>

          <div className="row">
            {notAbleEdit === false ? (
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="select-responsible">
                    Selecione o responsável:
                  </label>
                  <select
                    name="personInCharge"
                    className="form-select"
                    id="select-responsible"
                    disabled={notAbleEdit}
                    onChange={handleChange}
                  >
                    <option selected disabled>
                      Selecione o responsável
                    </option>
                    {users.map((item: any) => (
                      <option key={item._id} value={JSON.stringify(item)}>
                        {/* {console.log(item)} */}
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {errors.personInCharge && (
                    <span className="text-validation">
                      É necessário selecionar um responsável
                    </span>
                  )}
                </div>{" "}
              </div>
            ) : (
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="input-owner">Responsável</label>
                  <Input
                    type="text"
                    defaultValue={initialState.personInCharge.name}
                    className="form-input"
                    style={{ cursor: "not-allowed" }}
                    disabled
                    id="input-owner"
                  />
                </div>
              </div>
            )}

            <div className="col-6">
              <div className="form-group">
                <label htmlFor="input-owner">Solicitante</label>
                <Input
                  type="text"
                  defaultValue={initialState.owner.name}
                  className="form-input"
                  style={{ cursor: "not-allowed" }}
                  disabled
                  id="input-owner"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <label htmlFor="input-payment">Informaçãoes de Pagamento</label>
                <Input
                  type="text"
                  defaultValue={initialState.title}
                  className="form-input"
                  style={{ cursor: "not-allowed" }}
                  disabled
                  id="input-payment"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-9 header-table-expenses">
              <button className="btn btn-new-expense" onClick={(e:any) => savePdf(e, refund)}>Imprimir Reembolso</button>
              <h3>Despesas</h3>
              {notAbleEdit === false && (
                <span
                  className="btn btn-new-expense"
                  style={{ cursor: "pointer" }}
                  onClick={() => addExpenseModal()}
                >
                  Adicionar Despesa
                </span>
              )}
            </div>
          </div>

          <table className="table table-striped">
            <thead>
              <tr>
                <th>Data</th>
                <th>Classificação</th>
                <th>Valor</th>
                {notAbleEdit === false ? (
                  <>
                    <th>Editar</th>
                    <th>Excluir</th>
                  </>
                ) : (
                  <th>Anexo</th>
                )}
              </tr>
            </thead>
            <tbody>
              {array &&
                array.map((item: any, index: any) => (
                  <tr key={index}>
                    <td className="text-center">
                      {moment.default(item.date).format("DD/MM/YYYY")}
                    </td>
                    <td className="text-center">{item.classification}</td>
                    <td className="text-center">
                      R$ {formatNumber(item.value)}
                    </td>

                    {initialState.status == "pendente aprovação" ? (
                      <>
                        <td className="text-center">
                          <span onClick={() => openUpdateExpense(item)}>
                            <FontAwesomeIcon
                              icon={faEdit}
                              style={{ cursor: "pointer" }}
                            />
                          </span>
                        </td>
                        <td className="text-center">
                          <span onClick={() => openDeleteModal(item._id)}>
                            <FontAwesomeIcon
                              icon={faTrash}
                              style={{ cursor: "pointer" }}
                            />
                          </span>
                        </td>
                      </>
                    ) : (
                      <td className="text-center">
                        {item.file && (
                          <a href={item.file} target="_blank">
                            <FontAwesomeIcon icon={faPaperclip} />
                          </a>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>

          <div className="form-footer-buttons">
            <button className="btn " onClick={() => close()}>
              <FontAwesomeIcon
                icon={faArrowLeft}
                style={{ cursor: "pointer" }}
              />
              Voltar
            </button>
            {notAbleEdit === false && (
              <Button
                onClick={handleSubmit(handleSave)}
                className="btn btn-success"
              >
                Salvar
              </Button>
            )}
          </div>
        </div>
      </form>
      <div>
        {UpdateExpense && (
          <ModalUpdateExpense
            visible={UpdateExpense}
            despesa={item}
            close={() => closeUpdateExpense()}
          />
        )}
      </div>
      <div>
        {AddExpenseModal && (
          <ModalAddExpense
            visible={AddExpenseModal}
            addFunction={addExpenseArray}
            dataToCompare={array}
            owner={initialState.owner._id}
            close={() => closeAddExpenseModal()}
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
  );
};

export default UpdateRefund;
