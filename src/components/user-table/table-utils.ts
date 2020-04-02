
export enum OrderByDirection {
 	ASC = 'ASC',
    DESC = 'DESC',
    NONE = 'NONE'
}

export const INITIAL_DIRECTION = OrderByDirection.ASC;

export type OnOrderByChanged = (orderByData: OrderByData) => void;

export interface OrderByData {
	fieldName: string;
	direction: OrderByDirection;
}

export function toggleOrderByDirection(orderByDirection: OrderByDirection): OrderByDirection {
	switch (orderByDirection) {
		case OrderByDirection.ASC:
			return OrderByDirection.DESC;
		case OrderByDirection.DESC:
			return OrderByDirection.NONE;
		default:
			return INITIAL_DIRECTION;
	}
}
