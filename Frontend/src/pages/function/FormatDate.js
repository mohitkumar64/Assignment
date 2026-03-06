import dayjs from "dayjs"

export default function FormatDate(date){
    return ( dayjs(date).format('DD-MM-YYYY'))
}