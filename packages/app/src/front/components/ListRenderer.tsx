import { AgGridReact } from "ag-grid-react";
import { FsdtServerMessage } from "@fullstack-devtool/core";

import "ag-grid-community/styles/ag-grid.css";
import { useState } from "react";
import { ColDef } from "ag-grid-community";

interface IProps {
  rowData: FsdtServerMessage[];
}

const cols: ColDef<FsdtServerMessage> = [
  { headerName: "Source", field: "source" },
  { headerName: "Content", field: "content" },
  { headerName: "Time", field: "timestamp" },
  { headerName: "Level", field: "level" },
  { headerName: "Tag", field: "tag" },
  { headerName: "Message", field: "message" },
];

export default function ListRenderer({ rowData }: IProps) {
  const [columnDefs, set] = useState(cols);
  return <AgGridReact rowData={rowData} columnDefs={columnDefs} />;
}
