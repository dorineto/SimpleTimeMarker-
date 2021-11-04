export function secondsToTimeString (totalSeconds) {
    let hour = Math.trunc(totalSeconds / 3600);
    hour = (hour < 10 ? "0" : "") + hour;

    let minutes = Math.trunc((totalSeconds % 3600) / 60);
    minutes = (minutes < 10 ? "0" : "") + minutes;

    let seconds =  totalSeconds % 60;
    seconds = (seconds < 10 ? "0" : "") + seconds;

    return `${hour}:${minutes}:${seconds}`;
}