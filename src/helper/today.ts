export function Today () {
let todayDate
const d = new Date();
d.setDate(d.getDate());
return todayDate = d.toISOString().substr(0, 10);
}