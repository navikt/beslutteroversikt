import cls from 'classnames';
import { INITIAL_DIRECTION, OnOrderByChanged, OrderByData, toggleOrderByDirection } from '../table-utils';
import Show from '../../felles/show';
import arrowDownIcon from './arrow-down.svg';
import './user-table-header.less';
import { OrderByDirection, OrderByField as HeaderFieldName } from '../../../rest/api';

interface UserTableHeaderProps {
	onOrderByChanged: OnOrderByChanged;
	orderByData: OrderByData;
}

export const UserTableHeader = (props: UserTableHeaderProps) => {
	const { orderByData, onOrderByChanged } = props;

	function handleOnOrderByChanged(fieldName: HeaderFieldName) {
		const newOrderByData: OrderByData = {
			field: fieldName,
			direction: INITIAL_DIRECTION
		};

		if (fieldName === orderByData.field) {
			newOrderByData.direction = toggleOrderByDirection(orderByData.direction);
		}

		onOrderByChanged(newOrderByData);
	}

	return (
		<div role="rowgroup">
			<div role="row" className="user-table-header">
				<HeaderField
					name={HeaderFieldName.BRUKER_ETTERNAVN}
					text="Etternavn, Fornavn"
					orderByData={orderByData}
					onOrderByChanged={handleOnOrderByChanged}
				/>
				<HeaderField
					name={HeaderFieldName.BRUKER_FNR}
					text="Fødselsnummer"
					orderByData={orderByData}
					onOrderByChanged={handleOnOrderByChanged}
				/>
				<HeaderField
					name={HeaderFieldName.VEDTAK_STARTET}
					text="Utkast opprettet"
					orderByData={orderByData}
					onOrderByChanged={handleOnOrderByChanged}
				/>
				<HeaderField
					name={HeaderFieldName.STATUS}
					text="Status"
					orderByData={orderByData}
					onOrderByChanged={handleOnOrderByChanged}
				/>
				<HeaderField
					name={HeaderFieldName.BESLUTTER_NAVN}
					text="Kvalitetssikrer"
					orderByData={orderByData}
					onOrderByChanged={handleOnOrderByChanged}
				/>
				<HeaderField
					name={HeaderFieldName.VEILEDER_NAVN}
					text="Veileder"
					orderByData={orderByData}
					onOrderByChanged={handleOnOrderByChanged}
				/>
				<HeaderField
					name={HeaderFieldName.STATUS_ENDRET}
					text="Status endret"
					orderByData={orderByData}
					onOrderByChanged={handleOnOrderByChanged}
				/>
				<HeaderField
					name={HeaderFieldName.BRUKER_OPPFOLGINGSENHET_NAVN}
					text="Enhet"
					orderByData={orderByData}
					onOrderByChanged={handleOnOrderByChanged}
				/>
			</div>
		</div>
	);
};

interface HeaderFieldProps {
	name: HeaderFieldName;
	text: string;
	orderByData: OrderByData;
	onOrderByChanged: (fieldName: HeaderFieldName) => void;
}

const HeaderField = (props: HeaderFieldProps) => {
	const { name, text, orderByData, onOrderByChanged } = props;
	const alt = 'Sortert ' + (orderByData.direction === OrderByDirection.ASC ? 'økende' : 'synkenede');
	const iconClasses = cls('table-header-field__order-icon', {
		'table-header-field__order-icon--asc': orderByData.direction === OrderByDirection.ASC
	});

	const ariaSort =
		name === orderByData.field && orderByData.direction
			? orderByData.direction === OrderByDirection.ASC
				? 'ascending'
				: 'descending'
			: 'none';

	return (
		<button
			role="columnheader"
			aria-sort={ariaSort}
			onClick={() => onOrderByChanged(name)}
			className="table-header-field"
		>
			{text}
			<Show if={orderByData.field === name && orderByData.direction !== undefined}>
				<img className={iconClasses} src={arrowDownIcon} alt={alt} />
			</Show>
		</button>
	);
};
