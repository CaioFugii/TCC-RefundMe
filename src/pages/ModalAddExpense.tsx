import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { Modal } from "../components";
import { ExpensesModel } from "../models/Expenses";
import * as moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../models";
import { formatNumber } from "../helper/formatNumber";
import { expenseAllRequest } from "../store/ducks/expenses/actions";

interface OwnProps {
  visible: boolean;
  addFunction(array: any): void;
  dataToCompare: any;
  owner:string;
  close(): void;
}

const ModalAddExpense: React.FC<OwnProps> = ({
  visible,
  addFunction,
  dataToCompare,
  owner,
  close
}: any) => {
  const [array, setArray]: any = useState([]);
  let auxArray: any = [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(expenseAllRequest());
  }, []);

  const { data: expense } = useSelector(
    (state: ApplicationState) => state.expenses
  );
  const dataFilter: any = dataToCompare.reduce(
    (prev: any, next: any) => prev.concat(next._id),
    []
  );
  expense.map((item: any) => {
    let has = dataFilter.includes(item._id);
    if (!has && item.status === "Em aberto" && owner === item.owner._id) {
      auxArray.push(item);
    }
  });

  const pushToArray = (item: any, checked: boolean) => {
    let id = item._id;
    let auxArray = array;

    if (checked === true) {
      auxArray.push(item);
      setArray(auxArray);
    } else {
      let index = auxArray.findIndex((item2: any) => id == item2._id);
      auxArray.splice(index, 1);
      setArray(auxArray);
    }
  };

  const handleSave = () => {
    if (array.length > 0) {
      addFunction(array);
    }
    close();
  };

  const renderFooter = () => (
    <div className="modal-footer text-center">
      <div className="col-group">
        <div className="col-6 text-left">
          <Button onClick={close} className="btn btn-danger">
            <FontAwesomeIcon icon={faTimes} size="lg" className="icon-left" />
            Cancelar
          </Button>
        </div>

        <div className="col-6 text-right">
          <Button onClick={() => handleSave()} className="btn btn-success">
            <FontAwesomeIcon icon={faPlus} size="lg" className="icon-left" />
            Adicionar
          </Button>
        </div>
      </div>
    </div>
  );

  return visible ? (
    <Modal renderFooter={renderFooter} title="Adicionar Despesa" close={close}>
      <form className="form-new-expense">
        <table className="table table-striped">
          <thead>
            <tr>
              <th> </th>
              <th>Data</th>
              <th>Classificação</th>
              <th>Usuário</th>
              <th>Valor</th>
              <th> </th>
              <th> </th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {auxArray.map((item: ExpensesModel, index: any) => (
              <tr key={index}>
                <td className="text-center">
                  <input
                    onChange={(e: any) => pushToArray(item, e.target.checked)}
                    type="checkbox"
                  />
                </td>
                <td className="text-center">
                  {moment.default(item.date).format("DD/MM/YYYY")}
                </td>
                <td className="text-center">{item.classification}</td>
                <td className="text-center">{item.owner.name}</td>
                <td className="text-center">R$ {formatNumber(item.value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </Modal>
  ) : null;
};

export default ModalAddExpense;
