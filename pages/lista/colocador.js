import Link from 'next/link'
import utilStyles from '../../styles/utils.module.css'
import Layout from '../../components/layout'
import { useState } from 'react'
import { Button, Input, Stat, StatLabel, StatNumber, Text } from "@chakra-ui/core"
import { Image } from "@chakra-ui/core"


export default function Colocador() {
    const [input, setInput] = useState('')
    const [dadosMostrados, setdadosMostrados] = useState([])


    const Pesquisar = async (e) => {
        e.preventDefault()
        try {
            console.log(input)
            const res = await fetch('https://orcamentodor-api.vercel.app/api/link', {
                method: 'get',
                headers: {
                    url: input
                }
            })

            if (res.status === 200) {
                const { nome, precoAvista, imagem } = await res.json()
                if (precoAvista) {
                    setdadosMostrados(dadosMostrados => [...dadosMostrados, [nome, imagem, precoAvista,]])
                }
                alert('Deu 200 filhao')
            } else {
                alert('nao deu 200')
            }

        } catch (error) {
            console.log(error)
            alert('Sorry, something went wrong.')
        }
    }


    return (
        <Layout>
            <Text fontSize="lg">Dinheiro vai, dinheiro vem</Text>
            <div>
                <form >
                    <Input
                        placeholder='Link'
                        value={input}
                        onChange={e => setInput(e.target.value)} />
                    <br />
                    <Button colorScheme="teal" onClick={Pesquisar} >Button</Button>
                </form>
            </div>
            <div>
                {dadosMostrados.map(valor =>
                    <div>
                        <Text fontSize="md">{valor[0]}</Text>
                        <Image src={valor[1]} alt="produto" />

                        <Stat>
                            <StatLabel>Preco com desconto no boleto</StatLabel>
                            <StatNumber>{valor[2]}</StatNumber>
                        </Stat>
                    </div>
                )}
            </div>

            <h2>

                <Link href="/">
                    <a>Back to home</a>
                </Link>
            </h2>
        </Layout >


    )


}


