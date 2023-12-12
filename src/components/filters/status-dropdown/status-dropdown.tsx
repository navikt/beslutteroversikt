import { useRef } from 'react';
import { UtkastStatus } from '../../../rest/data/bruker';
import { mapBrukerStatusTilTekst } from '../../../utils';
import { useSokStore } from '../../../stores/sok-store';
import '../../filters/filters.less';

export function mapStatusTilDropdownOption(status: UtkastStatus): DropdownOption {
	return { value: status, label: mapBrukerStatusTilTekst(status) };
}

interface DropdownOption {
	value: string;
	label: string;
}

const statusOptions: DropdownOption[] = [
	mapStatusTilDropdownOption(UtkastStatus.TRENGER_BESLUTTER),
	mapStatusTilDropdownOption(UtkastStatus.KLAR_TIL_VEILEDER),
	mapStatusTilDropdownOption(UtkastStatus.KLAR_TIL_BESLUTTER)
];

export const StatusDropdown = () => {
	const { filters, setStatusFilter } = useSokStore();
	const value = filters.status ? mapStatusTilDropdownOption(filters.status) : null;

	function handleOnStatusSelectedChanged(selectedOption: DropdownOption | null) {
		const nyStatus = selectedOption ? (selectedOption.value as UtkastStatus) : undefined;
		setStatusFilter(nyStatus);
	}

	return (
		<>
			<label className="typo-element" htmlFor="status-filter">
				Status
			</label>
			<Select
				aria-label="Filtrer på status"
				inputId="status-filter"
				placeholder="Filtrer på status"
				value={value}
				isClearable
				isSearchable={false}
				options={statusOptions}
				onChange={handleOnStatusSelectedChanged as any}
			/>
		</>
	);
};
