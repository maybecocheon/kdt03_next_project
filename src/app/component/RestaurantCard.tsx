import { RestaurantType } from "@/app/restaurant/RestaurantType";
import Link from "next/link";

export default function RestaurantCard({ infos }: { infos: RestaurantType; }) {
    return (
        <div>
            <Link key={infos.UC_SEQ} href={`/restaurant/${infos.UC_SEQ}`}>
            <div className="border rounded-xl w-100 h-96 overflow-hidden">
                {
                        (infos.MAIN_IMG_NORMAL && infos.MAIN_IMG_NORMAL != "null")? (
                            <img src={infos["MAIN_IMG_THUMB"] || undefined} alt={infos["MAIN_TITLE"]} className="h-60 w-full object-cover pb-5" />
                        ) : (
                            <div className="flex h-60 w-full bg-gray-300 pb-5 mb-4 justify-center items-center">
                                이미지 없음
                            </div>
                        )
                }
                <p className="pl-4 font-bold text-2xl">{infos["MAIN_TITLE"]}</p>
                <p className="pl-4 text-gray-600">{infos["GUGUN_NM"]}</p>
                <p className="pl-4 pb-5 pr-4 text-gray-800">대표메뉴: {infos["RPRSNTV_MENU"]}</p>
            </div>
        </Link>
        </div>
    )
}
