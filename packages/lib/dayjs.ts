import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/zh-tw"
import { Dayjs } from "dayjs";

dayjs.extend(relativeTime)
dayjs.locale("zh-tw")

export default dayjs
export {
    Dayjs
}
