// // src/protected/ProtectedLayout.jsx
// import { useSelector } from "react-redux";
// import { Navigate, Outlet } from "react-router-dom";

// const ProtectedLayout = () => {
//   const { isLoggedIn } = useSelector((state) => state.auth);

//   console.log("isLogin me kiya arha he " , isLoggedIn)
//   if (!isLoggedIn) {
//     return <Navigate to="/login" replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedLayout;
