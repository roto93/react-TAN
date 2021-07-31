import React, { useState } from 'react'

const Upload = () => {
    const NOW = new Date()
    const [type, setType] = useState('');
    const [time, setTime] = useState('');
    const [nthOfToday, setNthOfToday] = useState(1);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const formValidate = () => {
        if (type === '') return
        if (time === '') return
        if (title === '') return
        if (content === '') return
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const isValid = formValidate()
        if (!isValid) return
        const requestBody = {
            type: type,
            year: Number(time.slice(0, 4)),
            month: convertMonth(Number(time.slice(5, 7)) + 1),
            date: Number(time.slice(8, 10)),
            title: title,
            content: content,
        }
        console.log(requestBody)

        const res = await fetch('http://127.0.0.1:5000/archive', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        })
        const jsonRes = await res.json()
        console.log(jsonRes)

        console.log('submit')
    }

    const changeType = (e) => {
        setType(e.target.value)
    }

    const changeTitle = (e) => {
        setTitle(e.target.value)
    }

    const changeContent = (e) => {
        setContent(e.target.value)
    }

    return (
        <div className="upload">
            <div className="container">
                <div className="upload__content">
                    <form
                        onSubmit={handleSubmit}
                    >
                        <label>type</label>
                        <select value={type} required onChange={changeType}
                            style={{ color: !type ? 'grey' : 'black' }}
                        >
                            <option value='' hidden >- - Select an issue type - -</option>
                            <option value="Announcement">Announcement</option>
                            <option value="Conferences">Conferences</option>
                            <option value="Seminar">Seminar</option>
                            <option value="Opportunities">Opportunities</option>
                            <option value="Observations">Observations</option>
                            <option value="Miscellaneous">Miscellaneous</option>
                        </select>

                        <label >date</label>
                        <input
                            required
                            type="date"
                            onChange={e => setTime(e.target.value)}></input>


                        <label>title</label>
                        <input
                            required
                            type="text"
                            value={title}
                            onChange={changeTitle}
                        />


                        <label>content</label>
                        <textarea
                            cols="30" rows="10"
                            value={content}
                            onChange={changeContent}
                        ></textarea>
                        <button type="submit"></button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Upload


const convertMonth = (num) => {
    switch (num) {
        case 1: return 'Jan'
        case 2: return 'Feb'
        case 3: return 'Mar'
        case 4: return 'Apr'
        case 5: return 'May'
        case 6: return 'Jun'
        case 7: return 'Jul'
        case 8: return 'Aug'
        case 9: return 'Sep'
        case 10: return 'Oct'
        case 11: return 'Nov'
        case 12: return 'Dec'
    }
}