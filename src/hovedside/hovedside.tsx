import { Header } from '../components/header/header';
import { PaginationBar } from '../components/pagination-bar/pagination-bar';
import { UserTable } from '../components/user-table/user-table';
import './hovedside.css';

export const Hovedside = () => {
	return (
		<main className="hovedside">
			<Header />
			<PaginationBar />
			<UserTable />
		</main>
	);
};
