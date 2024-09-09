import { FC, Suspense } from "react";
import PageTitle from "@/components/widgets/PageTitle/PageTitle";
import { getDictionary } from "@/actions/lang.action";
import { Col, Row } from "@w01f-o/react-grid-layout";
import UserProfile from "@/components/widgets/User/UserProfile/UserProfile";
import LastUploadedFiles from "@/components/widgets/Files/LastUploadedFiles/LastUploadedFiles";
import styles from "./profile.module.scss";
import FilesListLoader from "@/components/widgets/Loaders/FileListLoader/FileListLoader";
import LastUpdatedFolderListLoader from "@/components/widgets/Loaders/LastUpdatedFolderListLoader/LastUpdatedFolderListLoader";
import LastUpdatedFolders from "@/components/widgets/Folders/LastUpdatedFolders/LastUpdatedFolders";

const Profile: FC = async () => {
  const dict = await getDictionary();

  return (
    <>
      <PageTitle>{dict.pages.profile}</PageTitle>
      <Row className={styles.row}>
        <Col xs={12}>
          <UserProfile />
        </Col>
        <Col xl={6} xs={12} className={styles.foldersCol}>
          <h3 className={styles.title}>{dict.profile.folders}</h3>
          <Suspense fallback={<LastUpdatedFolderListLoader length={7} />}>
            <Row>
              <LastUpdatedFolders />
            </Row>
          </Suspense>
        </Col>
        <Col xl={6} xs={12} className={styles.filesCol}>
          <h3 className={styles.title}>{dict.profile.files}</h3>
          <Suspense fallback={<FilesListLoader length={5} height={45} />}>
            <Row>
              <LastUploadedFiles />
            </Row>
          </Suspense>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
