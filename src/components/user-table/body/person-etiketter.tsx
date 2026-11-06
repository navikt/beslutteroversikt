import { HStack, Tag } from '@navikt/ds-react';
import { BrukerEtiketter } from '../../../rest/data/etiketter';

interface Props {
	etiketter?: BrukerEtiketter;
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
			{etiketter.diskresjonskodeFortrolig && (
				<Tag variant="error" size="small">
					Kode {etiketter.diskresjonskodeFortrolig}
				</Tag>
			)}
			{etiketter.egenAnsatt && (
				<Tag variant="error" size="small">
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
