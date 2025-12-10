"use client"

import Link from "next/link";
import { useAtomValue, useSetAtom } from "jotai";
import { userAtom, isLoginAtom } from "@/atoms/atomLogin"
import { useEffect } from "react";

export default function RouteNav() {
    const isLogin = useAtomValue(isLoginAtom);
    const user = useAtomValue(userAtom);

    const setIsLogin = useSetAtom(isLoginAtom);
    const setUser = useSetAtom(userAtom);

    // 새로고침해도 로그인 유지 로직
    useEffect(() => {
        const savedLogin = JSON.parse(localStorage.getItem("login") ?? "0");
        const savedUser = JSON.parse(localStorage.getItem("user_name") ?? '""');

        if (savedLogin === 1) {
            setIsLogin(true);
            setUser({ user_metadata: { user_name: savedUser } });
        } else {
            setIsLogin(false);
            setUser({ user_metadata: { user_name: "" } });
        }
    }, []);

    // 로그인되지 않은 상태
    if (!isLogin) {
        return (
            <div className="w-full h-1/2 mt-5 flex justify-center items-center gap-4 font-bold bg-blue-500 rounded-md p-3 ">
                <Link href="/" className="font-extrabold hover:cursor-pointer hover:text-gray-300">홈</Link>
            </div>
        )
    }
    // 로그인된 상태
    else {
        return (
            <div className="flex">
                <div className="w-full h-1/2 mt-5 flex justify-center items-center gap-4 font-bold bg-blue-500 rounded-md p-3 ">
                    <Link href="/lotto" className="hover:cursor-pointer hover:text-gray-300">로또</Link>
                    <Link href="/festival" className="hover:cursor-pointer hover:text-gray-300">부산축제정보</Link>
                    <Link href="/todolist_json" className="hover:cursor-pointer hover:text-gray-300">할일목록</Link>
                    <Link href="/restaurant" className="hover:cursor-pointer hover:text-gray-300">맛집</Link>
                </div>
                <div className="w-50 h-1/2 mt-5 flex justify-center items-center gap-4 bg-blue-100 rounded-md p-1 ml-3 text-black">
                    <Link href="/" className="text-sm hover:cursor-pointer hover:text-gray-300 flex flex-col items-center">
                        <p className="font-extrabold">[{user?.user_metadata?.user_name}] 님</p>
                        <p className="underline underline-offset-2">로그아웃</p>
                    </Link>
                </div>
            </div>

        )
    }
}