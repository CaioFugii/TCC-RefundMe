export function formatNumber(number: number) {
    if (number > 0) {
        let a = number.toFixed(2)
        let b = a.replace(".", ",")
        return b
    }else{
        return
    }
}