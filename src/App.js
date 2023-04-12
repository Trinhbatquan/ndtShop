import { Route, Routes, Navigate } from "react-router-dom";

import {
  Login,
  Home,
  Product,
  Payment,
  Post,
  Other,
  Setting,
  Profile,
  CreateNews,
  DetailNews
} from "./components";
import Alert from "./components/Alerts";
import { GetDataToContext } from "./context/ProviderContext";

function App() {
  const { state } = GetDataToContext();
  return (
    <div className="h-auto min-w-[680px]bg-primary flex items-center">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="home" element={<Home />}>
          {/* <Route path="user" element={<User />} /> */}
          <Route path="product" element={<Product />} />
          <Route path="post" element={<Post />} />
          <Route path="news" element={<Payment />} />
          <Route path="other" element={<Other />} />
          <Route path="setting" element={<Setting />} />
          <Route path="profile" element={<Profile />} />
          <Route path="news/create" element={<CreateNews />} />
          <Route path="news/:id" element={<DetailNews />} />
          

        </Route>
        <Route path="/" element={<Navigate to="home" replace={true} />} />
      </Routes>

      {state.alertType && <Alert type={state.alertType} />}
    </div>
  );
}

export default App;
