import React from "react";

const Rank = ({name, entries}) => {
    return (
        <div className="mb0">
            <p className="f3">{`${name}, your entry count is:`}</p>
            <p className="f3">{entries}</p>
        </div>
    )
}

export default Rank;

