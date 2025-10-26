export function timeAgo(input: string | number | Date) {
    let ts: number;

    if (typeof input === "number") {
        ts = input;
    } else {
        // if input is numeric string use it, otherwise try Date.parse
        const maybeNum = Number(input);
        ts = Number.isFinite(maybeNum) ? maybeNum : Date.parse(String(input));
    }

    if (!Number.isFinite(ts) || ts <= 0) return "";

    // if timestamp looks like seconds ( < 1e12 ) convert to ms
    if (ts < 1e12) ts = ts * 1000;

    const seconds = Math.floor((Date.now() - ts) / 1000);
    if (seconds < 5) return "just now";
    if (seconds < 60) return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} ${days === 1 ? "day" : "days"} ago`;
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} ${months === 1 ? "month" : "months"} ago`;
    const years = Math.floor(days / 365);
    return `${years} ${years === 1 ? "year" : "years"} ago`;
}