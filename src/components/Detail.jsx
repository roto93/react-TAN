import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'
import { useHistory, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
import { API_URI } from '../lib/ENV';
import DeleteThis from '../images/DeleteThis.jpg'
import ConfirmModal from './ConfirmModal';
import { titleIgnoreBreak } from '../lib/lib';

const Detail = () => {
    const { currentUser } = useAuth()
    const { id } = useParams()
    const history = useHistory()
    const [time, setTime] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const getText = async () => {
        const t1 = new Date()
        const res = await fetch(`${API_URI}/archive/id/${id}`)
        const json = (await res.json())
        console.log(json)
        if (json.status == 'resolved') {
            const issue = json.issue
            setTime(`${issue.year} - ${issue.date.slice(0, 2)} - ${issue.date.slice(2, 4)}`)
            let wrappedTitle = titleIgnoreBreak(issue.title)
            setTitle(wrappedTitle)
            const lines = issue.content.split('\n')

            setContent(lines)
            const t2 = new Date()
            console.log(`Use ${t2 - t1}ms to fetch`)
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
            console.log(json.status, ',', json.message)
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

    useEffect(() => {
        getText()
    }, [])

    return (
        <div className="detail">
            <div className="container">
                <h2 className="detail__issue-title">{title}</h2>
                <h3 className="detail__date-title">{time && `update: ${time}`}</h3>
                <div className="detail__content">
                    {content.length !== 0
                        ? content.map((line, i) => <p key={i}>{line || '　'}</p>)
                        : <ReactLoading type="bubbles" width="30px" height="30px" color="white" />
                    }
                </div>
                {/* 祖刻薄 */}
                {title !== 'Not Found' && currentUser
                    && <div className="detail__admin" >
                        <img
                            className="detail__deleteThis"
                            onClick={confirmDelete}
                            src={DeleteThis}
                            alt="Detele This"
                            style={{ width: '100px', height: '100px' }}
                        />
                        <button className="detail__editThis" onClick={onEdit}>Edit</button>
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
