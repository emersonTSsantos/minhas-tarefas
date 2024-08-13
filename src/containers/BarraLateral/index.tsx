import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import FiltroCard from '../../components/FiltroCard'
import { RootReducer } from '../../store'

import * as enums from '../../utils/enums/Tarefa'
import { Botao, CampoBuscar } from '../../styles'

type Props = {
  mostrarFiltros: boolean
}

import {
  Aside,
  Filtros,
  CampoBuscarContainer,
  IconeBuscar
} from '../BarraLateral/styles'

import { alteraTermo } from '../../store/reducers/filtro'

const BarraLateral = ({ mostrarFiltros }: Props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { termo } = useSelector((state: RootReducer) => state.filtro)

  return (
    <Aside>
      <div>
        {mostrarFiltros ? (
          <>
            <CampoBuscarContainer>
              <CampoBuscar
                type="text"
                placeholder="Buscar"
                value={termo}
                onChange={(evento) =>
                  dispatch(alteraTermo(evento.target.value))
                }
              />
              <IconeBuscar className="fas fa-search" />
            </CampoBuscarContainer>
            <Filtros>
              <FiltroCard
                valor={enums.Status.PENDENTE}
                criterio="status"
                legenda="Pendentes"
              />
              <FiltroCard
                valor={enums.Status.CONCLUIDA}
                criterio="status"
                legenda="Concluidas"
              />
              <FiltroCard
                valor={enums.Prioridade.URGENTE}
                criterio="prioridade"
                legenda="Urgentes"
              />
              <FiltroCard
                valor={enums.Prioridade.IMPORTANTE}
                criterio="prioridade"
                legenda="Importantes"
              />
              <FiltroCard
                valor={enums.Prioridade.NORMAL}
                criterio="prioridade"
                legenda="Normal"
              />
              <FiltroCard criterio="todas" legenda="Todas" />
            </Filtros>
          </>
        ) : (
          <Botao onClick={() => navigate('/')}>Voltar a lista de tarefas</Botao>
        )}
      </div>
    </Aside>
  )
}

export default BarraLateral
