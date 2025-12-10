import { myFont } from "@/app/fonts";

export default function Footer() {
  return (
    <footer className={`bg-black text-white w-full h-30 flex justify-center items-center ${myFont.className}`}>
        <p>&copy; 이현지 2025 KDT React All rights reserved.</p>
    </footer>
  )
}
