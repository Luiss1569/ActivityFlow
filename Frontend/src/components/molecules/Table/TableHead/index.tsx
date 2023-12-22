import { Thead, Tr, Th } from "@chakra-ui/react";
import React, { memo } from "react";

export interface TableHeadProps {
  columns: { key: string; label: string, isNumeric?: boolean }[];
}

const TableHeadC: React.FC<TableHeadProps> = ({ columns }) => {
  return (
    <Thead>
      <Tr>
        {columns.map((column) => (
          <Th key={`Column-${column.key}`}>{column.label}</Th>
        ))}
      </Tr>
    </Thead>
  );
};

const TableHead = memo(TableHeadC);
export default TableHead;
