export type TCalendarView = 'day' | 'week' | 'month' | 'agenda';
export type TEventColor =
    | 'blue'
    | 'green'
    | 'red'
    | 'yellow'
    | 'purple'
    | 'orange'
    | 'gray';
export type TBadgeVariant = 'dot' | 'colored' | 'mixed';
export type TWorkingHours = { [key: number]: { from: number; to: number } };
export type TVisibleHours = { from: number; to: number };

export interface ICalendarCell {
    day: number;
    currentMonth: boolean;
    date: Date;
}
