import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import { options } from "../services/classification-options";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import momentDate from "../helper/MomentDateSchemaType";
import { Modal, Input } from "../components";
import { ExpensesModel } from "../models/Expenses";
import { uploadFile } from "../services/uploadFile";
import * as Yup from "yup";
import * as moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import { updateExpense } from "../store/ducks/expenses/actions";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../models";
import { formatNumber } from "../helper/formatNumber";
import { useForm } from "../hooks";
import { refundsRequest } from "../store/ducks/refunds/actions";

interface OwnProps {
  visible: boolean;
  despesa: any;
  close(): void;
}

const ModalUpdateExpense: React.FC<OwnProps> = ({
  visible,
  close,
  despesa
}: any) => {
  const dispatch = useDispatch();

  const expense = { ...despesa };

  const user = useSelector((state: ApplicationState) => state.account.data);

  const [disable, setDisable] = useState(false);

  const expenseSchema = Yup.object().shape({
    classification: Yup.string().required(),
    date: momentDate.format("DD/MM/YYYY").required(),
    file: Yup.string(),
    value: Yup.string().required()
  });

  const [initialState, setInitialState] = useState<ExpensesModel>({
    owner: {
      //@ts-ignore
      _id: user.id || user._id,
      name: user.name,
      email: user.email
    },
    ...expense,
    date: moment.default(expense.date).format("DD/MM/YYYY")
    // date: moment.utc(expense.date)
  });

  const { handleChange, handleSubmit, errors, values } = useForm(
    initialState,
    expenseSchema
  );

  const handleSave = async () => {
    setDisable(true);
    let auxDate = moment.default(values.date, "DD/MM/YYYY");
    values.date = moment.utc(auxDate).format();
    await uploadFile(initialState);
    dispatch(refundsRequest());
    dispatch(updateExpense(values as ExpensesModel));
    // close();
  };

  const inputFiles = (files: FileList) => {
    setInitialState({ ...initialState, file: files[0] });
  };

  const numberMask = createNumberMask({
    prefix: "R$",
    suffix: "",
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: ".",
    allowDecimal: true,
    decimalSymbol: ",",
    decimalLimit: 2
  });
  // console.log(object);

  const renderFooter = () => (
    <div className="modal-footer text-center">
      <div className="col-group">
        <div className="col-6 text-left">
          <Button onClick={close} disabled={disable} className="btn btn-danger">
            <FontAwesomeIcon icon={faTimes} size="lg" className="icon-left" />
            Cancelar
          </Button>
        </div>

        <div className="col-6 text-right">
          <Button
            onClick={handleSubmit(handleSave)}
            className="btn btn-success"
            disabled={disable}
          >
            <FontAwesomeIcon icon={faPlus} size="lg" className="icon-left" />
            Editar
          </Button>
        </div>
      </div>
    </div>
  );

  return visible ? (
    <Modal
      renderFooter={renderFooter}
      className="modal-depositar"
      title="Editar Despesa"
      close={close}
    >
      <form onSubmit={handleSubmit(handleSave)} className="form-new-expense">
        <div className="col-12">
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="input-date">Data:</label>
              <Input
                className="form-input"
                defaultValue={initialState.date}
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
                <span className="text-validation">Coloque uma data válida</span>
              )}
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="select-classification">classificação:</label>
              <select
                onChange={handleChange}
                name="classification"
                defaultValue={initialState.classification}
                id="select-classification"
                className="form-select"
              >
                <option value="" disabled>
                  Selecione a classificação
                </option>
                {options.map((item: any, index) => (
                  <option key={index}>{item.name}</option>
                ))}
              </select>
              {errors.classification && (
                <span className="text-validation">
                  Selecione uma classificação
                </span>
              )}
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="input-value">Valor: </label>
              <Input
                onChange={handleChange}
                type="input"
                mask={numberMask}
                defaultValue={`R$ ${formatNumber(initialState.value)}`}
                placeholder="R$ 0,00"
                className="form-input"
                id="input-value"
                name="value"
              />
              {errors.value && (
                <span className="text-validation">
                  É necessário inserir um valor válido
                </span>
              )}
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="input-receipt">Comprovante:</label>
              <a
                href={initialState.file}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Ver arquivo</span>
              </a>
            </div>
            <input
              type="file"
              className="custom-inputfile"
              data-multiple-caption="{count} files selected"
              onChange={(e: any) => {
                inputFiles(e.target.files);
              }}
            />
          </div>
        </div>
      </form>
    </Modal>
  ) : null;
};

export default ModalUpdateExpense;
