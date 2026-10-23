import { Heading, Switch } from '@navikt/ds-react';
// import { StatusDropdown } from '../filters/status-dropdown/status-dropdown';
// import { BrukerFilter } from '../filters/bruker-filter/bruker-filter';
import './header.css';
import { Enhetsvelger } from '../filters/enhetsvelger';

type HeaderProps = {
	isDarkMode: boolean;
	onDarkModeChange: (isDarkMode: boolean) => void;
	showDarkModeToggle: boolean;
	showEnhetsvelger: boolean;
};

export const Header = ({ isDarkMode, onDarkModeChange, showDarkModeToggle, showEnhetsvelger }: HeaderProps) => {
	return (
		<header title="Overskrift og filtere" className="header">
			<Heading level="1" size="large">
				Kvalitetssikring § 14 a
			</Heading>
			{/* <BrukerFilter />
			<StatusDropdown /> */}
			{showEnhetsvelger && <Enhetsvelger />}
			{showDarkModeToggle && (
				<Switch
					size="small"
					checked={isDarkMode}
					onChange={event => onDarkModeChange(event.currentTarget.checked)}
				>
					{isDarkMode ? 'Slå av mørk modus' : 'Slå på mørk modus'}
				</Switch>
			)}
		</header>
	);
};
