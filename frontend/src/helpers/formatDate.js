const formatHourMitues = (value) => {
  let date = new Date(value);

  return date.getHours() + " : " + date.getMinutes();
}
export default formatHourMitues;
