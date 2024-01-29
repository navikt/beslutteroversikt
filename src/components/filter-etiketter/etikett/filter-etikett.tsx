import { OnRemoveClicked } from '../filter-etiketter';
import xIcon from './x.svg';
import './filter-etikett.less';
import { Tag } from '@navikt/ds-react';

interface FilterEtikettProps {
	id: string;
	tekst: string;
	onRemoveClicked: OnRemoveClicked;
}

export const FilterEtikett = (props: FilterEtikettProps) => {
	const { id, tekst, onRemoveClicked } = props;

	return (
		<button className="filter-etikett" onClick={() => onRemoveClicked(id)}>
			<Tag variant="info">
				{tekst} <img className="filter-etikett__icon" src={xIcon} alt="Fjern etikett" />
			</Tag>
		</button>
	);
};
