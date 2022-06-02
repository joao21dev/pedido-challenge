import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Flex,
  Box,
} from "@chakra-ui/react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { GlobalFilter } from "../compnents/globalFilter";

export default function Home() {
  const [data, setData] = useState([]);

  const userData = useMemo(() => [...data], [data]);

  const fetchData = async () => {
    console.log(userData);

    const response = await axios
      .get("https://pp-api-desafio.herokuapp.com/agents")
      .catch((err) => console.log(err));

    if (response) {
      const data = response.data.items;

      console.log("Data da api em accounts: ", data);
      setData(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Nome Completo",
        accessor: "name",
      },
      {
        Header: "Departamento",
        accessor: "department",
      },
      {
        Header: "Cargo",
        accessor: "role",
        // isNumeric: true,
      },
      {
        Header: "Unidadde",
        accessor: "branch",
      },{
        Header: "Status",
        accessor: "status",
      }
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = useTable({ columns: columns, data: data }, useGlobalFilter, useSortBy);

  const firstPageRows = rows.slice(0, 10);

  const isEven = (idx) => idx % 2 === 0;

  return (
    <>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={state.globalFilter}
      />
      <Flex>
        <Box
          bg="white"
          borderRadius="15px"
          justifyContent="center"
          alignItems="center"
          m={4}
          w="150vw"
        >
          <Table {...getTableProps()}>
            <Thead>
              {headerGroups.map((headerGroup) => (
                <Tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <Th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " ▼"
                          : " ▲"
                        : ""}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {firstPageRows.map((row, idx) => {
                prepareRow(row);
                return (
                  <Tr {...row.getRowProps()} bg={isEven(idx) ? "#C1F2E0" : ""}>
                    {row.cells.map((cell, idx) => {
                      return (
                        <Td
                          // onClick={()=>  console.log(cell.value)}
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </>
  );
}
