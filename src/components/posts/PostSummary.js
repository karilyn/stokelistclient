import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

import { DisabledOverlay, GridLayout, FlexBetweenRow } from '../shared/Layouts'
import PostLocation from './PostLocation'
import PostPrice from './PostPrice'
import { HiddenLink } from '../shared/Text'
import { getDateRangeString } from '../../util/datetime'

const PostDetail = styled.div`
    margin-bottom: 10px;
    color: #175e88;
    font-size: 1.2em;
`

const PostImageContainer = styled.div`
    display: flex;
    min-height: 100%;
    border-right: 1px solid #dce2eb;
    border-radius: 5px 0px 0px 5px;
    min-width: 160px;
    justify-content: center;
    align-items: center;
`

const PostDetailsContainer = styled.div`
    flex-grow: 1;
    box-sizing: border-box;
    margin: 10px 20px;
`

const PostTextSummary = styled.div`
    margin-top: 15px;
    font-size: 0.9em;
    color: #000000cc;
`

const PostSummaryContainer = styled.div`
    display: flex;
    margin: 10px 0;
    grid-area: 1 / 1;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 1px 1px 5px #0000001a;
    border: 1px solid #dce2e8;
    border-radius: 5px;
`

const PostImage = styled.img`
    border-radius: 5px 0px 0px 5px;
`

const PostTitle = styled.div`
    color: #434653;
    font-size: 1.3em;
    font-weight: bold;
`

const ResponsiveRow = styled(FlexBetweenRow)`
    /* Small Devices, Tablets */
    @media only screen and (max-width: 768px) {
        flex-direction: column;
    }
`

//Generates a full width summary for a post, can be disabled
function PostSummary({ post, disabled }) {
    const imgURL = post.photoFileSize
        ? 'http://list.thestoke.ca/photos/' + post.id + '/thumb.jpg'
        : 'http://list.thestoke.ca/images/placeholder.png'

    const isGarageSale = post.isGarageSale === true

    return (
        <GridLayout>
            {disabled ? <DisabledOverlay /> : null}
            <PostSummaryContainer>
                <PostImageContainer>
                    <Link to={`/post/${post.id}`}>
                        <PostImage src={imgURL} alt={'thumbnail'} />
                    </Link>
                </PostImageContainer>
                <PostDetailsContainer>
                    <ResponsiveRow>
                        <PostTitle>
                            <HiddenLink to={`/post/${post.id}`}>
                                {post.title}
                            </HiddenLink>
                        </PostTitle>
                        <PostLocation postDetails={post} />
                    </ResponsiveRow>
                    <PostDetail>
                        {isGarageSale ? (
                            getDateRangeString(post.startTime, post.endTime)
                        ) : (
                            <PostPrice price={post.price} />
                        )}
                    </PostDetail>
                    <PostTextSummary>
                        <ReactMarkdown source={post.description} />
                    </PostTextSummary>
                </PostDetailsContainer>
            </PostSummaryContainer>
        </GridLayout>
    )
}

export default PostSummary
