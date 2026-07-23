import { useState } from 'react';
import { Theme } from '@navikt/ds-react';
import { Header } from '../components/header/header';
import { PaginationBar } from '../components/pagination-bar/pagination-bar';
import { UserTable } from '../components/user-table/user-table';
import './hovedside.css';

export const Hovedside = () => {
	const [isDarkMode, setIsDarkMode] = useState(false);

	return (
		<Theme asChild theme={isDarkMode ? 'dark' : 'light'} hasBackground={false}>
			<div className="hovedside-theme">
				<main className="hovedside">
					<Header isDarkMode={isDarkMode} onDarkModeChange={setIsDarkMode} />
					<PaginationBar />
					<UserTable />
				</main>
			</div>
		</Theme>
	);
};
