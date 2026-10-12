import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { Header } from './header';

const mocks = vi.hoisted(() => ({ aktivert: false }));
vi.mock('../../stores/data-fetcher-store', () => ({
	useDataFetcherStore: () => ({ enhetsfilterOgEnkelttilgangAktivert: mocks.aktivert })
}));
vi.mock('../filters/enhet-filter/enhet-filter', () => ({
	EnhetFilter: () => <span>Enhetsfilter</span>
}));
vi.mock('../filters/status-dropdown/status-dropdown', () => ({
	StatusDropdown: () => <span>Statusfilter</span>
}));
vi.mock('../filters/bruker-filter/bruker-filter', () => ({
	BrukerFilter: () => <span>Utkast jeg kvalitetssikrer</span>
}));

describe('enhetsfilter bak funksjonsbryteren', () => {
	it.each([false, true])('viser bare enhetsfilteret når bryteren er på: %s', aktivert => {
		mocks.aktivert = aktivert;
		const html = renderToStaticMarkup(
			<Header isDarkMode={false} onDarkModeChange={() => {}} showDarkModeToggle={false} />
		);
		expect(html.includes('Enhetsfilter')).toBe(aktivert);
		expect(html.includes('header--enhetsfilter')).toBe(aktivert);
		expect(html).toContain('Statusfilter');
		expect(html).toContain('Utkast jeg kvalitetssikrer');
	});
});
