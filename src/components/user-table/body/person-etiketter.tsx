import { useEffect } from 'react';
import { HStack, Tag } from '@navikt/ds-react';
import useFetch from '../../../rest/use-fetch';
import { lagHentPersonaliaFetchInfo } from '../../../rest/api';
import { PersonaliaResponse } from '../../../rest/data/personalia';

interface Props {
	fnr: string;
}

export const PersonEtiketter = ({ fnr }: Props) => {
	const personaliaFetcher = useFetch<PersonaliaResponse, string>(lagHentPersonaliaFetchInfo);
	const { fetch: hentPersonalia } = personaliaFetcher;

	useEffect(() => {
		if (fnr) {
			hentPersonalia(fnr);
		}
	}, [fnr, hentPersonalia]);

	const personalia = personaliaFetcher.data?.errors ? undefined : personaliaFetcher.data?.data?.person;

	if (!personalia) {
		return null;
	}

	return (
		<HStack gap="space-2" wrap>
			{personalia.dodsdato && (
				<Tag variant="neutral" size="small">
					Død
				</Tag>
			)}
			{personalia.diskresjonskode && (
				<Tag variant="error" size="small">
					Kode {personalia.diskresjonskode}
				</Tag>
			)}
			{personalia.egenAnsatt && (
				<Tag variant="error" size="small">
					Skjermet
				</Tag>
			)}
		</HStack>
	);
};
