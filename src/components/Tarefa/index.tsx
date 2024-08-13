import { useDispatch } from 'react-redux'
import { ChangeEvent, useEffect, useState } from 'react'

import {
  Card,
  Titulo,
  Tags,
  Descricao,
  BarraDeAcao,
  BotaoCancelarRemover
} from './styles'

import { Botao, BotaoSalvar } from '../../styles'
import { remover, editar, alteraStatus } from '../../store/reducers/tarefas'
import TarefaClass from '../../models/Tarefa'

import * as enums from '../../utils/enums/Tarefa'

type Props = TarefaClass

const Tarefa = ({
  descricao: descricaoOriginal,
  prioridade,
  status,
  titulo,
  id
}: Props) => {
  const dispatch = useDispatch()
  const [estaEditando, setEstaEditando] = useState(false)
  const [descricao, setDescricao] = useState('')

  useEffect(() => {
    if (descricaoOriginal.length > 0) {
      setDescricao(descricaoOriginal)
    }
  }, [descricaoOriginal])

  function cancelarEdicao() {
    setEstaEditando(false)
    setDescricao(descricaoOriginal)
  }

  function alteraStatusTarefa(evento: ChangeEvent<HTMLInputElement>) {
    dispatch(
      alteraStatus({
        id,
        finalizado: evento.target.checked
      })
    )
  }

  return (
    <Card>
      <label htmlFor={titulo}>
        <input
          type="checkbox"
          id={titulo}
          checked={status === enums.Status.CONCLUIDA}
          onChange={alteraStatusTarefa}
        />
        <Titulo>
          {estaEditando && <em>Editando: </em>}
          {titulo}
        </Titulo>
      </label>
      <Tags parametro="prioridade" prioridade={prioridade}>
        {prioridade}
      </Tags>
      <Tags parametro="status" status={status}>
        {status}
      </Tags>
      <Descricao
        disabled={!estaEditando}
        value={descricao}
        onChange={(evento) => setDescricao(evento.target.value)}
      />
      <BarraDeAcao>
        {estaEditando ? (
          <>
            <BotaoSalvar
              onClick={() => {
                dispatch(
                  editar({
                    descricao,
                    prioridade,
                    status,
                    titulo,
                    id
                  })
                )
                setEstaEditando(false)
              }}
            >
              Salvar
            </BotaoSalvar>
            <BotaoCancelarRemover onClick={cancelarEdicao}>
              Cancelar
            </BotaoCancelarRemover>
          </>
        ) : (
          <>
            <Botao onClick={() => setEstaEditando(true)}>Editar</Botao>
            <BotaoCancelarRemover onClick={() => dispatch(remover(id))}>
              Remover
            </BotaoCancelarRemover>
          </>
        )}
      </BarraDeAcao>
    </Card>
  )
}

export default Tarefa
