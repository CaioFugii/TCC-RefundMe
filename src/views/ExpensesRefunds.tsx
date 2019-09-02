import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "../models";

import Expenses from "../pages/Expenses";
import Refunds from "../pages/Refunds";

import { Button } from "semantic-ui-react";
import Approver from "../pages/Approver";
import Financial from '../pages/Financial';

const ExpensesRefunds: React.FC = (props: any) => {
  const { data } = useSelector((state: ApplicationState) => state.account);

  const trigger = data.roles;

  const [isActive, setActive] = useState("expenses");
  const [menu, setMenu] = useState([
    { id: "expenses", name: "Despesas", visible: true },
    { id: "refunds", name: "Reembolsos", visible: true },
    {
      id: "approveRefunds",
      name: "Aprovar reembolsos",
      role: "approve-refunds",
      visible: true
    },
    {
      id: "payRefunds",
      name: "Pagar reembolsos",
      role: "pay-refunds",
      visible: true
    }
  ]);

  useEffect(() => {
    setMenu(
      menu.map(item => ({
        ...item,
        visible: item.role ? data.roles.includes(item.role) : true
      }))
    );
  }, [trigger]);

  const selectChoice = () => {
    switch (isActive) {
      case "expenses":
        return <Expenses />;
      case "refunds":
        return <Refunds />;
      case "approveRefunds":
        return <Approver />;
      case "payRefunds":
        return <Financial />;
      default:
        return null;
    }
  };

  return (
    <div className="refund">
      <div className="wrapper">
        <div className="breadcrumb">
          <div className="col-group">
            <div className="col-6">
              <h2 className="breadcrumb-title">Despesas e Reembolsos</h2>
            </div>
            <div className="col-6 text-right"></div>
          </div>
        </div>

        <div className="page-wrapper">
          <div className="expenses-or-refunds">
            <div className="expenses-or-refunds-content col-12">
              <div className="expenses-or-refunds-tabs col-12">
                {menu
                  .filter(item => item.visible)
                  .map(item => (
                    <Button
                      onClick={() => setActive(item.id)}
                      className={`item-tab ${
                        isActive === item.id ? "is-active" : ""
                      }`}
                    >
                      {item.name}
                    </Button>
                  ))}
              </div>
              
                {selectChoice()}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpensesRefunds;
