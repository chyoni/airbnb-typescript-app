import React, { useState } from "react";
import styled from "styled-components/native";
import { ScrollView, RefreshControl } from "react-native";
import constants from "../../../constants";
import { useQuery } from "react-apollo-hooks";
import { SEE_FEED } from "../../Queries.queries";
import { seeFeed } from "../../types/api";
import Post from "../../Components/Post";

const Container = styled.View`
  flex: 1;
  min-height: ${constants.height / 2};
  padding: 20px;
`;

const Explore = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { data, loading, refetch } = useQuery<seeFeed, null>(SEE_FEED);
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };
  if (loading) {
    return null;
  } else if (!loading && data && data.seeFeed) {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Container>
          {data.seeFeed.map(post => (
            <Post
              key={post.id}
              id={post.id}
              thumbNail={post.thumbNail}
              caption={post.caption}
              location={post.location}
              createdDate={post.createdDate}
              likeCount={post.likeCount}
            />
          ))}
        </Container>
      </ScrollView>
    );
  } else {
    return null;
  }
};

export default Explore;
