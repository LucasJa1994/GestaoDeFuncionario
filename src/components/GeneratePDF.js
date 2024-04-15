import React from "react"
import pdfMake from "pdfmake/build/pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts"

// Registrando as fontes necessárias
pdfMake.vfs = pdfFonts.pdfMake.vfs

const GeneratePDF = ({ formData }) => {
  const generatePDF = () => {
    const documentDefinition = {
      content: [
        {
          text: "Informações de Contato",
          style: "sectionHeader",
          margin: [0, 10],
          decoration: "underline",
        },
        {
          text: [
            { text: `Nome: `, bold: true },
            {
              text: `${formData.contatoNome}`,
              alignment: "center",
              style: "roundedText",
            },
          ],
          margin: [0, 5],
        },
        {
          text: [
            { text: `Sexo: `, bold: true },
            {
              text: `${formData.contatoSexo}`,
              alignment: "center",
              style: "roundedText",
            },
          ],
          margin: [0, 5],
        },
        {
          text: [
            { text: `Endereço: `, bold: true },
            {
              text: `${formData.contatoEndereco}`,
              alignment: "center",
              style: "roundedText",
            },
          ],
          margin: [0, 5],
        },
        {
          text: [
            { text: `Telefone: `, bold: true },
            {
              text: `${formData.contatoTelefone}`,
              alignment: "center",
              style: "roundedText",
            },
          ],
          margin: [0, 5],
        },
        {
          text: [
            { text: `Data de Aniversário: `, bold: true },
            {
              text: `${formData.contatoDataAniversario}`,
              alignment: "center",
              style: "roundedText",
            },
          ],
          margin: [0, 5],
        },
        {
          text: "Informações do Funcionário",
          style: "sectionHeader , roundedText",
          margin: [0, 10],
          decoration: "underline",
        },
        {
          text: [
            { text: `Cargo: `, bold: true },
            {
              text: `${formData.funcionarioCargo}`,
              alignment: "center",
              style: "roundedText",
            },
          ],
          margin: [0, 5],
        },
        {
          text: [
            { text: `Data de Admissão: `, bold: true },
            {
              text: `${formData.funcionarioDataAdmissao}`,
              alignment: "center",
              style: "roundedText",
            },
          ],
          margin: [0, 5],
        },
        {
          text: [
            { text: `Setor: `, bold: true },
            {
              text: `${formData.funcionarioSetor}`,
              alignment: "center",
              style: "roundedText",
            },
          ],
          margin: [0, 5],
        },
        {
          text: [
            { text: `Salário: `, bold: true },
            {
              text: `${formData.funcionarioSalario}`,
              alignment: "center",
              style: "roundedText",
            },
          ],
          margin: [0, 5],
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
          alignment: "center",
        },
        sectionHeader: {
          fontSize: 16,
          bold: true,
          margin: [0, 0, 0, 5],
          alignment: "center",
        },
        roundedText: {
          borderRadius: 5, // Definindo o raio da borda
          fillColor: "#EEEEEE", // Cor de fundo para destacar o texto
        },
      },
    }

    pdfMake.createPdf(documentDefinition).open()
  }

  return <button onClick={generatePDF}>Gerar PDF</button>
}

export default GeneratePDF
