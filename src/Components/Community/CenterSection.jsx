import React, { useEffect } from "react";
import "../../Styles/center_section.css";
import TobBox from "./TobBox";
import MyPost from "./MyPost";
import FriendsPost from "./FriendsPost";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";
import PostService from "../../Services/PostService";
import CreateWorkoutPlanBox from "./CreateWorkoutPlanBox";
import WorkoutPlanCard from "./WorkoutPlanCard";
import CreaetMealPlanBox from "./CreaetMealPlanBox";
import MealPlanCard from "./MealPlanCard";
import FriendsSection from "./FriendsSection";
import { Tabs, Avatar } from "antd";
import Notifications from "./Notifications";

const { TabPane } = Tabs;
const CenterSection = () => {
  const snap = useSnapshot(state);
  useEffect(() => {
    PostService.getPosts()
      .then((resul) => {
        state.posts = resul;
      })
      .catch((err) => {});
  }, []);
  return (
    <div class="center" style={{ width: "80vw" }}>
      <div
        style={{
          height: 70,
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          marginBottom: 8,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "1.5rem",
            fontWeight: 600,
          }}
        >
          <img
            style={{ maxHeight: 40, maxWidth: 60 }}
            src="assets/logo.png"
            alt="logo"
          />
        </div>
        <Avatar
          style={{ cursor: "pointer", border: "5px solid red" }}
          onClick={() => {
            state.profileModalOpend = true;
          }}
          size={70}
          src={snap.currentUser?.image}
        />
      </div>
      <TobBox />
      <div>
        {snap.activeIndex === 1 && (
          <>
            {" "}
            <MyPost />
            <div>
              {snap.posts.map((post) => {
                return <FriendsPost key={post?.id} post={post} />;
              })}
            </div>{" "}
          </>
        )}
        {snap.activeIndex === 2 && (
          <>
            <CreateWorkoutPlanBox />
            <div>
              {snap.workoutPlans.map((plan) => (
                <WorkoutPlanCard key={plan.id} plan={plan} />
              ))}
            </div>
          </>
        )}
        {snap.activeIndex === 4 && (
          <>
            <FriendsSection />
          </>
        )}
        {snap.activeIndex === 3 && (
          <>
            <CreaetMealPlanBox />
            <div>
              {snap.mealPlans.map((plan) => (
                <MealPlanCard key={plan.id} plan={plan} />
              ))}
            </div>
          </>
        )}
        {snap.activeIndex === 5 && (
          <>
            <Notifications />
          </>
        )}
      </div>
    </div>
  );
};

export default CenterSection;
