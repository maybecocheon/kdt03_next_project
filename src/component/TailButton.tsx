const btStyle = {
        blue: {
            base: "bg-blue-400",
            hover: "hover:bg-blue-200 hover:text-blue-950"
        },
        orange: {
            base: "bg-orange-400",
            hover: "hover:bg-orange-200 hover:text-orange-950"
        },
        green: {
            base: "bg-green-600",
            hover: "hover:bg-green-200 hover:text-green-950"
        },
        red: {
            base: "bg-red-400",
            hover: "hover:bg-red-200 hover:text-red-950"
        },
        yellow: {
            base: "bg-yellow-400",
            hover: "hover:bg-yellow-200 hover:text-red-950"
        }
} as const

type BtColor = keyof typeof btStyle;

interface TailButtonProps {
    type : "submit" | "reset" | "button",
    color : BtColor,
    caption : string,
    onHandle? : (e:React.MouseEvent<HTMLButtonElement>) => void,         // 해도 되고 [onHandle? : () => void] 해도 됨
    disabled?: boolean
}
    
export default function TailButton({type, color, caption, onHandle, disabled} : TailButtonProps) {

    //btStyle 객체에서 color에 해당하는 스타일 가져오기
    //예: color가 "blue"이면 btStyle["blue"] 반환
    //btStyle.blue = btStyle["blue"] => color라는 변수로 접근하려면 무조건 대괄호 표기법 사용
    const bt = btStyle[color];

    return (
        <div className="w-full h-full"> 
            {/* 변수 사용하려면 표현식 안에 넣어 주어야 함 */}
            <button type={type}
                    className={`rounded-md pb-3 pt-3 pl-5 pr-5 w-full h-full text-white hover:cursor-pointer hover:font-bold ${bt.base} ${bt.hover} disabled:opacity-2`}
                    onClick={onHandle} disabled={disabled}>{caption}</button>
        </div>
    )
}
