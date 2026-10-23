import { Label, UNSAFE_Combobox, HStack } from '@navikt/ds-react';
import { useSokStore } from '../../stores/sok-store';

export const Enhetsvelger = () => {
	const { enheter, filters, setEnheterFilter } = useSokStore();

	return (
		<HStack gap="space-8" align="center">
			<Label size="small">Velg enheter</Label>
			<UNSAFE_Combobox
				label="Velg enheter"
				hideLabel
				size="small"
				options={enheter.map(enhet => ({ value: enhet.enhetId, label: `${enhet.enhetId} ${enhet.navn}` }))}
				selectedOptions={filters.enheter.map(enhet => enhet.enhetId)}
				onToggleSelected={(enhetId, isSelected) => {
					const valgtEnhet = enheter.find(enhet => enhet.enhetId === enhetId);
					if (!valgtEnhet) return;

					setEnheterFilter(
						isSelected
							? [...filters.enheter, valgtEnhet]
							: filters.enheter.filter(enhet => enhet.enhetId !== enhetId)
					);
				}}
				isMultiSelect
				style={{ width: '100%' }}
			/>
		</HStack>
	);
};
