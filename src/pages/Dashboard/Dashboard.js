import React from "react"
import styles from "./Dashboard.module.css"
import { Link } from "react-router-dom"
import { useAuthValue } from "../../context/AuthContext"
import { useFetchDocuments } from "../../hooks/useFetchDocuments"
import { useDeleteDocument } from "../../hooks/useDeleteDocument"
import GeneratePDF from "../../components/GeneratePDF"

const Dashboard = () => {
  const { user } = useAuthValue()
  const uid = user.uid
  const { documents: cads } = useFetchDocuments("cads", null, uid)
  const { deleteDocument } = useDeleteDocument("cads")

  const handleGeneratePDF = (formData) => {
    // Aqui você pode adicionar a lógica para gerar o PDF com os dados recebidos
    console.log("Gerar PDF com os dados:", formData)
  }

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Gerencie os seus Cadastros</p>
      {cads && cads.length === 0 ? (
        <div className={styles.not_found}>
          <p>Não foram encontrados cadastros</p>
          <Link to="/cads/CadFuncionario" className="btn">
            Cadastrar
          </Link>
        </div>
      ) : (
        <div className={styles.post_header}>
          <span>Cadastros</span>
          <span>Ações</span>
        </div>
      )}

      {cads &&
        cads.map((cad) => {
          console.log(cad) // Adicionando um console.log para imprimir os dados do cadastro
          const {
            contatoNome,
            contatoSexo,
            contatoEndereco,
            contatoTelefone,
            contatoDataAniversario,
            funcionarioCargo,
            funcionarioDataAdmissao,
            funcionarioSetor,
            funcionarioSalario,
          } = cad // Desestruturação dos dados do cadastro

          return (
            <div className={styles.post_row} key={cad.id}>
              <p>{cad.contato.nome}</p>
              <div className={styles.actions}>
                <Link
                  to={`/cads/VisualizarCad/${cad.id}`}
                  className="btn btn-outline"
                >
                  Ver
                </Link>
                <Link
                  to={`/cads/Promocao/${cad.id}`}
                  className="btn btn-outline"
                >
                  Promover
                </Link>
                <Link
                  to={`/cads/EditeCadFuncionario/${cad.id}`}
                  className="btn btn-outline"
                >
                  Editar contato
                </Link>

                <GeneratePDF
                  formData={{
                    contatoNome: cad.contato.nome,
                    contatoSexo: cad.contato.sexo,
                    contatoEndereco: cad.contato.endereco,
                    contatoTelefone: cad.contato.telefone,
                    contatoDataAniversario: cad.contato.dataAniversario,
                    funcionarioCargo: cad.funcionario.cargo,
                    funcionarioDataAdmissao: cad.funcionario.dataAdmissao,
                    funcionarioSetor: cad.funcionario.setor,
                    funcionarioSalario: cad.funcionario.salario,
                  }}
                />
                {/* Adicionando botão para gerar PDF */}
                <button
                  onClick={() => deleteDocument(cad.id)}
                  className="btn btn-outline btn-danger"
                >
                  Demitir
                </button>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default Dashboard
