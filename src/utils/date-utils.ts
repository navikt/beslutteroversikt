import dayjs from 'dayjs';

export function formatDateTime(dateStr: string) {
	return dayjs(dateStr).format('DD. MMM YYYY kl. HH:mm');
}

export function formatDateStr(dateStr: string) {
	return dayjs(dateStr).format('DD.MM.YYYY');
}

export function formatDate(date: Date, format: string = 'DD.MM.YYYY') {
	return dayjs(date).format(format);
}

export function daysFromToday(date: Date): number {
	const today = dayjs();
	return today.diff(dayjs(date), 'day');
}

export function tidSiden(dateStr: string): string {
	const date = dayjs(dateStr).toDate();
	const now = dayjs();

	const dager = now.diff(dayjs(date), 'day');
	const timer = now.diff(dayjs(date), 'hour');
	const minutter = now.diff(dayjs(date), 'minute');

	if (dager > 0) return `${dager} dager siden`;
	else if (timer > 0) return `${timer} timer siden`;
	else if (minutter > 0) return `${minutter} min siden`;
	else return 'nå';
}
