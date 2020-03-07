export const formatHourMitues = (value) => {
  let date =  new Date(value);

  return date.getHours() + " : " + date.getMinutes();
}

export const formatHMDFlight = (value) => {
  let date = new Date(value);

  return date.getHours() + "h" + date.getMinutes() + " - " + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
}

export const intToTime = value => {
  var num = value;
  var hours = (num / 60);
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);

  return rhours + "h" + rminutes + "m";
}
