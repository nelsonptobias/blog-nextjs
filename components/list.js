import { List, Stat, StatNumber, Text, Image, ListItem, StatHelpText, Button, Flex, Box, StatGroup, Link, Badge, HStack } from "@chakra-ui/core";

export default function ListaProdutos({ lista, pesquisar }) {
  return (
    <List>
      {lista &&
        lista.map((produto) => (
          <ListItem key={produto.id}>
            <Box display="flex" flexDirection={{ lg: "row", md: "column" }}>
              <Box display="flex" flex={1} flexDirection="column" alignItems="center" border="solid 1px #000" borderRadius="lg">
                <Text fontWeight="semibold" fontSize="sm">
                  {produto.nomeProduto}
                </Text>
                <Image src={produto.img} alt="produto" />
                <Link href={produto.url} isExternal>
                  Link
                </Link>
                <Button colorScheme="blue" onClick={(e) => pesquisar(e, produto.url)}>
                  Button
                </Button>
              </Box>
              <Flex flex={4} flexDirection="column" border="solid 1px #000" borderRadius="lg">
                <Text fontWeight="semibold" fontSize="md" as="p" align="center">
                  Preco com desconto no boleto
                </Text>
                <Box bg="gray.300" alignItems="flex-start" display="flex" flex={1} flexDirection="column">
                  <StatGroup justifyContent="flex-start" flexDirection="column" height={{ lg: 380, md: "auto" }}>
                    {produto.consultas.map((consulta, index) => (
                      <Stat my="1" mx="1" align="center" bg="gray.200" borderWidth="1px" borderStyle="solid" key={consulta.id} borderRadius="lg" boxShadow="lg">
                        <StatNumber fontSize={20} px={2} as="h2">
                          {consulta.preco}
                        </StatNumber>
                        <Badge fontSize={10} variant="solid" rounded="full">
                          {consulta.data}
                        </Badge>
                      </Stat>
                    ))}
                  </StatGroup>
                </Box>
              </Flex>
            </Box>
          </ListItem>
        ))}
    </List>
  );
}
