import { Header } from '../components/header/header';
import { PaginationBar } from '../components/pagination-bar/pagination-bar';
import './hovedside.less';
import { Header } from '../components/header/header';

export const Hovedside = () => {
	return (
		<main className="hovedside">
			<div className="hovedside__table">
				<Header />
				<PaginationBar />
				<UserTable />
			</div>
		</main>
	);
};
