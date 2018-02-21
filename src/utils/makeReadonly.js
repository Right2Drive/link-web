export default function makeReadonly (obj) {
  return new Proxy(obj, {
    set () {
      throw new Error('object is readonly')
    }
  })
}
