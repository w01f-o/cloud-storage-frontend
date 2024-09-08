import { FC } from "react";
import styles from "./help.module.scss";
import { Col } from "@w01f-o/react-grid-layout";
import PageTitle from "@/components/widgets/PageTitle/PageTitle";
import Accordion from "@/components/shared/UI/Accordion/Accordion";
import { getDictionary } from "@/actions/lang.action";

const Help: FC = async () => {
  const dict = await getDictionary();

  return (
    <>
      <PageTitle>{dict.pages.help}</PageTitle>
      <Col className={styles.faq} md={8} xs={12}>
        <Accordion data={dict.help.accordion} />
      </Col>
    </>
  );
};

export default Help;
