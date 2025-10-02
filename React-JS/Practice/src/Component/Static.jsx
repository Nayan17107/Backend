function StaticList({ list }) {
    return (
        <div>
            <h2>Static List</h2>
            <li>{list[0]}</li>
            <li>{list[1]}</li>
            <li>{list[2]}</li>
            <li>{list[3]}</li>
            <li>{list[4]}</li>
        </div>
    )
}

export default StaticList;