export interface Personalia {
	dodsdato: string | null;
	diskresjonskode: string | null;
	egenAnsatt: boolean;
}

export interface GraphqlResponse<T> {
	data?: T;
	errors?: { message: string }[];
}

export type PersonaliaResponse = GraphqlResponse<{ person: Personalia }>;
