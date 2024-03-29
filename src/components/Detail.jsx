import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'
import { useHistory, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
import { API_URI } from '../lib/ENV';
import ConfirmModal from './ConfirmModal';
import { titleDoBreak } from '../lib/lib';
import { BackToTop } from '../images/SVG'
import useWindowSize from '../hooks/useWindowSize'

const Detail = () => {
    const { currentUser } = useAuth()
    const { id } = useParams()
    const history = useHistory()
    const [time, setTime] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const { height: winY } = useWindowSize()


    const getText = async () => {
        const res = await fetch(`${API_URI}/archive/id/${id}`)
        const json = (await res.json())
        // console.log(json)
        if (json.status === 'resolved') {
            const issue = json.issue
            setTime(`${issue.year} - ${issue.date.slice(0, 2)} - ${issue.date.slice(2, 4)}`)
            let wrappedTitle = titleDoBreak(issue.title)
            setTitle(wrappedTitle)
            const lines = issue.content.split('\n')

            setContent(lines)
        } else {
            setTitle('Not Found')
            setContent([`${json.message}`])
        }
    }

    const deleteIssue = async () => {
        try {
            const res = await fetch(`${API_URI}/archive/id/${id}`, {
                method: "DELETE"
            })
            const json = await res.json()
            // console.log(json.status, ',', json.message)
            if (json.status === 'resolved') {
                setTimeout(() => {
                    const prevPath = history.location.state.from
                    if (prevPath) history.push(prevPath)
                    else history.go(-1)
                }, 500);
            }
        } catch (err) {
            console.log(err)
        }

    }

    const confirmDelete = () => {
        // open confirm modal
        setShowConfirmModal(true)
    }

    const onEdit = () => {
        history.push(`/archive/update/${id}`)
    }

    const backToTop = () => {
        window.scrollTo(0, winY - 100)
    }

    useEffect(() => {
        getText()
    }, [])

    return (
        <div className="detail">
            <div className="container">
                <h2 className="detail__issue-title">{title}</h2>
                <h3 className="detail__date-title">{time && `update: ${time}`}</h3>


                {/* 祖刻薄 */}
                {title !== 'Not Found' && currentUser
                    && <div className="detail__admin" >
                        {/* <img
                            className="detail__deleteThis"
                            onClick={confirmDelete}
                            src={DeleteThis}
                            alt="Detele This"
                            style={{ width: '100px', height: '100px' }}
                        /> */}
                        <div className="detail__button delete" onClick={confirmDelete}>Delete</div>
                        <div className="detail__button" onClick={onEdit}>Edit</div>
                    </div>
                }


                <div className="detail__content">
                    {content.length !== 0
                        ? content.map((line, i) => <p key={i}>{line || '　'}</p>)
                        : <div style={{ alignSelf: 'center', margin: '20px' }}>
                            <ReactLoading type="bubbles" width="50px" height="50px" color="white" />
                        </div>
                    }

                </div>
                <div className="detail__back-to-top"
                    onClick={backToTop}
                >
                    <div className="detail__back-to-top__icon">
                        <BackToTop />
                    </div>
                    <p className="detail__back-to-top__text">Back to top</p>
                </div>

                {/* 祖刻薄 */}
                {title !== 'Not Found' && currentUser
                    && <div className="detail__admin" >
                        {/* <img
                            className="detail__deleteThis"
                            onClick={confirmDelete}
                            src={DeleteThis}
                            alt="Detele This"
                            style={{ width: '100px', height: '100px' }}
                        /> */}
                        <div className="detail__button delete" onClick={confirmDelete}>Delete</div>
                        <div className="detail__button" onClick={onEdit}>Edit</div>
                    </div>
                }
                <ConfirmModal
                    isVisible={showConfirmModal}
                    dismiss={() => { setShowConfirmModal(false) }}
                    confirmAction={deleteIssue}
                    title={'Are you sure you want to delete this issue?'}
                />
            </div>
        </div>
    )
}

export default Detail
