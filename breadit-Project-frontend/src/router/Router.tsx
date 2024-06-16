import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout.tsx';
import Home from '../pages/home';
import MyPage from '../pages/mypage/MyPage.tsx';
import MyPageCheckPassword from '../pages/mypage/CheckPassword.tsx';
import MyPageEdit from '../pages/mypage/Edit.tsx';
import LoginPage from '../pages/login/Login.tsx';
import SignUpPage from '../pages/signup/Agreement.tsx';
import SignUpInfoPage from '../pages/signup/Info.tsx';
import SignUpCompletePage from '../pages/signup/Complete.tsx';
import CommunityPage from '../pages/community';
import NearByPage from '../pages/community/nearby.tsx';
import DetailPage from '../pages/community/detail.tsx';
import EditPage from '../pages/community/edit.tsx';
import MagazinePage from '../pages/magazine';
import MagazineDetailPage from '../pages/magazine/Detail.tsx';
import MagazineEditPage from '../pages/magazine/Edit.tsx';
import MapPage from '../pages/map';
import AdminPage from '../pages/admin';
import AdminPost from '../pages/admin/AdminPost.tsx';
import AdminRecipe from '../pages/admin/AdminRecipe.tsx';
import { AuthProvider } from '../pages/login/AuthContext.tsx';
import MyRecipe from '../pages/community/recipe.tsx';
import RecipeDetailPage from '../pages/community/recipesub.tsx';
import DynamicSection from '../pages/mypage/DynamicSection.tsx';
import AuthRedirectPage from '../pages/login/AuthRedirectPage.tsx';
import { ScrollToTop } from '../utils';
import CheckAccountDelete from '../pages/mypage/CheckAccountDelete.tsx';

export default function Router() {
  return (
    <>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="mypage" element={<MyPage />} />
            <Route path="mypage/:section" element={<DynamicSection />} />

            <Route
              path="mypage/check-account-delete"
              element={<CheckAccountDelete />}
            />
            <Route
              path="mypage/check-password"
              element={<MyPageCheckPassword />}
            />
            <Route path="mypage/check-password/edit" element={<MyPageEdit />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="auth-redirect" element={<AuthRedirectPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="signup/info" element={<SignUpInfoPage />} />
            <Route
              path="signup/info/complete"
              element={<SignUpCompletePage />}
            />
            <Route path="community" element={<CommunityPage />} />
            <Route path="community/edit" element={<EditPage />} />
            <Route path="community/nearby" element={<NearByPage />} />
            <Route path="community/nearby/:id" element={<DetailPage />} />
            <Route path="community/recipe" element={<MyRecipe />} />
            <Route path="community/recipe/:id" element={<RecipeDetailPage />} />
            <Route path="magazines" element={<MagazinePage />} />
            <Route path="magazines/:id" element={<MagazineDetailPage />} />
            <Route path="magazines/edit" element={<MagazineEditPage />} />
            <Route path="map" element={<MapPage />} />
            <Route path="admin" element={<AdminPage />} />
            <Route path="admin-post" element={<AdminPost />} />
            <Route path="admin-recipe" element={<AdminRecipe />} />
          </Route>
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </AuthProvider>
    </>
  );
}
