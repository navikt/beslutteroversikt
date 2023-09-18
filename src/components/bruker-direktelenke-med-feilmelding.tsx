import React, { useRef } from 'react';
import { KnappOgPopover } from './knapp-og-popover';
import { ReactComponent as XMarkOctagonIcon } from './icons/x_mark_octagon_icon.svg';
import { BodyShort, Button } from '@navikt/ds-react';
import { useEventListener } from '../hooks/use-event-listener';
import { vedKlikkUtenfor } from '../utils';
import useFetch from '../rest/use-fetch';
import { lagSettBrukerIKontekstFetchInfo } from '../rest/api';
import { OrNothing } from '../utils/types/ornothing';
import { FetchState, hasFailed } from '../rest/utils';
import env from '../utils/environment';

type BrukerDirektelenkeMedFeilmeldingProps = {
	enhet: OrNothing<string>;
	fnr: string;
	knappTekst: string;
};

export const BrukerDirektelenkeMedFeilmelding = ({ enhet, fnr, knappTekst }: BrukerDirektelenkeMedFeilmeldingProps) => {
	const knappOgPopoverRef = useRef<HTMLDivElement>(null);

	const settBrukerIKontekstFetcher = useFetch<void, string>(lagSettBrukerIKontekstFetchInfo);

	const lagOppfolgingsvedtakDyplenke = (enhet: OrNothing<string>) => {
		const basePath = process.env.REACT_APP_DEV
			? 'https://veilarbpersonflate.intern.dev.nav.no'
			: 'https://veilarbpersonflate.intern.nav.no';
		const queryParams = enhet ? `?enhet=${enhet}` : '';

		const anchorParams = '#visVedtaksstotte#visUtkast';
		return `${basePath}${queryParams}${anchorParams}`;
	};

	const handleClick = () =>
		settBrukerIKontekstFetcher.fetch(fnr, (state: FetchState) => {
			if (!hasFailed(state)) {
				window.location.href = lagOppfolgingsvedtakDyplenke(enhet);
			}
		});

	useEventListener('mousedown', e =>
		vedKlikkUtenfor([knappOgPopoverRef], e.target, () => {
			if (hasFailed(settBrukerIKontekstFetcher)) {
				settBrukerIKontekstFetcher.reset();
			}
		})
	);

	return (
		<div>
			<Button
				className="text-align-left"
				loading={settBrukerIKontekstFetcher.status === 'PENDING'}
				onClick={handleClick}
				size="xsmall"
				variant="tertiary"
			>
				<BodyShort size="small">{knappTekst}</BodyShort>
			</Button>
			{hasFailed(settBrukerIKontekstFetcher) && (
				<KnappOgPopover
					ikon={<XMarkOctagonIcon />}
					knappTekst="Feil i baksystem"
					popoverInnhold={
						<>
							Fikk ikke kontakt med baksystemet. <br /> Prøv å åpne aktivitetsplanen og søk opp personen.
						</>
					}
					innerRef={knappOgPopoverRef}
				/>
			)}
		</div>
	);
};
