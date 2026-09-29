import { useState } from 'react';
import { Theme } from '@navikt/ds-react';
import { Header } from '../components/header/header';
import { PaginationBar } from '../components/pagination-bar/pagination-bar';
import { DARKMODE_TOGGLE } from '../rest/obo-unleash';
import { UserTable } from '../components/user-table/user-table';
import { useDataFetcherStore } from '../stores/data-fetcher-store';
import './hovedside.css';

export const Hovedside = () => {
	const [isDarkMode, setIsDarkMode] = useState(false);
	const { unleashFeaturetoggleFetcher } = useDataFetcherStore();
	const showDarkModeToggle = Boolean(unleashFeaturetoggleFetcher.data?.[DARKMODE_TOGGLE]);
	const activeTheme = showDarkModeToggle && isDarkMode ? 'dark' : 'light';

	return (
		<Theme theme={activeTheme} asChild>
			<main id="hovedside">
				<Header
					isDarkMode={isDarkMode}
					onDarkModeChange={setIsDarkMode}
					showDarkModeToggle={showDarkModeToggle}
				/>
				<PaginationBar />
				<UserTable />
			</main>
		</Theme>
	);
};
