function getTime(value: number) {
    let curr = value * 100 / 2;
    if (value % 2 !== 0) {
        curr -= 20;
    }
    return curr;

}

function getTimeString(time: number) {
    let curr = new String(time);
    switch (curr.length) {
        case 1:
            curr = "000" + curr;
            break;
        case 3:
            curr = "0" + curr;
            break;
        case 2:
            curr = "00" + curr;
            break;
        default:
            curr;
    }
    let tmp = curr.slice(0, 2);
    curr =
        (tmp > 12 ? tmp - 12 : tmp === "00" ? "12" : tmp) +
        ":" +
        curr.slice(2) +
        (tmp > 11 ? "pm" : "am");

    return `${curr}`;
}


export default function getOpenHoursString(day: [number, number]) {
    let [start, end] = day;
    if (start === end) return 'Closed';
    return `${getTimeString(getTime(start))} - ${getTimeString(getTime(end))}`
}


