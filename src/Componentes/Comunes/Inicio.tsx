import { useEffect, useState } from "react"
import styled from 'styled-components'
import ConEncabezado from '../../hoc/ConEncabezado'
import { ObtenerDisciplinasClubes } from "../../Servicios/DisciplinaClub"
import { DisciplinaClub } from "../../Tipos"
import PartidoFutbol from "../Futbol/PartidoFutbol"
import PartidoHockey from "../Hockey/PartidoHockey"
import TableroUsuario from "../TenisPadel/TableroUsuario"

const MenuInicio = () => {
  const [disciplinasClubes, setDisciplinasClubes] = useState<DisciplinaClub[]>([])
  const [disciplinaClub, setDisciplinaClub] = useState<DisciplinaClub>()

  useEffect(() => {
    const obtenerDisciplinasClubes = async () => {
      const disciplinasClubesInicial = await ObtenerDisciplinasClubes()
      setDisciplinasClubes(disciplinasClubesInicial ?? [])
    }
    obtenerDisciplinasClubes()
  }, [])

  if (disciplinaClub) {
    switch (disciplinaClub.idDisciplina) {
      case 1:
      case 2:
        return <TableroUsuario idDisciplinaClub={disciplinaClub.id} onVolver={() => setDisciplinaClub(undefined)} />
      case 4:
        return <PartidoFutbol />
      case 5:
        return <PartidoHockey />
    }
  }

  return (
    <Contenedor>
      {
        !disciplinasClubes?.length
          ? ( <>No hay clubes y/o disciplinas disponibles.</> )
          : (
            disciplinasClubes.map(disciplinaClub => (
              <Boton key={disciplinaClub.id} onClick={() => setDisciplinaClub(disciplinaClub)}>
                {`${disciplinaClub.nombreDisciplina} - ${disciplinaClub.nombreClub} - ${disciplinaClub.nombreLocalidad}`}
              </Boton>
            ))
          )
      }
    </Contenedor>
  )
}

const Contenedor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(90% - 30px);
  margin-top: 30px;

  @media (max-width: 768px) {
    margin-top: 65px;
    height: calc(83% - 30px);
  }

  @media (max-width: 600px) {
    margin-top: 40px;
  }
`

const Boton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  height: 70px;
  width: 100%;
  background-color: #ddd;
  color: '#000';
  border: 1px solid #215d43;
  font-size: 25px;
  padding: 10px;

  &:active {
    background-color: #7F1833;
    color: '#fff';
  }

  @media (max-width: 768px) {
    font-size: 18px;
    height: 50px;
  }

  @media (max-width: 600px) {
    font-size: 16px;
    height: 45px;
  }
`

export default ConEncabezado(MenuInicio)
