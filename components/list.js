import { List, Stat, StatLabel, StatNumber, Text, Image, ListItem, StatHelpText, Button } from "@chakra-ui/core"

export default function ListaProdutos({ lista, pesquisar }) {

    return (
        <List>
            {lista && lista.map(produto =>
                <ListItem key={produto.id} >
                    <Text fontSize="md">{produto.nomeProduto}</Text>
                    <Image src={produto.img} alt="produto" />
                    <Button colorScheme="blue" onClick={(e) => pesquisar(e, produto.url)} >Button</Button>
                    {produto.consultas.map(consulta =>
                        < Stat key={consulta.id} >
                            <StatLabel>Preco com desconto no boleto</StatLabel>
                            <StatNumber>{consulta.preco}</StatNumber>
                            <StatHelpText>{consulta.data}</StatHelpText>
                        </Stat>
                    )}
                </ListItem>
            )
            }
        </List >

    )
}