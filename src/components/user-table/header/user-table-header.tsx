import React, { useState } from 'react';
import { UserTablePagination } from './user-table-pagination';
import {
	INITIAL_DIRECTION,
	OnOrderByChanged,
	OrderByData,
	OrderByDirection,
	toggleOrderByDirection
} from '../table-utils';
import Show from '../../felles/show';
import arrowUpIcon from './arrow-up.svg';
import arrowDownIcon from './arrow-down.svg';
import './user-table-header.less';

interface UserTableHeaderProps {
	onOrderByChanged: OnOrderByChanged;
}

export enum HeaderFieldName {
	NAVN = 'NAVN',
	FNR = 'FNR',
	OPPFOLGING_STARTET = 'OPPFOLGING_STARTET',
	OPFOLGING_ENHET = 'OPFOLGING_ENHET',
	BESLUTTER = 'BESLUTTER',
	STATUS = 'STATUS',
	UTKAST_ENDRET = 'UTKAST_ENDRET'
}

export const UserTableHeader = (props: UserTableHeaderProps) => {
	const [orderByData, setOrderByData] = useState<OrderByData>({ fieldName: HeaderFieldName.NAVN, direction: OrderByDirection.NONE });

	function handleOnOrderByChanged(fieldName: HeaderFieldName) {
		const newOrderByData: OrderByData = {
			fieldName,
			direction: INITIAL_DIRECTION
		};

		if (fieldName === orderByData.fieldName) {
			newOrderByData.direction = toggleOrderByDirection(orderByData.direction);
		}

		console.log('orderByData', newOrderByData); // tslint:disable-line
		setOrderByData(newOrderByData);
		props.onOrderByChanged(newOrderByData);
	}

    return (
    	<div className="user-table-header">
		    <HeaderField name={HeaderFieldName.NAVN} text="Etternavn, Fornavn" orderByData={orderByData} onOrderByChanged={handleOnOrderByChanged} />
		    <HeaderField name={HeaderFieldName.FNR} text="Fødselsnummer" orderByData={orderByData} onOrderByChanged={handleOnOrderByChanged} />
		    <HeaderField name={HeaderFieldName.OPPFOLGING_STARTET} text="Oppfølging startet" orderByData={orderByData} onOrderByChanged={handleOnOrderByChanged} />
		    <HeaderField name={HeaderFieldName.OPFOLGING_ENHET} text="Oppfølgingsenhet" orderByData={orderByData} onOrderByChanged={handleOnOrderByChanged} />
		    <HeaderField name={HeaderFieldName.BESLUTTER} text="Beslutter" orderByData={orderByData} onOrderByChanged={handleOnOrderByChanged} />
		    <HeaderField name={HeaderFieldName.STATUS} text="Status" orderByData={orderByData} onOrderByChanged={handleOnOrderByChanged} />
		    <HeaderField name={HeaderFieldName.UTKAST_ENDRET} text="Utkast sist endret" orderByData={orderByData} onOrderByChanged={handleOnOrderByChanged} />
			<UserTablePagination />
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
	const icon = orderByData.direction === OrderByDirection.ASC ? arrowUpIcon : arrowDownIcon;
	const alt = 'Sortert ' + (orderByData.direction === OrderByDirection.ASC ? 'økende' : 'synkenede');
	return (
		<button onClick={() => onOrderByChanged(name)} className="table-header-field">
			{text}
			<Show if={orderByData.fieldName === name && orderByData.direction !== OrderByDirection.NONE}>
				<img className="table-header-field__order-icon" src={icon} alt={alt} />
			</Show>
		</button>
	);
};
