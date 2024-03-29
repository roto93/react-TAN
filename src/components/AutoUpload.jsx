import React, { useState } from 'react'
import { auth } from '../firebase';
import { API_URI } from '../lib/ENV';
import { ToastContainer } from 'react-toastify';
import { errorToast, successToast } from '../lib/toast';

const Upload = () => {
    const [typeString, setTypeString] = useState('');
    const [content, setContent] = useState('');
    const [textareaHeight, setTextareaHeight] = useState(undefined);
    const [lastUpdateTime, setLastUpdateTime] = useState('');

    const formValidate = () => {
        if (typeString === '') return
        if (content === '') return
        return true
    }

    const preventSubmit = (e) => { e.key === 'Enter' && e.preventDefault(); }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const isValid = formValidate()
        if (!isValid) return

        const requestBody = {
            types: typeString,
            content: content,
        }
        try {
            const res = await fetch(`${API_URI}/archive/auto`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody)
            })
            console.log(res)
            if (res.status === 500) return errorToast(`Update failed. ${res.statusText}`)
            const json = await res.json()
            console.log(json)

            if (json.status === 'resolved') {
                successToast('Update successfully')
                // console.log(json.updated_issue_time)
                setLastUpdateTime(json.updated_issue_time)
                setTypeString('')
                setContent('')
            }
            if (json.status === 'rejected') errorToast(`Update failed: ${json.message}`)
        } catch (e) {
            console.log('[Post error]', e)
            errorToast('Update failed. Please check the format.')
        }
    }

    const changeTypeString = (e) => setTypeString(e.target.value)
    const changeContent = (e) => setContent(e.target.value)

    const onUndo = () => setTypeString('')

    const Abbreviation = {
        Conferences: 'c',
        Seminar: 's',
        Opportunities: 'j',
        Observations: 'o',
        Miscellaneous: 'm',
    }

    const onTypeClick = (text) => {
        // console.log(text)
        setTypeString(prev => prev + Abbreviation[text])
    }

    return (
        <div className="upload">
            <div className="container">
                <div className="upload__content">
                    <h1 className="upload__title">Upload Issue</h1>
                    <form
                        className="upload__form"
                        onSubmit={handleSubmit}
                    >
                        <div className="upload__form__first">
                            <div className="upload__form__first__input">

                                <div className="upload__form__types__input__container">
                                    <label>Types</label>
                                    <input
                                        className="upload__form__types__input"
                                        required
                                        type="text"
                                        value={typeString}
                                        onChange={changeTypeString}
                                        contentEditable={false}
                                    />
                                    <button
                                        type="button"
                                        onClick={onUndo}
                                        className="upload__clear-button">
                                        Clear
                                    </button>
                                    {['Conferences', 'Seminar', 'Opportunities', 'Observations', 'Miscellaneous']
                                        .map(text => (
                                            <button
                                                key={text}
                                                type={'button'}
                                                className="upload__type-button"
                                                onClick={() => { onTypeClick(text) }}>
                                                {text}
                                            </button>
                                        ))}
                                    <input type="submit" hidden />
                                </div>


                            </div>

                            <button
                                className="upload__form__button"
                                type="submit">Submit</button>


                        </div>
                        <div className="upload__form__second">

                            <label>Content</label>
                            <textarea
                                onKeyDown={(e) => {
                                    let height = e.target.scrollHeight
                                    if (height < 650) {
                                        // console.log(height)
                                        setTextareaHeight(`${height}px`)
                                    }
                                }}
                                style={{ height: textareaHeight }}
                                className="upload__form__textarea"
                                cols="30" rows="10"
                                value={content}
                                onChange={changeContent}
                            />
                            <button
                                className="upload__form__button__mobile"
                                type="submit">Submit</button>
                        </div>
                    </form>
                    <button
                        className="upload__signout__button"
                        onClick={() => { auth.signOut() }}
                    >
                        sign out
                    </button>
                </div>
                <p className="upload_last_updated">Last updated issue time: {lastUpdateTime}</p>
            </div>
            <ToastContainer
                position="bottom-center"
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={"dark"}
            />
        </div >
    )
}

export default Upload
