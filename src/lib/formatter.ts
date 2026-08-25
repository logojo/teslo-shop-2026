export const formatter = new Intl.DateTimeFormat("es-MX", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

export const currencyFormatter = ( value: number ) => {
    return value.toLocaleString('es-ES', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2
    })
};
