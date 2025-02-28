import { useRef } from 'react';
import { Button, HStack, Select } from '@navikt/ds-react';
import { UtkastStatus } from '../../../rest/data/bruker';
import { useSokStore } from '../../../stores/sok-store';
import { utkaststatusTekstOgIkon } from '../../user-table/body/status/utkast-status-data';
import '../filters.css';

export const StatusDropdown = () => {
	const { filters, setStatusFilter } = useSokStore();
	const value = filters?.status ?? undefined;
	const selectRef = useRef<HTMLSelectElement>(null);
	const statuserSomSkalVareValgbareIDropdown: UtkastStatus[] = Object.values(UtkastStatus).filter(
		status => status != UtkastStatus.GODKJENT_AV_BESLUTTER
	);

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
				{statuserSomSkalVareValgbareIDropdown.map(status => (
					<option key={status} value={status}>
						{utkaststatusTekstOgIkon[status].tekst}
					</option>
				))}
			</Select>
			<Button size="small" variant="secondary-neutral" onClick={handleOnNullstillButtonClicked}>
				Nullstill filtervalg
			</Button>
		</HStack>
	);
};
