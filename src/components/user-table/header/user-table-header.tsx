import React, { useState } from 'react';
import cls from 'classnames';
import { UserTablePagination } from './user-table-pagination';
import {
	INITIAL_DIRECTION,
	OnOrderByChanged,
	OrderByData,
	OrderByDirection,
	toggleOrderByDirection
} from '../table-utils';
import Show from '../../felles/show';
import arrowDownIcon from './arrow-down.svg';
import './user-table-header.less';

interface UserTableHeaderProps {
	onOrderByChanged: OnOrderByChanged;
}

export enum HeaderFieldName {
	NAVN = 'NAVN',
	FNR = 'FNR',
	VEDTAK_STARTET = 'VEDTAK_STARTET',
	STATUS = 'STATUS',
	BESLUTTER = 'BESLUTTER',
	VEILEDER = 'VEILEDER',
	OPFOLGING_ENHET = 'OPFOLGING_ENHET',
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
		    <HeaderField name={HeaderFieldName.VEDTAK_STARTET} text="Vedtak startet" orderByData={orderByData} onOrderByChanged={handleOnOrderByChanged} />
		    <HeaderField name={HeaderFieldName.STATUS} text="Status" orderByData={orderByData} onOrderByChanged={handleOnOrderByChanged} />
		    <HeaderField name={HeaderFieldName.BESLUTTER} text="Beslutter" orderByData={orderByData} onOrderByChanged={handleOnOrderByChanged} />
		    <HeaderField name={HeaderFieldName.VEILEDER} text="Veileder" orderByData={orderByData} onOrderByChanged={handleOnOrderByChanged} />
		    <HeaderField name={HeaderFieldName.OPFOLGING_ENHET} text="Enhet" orderByData={orderByData} onOrderByChanged={handleOnOrderByChanged} />
		    <HeaderField name={HeaderFieldName.UTKAST_ENDRET} text="Sist endret" orderByData={orderByData} onOrderByChanged={handleOnOrderByChanged} />
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
	const alt = 'Sortert ' + (orderByData.direction === OrderByDirection.ASC ? 'økende' : 'synkenede');
	const iconClasses = cls('table-header-field__order-icon', {
		'table-header-field__order-icon--asc': orderByData.direction === OrderByDirection.ASC
	});

	return (
		<button onClick={() => onOrderByChanged(name)} className="table-header-field">
			{text}
			<Show if={orderByData.fieldName === name && orderByData.direction !== OrderByDirection.NONE}>
				<img className={iconClasses} src={arrowDownIcon} alt={alt} />
			</Show>
		</button>
	);
};
