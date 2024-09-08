import { FC } from "react";
import NavBar from "@/components/widgets/NavBar/NavBar";
import { getDictionary } from "@/actions/lang.action";
import CurrentUser from "@/components/widgets/User/CurrentUser/CurrentUser";
import styles from "@/components/widgets/MobileMenu/mobileMenu.module.scss";
import SignOutButton from "@/components/features/Auth/SignOutButton/SignOutButton";

const MobileMenuContent: FC = async () => {
  const dict = await getDictionary();

  return (
    <div className={styles.wrapper}>
      <CurrentUser dict={dict} />
      <NavBar dict={dict} isMobile />
      <SignOutButton dict={dict} />
    </div>
  );
};

export default MobileMenuContent;
