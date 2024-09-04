import { FC, Suspense } from "react";
import PageTitle from "@/components/widgets/PageTitle/PageTitle";
import { getDictionary } from "@/actions/lang.action";
import StorageInfo from "@/components/widgets/Storage/StorageInfo/StorageInfo";
import StorageLoader from "@/components/widgets/Loaders/StorageLoader/StorageLoader";

const Storage: FC = async () => {
  const dict = await getDictionary();

  return (
    <>
      <PageTitle>{dict.pages.storage}</PageTitle>
      <Suspense fallback={<StorageLoader />}>
        <StorageInfo />
      </Suspense>
    </>
  );
};

export default Storage;
