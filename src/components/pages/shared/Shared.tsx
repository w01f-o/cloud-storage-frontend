import { FC, Suspense } from "react";
import PageTitle from "@/components/widgets/PageTitle/PageTitle";
import { Row } from "@w01f-o/react-grid-layout";
import styles from "@/components/pages/folder/folderPage.module.scss";
import FilesListLoader from "@/components/widgets/Loaders/FileListLoader/FileListLoader";
import { getDictionary } from "@/actions/lang.action";
import SharedFileList from "@/components/widgets/Files/SharedFileList/SharedFileList";

interface SharedProps {
  searchParams: Record<string, any>;
}

const Shared: FC<SharedProps> = async ({ searchParams }) => {
  const dict = await getDictionary();

  return (
    <>
      <PageTitle>{dict.pages.shared}</PageTitle>
      <Row className={styles.row}>
        <Suspense
          key={JSON.stringify(searchParams)}
          fallback={<FilesListLoader length={15} />}
        >
          <SharedFileList />
        </Suspense>
      </Row>
    </>
  );
};

export default Shared;
