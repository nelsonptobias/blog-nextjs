import { List, Stat, StatNumber, Text, Image, ListItem, StatHelpText, Button, Flex, Box, SimpleGrid } from "@chakra-ui/core"

export default function ListaProdutos({ lista, pesquisar }) {

    return (
        <List>
            {lista && lista.map(produto =>
                <ListItem key={produto.id} >
                    <Text fontSize="md">{produto.nomeProduto}</Text>
                    <Text fontSize="md" align='center' >Preco com desconto no boleto</Text>
                    <Flex align="flex-end">
                        <Image src={produto.img} alt="produto" />

                        <Button colorScheme="blue" onClick={(e) => pesquisar(e, produto.url)}  >Button</Button>

                        <Box display='flex' flexDirection='column' flexWrap='wrap' height='400px' >
                            {produto.consultas.map((consulta, index) =>

                                <Stat diplay='flex' borderWidth="1px" borderStyle='solid' key={consulta.id} >
                                    <StatNumber >{consulta.preco}</StatNumber>
                                    <StatHelpText>{consulta.data}</StatHelpText>
                                </Stat>

                            )}
                        </Box>
                    </Flex>
                </ListItem>
            )
            }
        </List >

    )
}