interface TailCardProps {
  source : string,
  title: string,
  subtitle: string,
  keyword: string
}

export default function TailCard({source, title, subtitle, keyword} : TailCardProps) {

  // 키워드 분리해서 해시태그로 넣기
  let keywords : React.ReactElement | React.ReactElement[] = [];
  
  if (keyword != "" && keyword != null && keyword != " ") {
    if (keyword.includes(",")){
      let tm = keyword.split(", ");
      keywords = tm.map((item, i) => <p key = {i} className="p-2 rounded-full bg-gray-300">#{item}</p>);
    } else {
       keywords = <p className="p-2 rounded-full bg-gray-300">#{keyword}</p>;
    }
  }

  return (
    <div className="rounded-lg w-100 shadow-md overflow-hidden flex flex-col h-full">
      <img src={source} className="rounded-lg h-60 w-full object-cover"/>
      <div className="flex flex-col p-4">
        <div>
        <p className="font-extrabold text-2xl text-gray-900 mb-1">{title}</p>
        <p className="text-lg text-gray-900">{subtitle}</p>
        </div>
        <div className="w-full mt-5 mb-2 flex flex-wrap gap-2 text-sm text-gray-900">
          {keywords}
        </div>
      </div>
    </div>
  )
}