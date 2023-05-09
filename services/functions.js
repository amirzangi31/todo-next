const shorthen = (text, length) => {
    const one = text.split("")
    const two = one.slice(0, length)
    const result = two.join("")
    return result


}

export { shorthen }