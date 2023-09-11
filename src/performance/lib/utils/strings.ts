// @ts-ignore
export const endsWith = (str, suffix) => {
  return str.indexOf(suffix, str.length - suffix.length) !== -1
}

// @ts-ignore
export const trim = (str) => {
  return String(str).replace(/(^\s*)|(\s*$)/g, "")
}

