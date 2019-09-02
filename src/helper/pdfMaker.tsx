import React from "react";
// import logo from './logo.svg';
// import './App.css';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import * as moment from "moment";
import { formatNumber } from "../helper/formatNumber";
import { Today } from "./today";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const savePdf = (e: any, refund: any) => {
  e.preventDefault();

  const body: any = [
    [
      { text: "Data de Solicitação", bold: true },
      { text: "Classificação", bold: true },
      { text: "Valor", bold: true }
    ]
  ];

  refund.refunds.map((item: any) => {
    const arr = [];
    arr.push(
      { text: moment.default(item.date).format("DD/MM/YYYY") },
      { text: item.classification },
      { text: `R$ ${formatNumber(item.value)}` }
    );
    body.push(arr);
  });
  let aux: number = 0;
  const reducer = (valorTotal: number, valor: number) => valorTotal + valor;

  const reducerRefunds = (arrayRefunds: any) => {
    let arrayAux: any = [0];
    arrayRefunds.filter((item: any) => {
      if (item.value >= 0) {
        arrayAux.push(item.value);
      }
      aux = arrayAux.reduce(reducer);
      aux.toFixed(2);
    });
    return formatNumber(aux);
  };

  const valorTOTAL = reducerRefunds(refund.refunds);
  const docDefinition = {
    content: [
      {
        columns: [
          { width: 70, style: "firstLine", text: moment.default(Today()).format("DD/MM/YYYY")},
          {
            alignment: "center",
            style: "firstLine",
            text: "Detalhes do reembolso - Stark"
          }
        ]
      },
      { text: "PEDIDO DE REEMBOLSO", style: "header" },
      {
        columns: [
          { text: "Nº: ", bold: true, width: 50 },
          { text: "Titulo do reembolso" }
        ]
      },
      {
        columns: [
          { text: "Data: ", bold: true, width: 50 },
          {
            text: moment.default(refund.createdAt).format("DD/MM/YYYY"),
            width: 120
          },
          { text: "Título: ", width: 50, bold: true },
          { text: refund.title }
        ]
      },
      {
        columns: [
          { text: "Responsável: ", bold: true, width: 90 },
          { text: refund.personInCharge.name, width: 180 },
          { text: "Solicitante: ", width: 90, bold: true },
          { text: refund.owner.name }
        ]
      },
      {
        text: "Informações de pagamento: ",
        bold: true,
        fontSize: 16,
        marginTop: 10
      },
      { text: refund.title },

      { text: "Despesas", marginTop: 30, marginLeft: 20, fontSize: 14 },
      {
        layout: "lightHorizontalLines",
        marginTop: 15,
        table: {
          headerRows: 1,
          widths: [120, "*", "*"],
          body: body
        }
      },

      {
        columns: [
          { text: "Valor Total: ", width: 335, bold: true },
          { text: `R$ ${valorTOTAL}`  }
        ]
      }
    ],
    styles: {
      firstLine: {
        fontSize: 10
      },
      header: {
        fontSize: 18,
        margin: 15,
        alignment: "center"
      }
    }
  };
  pdfMake.createPdf(docDefinition).download("Reembolso");
};
