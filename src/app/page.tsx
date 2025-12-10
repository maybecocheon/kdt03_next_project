'use client'

import { useAtom } from "jotai";
import TailButton from "./component/TailButton";
import TailInput from "./component/TailInput";
import { FormEvent, useEffect, useRef, useState } from "react";
import { userAtom } from "@/atoms/atom";
import { useRouter } from "next/router";
import { supabase } from "@/supabase/client";

export default function Home() {
  const [user, setUser] = useAtom(userAtom);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // Listen for auth state changes
  useEffect(()=>{
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session);
      }
    );

    return () => {
      authListener.subscription.callback;
    }
  }, [setUser])

  // Redirect if user is logged in
  useEffect(()=>{

  },  [user, router])

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password){
      alert("이메일과 비밀번호를 입력하세요.");
      setLoading(false);
    }

    try {
      const { error } = await supabase.auth.signInWithIdToken;
    } catch {

    } finally {
      setLoading(false);
    }
  }

  const handleSignup = async () => {
    try {
      const { error } = await supabase.auth.signUp;
    } catch {

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50">
      <div className="bg-white p-10 w-120 border-gray-200 border-1 rounded-md">
        <p className="font-extrabold text-2xl text-center">로그인</p>
        <form className="flex flex-col" onSubmit={handleLogin}>
          <p>이메일 주소</p>
          <TailInput type="text" name="email" placeholder="아이디 입력" ref={emailRef}/>
          <p>비밀번호</p>
          <TailInput type="password" name="password" placeholder="비밀번호 입력" ref={passwordRef}/>
          <div className="flex w-full gap-3">
            <TailButton type="submit" caption={loading? "로그인 중..." : "로그인"} color="blue"/>
            <TailButton type="button" caption="회원가입" color="red" onHandle={handleSignup}/>
          </div>
        </form>
      </div>
    </div>
  );
}
