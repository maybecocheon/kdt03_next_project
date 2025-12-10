import RouteNav from "./RouteNav"
import { myFont } from "@/app/fonts";

export default function Header() {
  return (
    <header className={`bg-blue-400 text-white w-full h-30 px-5 ${myFont.className}`}>
      <nav className='w-full p-5 mx-auto flex justify-between items-center'>
        <h1 className='font-extrabold text-4xl'>KDT React</h1>
        {/* space-x => 요소 사이의 공간을 제어 */}
        <ul className='flex justify-between items-end space-x-4'>
          <RouteNav />
        </ul>
      </nav>
    </header>
  )
}
