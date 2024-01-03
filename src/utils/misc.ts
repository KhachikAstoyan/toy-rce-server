export function omitFields(obj: any, fields: string[]) {
  Object.keys(obj).forEach((key) => {
    if (fields.includes(key)) delete obj[key]
  })
}
