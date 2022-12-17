export interface SignInInputs {
	email: string
	senha: string
	lembrar: boolean
}

export interface SignUpInputs {
	nome: string
	email: string
	senha: string
	contrasenha: string
}

export interface Logout {
	token: string
}

export interface InitialUser {
	nome: string
	email: string
	token: string
}
