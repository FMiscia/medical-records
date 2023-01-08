export const formatDate = (date: Date, separator?: string) => {
    if (!date.getDate()) {
        return ''
    }
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return [day, month, year].join(separator || '/')
}

export const formatDateWithTime = (date: Date, separator?: string) => {
    if (!date.getDate()) {
        return ''
    }
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hour = date.getHours()
    const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
    return `${day}/${month}/${year} ${hour}:${minutes}`
}

export const getInitialDateRange = (future = false, gap = 3) => {
    const today = new Date()
    const monthGap = future ? today.getMonth() + gap : today.getMonth() - gap
    const otherDate = new Date()
    otherDate.setMonth(monthGap % 12)
    today.setDate(today.getDate() + 1)
    return [today, otherDate]
}

export const getPaddedMonth = (date: Date) => {
    const month = date.getMonth() + 1
    return '0' + month.toString().slice(-2)
}
export const getPaddedDay = (date: Date) => {
    return ('0' + date.getDate().toString()).slice(-2)
}
