import { FC } from "react";
import PageTitle from "@/components/widgets/PageTitle/PageTitle";
import { getDictionary } from "@/actions/lang.action";
import { Col, Row } from "@w01f-o/react-grid-layout";
import UserProfile from "@/components/widgets/UserProfile/UserProfile";
import FoldersList from "@/components/widgets/FoldersList/FoldersList";
import MyFolders from "@/components/widgets/MyFolders/MyFolders";

const Profile: FC = async () => {
  const dict = await getDictionary();

  return (
    <>
      <PageTitle>{dict.pages.profile}</PageTitle>
      <Row>
        <Col xs={12}>
          <UserProfile />
        </Col>
        <Col xs={6}>
          <Row>{/* <MyFolders /> */}</Row>
        </Col>
        <Col xs={6}></Col>
      </Row>
    </>
  );
};

export default Profile;
