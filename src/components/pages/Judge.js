import React, { useState, useContext, Fragment } from 'react'
import { useHistory } from 'react-router-dom'

import { endpoints } from '../../constants/endpoints'
import { store } from '../store'
import { useNetworkRequest, useMountEffect } from '../../hooks'
import MyPost from '../posts/MyPost'

function Judge({ match }) {
    const postID = match.params.id
    const history = useHistory()

    const [judgeQueue, setJudgeQueue] = useState([])
    const { state } = useContext(store)
    const [error, setError] = useState(false)

    const { authApiGet, authApiDelete } = useNetworkRequest()

    useMountEffect(() => {
        async function fetchPosts() {
            console.log(`Fetching posts`)
            const response = await authApiGet(
                endpoints.JUDGE + postID,
                state.token
            )
            if (response) {
                const responseObject = await response.json()
                setJudgeQueue(responseObject)
            }
        }
        fetchPosts()
    })

    const banUser = async () => {
        setError(false)
        const response = await authApiDelete(
            endpoints.JUDGE + postID,
            state.token
        )
        if (response) {
            history.push('/moderate')
            //Redirect to ban landing page
        } else {
            setError(true)
            console.log(`Delete failed for post with id ${postID}`)
        }
    }

    const hasQueue = judgeQueue && judgeQueue.length > 0
    return (
        <Fragment>
            <div className="flexed-row justify-between">
                <div className="title">Commence Judgement</div>
                {hasQueue && (
                    <button className="btn-red" onClick={banUser}>
                        Ban
                    </button>
                )}
                {error && <div className="form-error">Error banning user</div>}
            </div>

            {hasQueue ? (
                judgeQueue.map((post) => <MyPost post={post} />)
            ) : (
                <div>No posts to show for this user</div>
            )}
        </Fragment>
    )
}

export default Judge
