import { HStack, Tag } from '@navikt/ds-react';
import { Etiketter } from '../../../rest/data/etiketter';

interface Props {
	etiketter?: Etiketter;
}

export const PersonEtiketter = ({ etiketter }: Props) => {
	if (!etiketter) {
		return null;
	}

	return (
		<HStack gap="space-2" wrap>
			{etiketter.erDoed && (
				<Tag variant="neutral" size="small">
					Død
				</Tag>
			)}
			{etiketter.adressebeskyttelse && (
				<Tag variant="error" size="small">
					{etiketter.adressebeskyttelse}
				</Tag>
			)}
			{etiketter.egenAnsatt && (
				<Tag variant="warning" size="small">
					Skjermet
				</Tag>
			)}
			{etiketter.kandidatForUtmelding && (
				<Tag variant="warning" size="small">
					Kandidat for avslutning
				</Tag>
			)}
		</HStack>
	);
};
