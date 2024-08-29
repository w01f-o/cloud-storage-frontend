import { FC } from "react";
import PageTitle from "@/components/widgets/PageTitle/PageTitle";
import { cookies } from "next/headers";
import { Col, Row } from "@w01f-o/react-grid-layout";
import styles from "./settings.module.scss";
import LanguageChanger from "@/components/features/Settings/LanguageChanger/LanguageChanger";
import PasswordChanger from "@/components/features/Settings/PasswordChanger/PasswordChanger";
import PlanImprover from "@/components/features/Settings/PlanImprover/PlanImprover";
import AvatarChanger from "@/components/features/Settings/AvatarChanger/AvatarChanger";
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
          <LanguageChanger dict={dict} lang={lang} />
          <PasswordChanger dict={dict} />
          <AvatarChanger dict={dict} />
          <PlanImprover dict={dict} />
        </div>
      </Col>
    </Row>
  );
};

export default Settings;
