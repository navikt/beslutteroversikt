import { MouseEvent, useRef, useState } from 'react';

import { BodyShort, Button, Popover } from '@navikt/ds-react';
import { ExclamationmarkTriangleIcon } from '@navikt/aksel-icons';
import { useEventListener } from '../../../hooks/use-event-listener';
import { vedKlikkUtenfor } from '../../../utils';
import { lagGiEnkelttilgangFetchInfo, lagSettBrukerIKontekstFetchInfo } from '../../../rest/api';
import { FetchState, FetchStatus, hasFailed } from '../../../rest/utils';
import useFetch from '../../../rest/use-fetch';
import env from '../../../utils/environment';

interface Props {
	fnr: string;
	knappTekst: string;
	trengerEnkelttilgang: boolean;
}

export const BrukerDirektelenkeMedFeilmelding = ({ fnr, knappTekst, trengerEnkelttilgang }: Props) => {
	const [popoverErApen, setPopoverErApen] = useState(false);
	const [knappeEl, setKnappeEl] = useState<HTMLButtonElement | null>(null);
	const popoverRef = useRef<HTMLDivElement>(null);

	const settBrukerIKontekstFetcher = useFetch<void, string>(lagSettBrukerIKontekstFetchInfo);
	const enkelttilgangFetcher = useFetch<void, string>(lagGiEnkelttilgangFetchInfo);
	const tilgangFeilet =
		hasFailed(enkelttilgangFetcher) ||
		(enkelttilgangFetcher.status === FetchStatus.FINISHED && enkelttilgangFetcher.httpCode !== 204);
	const harFeil = tilgangFeilet || hasFailed(settBrukerIKontekstFetcher);
	const laster =
		enkelttilgangFetcher.status === FetchStatus.PENDING ||
		settBrukerIKontekstFetcher.status === FetchStatus.PENDING;
	const feilmelding = tilgangFeilet
		? 'Kunne ikke gi midlertidig tilgang til brukeren. Prøv igjen senere.'
		: 'Fikk ikke kontakt med baksystemet. Prøv å laste siden på nytt eller åpne aktivitetsplanen og søk opp personen.';

	const finnBasePath = (): string => {
		const { hostname } = window.location;
		if (hostname.includes('ansatt.dev.nav.no')) {
			return 'https://veilarbpersonflate.ansatt.dev.nav.no';
		}
		if (env.isDevelopment || env.isLocal) {
			return 'https://veilarbpersonflate.intern.dev.nav.no';
		}

		return 'https://veilarbpersonflate.intern.nav.no';
	};

	const lagOppfolgingsvedtakDyplenke = () => {
		const basePath = finnBasePath();
		const oppfolgingsvedtakSide = '/vedtaksstotte/utkast';

		return `${basePath}${oppfolgingsvedtakSide}`;
	};

	const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
		if (laster) {
			return;
		}
		if (harFeil) {
			setPopoverErApen(!popoverErApen);
		} else {
			const apneINyFane = e.ctrlKey || e.metaKey;
			const settKontekstOgNaviger = () =>
				settBrukerIKontekstFetcher.fetch(fnr, (state: FetchState) => {
					if (!hasFailed(state)) {
						if (apneINyFane) {
							window.open(lagOppfolgingsvedtakDyplenke(), '_blank', 'noopener,noreferrer');
						} else {
							window.location.href = lagOppfolgingsvedtakDyplenke();
						}
					} else {
						setPopoverErApen(true);
					}
				});
			if (trengerEnkelttilgang) {
				enkelttilgangFetcher.fetch(fnr, state => {
					if (!hasFailed(state) && state.httpCode === 204) {
						settKontekstOgNaviger();
					} else {
						setPopoverErApen(true);
					}
				});
			} else {
				settKontekstOgNaviger();
			}
		}
	};

	useEventListener('mousedown', e =>
		vedKlikkUtenfor([{ current: knappeEl }, popoverRef], e.target as Node | null, () => {
			if (harFeil) {
				settBrukerIKontekstFetcher.reset();
				enkelttilgangFetcher.reset();
				setPopoverErApen(false);
			}
		})
	);

	return (
		<>
			<Button
				size="small"
				variant="tertiary"
				data-color={harFeil ? 'neutral' : 'accent'}
				icon={harFeil ? <ExclamationmarkTriangleIcon /> : undefined}
				loading={laster}
				ref={setKnappeEl}
				onClick={handleClick}
				aria-expanded={popoverErApen}
				aria-label={harFeil ? `Kunne ikke åpne bruker ${knappTekst}. ${feilmelding}` : undefined}
				aria-live="assertive"
			>
				{knappTekst}
			</Button>
			<Popover anchorEl={knappeEl} open={popoverErApen} onClose={() => setPopoverErApen(false)} ref={popoverRef}>
				<Popover.Content>
					<BodyShort size="small" role="alert">
						{feilmelding}
					</BodyShort>
				</Popover.Content>
			</Popover>
		</>
	);
};
