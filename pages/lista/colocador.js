import Link from 'next/link'
import Layout from '../../components/layout'
import { useState, useEffect } from 'react'
import { Button, Input, Text } from "@chakra-ui/core"
import Lista from "../../components/list"
import { Box } from "@chakra-ui/core"

import * as crypto from 'crypto'

export default function Colocador() {
    const [input, setInput] = useState('')
    const [dadosMostrados, setDadosMostrados] = useState([])

    const Pesquisar = async (e, link) => {
        const url = link || input
        const hashUrl = crypto.createHash('sha256').update(url).digest('base64').toString()
        e.preventDefault()

        try {
            const res = await fetch('https://orcamentodor-api.vercel.app/api/link', {
                method: 'get',
                headers: {
                    url: url
                }
            })

            const { nome, precoAvista, imagem } = await res.json()

            let dado = dadosMostrados.find(dado => dado.id == hashUrl)
            let localStorageState


            if (dado) {
                dado.consultas.push({
                    id: new Date().getTime().toString(),
                    preco: precoAvista,
                    data: (new Date()).toDateString()
                })

                localStorageState = [...dadosMostrados]
            } else {

                const dados = {
                    id: hashUrl,
                    url,
                    nomeProduto: nome,
                    img: imagem,
                    consultas: [
                        {
                            id: new Date().getTime().toString(),
                            preco: precoAvista,
                            data: (new Date()).toDateString()
                        }
                    ]
                }

                localStorageState = [...dadosMostrados, dados]
            }
            setDadosMostrados(localStorageState)
            localStorage.setItem('dados', JSON.stringify(localStorageState))

        } catch (error) {
            console.log(error)
            alert('Sorry, something went wrong.')
        }
    }

    useEffect(() => {
        const dados = localStorage.getItem('dados')
        if (dados) {
            setDadosMostrados(JSON.parse(dados))
        }
    }, [])

    return (
        <>
            <Layout>
                <Text fontSize="lg">Dinheiro vai, dinheiro vem</Text>
            </Layout>
            <Box w="100%" p={4} color="black" align="center">
                <form >
                    <Input
                        w="40%"
                        placeholder='Link'
                        value={input}
                        onChange={e => setInput(e.target.value)} />
                    <Button colorScheme="teal" onClick={Pesquisar} >Button</Button>
                </form>
            </Box>
            <Box w="100%" p={4} color="black" align="center">
                <Lista lista={dadosMostrados} pesquisar={Pesquisar} />
            </Box>
            <h2>
                <Link href="/">
                    <a>Back to home</a>
                </Link>
            </h2>
        </>


    )


}


