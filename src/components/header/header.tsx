import { Heading, Switch } from '@navikt/ds-react';
import { StatusDropdown } from '../filters/status-dropdown/status-dropdown';
import { BrukerFilter } from '../filters/bruker-filter/bruker-filter';
import './header.css';

type HeaderProps = {
	isDarkMode: boolean;
	onDarkModeChange: (isDarkMode: boolean) => void;
	showDarkModeToggle: boolean;
};

export const Header = ({ isDarkMode, onDarkModeChange, showDarkModeToggle }: HeaderProps) => {
	return (
		<header title="Overskrift og filtere" className="header">
			<div className="header__content">
				<Heading level="1" size="xlarge">
					Kvalitetssikring § 14 a
				</Heading>
				<BrukerFilter />
				<StatusDropdown />
				{showDarkModeToggle && (
					<div className="header__darkmode">
						<Switch
							size="small"
							checked={isDarkMode}
							onChange={event => onDarkModeChange(event.currentTarget.checked)}
						>
							{isDarkMode ? 'Slå av mørk modus' : 'Slå på mørk modus'}
						</Switch>
					</div>
				)}
			</div>
		</header>
	);
};
