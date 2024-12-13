import pcBilde from './prelansering_info_pc.svg';
import { BodyShort, Heading } from '@navikt/ds-react';
import './prelansering-side.less';

export const PrelanseringInfoSide = () => {
	return (
		<div className="prelansering-inneholder">
			<div className="wrapper">
				<div className="wrapper-inneholdt">
					<Heading size="medium" level="1">
						Ny oversikt for kvalitetssikring av oppfølgingsvedtak § 14 a
					</Heading>
					<BodyShort className="info-tekst">
						I kvalitetssikringsoversikten ser du oversikt over alle enhetene du er kvalitetssikrer for. Der
						får du også oversikt over status på oppfølgingsvedtakene du er kvalitetssikrer for.
					</BodyShort>
					<BodyShort className="info-tekst">
						<i>Når kommer den?</i>
						<br />
						Kvalitetssikringsoversikten lanseres sammen med ny løsning for oppfølgingsvedtak § 14 a i Modia.
					</BodyShort>
				</div>
				<div className="wrapper-inneholdt">
					<img src={pcBilde} className="pcBilde" alt="Kvalitetssikringsoversikt bilde" />
				</div>
			</div>
		</div>
	);
};
