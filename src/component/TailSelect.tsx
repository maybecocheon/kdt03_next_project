interface TailSelectProps {
    id : string,
    title : string,
    ref : React.RefObject<HTMLSelectElement>,
    values : string[],
    keys : string[],
    onHandle? : () => void
}

export default function TailSelect({ id, title, ref, values, keys, onHandle} : TailSelectProps) {

    const optionList = keys ? keys.map((item, idx) => <option key={idx} value={item}>{values[idx]}</option>) : "";
    
    return (
        <div className="flex flex-col w-200 gap-3">
            <label htmlFor={id} className="font-extrabold text-center bg-amber-300 p-2">{title}</label>
            <select id={id} ref={ref} onChange={onHandle} className="text-center border p-1 rounded-md border-gray-200">
                <option value="">{title} 선택</option>
                {optionList}
            </select>
        </div>
    )
}
