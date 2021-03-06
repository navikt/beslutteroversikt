import { OrderByDirection, OrderByField } from '../../rest/api';
import { OrNothing } from '../../utils/types/ornothing';

export const INITIAL_DIRECTION = OrderByDirection.ASC;

export type OnOrderByChanged = (orderByData: OrderByData) => void;

export interface OrderByData {
	field: OrNothing<OrderByField>;
	direction: OrNothing<OrderByDirection>;
}

export function toggleOrderByDirection(orderByDirection: OrNothing<OrderByDirection>): OrNothing<OrderByDirection> {
	switch (orderByDirection) {
		case OrderByDirection.ASC:
			return OrderByDirection.DESC;
		case OrderByDirection.DESC:
			return undefined;
		default:
			return INITIAL_DIRECTION;
	}
}
