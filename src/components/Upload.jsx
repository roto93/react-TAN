import React, { useState } from 'react'
import { auth } from '../firebase';
import { API_URI } from '../lib/ENV';
import { ToastContainer, toast } from 'react-toastify';

const Upload = () => {
  const [type, setType] = useState('');
  const [time, setTime] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [textareaHeight, setTextareaHeight] = useState(undefined);

  const formValidate = () => {
    if (type === '') return
    if (time === '') return
    if (title === '') return
    if (content === '') return
    return true
  }

  const preventSubmit = (e) => { e.key === 'Enter' && e.preventDefault(); }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValid = formValidate()
    if (!isValid) return

    const checkTitle = (type, inputTitle) => {
      if (type !== 'Announcement') return inputTitle
      if (inputTitle.slice(4) === 'TAN ') return inputTitle
      return `TAN ${inputTitle}`
    }
    const requestBody = {
      type: type,
      year: Number(time.slice(0, 4)),
      date: time.slice(5, 7) + time.slice(8, 10),
      title: checkTitle(type, title),
      content: content,
    }
    try {
      const res = await fetch(`${API_URI}/archive`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
      })
      const json = await res.json()
      console.log(json)

      if (json.status === 'resolved') {
        toast.success('Update successfully', {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        setType('')
        setTitle('')
        setContent('')
      }
      if (json.status === 'rejected') toast.error(`Update failed: ${json.message}`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } catch (e) { console.log('[Post error]', e) }

  }

  const changeType = (e) => setType(e.target.value)
  const changeTitle = (e) => setTitle(e.target.value)
  const changeContent = (e) => setContent(e.target.value)

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

                <label>Type</label>
                <select
                  className="upload__form__select"
                  value={type}
                  required
                  onChange={changeType}
                  style={{ color: !type ? 'grey' : 'black' }}
                  onKeyPress={preventSubmit}
                >
                  <option value='' hidden >- - Select an issue type - -</option>
                  <option value="Announcement">Announcement</option>
                  <option value="Conferences">Conferences</option>
                  <option value="Seminar">Seminar</option>
                  <option value="Opportunities">Opportunities</option>
                  <option value="Observations">Observations</option>
                  <option value="Miscellaneous">Miscellaneous</option>
                </select>

                <label >Date</label>
                <input
                  className="upload__form__date"
                  required
                  type="date"
                  onChange={e => setTime(e.target.value)}
                  onKeyPress={preventSubmit}
                />


                <label>Title</label>
                <input
                  className="upload__form__title"
                  required
                  type="text"
                  value={title}
                  onChange={changeTitle}
                  onKeyPress={preventSubmit}
                />
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
                    console.log(height)
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
                className="upload__form__button"
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
    </div>
  )
}

export default Upload
