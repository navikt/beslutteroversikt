import { Button, Popover } from '@navikt/ds-react';
import * as React from 'react';
import { type JSX, type RefObject, useRef, useState } from 'react';

type KnappOgPopoverProps = {
	ikon: JSX.Element;
	knappTekst: string;
	popoverInnhold: string | React.JSX.Element;
	innerRef: RefObject<HTMLDivElement>;
};

export const KnappOgPopover = ({ ikon, knappTekst, popoverInnhold, innerRef }: KnappOgPopoverProps) => {
	const [popoverErApen, setPopoverErApen] = useState(false);
	const knappRef = useRef<HTMLButtonElement>(null);

	return (
		<div ref={innerRef}>
			<Button
				className="text-align-left"
				variant="tertiary-neutral"
				size="xsmall"
				onClick={() => setPopoverErApen(true)}
				ref={knappRef}
				icon={ikon}
			>
				{knappTekst}
			</Button>
			<Popover
				anchorEl={knappRef.current}
				open={popoverErApen}
				onClose={() => setPopoverErApen(false)}
				placement="bottom"
				strategy="fixed"
			>
				<Popover.Content>{popoverInnhold}</Popover.Content>
			</Popover>
		</div>
	);
};
