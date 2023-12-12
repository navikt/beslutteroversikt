import pcBilde from './prelansering_info_pc.svg';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import './prelansering-side.less';

export const PrelanseringInfoSide = () => {
	return (
		<div className="prelansering-inneholder">
			<div className="wrapper">
				<div className="wrapper-inneholdt">
					<Systemtittel>Ny oversikt for besluttere som kvalitetssikrer arbeidsevnevurderinger</Systemtittel>
					<Normaltekst className="info-tekst">
						I beslutteroversikten får du oversikt over alle enhetene du er beslutter for. Der får du også
						oversikt over status på arbeidsevnevurderingene du er beslutter for.
					</Normaltekst>
					<Normaltekst className="info-tekst">
						Når kommer den?
						<br />
						Beslutteroversikten lanseres sammen med ny løsning for § 14a-vedtak i Modia.
					</Normaltekst>
				</div>
				<div className="wrapper-inneholdt">
					<img src={pcBilde} className="pcBilde" alt="Beslutteroversikt bilde" />
				</div>
			</div>
		</div>
	);
};
