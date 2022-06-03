import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";

import {
  Flex,
  Box,
  Text,
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
  ChakraProvider,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

export function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 300);

  return (
    <Flex>
      <Box m={15} mt="5%">
        <Stack>
          {" "}
          <Flex w='908px' h='52px'>
            {" "}
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FiSearch color="gray.300" />}
              />
              <Input
                type="text"
                bg="white"
                borderRadius="15px"
                value={value || ""}
                onChange={(e) => {
                  setValue(e.target.value);
                  onChange(e.target.value);
                }}
                // placeholder={`${count} resultado...`}
                placeholder="Pesquisar por nome ou CPF"
              />
            </InputGroup>
          </Flex>
        </Stack>
      </Box>
    </Flex>
  );
}
