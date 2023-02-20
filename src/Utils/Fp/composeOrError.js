const composeOrError = (...functions) =>
  async function (arg) {
    let result = arg
    for (const func of functions) {
      result = await func.apply(this, [result])
      if (result instanceof Error) {
        break
      }
    }
    return result
  }

export default composeOrError
