import { Header } from '../components/header/header';
import { PaginationBar } from '../components/pagination-bar/pagination-bar';
import { UserTableAksel } from '../components/user-table/aksel-table/user-table-aksel';
import './hovedside.css';

export const Hovedside = () => {
	return (
		<main className="hovedside">
			<Header />
			<PaginationBar />
			<UserTableAksel />
		</main>
	);
};
