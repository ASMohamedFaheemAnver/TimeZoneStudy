import { useMutation, useQuery } from "@apollo/client";
import { CREATE_POST_MUTATION } from "graphql/mutations/post";
import { GET_POSTS_QUERY } from "graphql/queries/post";
import { ROOT_QUERY } from "graphql/queries/root";
import moment from "moment-timezone";
import { useState } from "react";

const Root = () => {
  const { loading, data } = useQuery(ROOT_QUERY);
  const [
    createPostMutation,
    { loading: isCreatePostLoading, data: createPostData },
  ] = useMutation(CREATE_POST_MUTATION);
  const { data: getPostsData } = useQuery(GET_POSTS_QUERY);
  const posts = getPostsData?.getPosts;

  // const now2 = moment().toDate();
  const now3 = moment();
  const now4 = moment();
  const now = moment().format("YYYY-MM-DDTHH:mm");
  // console.log({ now: now.toString() });
  // Los angeles time
  const losAngelesTime = now3.tz("America/Los_Angeles");
  // Korean time
  const koreanTime = now4.tz("Asia/Seoul");

  // Timezone
  const timeZone = moment.tz.guess();
  // console.log({ timeZone });
  // console.log({
  //   losAngelesTime: losAngelesTime.toString(),
  //   koreanTime: koreanTime.toString(),
  // });
  const [date, setDate] = useState(now);
  const savePostToServer = () => {
    console.log({ date });
    createPostMutation({
      variables: {
        date,
      },
    });
  };

  if (loading) {
    return <div>loading</div>;
  }
  return (
    <div>
      <p>{data?.root?.message}</p>
      <div>
        {posts?.map((post, i) => {
          return <p key={i}>{moment(post?.date).toString()}</p>;
          // return <p key={i}>{new Date(post?.date).toString()}</p>;
        })}
      </div>

      <input
        value={date}
        onChange={(e) => setDate(e.target.value)}
        type="datetime-local"
      />
      <button disabled={!date} onClick={savePostToServer}>
        SAVE DATE
      </button>
    </div>
  );
};

export default Root;
