'use client'

import { useAtom } from "jotai";
import TailButton from "../component/TailButton";
import TailInput from "../component/TailInput";
import { FormEvent, useEffect, useRef, useState } from "react";
import { userAtom } from "@/atoms/atom";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase/client";

export default function Home() {
  const [user, setUser] = useAtom(userAtom);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // Listen for auth state changes
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // If login is successful, session object exists
        setUser(session);
      }
    );

    // Cleanup function
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [setUser]);

  // Redirect if user is logged in
  useEffect(() => {
    if (user) {
      router.push('/history');
    }
  }, [user, router]);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해 주세요.');
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert('로그인에 실패했습니다: ' + error.message);
      }
      // The onAuthStateChange listener will handle the successful login and redirection
    } catch (err) {
      console.log(err);
      alert('로그인 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해 주세요.');
      setLoading(false);
      return;
    }

    // 현재 사이트의 도메인을 동적으로 가져옴 (localhost 또는 배포 도메인)
    const origin = window.location.origin;
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${origin}`,
        },
      });

      if (error) {
        alert('회원가입에 실패했습니다: ' + error.message);
      } else {
        alert('회원가입 성공! 이메일을 확인하여 인증을 완료해주세요.');
      }
    } catch (error) {
      alert('회원가입 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50">
      <div className="bg-white p-10 w-120 border-gray-200 border-1 rounded-md">
        <p className="font-extrabold text-2xl text-center">로그인</p>
        <form className="flex flex-col" onSubmit={handleLogin}>
          <p>이메일 주소</p>
          <TailInput type="text" name="email" id="email" placeholder="아이디 입력" ref={emailRef}/>
          <p>비밀번호</p>
          <TailInput type="password" name="password" id="password" placeholder="비밀번호 입력" ref={passwordRef}/>
          <div className="flex w-full gap-3">
            <TailButton type="submit" caption={loading? "로그인 중..." : "로그인"} color="blue"/>
            <TailButton type="button" caption="회원가입" color="red" onHandle={handleSignup}/>
          </div>
        </form>
      </div>
    </div>
  );
}
