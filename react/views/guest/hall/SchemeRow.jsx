import SchemeCell from "./SchemeCell";

export default function SchemeRow({row}) {
    return (
        <div className="buying-scheme__row">{
            row.map((cell, index) => <SchemeCell item={cell} key={index}/>)
        }</div>
    )
}
