import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'
import { useParams } from 'react-router-dom';

const Detail = () => {
    const { id } = useParams()
    const [time, setTime] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState([]);
    const getText = async () => {
        const res = await fetch(`http://127.0.0.1:5000/archive/id/${id}`)
        const issue = (await res.json()).issue
        console.log(issue)
        setTime(`${issue.year} - ${issue.date.slice(0, 2)} - ${issue.date.slice(2, 4)}`)
        setTitle(issue.title)
        const lines = issue.content.split('\n')

        setContent(lines)

    }

    useEffect(() => {
        getText()
    }, [])

    return (
        <div className="detail">
            <div className="container">
                <h2 className="detail__issue-title">{title}</h2>
                <h3 className="detail__date-title">update: {time}</h3>
                <div className="detail__content">
                    {content.length !== 0
                        ? content.map((line, i) => <p key={i}>{line || '　'}</p>)
                        : <ReactLoading type="bubbles" width="30px" height="30px" color="white" />
                    }
                </div>
            </div>
        </div>
    )
}

export default Detail
