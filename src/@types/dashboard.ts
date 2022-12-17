import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'

export type Entity = 'Empresas' | 'Tickets' | 'Locais'

export interface InitialDashboard {
	entity: Entity
	sideOpen: boolean
}

export interface IButton {
	text: Entity,
	icon: ReactJSXElement
}