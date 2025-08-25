import { OrderByDirection, OrderByField } from '../../rest/api';
import { OrNothing } from '../../utils/types/ornothing';

/**
 * Veksler sorteringsretninga mellom "stigande" (ASC), "synkande" (DSC) og "ingen" (undefined).
 *
 * Logikk:
 * Ved endring i sorteringsfelt: sorter stigande.
 * Same sorteringfelt som før: vekslar sortering mellom "stigande", "synkande" og "ingen" for kvart tredje trykk.
 * */
export const finnNesteSorteringsretning = (
	nyttSorteringsfelt: OrderByField,
	gammeltSorteringsfelt: OrNothing<OrderByField>,
	gammelSorteringsretning: OrNothing<OrderByDirection>
): OrderByDirection | undefined => {
	if (gammeltSorteringsfelt && gammelSorteringsretning && nyttSorteringsfelt === gammeltSorteringsfelt) {
		if (gammelSorteringsretning === OrderByDirection.ASC) {
			return OrderByDirection.DESC;
		}
		if (gammelSorteringsretning === OrderByDirection.DESC) {
			return undefined;
		}
	}
	return OrderByDirection.ASC;
};

/**
 * Gjer at ein kan "nulle" sortering om ein trykkar tre gonger på same kolonne/sorteringsfelt.
 *
 * Logikk:
 * Ved endring av sorteringsfelt: bytt sorteringsfelt.
 * Same sorteringsfelt som før: dersom sorteringa var "synkande" sist "nullar" vi sorteringsfeltet og returnerer undefined.
 * */
export const finnNesteSorteringsfelt = (
	nyttSorteringsfelt: OrderByField,
	gammeltSorteringsfelt: OrNothing<OrderByField>,
	gammelSorteringsretning: OrNothing<OrderByDirection>
): OrderByField | undefined => {
	if (nyttSorteringsfelt === gammeltSorteringsfelt && gammelSorteringsretning === OrderByDirection.DESC) {
		return undefined;
	}
	return nyttSorteringsfelt;
};

/** Godkjende sorteringar i Aksel sin tabell-komponent */
type AkselSortDirection = 'ascending' | 'descending' | 'none';

/**
 * Mappar frå sorteringsrekkefølgjene vi bruker i api-kalla, til aksel-sorteringane
 * slik at vi kan videreformidle state til tabell-komponenten med typar den forstår.
 * */
export const mapOrderByDirectionToAkselSortDirection = (dir: OrNothing<OrderByDirection>): AkselSortDirection => {
	switch (dir) {
		case OrderByDirection.ASC:
			return 'ascending';
		case OrderByDirection.DESC:
			return 'descending';
		default:
			return 'none';
	}
};
