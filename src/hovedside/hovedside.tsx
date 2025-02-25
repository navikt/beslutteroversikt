import { Heading } from '@navikt/ds-react';
import { Header } from '../components/header/header';
import { PaginationBar } from '../components/pagination-bar/pagination-bar';
import { UserTable } from '../components/user-table/user-table';
import { UserTableAksel } from '../components/user-table/aksel-table/user-table-aksel';
import './hovedside.css';

export const Hovedside = () => {
	return (
		<main className="hovedside">
			{/*TODO: fjern gamal user-table, test-overskrifter og <br/>*/}
			<Header />
			<PaginationBar />
			<Heading size="small" level="2" spacing>
				Tabell med aksel-komponentar
			</Heading>
			<UserTableAksel />
			<br />
			<Heading size="small" level="2" spacing>
				Gamal tabell
			</Heading>
			<UserTable />
		</main>
	);
};
