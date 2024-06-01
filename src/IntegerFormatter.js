const IntegerFormatter = new Intl.NumberFormat('en-us', {
    maximumFractionDigits: 0
})

export function formatOperand(operand){
    if(isNaN(operand)){
        return operand
    }
    const [integer, decimal] = operand.split(".")

    if(decimal == null){
        return IntegerFormatter.format(integer)
    }
    return `${IntegerFormatter.format(integer)}.${decimal}`
}