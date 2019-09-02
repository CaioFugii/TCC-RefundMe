import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import { options } from "../services/classification-options";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import { date } from "../helper/yupTransformers";

import { Modal, Input } from "../components";
import { ExpensesModel } from "../models/Expenses";
import momentDate from "../helper/MomentDateSchemaType";

import { uploadFile } from "../services/uploadFile";
import * as Yup from "yup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { postExpenseRequest } from "../store/ducks/expenses/actions";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../models";
import { useForm } from "../hooks";

interface OwnProps {
  visible: boolean;
  close(): void;
}

interface ExpenseForm {
  date: Date;
  classification: string;
  value: number;
  file: FileList;
}

const ModalExpenses: React.FC<OwnProps> = ({ visible, close }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: ApplicationState) => state.account.data);
  const [file, setFile] = useState();

  const [disable, setDisable] = useState(false);

  const initialExpense = {
    date: "",
    classification: "",
    value: "",
    file: ""
  };

  const expenseSchema = Yup.object().shape({
    classification: Yup.string().required(),
    date: momentDate.format("DD/MM/YYYY").required(),
    file: Yup.string(),
    value: Yup.string().required()
  });

  const { handleChange, handleSubmit, errors, values } = useForm(
    initialExpense,
    expenseSchema
  );

  const renderFooter = () => (
    <div className="modal-footer text-center">
      <div className="col-group">
        <div className="col-6 text-left">
          <Button
            onClick={() => close()}
            disabled={disable}
            className="btn btn-danger"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" className="icon-left" />
            Cancelar
          </Button>
        </div>

        <div className="col-6 text-right">
          <Button
            onClick={handleSubmit(saveExpense)}
            className="btn btn-success"
            type="submit"
            disabled={disable}
          >
            <FontAwesomeIcon icon={faPlus} size="lg" className="icon-left" />
            Criar
          </Button>
        </div>
      </div>
    </div>
  );

  const handleFile = (e: any) => {
    handleChange(e);
    setFile(e.target.files[0]);
  };

  const saveExpense = async (data: ExpenseForm) => {
    const urlImage = await uploadFile(file);

    const expense: ExpensesModel = {
      owner: {
        //@ts-ignore
        _id: user.id || user._id,
        name: user.name,
        email: user.email
      },
      date: data.date,
      classification: data.classification,
      file: urlImage,
      value: data.value
    };
    setDisable(true);
    dispatch(postExpenseRequest(expense));
    close();
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

  return visible ? (
    <Modal
      renderFooter={renderFooter}
      className="modal-depositar"
      title="Nova Despesa"
      close={() => close()}
    >
      <form className="form-new-expense">
        <div className="col-12">
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="input-date">Data:</label>
              <Input
                className="form-input"
                defaultValue={initialExpense.date}
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
                id="select-classification"
                className="form-select"
                defaultValue="Selecione a classificação"
              >
                <option selected disabled>
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
                name="value"
                mask={numberMask}
                placeholder="R$ 0,00"
                className="form-input"
                id="input-value"
              />
              {errors.value && (
                <span className="text-validation">Coloque um valor válido</span>
              )}
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="input-receipt">Comprovante:</label>
              <Input
                type="file"
                className="custom-inputfile"
                name="file"
                data-multiple-caption="{count} files selected"
                onChange={handleFile}
              />
              {errors.file && (
                <span className="text-validation" style={{ bottom: -52 }}>
                  Selecione um arquivo
                </span>
              )}
            </div>
          </div>
        </div>
      </form>
    </Modal>
  ) : null;
};

export default ModalExpenses;
