import "./Reset.css";

import "./App.css";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { ROUTES } from "./routes/routes.jsx";
import Root from "./layouts/Root.js";
import {
  HomePage,
  Login,
  Register,
  Password,
  News,
  Settings,
  Achievements,
  MissionBriefing,
  MissionPopup,
  TeamSelectIntro,
  TeamSelect,
  LegalPolicy,
  PrivacyPolicy,
  TermsOfService,
  FightOrFlight,
  Safezone,
} from "./pages/index.jsx";
import { UserProvider } from "./context/UserContext.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path={ROUTES.home.path} element={<HomePage />} />
      <Route path={ROUTES.login.path} element={<Login />} />
      <Route path={ROUTES.register.path} element={<Register />} />
      <Route path={ROUTES.password.path} element={<Password />} />
      <Route path={ROUTES.news.path} element={<News />} />
      <Route path={ROUTES.settings.path} element={<Settings />} />
      <Route path={ROUTES.achievements.path} element={<Achievements />} />
      <Route path={ROUTES.missionBriefing.path} element={<MissionBriefing />} />
      <Route path={ROUTES.missionPopup.path} element={<MissionPopup />} />
      <Route path={ROUTES.teamSelectIntro.path} element={<TeamSelectIntro />} />
      <Route path={ROUTES.teamSelect.path} element={<TeamSelect />} />
      <Route path={ROUTES.legalPolicy.path} element={<LegalPolicy />} />
      <Route path={ROUTES.privacyPolicy.path} element={<PrivacyPolicy />} />
      <Route path={ROUTES.termsOfService.path} element={<TermsOfService />} />
      <Route path={ROUTES.fightOrFlight.path} element={<FightOrFlight />} />
      <Route path={ROUTES.safezone.path} element={<Safezone />} />
    </Route>
  )
);

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
