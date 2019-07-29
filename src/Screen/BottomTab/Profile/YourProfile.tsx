import React from "react";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";
import { useQuery } from "react-apollo-hooks";
import { SEE_USER } from "../../../Queries.queries";
import { seeUser, seeUserVariables } from "../../../types/api";
import Loader from "../../../Components/Loader";
import Profile from "../../../Components/Profile";

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
const YourProfile: React.SFC<IProps> = ({ navigation }) => {
  const { data, loading } = useQuery<seeUser, seeUserVariables>(SEE_USER, {
    variables: {
      username: navigation.getParam("username")
    }
  });
  if (loading) {
    return <Loader />;
  } else if (!loading && data && data.seeUser) {
    const user = data.seeUser;
    return (
      <Profile
        id={user.id}
        firstName={user.firstName}
        lastName={user.lastName}
        fullName={user.fullName}
        username={user.username}
        avatar={user.avatar}
        createdDate={user.createdDate}
        createdTime={user.createdTime}
        hostings={user.hostings}
        comments={user.comments}
        isSelf={user.isSelf}
      />
    );
  } else {
    return null;
  }
};

export default YourProfile;
