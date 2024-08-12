import Accordion from "@/components/shared/UI/Accordion/Accordion";
import { FC } from "react";
import data from "@/data/help_accordion_data.json";
import styles from "./help.module.scss";
import { Col } from "@w01f-o/react-grid-layout";

const Help: FC = () => {
  return (
    <Col className={styles.faq} xs={8}>
      <Accordion data={data} />
    </Col>
  );
};

export default Help;
