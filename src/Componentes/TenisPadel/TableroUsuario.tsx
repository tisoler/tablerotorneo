import { useEffect, useState } from "react"
import Grupos from "./Grupos"
import Partido from "./Partido"
import Cuadro from './Cuadro'
import { ObtenerConfiguracion } from "../../Servicios/Configuracion"
import BotonVolver from "../Comunes/BotonVolver"
import { PantallaMostrar } from "../../Tipos"
import { BotonMenu, BotonMenuDerecha, BotonMenuIzquierda, ContenedorTableroUsuario, EncabezadoPantalla, Menu } from "../../Estilos/Comunes"

interface TableroUsuarioProps {
  idDisciplinaClub: number,
  onVolver: () => void,
}

const TableroUsuario = ({ idDisciplinaClub, onVolver }: TableroUsuarioProps) => {
  const [vista, setVista] = useState<PantallaMostrar>()

  useEffect(() => {
    const obtenerConfiguracion = async () => {
      const configuracionInicial = await ObtenerConfiguracion(idDisciplinaClub)
      setVista(configuracionInicial?.pantallaMostrar ?? 'grupo')
    }
    obtenerConfiguracion()
  }, [])

  const renderPantalla = () => {
    switch(vista) {
      case 'partido':
        return <Partido />
      case 'cuadro':
        return <Cuadro />
      default:
        return <Grupos idDisciplinaClub={idDisciplinaClub} />
    }
  }

  return (
    <ContenedorTableroUsuario>
      <EncabezadoPantalla>
        <BotonVolver onVolver={onVolver} />
        <Menu>
          <BotonMenuIzquierda seleccionado={vista === 'partido'} onClick={() => setVista('partido')}>Partido en curso</BotonMenuIzquierda>
          <BotonMenu seleccionado={vista === 'grupo'}  onClick={() => setVista('grupo')}>Grupos</BotonMenu>
          <BotonMenuDerecha seleccionado={vista === 'cuadro'}  onClick={() => setVista('cuadro')}>Cuadro final</BotonMenuDerecha>
        </Menu>
      </EncabezadoPantalla>
      { vista && renderPantalla() }
    </ContenedorTableroUsuario>
  )
}

export default TableroUsuario
