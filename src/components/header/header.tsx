import { Heading } from '@navikt/ds-react';
import { StatusDropdown } from '../filters/status-dropdown/status-dropdown';
import { BrukerFilter } from '../filters/bruker-filter/bruker-filter';

export const Header = () => {
	return (
		<div aria-label="overskrift og filtere">
			<div className="header">
				<Sidetittel>Kvalitetssikring 14a</Sidetittel>
				<BrukerFilter />
				<StatusDropdown />
			</div>
		</div>
	);
};
