import React from "react";
import { Button } from "semantic-ui-react";
import { Modal } from "../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState, RefundsModel } from "../models";
import { postApprovedRequest } from "../store/ducks/expenses/actions";
import { refundsRequest } from "../store/ducks/refunds/actions";


interface OwnProps {
  visible: boolean;
  data: RefundsModel;
  close(): void;
}

const ModalApprover: React.FC<OwnProps> = ({ visible, data, close }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: ApplicationState) => state.account.data);

  const refundsForApproval: any = {
    refunds: [],
    approved: false
  };

  const renderFooter = () => (
    <div className="modal-footer text-center">
      <div className="col-group">
        <div className="col-6 text-left">
          <Button onClick={() => close()} className="btn btn-danger">
            <FontAwesomeIcon icon={faTimes} size="lg" className="icon-left" />
            Cancelar
          </Button>
        </div>
        <div className="col-3 text-right">
          <Button
            onClick={() => handleRepproved(data)}
            className="btn btn-warning"
          >
            Reprovar
          </Button>
        </div>
        <div className="col-3 text-right">
          <Button
            onClick={() => handleApproved(data)}
            className="btn btn-success"
          >
            Aprovar
          </Button>
        </div>
      </div>
    </div>
  );

  const handleRepproved = async (data: any) => {
    refundsForApproval.refunds.push(data) ;
    refundsForApproval.approved = false;
      await dispatch(postApprovedRequest(refundsForApproval));
      await dispatch(refundsRequest())
      close();

  };

  const handleApproved = async (data: any) => {
    refundsForApproval.refunds.push(data);
    refundsForApproval.approved = true;
        await dispatch(postApprovedRequest(refundsForApproval));
        await dispatch(refundsRequest())
        close();
  };

  return visible ? (
    <Modal
      renderFooter={renderFooter}
      className="modal-depositar"
      title="Aprovar Reembolso"
      close={() => close()}
    >
      <form className="form-new-expense">
        <div className="col-12">
          <h1>Deseja prosseguir com a aprovação?</h1>
        </div>
      </form>
    </Modal>
  ) : null;
};
export default ModalApprover;
