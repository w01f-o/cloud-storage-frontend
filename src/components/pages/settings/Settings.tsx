import { FC } from "react";
import PageTitle from "@/components/widgets/PageTitle/PageTitle";
import { cookies } from "next/headers";
import { Col, Row } from "@w01f-o/react-grid-layout";
import styles from "./settings.module.scss";
import ChangeLanguage from "@/components/features/Settings/ChangeLanguage/ChangeLanguage";
import ChangePassword from "@/components/features/Settings/ChangePassword/ChangePassword";
import ImprovePlan from "@/components/features/Settings/ImpovePlan/ImprovePlan";
import ChangeAvatar from "@/components/features/Settings/ChangeAvatar/ChangeAvatar";
import { getDictionary } from "@/actions/lang.action";

const Settings: FC = async () => {
  const cookie = cookies();
  const lang = cookie.get("NEXT_LOCALE")?.value as string;
  const dict = await getDictionary();

  return (
    <Row>
      <Col xs={12}>
        <PageTitle>{dict.pages.settings}</PageTitle>
      </Col>
      <Col xs={4}>
        <div className={styles.buttons}>
          <ChangeLanguage dict={dict} lang={lang} />
          <ChangePassword dict={dict} />
          <ChangeAvatar dict={dict} />
          <ImprovePlan dict={dict} />
        </div>
      </Col>
    </Row>
  );
};

export default Settings;
