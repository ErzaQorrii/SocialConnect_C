import { useNavigate } from "react-router-dom";

export const useNavigation = () => {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/home_user");
  };

  const goToProfile = () => {
    navigate("/profile");
  };
  const goToFriends = () => {
    navigate("/friends");
  };
  const goToGroups = () => {
    navigate("/groups");
  };
  const goToCreateGroups = () => {
    navigate("/create_groups");
  };

  return {
    goToHomePage,
    goToProfile,
    goToFriends,
    goToGroups,
    goToCreateGroups,
  };
};

export default useNavigation;
