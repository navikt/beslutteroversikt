import { Heading } from '@navikt/ds-react';
import { StatusDropdown } from '../filters/status-dropdown/status-dropdown';
import { BrukerFilter } from '../filters/bruker-filter/bruker-filter';
import './header.css';

export const Header = () => {
	return (
		<header title="Overskrift og filtere" className="header">
			<Heading level="1" size="xlarge">
				Kvalitetssikring 14a
			</Heading>
			<BrukerFilter />
			<StatusDropdown />
		</header>
	);
};
