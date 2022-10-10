import { useContextoGlobal } from "../../Contexto/contextoGlobal"
import TableroComandosFutbol from "../Futbol/TableroComandos"
import TableroComandosTenisPadel from "../TenisPadel/TableroComandos"
import TableroComandosHockey from "../Hockey/TableroComandos"
import Login from "./Login"

const TableroComandosContenedor = () => {
  const { token, idDisciplina } = useContextoGlobal()

  if (!token || !idDisciplina) return (<Login />)
  
  switch (idDisciplina) {
    case 1:
    case 2:
      return <TableroComandosTenisPadel />
    case 4:
      return <TableroComandosFutbol />
    case 5:
      return <TableroComandosHockey />
    default:
      return <Login />
  }
}

export default TableroComandosContenedor
