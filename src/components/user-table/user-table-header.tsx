import React from 'react';

export const UserTableHeader = () => {
    return (
    	<tr className="user-table__header">
		    <HeaderCell name="Fødselsnummer" />
		    <HeaderCell name="Navn" />
		    <HeaderCell name="Oppfølging startet" />
		    <HeaderCell name="Oppfølgingsenhet" />
		    <HeaderCell name="Beslutter" />
		    <HeaderCell name="Status" />
		    <HeaderCell name="Utkast sist endret" />
	    </tr>
    );
};

const HeaderCell = (props: { name: string }) => {
	return <td className="user-table__header-title">{props.name}</td>;
};
