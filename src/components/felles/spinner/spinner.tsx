import { Loader } from '@navikt/ds-react';
import './spinner.css';

function Spinner() {
	return <Loader size="2xlarge" title="venter..." className="vedtaksstotte-spinner" />;
}

export default Spinner;
