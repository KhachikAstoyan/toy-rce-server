export const RequestHandler =
  (context: any) =>
  (target: any, key: string, descriptor: PropertyDescriptor) => {
    const fn = descriptor.value
    if (typeof descriptor.value !== 'function') {
      throw new TypeError('cannot decorate prop that is not a function')
    }

    descriptor.value = async (...args: any[]) => {
      try {
        await fn.apply(context, args)
      } catch (error) {
        const [, , next] = args
        next(error)
      }
    }
  }
