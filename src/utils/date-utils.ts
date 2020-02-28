import dayjs from 'dayjs';

export function formatDateTime(dateStr: string) {
	return dayjs(dateStr).format('DD. MMM YYYY kl. HH:mm');
}

export function formatDateStr(dateStr: string) {
	return dayjs(dateStr).format('DD. MMM YYYY');
}

export function formatDate(date: Date, format: string = 'DD.MM.YYYY') {
	return dayjs(date).format(format);
}

export function daysFromToday(date: Date): number {
	const today = dayjs();
	return today.diff(dayjs(date), 'day');
}

export function dagerSiden(dateStr: string): string {
	const date = dayjs(dateStr).toDate();
	const days = daysFromToday(date);

	if (days <= 0) {
		return 'i dag';
	} else if (days < 30) {
		return `${days} dager siden`;
	}

	return formatDate(date);
}