export type Status = 'pendente' | 'progresso' | 'concluido'

export interface Ticket {
	id: number
	titulo: string
	status: Status
	criadoPor: number
	atendidoPor: number
	localNome: string
	localEndereco: string
	localResponsavelPrincipal: number
	localEmpresa: number
	localId: number
}
