export class DateHelper {
    private static  to24Hour(hour: number, isPM: boolean): number {
      if (isPM && hour !== 12) return hour + 12;
      if (!isPM && hour === 12) return 0;
        return hour;
    }

    static getFutureDateTime(daysAhead: number, hour12: number, minute: number, isPM: boolean): string {
      const hour24 = DateHelper.to24Hour(hour12, isPM);
      const date = new Date();
        date.setDate(date.getDate() + daysAhead);
        date.setHours(hour24, minute, 0, 0);

      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      const hh = String(date.getHours()).padStart(2, '0');
      const min = String(date.getMinutes()).padStart(2, '0');

        return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
    }
}