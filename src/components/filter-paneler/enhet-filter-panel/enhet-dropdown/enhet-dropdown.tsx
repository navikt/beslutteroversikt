import React from 'react';
import Select from 'react-select';
import { Enhet } from '../../../../rest/data/innlogget-veileder';
import './enhet-dropdown.less';

interface EnhetDropdownProps {
	enheter: DropdownOption[];
	valgteEnheter: DropdownOption[];
	onChange?: (selectedOption: DropdownOption[] | null) => void;
}

export interface DropdownOption {
	value: string;
	label: string;
}

export function mapEnhetTilDropdownOption(enhet: Enhet): DropdownOption {
	return { value: enhet.enhetId, label: enhet.navn };
}

export function mapDropdownOptionTilEnhet(dropdownOption: DropdownOption): Enhet {
	return { enhetId: dropdownOption.value, navn: dropdownOption.label };
}

export const EnhetDropdown = (props: EnhetDropdownProps) => {
	const {enheter, onChange} = props;
	return (
		<div className="enhet-dropdown">
			<Select
				inputId="enhet-filter"
				placeholder="Velg enheter"
				isMulti={true}
				value={props.valgteEnheter}
				isClearable
				isSearchable
				clearValueText="Fjern enhet"
				noResultsText="Listen er tom"
				searchPromptText="Skriv inn for å søke"
				options={enheter}
				onChange={onChange as any}
			/>
		</div>
	);
};
