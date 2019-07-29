import React from "react";
import { useQuery } from "react-apollo-hooks";
import { MY_PROFILE } from "../../../Queries.queries";
import { myProfile } from "../../../types/api";
import Loader from "../../../Components/Loader";
import Profile from "../../../Components/Profile";

const MyProfile: React.SFC = () => {
  const { data: profileData, loading: profileLoading } = useQuery<
    myProfile,
    null
  >(MY_PROFILE);
  if (profileLoading) {
    return <Loader />;
  } else if (!profileLoading && profileData && profileData.myProfile) {
    const data = profileData.myProfile;
    return (
      <Profile
        id={data.id}
        firstName={data.firstName}
        lastName={data.lastName}
        fullName={data.fullName}
        username={data.username}
        avatar={data.avatar}
        createdDate={data.createdDate}
        createdTime={data.createdTime}
        hostings={data.hostings}
        isSelf={data.isSelf}
        comments={data.comments}
      />
    );
  } else {
    return null;
  }
};

export default MyProfile;
