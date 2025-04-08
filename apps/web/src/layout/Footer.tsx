import dayjs from "@repo/lib/dayjs.ts"

export const Footer = () => {
    return (
        <footer className="footer sm:footer-horizontal footer-center bg-gray-800 p-4 text-white">
            <aside>
                <p>Copyright © {dayjs().format("YYYY")} - 爆肝工程師 箭神 Male帆 製作 ⛏️</p>
            </aside>
        </footer>
    )
}
