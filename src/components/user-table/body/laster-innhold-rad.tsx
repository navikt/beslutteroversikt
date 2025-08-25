import { Table } from '@navikt/ds-react';
import { OrderByField } from '../../../rest/api';
import Spinner from '../../felles/spinner/spinner';

export const LasterInnholdRad = () => {
	return (
		<Table.Row shadeOnHover={false}>
			<Table.DataCell colSpan={Object.values(OrderByField).length} className="laster-tabelldata">
				<Spinner />
			</Table.DataCell>
		</Table.Row>
	);
};
