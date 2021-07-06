import React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import './header.less';
import { StatusDropdown } from '../filters/status-dropwdown/status-dropdown';
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
