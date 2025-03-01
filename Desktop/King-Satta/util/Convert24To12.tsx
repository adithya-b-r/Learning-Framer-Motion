export const Convert24To12 = (props: string) => {
  let [hourVal, minVal] = props.split(':');

  let hourNum = parseInt(hourVal);

  const period = hourNum >= 12 ? "PM" : "AM";
  hourNum = hourNum % 12 || 12;

  return (`${hourNum}:${minVal} ${period}`);
}