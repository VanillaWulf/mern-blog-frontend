import React from "react";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import ReactMarkdown from 'react-markdown'

import { useParams} from 'react-router-dom';
import axios from "../axios.js";

export const FullPost = () => {
    const {id} = useParams();
    const [data, setData] = React.useState();
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        axios.get(`/posts/${id}`).then((res) =>
            {
                setData(res.data);
                setIsLoading(false);
            }
        ).catch((err) => {
            console.warn(err);
        })
    }, []);

    if (isLoading) {
        return <Post isLoading={isLoading} isFullPost/>
    }

    return (
        <>
          <Post
            id={data._id}
            title={data.title}
            imageUrl={data.imgUrl? `${process.env.REACT_APP_URL}${data.imgUrl}`: ''}
            user={data.user}
            createdAt={data.createAt}
            viewsCount={data.viewCount}
            commentsCount={3}
            tags={data.tags}
            isFullPost
          >
            {/*<p>*/}
            {/*  {data.text}*/}
            {/*</p>*/}
            <ReactMarkdown children={data.text}  />
          </Post>
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: "Вася Пупкин",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "Это тестовый комментарий 555555",
              },
              {
                user: {
                  fullName: "Иван Иванов",
                  avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                },
                text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
              },
            ]}
            isLoading={false}
          >
            <Index />
          </CommentsBlock>
        </>
    );
};
