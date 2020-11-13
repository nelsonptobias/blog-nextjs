import { List, Stat, StatNumber, Text, Image, ListItem, StatHelpText, Button, Flex, Box, StatGroup, Link } from "@chakra-ui/core";

export default function ListaProdutos({ lista, pesquisar }) {
  return (
    <List>
      {lista &&
        lista.map((produto) => (
          <ListItem key={produto.id}>
            <Box display="flex" flexDirection={{ lg: "row", md: "column" }}>
              <Box display="flex" flex={1} flexDirection="column" alignItems="center" border="solid 1px #000">
                <Text fontSize="md">{produto.nomeProduto}</Text>
                <Image src={produto.img} alt="produto" />
                <Link href={produto.url} isExternal>
                  Link
                </Link>
                <Button colorScheme="blue" onClick={(e) => pesquisar(e, produto.url)}>
                  Button
                </Button>
              </Box>
              <Flex flex={2} flexDirection="column" border="solid 1px #000">
                <Text fontSize="md" as="p" align="center">
                  Preco com desconto no boleto
                </Text>
                <Box alignItems="flex-start" display="flex" flex={1} flexDirection="column" border="solid 1px #000">
                  <StatGroup justifyContent="flex-start" flexDirection="column" height={{ lg: 450, md: "auto" }}>
                    {produto.consultas.map((consulta, index) => (
                      <Stat borderWidth="1px" borderStyle="solid" key={consulta.id} height={150}>
                        <StatNumber>{consulta.preco}</StatNumber>
                        <StatHelpText>{consulta.data}</StatHelpText>
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
