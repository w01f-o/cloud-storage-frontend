import { FC, Suspense } from "react";
import PageTitle from "@/components/widgets/PageTitle/PageTitle";
import { getDictionary } from "@/actions/lang.action";
import { Col, Row } from "@w01f-o/react-grid-layout";
import UserProfile from "@/components/widgets/User/UserProfile/UserProfile";
import LastUpdatedFolders from "@/components/widgets/Folders/LastUpdatedFolders/LastUpdatedFolders";
import LastUploadedFiles from "@/components/widgets/Files/LastUploadedFiles/LastUploadedFiles";
import styles from "./profile.module.scss";
import FoldersListLoader from "@/components/widgets/Loaders/FoldersListLoader/FoldersListLoader";
import FilesListLoader from "@/components/widgets/Loaders/FilesListLoader/FilesListLoader";

const Profile: FC = async () => {
  const dict = await getDictionary();

  return (
    <>
      <PageTitle>{dict.pages.profile}</PageTitle>
      <Row className={styles.row}>
        <Col xs={12}>
          <UserProfile />
        </Col>
        <Col xs={6} className={styles.foldersCol}>
          <h3 className={styles.title}>{dict.profile.folders}</h3>
          <Suspense
            fallback={<FoldersListLoader view={"cells"} length={7} width={4} />}
          >
            <Row>
              <LastUpdatedFolders />
            </Row>
          </Suspense>
        </Col>
        <Col xs={6} className={styles.filesCol}>
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
