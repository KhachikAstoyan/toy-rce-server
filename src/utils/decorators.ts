export const HandleErrors = (
  target: any,
  key: string,
  descriptor: PropertyDescriptor
) => {
  const fn = descriptor.value
  descriptor.value = async (...args: any[]) => {
    try {
      await fn.apply(this, args)
    } catch (error) {
      const [, , next] = args
      next(error)
    }
  }
}
