import { useMutation, useQuery } from "@apollo/client";
import { CREATE_POST_MUTATION } from "graphql/mutations/post";
import { ROOT_QUERY } from "graphql/queries/root";
import moment from "moment-timezone";
import { useState } from "react";

const Root = () => {
  const { loading, data } = useQuery(ROOT_QUERY);
  const [
    createPostMutation,
    { loading: isCreatePostLoading, data: createPostData },
  ] = useMutation(CREATE_POST_MUTATION);
  // const now2 = moment().toDate();
  const now3 = moment();
  const now4 = moment();
  const now = moment().format("YYYY-MM-DDTHH:mm");
  // console.log({ now: now.toString() });
  // Los angeles time
  const losAngelesTime = now3.tz("America/Los_Angeles");
  // Korean time
  const koreanTime = now4.tz("Asia/Seoul");

  console.log({
    losAngelesTime: losAngelesTime.toString(),
    koreanTime: koreanTime.toString(),
  });
  const [date, setDate] = useState(now);
  const savePostToServer = () => {
    console.log({ date });
  };

  if (loading) {
    return <div>loading</div>;
  }
  return (
    <div>
      <p>{data?.root?.message}</p>
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
