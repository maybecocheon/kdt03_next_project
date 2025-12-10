//객체로 받지 않고 배열로도 가능
const BallStyle = [
    "bg-blue-400",
    "bg-red-400",
    "bg-green-400",
    "bg-yellow-400",
    "bg-gray-400"
] as const;     // 상수, 읽기 전용

interface TailBallProps {
    n: number | undefined
}

export default function TailBall({ n }: TailBallProps) {

    return (
        <div className={`w-15 h-15 m-5 rounded-full flex justify-center items-center ${n && BallStyle[Math.floor(n / 10)]} font-bold`}>
            <p>
                {n}
            </p>
        </div>
    )
}
