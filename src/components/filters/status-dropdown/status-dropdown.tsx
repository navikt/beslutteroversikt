import { useRef } from 'react';
import { Button, HStack, Select } from '@navikt/ds-react';
import { UtkastStatus } from '../../../rest/data/bruker';
import { useSokStore } from '../../../stores/sok-store';
import { utkaststatusTekstOgIkon } from '../../user-table/body/status/utkast-status-data';
import '../filters.css';

export function mapStatusTilDropdownOption(status: UtkastStatus): DropdownOption {
	return { value: status, label: utkaststatusTekstOgIkon[status].tekst };
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
	const value = filters?.status ?? undefined;
	const selectRef = useRef<HTMLSelectElement>(null);

	function handleOnStatusSelectedChanged(selectedOption: React.ChangeEvent<HTMLSelectElement>) {
		const nyStatus = selectedOption.target.value as UtkastStatus;
		setStatusFilter(nyStatus);
	}

	function handleOnNullstillButtonClicked() {
		if (selectRef.current) {
			selectRef.current.selectedIndex = 0;
		}
		setStatusFilter(undefined);
	}

	return (
		<HStack gap="2">
			<Select
				label="Statusfilter"
				size="small"
				value={value as string}
				onChange={handleOnStatusSelectedChanged}
				ref={selectRef}
			>
				<option value={''}>Velg status</option>
				{statusOptions.map(value => (
					<option key={value.value} value={value.value}>
						{value.label}
					</option>
				))}
			</Select>
			<Button size="small" variant="secondary-neutral" onClick={handleOnNullstillButtonClicked}>
				Nullstill filtervalg
			</Button>
		</HStack>
	);
};
