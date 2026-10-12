import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import type { ButtonProps } from '@navikt/ds-react';
import { UtkastStatus } from '../../../rest/data/bruker';
import { StatusDropdown } from './status-dropdown';

const mocks = vi.hoisted(() => ({
	button: vi.fn<(props: Omit<ButtonProps, 'onClick'> & { onClick?: () => void }) => null>(() => null),
	setStatusFilter: vi.fn(),
	setEnheterFilter: vi.fn()
}));

vi.mock('@navikt/ds-react', async importOriginal => ({
	...(await importOriginal<typeof import('@navikt/ds-react')>()),
	Button: mocks.button
}));
vi.mock('../../../stores/sok-store', () => ({
	useSokStore: () => ({
		filters: {
			status: UtkastStatus.KLAR_TIL_BESLUTTER,
			enheter: [{ enhetId: '0234', navn: 'Nav Gjerdrum' }]
		},
		setStatusFilter: mocks.setStatusFilter,
		setEnheterFilter: mocks.setEnheterFilter
	})
}));

describe('Nullstill filtervalg', () => {
	it('nullstiller både status- og enhetsfilteret', () => {
		renderToStaticMarkup(<StatusDropdown />);
		const { onClick } = mocks.button.mock.calls.at(-1)![0];
		expect(onClick).toBeTypeOf('function');
		onClick!();
		expect(mocks.setStatusFilter).toHaveBeenCalledWith(undefined);
		expect(mocks.setEnheterFilter).toHaveBeenCalledWith([]);
	});
});
