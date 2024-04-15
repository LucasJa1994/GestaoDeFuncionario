import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useFetchDocument } from "../../hooks/useFetchDocument"
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Box,
} from "@mui/material"

const VisualizaCad = () => {
  const { id } = useParams() // Captura o ID da URL
  const { document: cad } = useFetchDocument("cads", id) // Obtém o documento com base no ID

  // State para armazenar os dados
  const [contatoData, setContatoData] = useState(null)
  const [funcionarioData, setFuncionarioData] = useState(null)

  // Atualiza os estados quando o documento é carregado
  useEffect(() => {
    if (cad) {
      setContatoData(cad.contato)
      setFuncionarioData(cad.funcionario)
    }
  }, [cad])

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Box>
        <Typography variant="h5" gutterBottom align="center">
          Dados de Contato
        </Typography>
        {contatoData && (
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar alt="Foto de Perfil" src={contatoData.fotoPerfil} />
              </ListItemAvatar>
              <ListItemText primary={`Nome: ${contatoData.nome}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Endereço: ${contatoData.endereco}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Telefone: ${contatoData.telefone}`} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`Data de Aniversário: ${contatoData.dataAniversario}`}
              />
            </ListItem>
            {/* Adicione outros campos, se necessário */}
          </List>
        )}
        <Typography variant="h5" gutterBottom align="center">
          Dados do Funcionário
        </Typography>
        {funcionarioData && (
          <List>
            <ListItem>
              <ListItemText primary={`Cargo: ${funcionarioData.cargo}`} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`Data de Admissão: ${funcionarioData.dataAdmissao}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Setor: ${funcionarioData.setor}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Salário: ${funcionarioData.salario}`} />
            </ListItem>
            {/* Adicione outros campos, se necessário */}
          </List>
        )}
      </Box>
    </Box>
  )
}

export default VisualizaCad
