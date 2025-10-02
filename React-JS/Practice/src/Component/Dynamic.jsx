function Daynamic({ list }) {
    return (
        <div>
            <h1>Dyanamic List</h1>
            <ul>
                {list.map((value, index) => {
                    return <li key={index}>{value}</li>
                })}
            </ul>
        </div>
    )
}

export default Daynamic