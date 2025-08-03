import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { Provider } from "react-redux";
import store from "./store/store";
import Toast from "./toast/Toast";
import ProtectedRoute from "./ProtectedRoute";
// import { SignIn } from "./pages/auth";

function App() {
  return (
    <Provider store={store}>
      <Toast/>
    <Routes>
      <Route path="/dashboard/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
       <Route path="/" element={<Navigate to="/admin" replace />} />
      <Route path="/admin/*" element={<Auth />} />
    </Routes>
    </Provider>
  );
}

export default App;
