import {AgGridReact} from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";

interface IProps {
  rowData: any[];
}

const cols = [
  {field: "date"},
  {field: "source"},
  {field: "type"},
  {field: "content"}
];


export default function ListRenderer({rowData}: IProps) {
  return <AgGridReact rowData={rowData} columnDefs={cols} />;
}
