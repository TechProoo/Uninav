import { useEffect } from "react";
import { useContext } from "react";
import { USER_PROFILE_CONTEXT } from "./context";
import { getUserProfile } from "./api";
import { getAuth } from "./libs/util";
export function Initialize() {
  const { userProfile, setUserProfile } = useContext(USER_PROFILE_CONTEXT);
  const handler = async () => {
    const authData = getAuth();
    if (!authData) return;
    const _userProfile = await getUserProfile(
      authData.access_token,
      console.error,
      console.error
    );
    setUserProfile(_userProfile);
  };
  useEffect(() => {
    handler();
  }, []);
  return null;
}
