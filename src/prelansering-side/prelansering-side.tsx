import pcBilde from './prelansering_info_pc.svg';
import { BodyShort, Heading } from '@navikt/ds-react';
import './prelansering-side.less';

export const PrelanseringInfoSide = () => {
	return (
		<div className="prelansering-inneholder">
			<div className="wrapper">
				<div className="wrapper-inneholdt">
					<Heading size="medium" level="1">
						Ny oversikt for besluttere som kvalitetssikrer arbeidsevnevurderinger
					</Heading>
					<BodyShort className="info-tekst">
						I beslutteroversikten får du oversikt over alle enhetene du er beslutter for. Der får du også
						oversikt over status på arbeidsevnevurderingene du er beslutter for.
					</BodyShort>
					<BodyShort className="info-tekst">
						<i>Når kommer den?</i>
						<br />
						Beslutteroversikten lanseres sammen med ny løsning for § 14a-vedtak i Modia.
					</BodyShort>
				</div>
				<div className="wrapper-inneholdt">
					<img src={pcBilde} className="pcBilde" alt="Beslutteroversikt bilde" />
				</div>
			</div>
		</div>
	);
};
