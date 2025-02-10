import { useRef, useState } from 'react';
import { useEventListener } from '../../hooks/use-event-listener';
import { vedKlikkUtenfor } from '../../utils';
import { lagSettBrukerIKontekstFetchInfo } from '../../rest/api';
import { OrNothing } from '../../utils/types/ornothing';
import { FetchState, hasFailed } from '../../rest/utils';
import { BodyShort, Button, Popover } from '@navikt/ds-react';
import { ExclamationmarkTriangleIcon } from '@navikt/aksel-icons';
import useFetch from '../../rest/use-fetch';
import env from '../../utils/environment';

type BrukerDirektelenkeMedFeilmeldingProps = {
	enhet: OrNothing<string>;
	fnr: string;
	knappTekst: string;
};

export const BrukerDirektelenkeMedFeilmelding = ({ enhet, fnr, knappTekst }: BrukerDirektelenkeMedFeilmeldingProps) => {
	const [popoverErApen, setPopoverErApen] = useState(false);
	const knappeRef = useRef<HTMLButtonElement>(null);
	const popoverRef = useRef<HTMLDivElement>(null);

	const settBrukerIKontekstFetcher = useFetch<void, string>(lagSettBrukerIKontekstFetchInfo);

	const lagOppfolgingsvedtakDyplenke = (enhet: OrNothing<string>) => {
		const basePath =
			env.isDevelopment || env.isLocal
				? 'https://veilarbpersonflate.intern.dev.nav.no'
				: 'https://veilarbpersonflate.intern.nav.no';
		const queryParams = enhet ? `?enhet=${enhet}` : '';
		const anchorParams = '#visVedtaksstotte#visUtkast';

		const { hostname } = window.location;
		if (hostname.includes('ansatt.dev.nav.no')) {
			return `https://veilarbpersonflate.ansatt.dev.nav.no${queryParams}${anchorParams}`;
		}
		return `${basePath}${queryParams}${anchorParams}`;
	};

	const handleClick = () => {
		if (hasFailed(settBrukerIKontekstFetcher)) {
			setPopoverErApen(!popoverErApen);
		} else {
			settBrukerIKontekstFetcher.fetch(fnr, (state: FetchState) => {
				if (!hasFailed(state)) {
					window.location.href = lagOppfolgingsvedtakDyplenke(enhet);
				}
			});
		}
	};

	useEventListener('mousedown', e =>
		vedKlikkUtenfor([knappeRef, popoverRef], e.target, () => {
			if (hasFailed(settBrukerIKontekstFetcher)) {
				settBrukerIKontekstFetcher.reset();
			}
		})
	);

	return (
		<>
			<Button
				size="small"
				variant={hasFailed(settBrukerIKontekstFetcher) ? 'tertiary-neutral' : 'tertiary'}
				icon={hasFailed(settBrukerIKontekstFetcher) ? <ExclamationmarkTriangleIcon /> : undefined}
				loading={settBrukerIKontekstFetcher.status === 'PENDING'}
				ref={knappeRef}
				onClick={handleClick}
				className="user-table-row__innhold--knapp"
				aria-expanded={popoverErApen}
				aria-label={
					hasFailed(settBrukerIKontekstFetcher)
						? `Kunne ikke åpne bruker ${knappTekst}. Fikk ikke kontakt med baksystemet. Prøv å laste siden på nytt eller åpne aktivitetsplanen og søk opp personen.`
						: undefined
				}
				aria-live="assertive"
			>
				{knappTekst}
			</Button>
			<Popover
				anchorEl={knappeRef.current}
				open={popoverErApen}
				onClose={() => setPopoverErApen(false)}
				ref={popoverRef}
			>
				<Popover.Content>
					<BodyShort size="small" role="alert">
						Fikk ikke kontakt med baksystemet. <br /> Prøv å laste siden på nytt eller åpne aktivitetsplanen
						og søk opp personen.
					</BodyShort>
				</Popover.Content>
			</Popover>
		</>
	);
};
