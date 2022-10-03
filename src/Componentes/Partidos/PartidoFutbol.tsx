import { useState } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
//import ConEncabezado from '../../hoc/ConEncabezado'


const PartidoFutbol = () => {

  return (
    <Tablero>
      <Fila>
        <FilaLocal>
          <LogoEquipo>

          </LogoEquipo>
          <EquipoLocal>
            Atletico Paz
          </EquipoLocal>
          <ResultadoLocal>
            1
          </ResultadoLocal>
        </FilaLocal>

        <ContenedorTiempoCuarto>
        <Cuarto>
          2 T
        </Cuarto>
        <Tiempo>
            12:45
        </Tiempo>
        </ContenedorTiempoCuarto>

        <FilaVisitante>
          <ResultadoVisitante>
            1
          </ResultadoVisitante>
          <EquipoVisitante>
            Los Andes
          </EquipoVisitante>

          <LogoEquipo>

          </LogoEquipo>
        </FilaVisitante>
      </Fila>
    </Tablero>
  )
}

const Tablero = styled.div`
  display: flex;
  
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;


  @media (max-width: 768px) {
    margin: 50px 0;
  }

  @media (max-width: 600px) {
    margin: 40px 0;
  }
`
const ContenedorTiempoCuarto = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width:10%;
  background-color: #fff;

  @media (max-width: 768px) {
    height: 100px;
    width: 85%;
  }

  @media (max-width: 600px) {
    height: 50px;
    width: 80%;
    display: flex;
    flex-direction: column;
  }
`


const Fila = styled.div`
  display: flex;
  height: 80px;
  width: 100%;
  justify-content: center;

  @media (max-width: 768px) {
    height: 100px;
    width: 85%;
  }

  @media (max-width: 600px) {
    height: 200px;
    width: 80%;
    display: flex;
    flex-direction: column;
  }
`

const FilaLocal = styled.div`
  display: flex;
  width: 30%;
  border: 2px solid #215d43;
  align-items: center;

  @media (max-width: 768px) {
    height: 100px;
    width: 85%;
  }

  @media (max-width: 600px) {
    height: 70px;
    width: 100%;
  }
`


const ResultadoLocal = styled.div`
  display: flex;
  width: 10%;
  border: 2px solid #215d43;
  background-color: #fff;
  height: 50%;
  justify-content: center;
  align-items:center;

  @media (max-width: 768px) {
    height: 50%;
    width: 85%;
  }

  @media (max-width: 600px) {
    height: 50%;
    width: 30%;
  }
`
const Cuarto = styled.div`
  display: flex;
  width: 100%;
  background-color: #fff;
  justify-content: center;
  align-items:center;
  height:50%;

  @media (max-width: 768px) {
    height: 100px;
    width: 85%;
  }

  @media (max-width: 600px) {
    height: 50%;
    width: 100%;
  }
`

const Tiempo = styled.div`
  display: flex;
  width: 100%;
  height:50%;
  background-color: #fff;
  justify-content: center;
  align-items:center;

  @media (max-width: 768px) {
    height: 100px;
    width: 85%;
  }

  @media (max-width: 600px) {
    height: 50%;
    width: 100%;
  }
`


const ResultadoVisitante = styled.div`
  display: flex;
  width: 10%;
  border: 2px solid #215d43;
  background-color: #fff;
  height: 50%;
  justify-content: center;
  align-items:center;

  @media (max-width: 768px) {
    height: 100px;
    width: 85%;
  }

  @media (max-width: 600px) {
    height: 50%;
    width: 30%;
  }
`

const FilaVisitante = styled.div`
  display: flex;
  width: 30%;
  align-items:center;

  @media (max-width: 768px) {
    height: 100px;
    width: 85%;
  }

  @media (max-width: 600px) {
    height: 70px;
    width: 100%;
    flex-direction: row-reverse;
    justify-content: flex-end;
  }
`
const EquipoLocal = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #fff;
  width: 60%;
  height: 50%;

  @media (max-width: 768px) {
    padding: 10px;
    border: 1px solid #215d43;
  }

  @media (max-width: 600px) {
    padding: 5px;
    border: 1px solid #215d43;
    height: 50%;
  }
`

const EquipoVisitante = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #fff;
  width: 60%;
  height: 50%;

  @media (max-width: 768px) {
    padding: 10px;
    border: 1px solid #215d43;
  }

  @media (max-width: 600px) {
    padding: 5px;
    border: 1px solid #215d43;
    justify-content: flex-start;
    height: 50%;
  }
`

const LogoEquipo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #fff;
  background-color: #215d43;
  width: 30%;
  color: #fff;
  font-family: Tahoma;
  font-size: 90px;
  line-height: 170px;
  height: 100%;

  @media (max-width: 768px) {
    font-size: 50px;
    border: 1px solid #fff;
  }

  @media (max-width: 600px) {
    font-size: 25px;
    border: 1px solid #fff;
  }
`

export default PartidoFutbol
