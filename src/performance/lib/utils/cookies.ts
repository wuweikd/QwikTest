export const getCookie = (name: any) => {
  const RE = new RegExp(`(^| )${name}=([^;]*)(;|$)`)
  const arr = document.cookie.match(RE)
  if (arr) {
    return unescape(arr[2])
  }
  return ""
}
