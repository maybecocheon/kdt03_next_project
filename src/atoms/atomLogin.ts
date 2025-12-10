import { atom } from "jotai";

// 기본값은 서버에서도 안전한 값으로 설정
export const isLoginAtom = atom<boolean>(false);

interface User {
  user_metadata: { user_name: string }
}

// 기본 유저 정보
export const userAtom = atom<User>({
  user_metadata: { user_name: "" }
});