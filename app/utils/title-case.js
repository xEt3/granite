export default function titleCase ([ value ]) {
  return value && typeof value === 'string' ? value.replace(/\w\S*/g, str => {
    return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
  }) : value;
}
