import { FC, ReactNode } from "react";
import { useSession } from "next-auth/react";

interface RefreshTokensProviderProps {
  children: ReactNode;
}

const RefreshTokensProvider: FC<RefreshTokensProviderProps> = ({
  children,
}) => {
  const session = useSession();
  console.log(session);

  return children;
};

export default RefreshTokensProvider;
