import React, { useEffect, useState } from 'react'

const Detail = () => {
    const [content, setContent] = useState([]);
    const getText = async () => {
        const res = await fetch('/MOCK/test_issue.txt')
        const text = await res.text()
        const line = text.split('\r\n')
        setContent(line)
    }

    useEffect(() => {
        getText()
    }, [])

    return (
        <div className="detail">
            <div className="container">
                <div className="detail__content">
                    {content.map((line, i) => <p key={i}>{line || '　'}</p>)}
                </div>
            </div>
        </div>
    )
}

export default Detail
