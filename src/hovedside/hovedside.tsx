import { useState } from 'react';
import { Theme } from '@navikt/ds-react';
import { Header } from '../components/header/header';
import { PaginationBar } from '../components/pagination-bar/pagination-bar';
import { UserTable } from '../components/user-table/user-table';
import { DARKMODE_TOGGLE } from '../rest/obo-unleash';
import { useDataFetcherStore } from '../stores/data-fetcher-store';
import './hovedside.css';

export const Hovedside = () => {
	const [isDarkMode, setIsDarkMode] = useState(false);
	const { unleashFeaturetoggleFetcher } = useDataFetcherStore();
	const darkModeToggleEnabled = Boolean(unleashFeaturetoggleFetcher.data?.[DARKMODE_TOGGLE]);
	const activeTheme = darkModeToggleEnabled && isDarkMode ? 'dark' : 'light';

	return (
		<Theme asChild theme={activeTheme} hasBackground={false}>
			<div className="hovedside-theme">
				<main className="hovedside">
					<Header
						isDarkMode={darkModeToggleEnabled && isDarkMode}
						onDarkModeChange={setIsDarkMode}
						showDarkModeToggle={darkModeToggleEnabled}
					/>
					<PaginationBar />
					<UserTable />
				</main>
			</div>
		</Theme>
	);
};
