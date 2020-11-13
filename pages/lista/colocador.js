import Link from "next/link";
import Layout from "../../components/layout";
import { useState, useEffect } from "react";
import { Button, Input, Text } from "@chakra-ui/core";
import Lista from "../../components/list";
import { Box, Flex } from "@chakra-ui/core";
import { saveAs } from "file-saver";

import * as crypto from "crypto";

export default function Colocador() {
  const [input, setInput] = useState("");
  const [dadosMostrados, setDadosMostrados] = useState([]);
  let fileReader;

  const handleFileRead = (e) => {
    const content = fileReader.result;
    setDadosMostrados(JSON.parse(content));
    localStorage.setItem("dados", content);
  };

  const readFile = async (file) => {
    fileReader = new FileReader();
    setInput(file.name);
    console.log(file);

    fileReader.onloadend = handleFileRead;

    fileReader.readAsText(file);

    console.log(fileReader.result);
  };

  const SaveFile = async () => {
    var blob = new Blob([JSON.stringify(dadosMostrados)], { type: "text/plain;charset=utf-8" });
    console.log(blob);
    saveAs(blob, "export.json");
  };

  const Pesquisar = async (e, link) => {
    const url = link || input;
    const hashUrl = crypto.createHash("sha256").update(url).digest("base64").toString();
    e.preventDefault();

    try {
      const res = await fetch("https://orcamentodor-api.vercel.app/api/link", {
        method: "get",
        headers: {
          url: url,
        },
      });

      const { nome, precoAvista, imagem } = await res.json();

      let dado = dadosMostrados.find((dado) => dado.id == hashUrl);
      let localStorageState;

      if (dado) {
        dado.consultas.push({
          id: new Date().getTime().toString(),
          preco: precoAvista,
          data: new Date().toDateString(),
        });

        localStorageState = [...dadosMostrados];
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
              data: new Date().toDateString(),
            },
          ],
        };

        localStorageState = [...dadosMostrados, dados];
      }
      setDadosMostrados(localStorageState);
      localStorage.setItem("dados", JSON.stringify(localStorageState));
    } catch (error) {
      console.log(error);
      alert("Sorry, something went wrong.");
    }
  };

  useEffect(() => {
    const dados = localStorage.getItem("dados");
    if (dados) {
      setDadosMostrados(JSON.parse(dados));
    }
  }, []);

  return (
    <>
      <Layout>
        <Text fontSize="lg">Dinheiro vai, dinheiro vem</Text>
      </Layout>
      <Box w="100%" p={4} color="black" align="center">
        <form>
          <Input w="40%" placeholder="Link" value={input} onChange={(e) => setInput(e.target.value)} />
          <Button colorScheme="teal" onClick={Pesquisar}>
            Button
          </Button>
        </form>
        <Box>
          <Button colorScheme="teal" onClick={SaveFile}>
            Exporte sua pesuisa aqui
          </Button>
        </Box>
        <Box>
          <Input w="40%" type="file" onChange={(e) => readFile(e.target.files[0])} />
        </Box>
      </Box>
      <Flex align="center">
        <Box w="100%" p={4} color="black">
          <Lista lista={dadosMostrados} pesquisar={Pesquisar} />
        </Box>
      </Flex>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </>
  );
}
