import { Routes, Route } from 'react-router-dom'
import Navbar from './components/common/Navbar.jsx'
import Footer from './components/common/Footer.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import RoleRoute from './routes/RoleRoute.jsx'
import { ROLES } from './utils/roleHelpers'

import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import PatientDashboardPage from './pages/PatientDashboardPage.jsx'
import DoctorDashboardPage from './pages/DoctorDashboardPage.jsx'
import DeanDashboardPage from './pages/DeanDashboardPage.jsx'
import DoctorsDirectoryPage from './pages/DoctorsDirectoryPage.jsx'
import BookAppointmentPage from './pages/BookAppointmentPage.jsx'
import OnlineConsultationPage from './pages/OnlineConsultationPage.jsx'
import EmergencyPage from './pages/EmergencyPage.jsx'
import SymptomCheckerPage from './pages/SymptomCheckerPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/doctors" element={<DoctorsDirectoryPage />} />
        <Route path="/emergency" element={<EmergencyPage />} />
        <Route path="/symptom-checker" element={<SymptomCheckerPage />} />

        <Route
          path="/book/:doctorId"
          element={
            <ProtectedRoute>
              <RoleRoute allow={[ROLES.PATIENT]}>
                <BookAppointmentPage />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/online-consultation"
          element={
            <ProtectedRoute>
              <RoleRoute allow={[ROLES.PATIENT]}>
                <OnlineConsultationPage />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/dashboard"
          element={
            <ProtectedRoute>
              <RoleRoute allow={[ROLES.PATIENT]}>
                <PatientDashboardPage />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/dashboard"
          element={
            <ProtectedRoute>
              <RoleRoute allow={[ROLES.DOCTOR]}>
                <DoctorDashboardPage />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dean/dashboard"
          element={
            <ProtectedRoute>
              <RoleRoute allow={[ROLES.DEAN]}>
                <DeanDashboardPage />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  )
}
