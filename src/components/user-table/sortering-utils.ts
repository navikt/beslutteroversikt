import { OrderByDirection, OrderByField } from '../../rest/api';
import { OrNothing } from '../../utils/types/ornothing';

export const finnNesteSorteringsretning = (
	nyKey: OrderByField,
	gamalKey: OrNothing<OrderByField>,
	gamalDir: OrNothing<OrderByDirection>
): OrderByDirection | undefined => {
	if (gamalKey && gamalDir && nyKey === gamalKey) {
		if (gamalDir === OrderByDirection.ASC) {
			return OrderByDirection.DESC;
		}
		if (gamalDir === OrderByDirection.DESC) {
			return undefined;
		}
	}
	return OrderByDirection.ASC;
};

export const finnNesteSorteringsverdi = (
	nyKey: OrderByField,
	gamalKey: OrNothing<OrderByField>,
	gamalDir: OrNothing<OrderByDirection>
): OrderByField | undefined => {
	if (nyKey === gamalKey && gamalDir === OrderByDirection.DESC) {
		return undefined;
	}
	return nyKey;
};

type AkselSortDirection = 'ascending' | 'descending' | 'none';

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
