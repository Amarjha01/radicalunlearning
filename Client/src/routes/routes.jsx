import {createBrowserRouter} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute';
// import pages

import Home from '../pages/Home.jsx'
import AdminDashboard from '../pages/dashboards/AdminDashboard.jsx'
import EducatorDashboard from '../pages/dashboards/EducatorDashboard.jsx'
import LearnerDashboard from '../pages/dashboards/LearnerDashboard.jsx'
import About from '../pages/About.jsx'
import App from '../App.jsx'
import SignIn from '../pages/SignIn.jsx'
import SignUp from '../pages/SignUp.jsx'
import LerSignUp from '../components/login&signup/LerSignUp.jsx'
import EduSignUp from '../components/login&signup/EduSignUp.jsx'
import Contact from '../pages/Contact.jsx'
import User from '../pages/User.jsx'
import TopBar from '../components/Dashboard/admin/TopBar.jsx';
import SchedulePage from '../pages/SchedulePage/SchedulePage.jsx';
const routes = createBrowserRouter(
    [
        {
            path: '/',
            element: <App />,
            children:[
                {
                    path: '/',
                    element: <Home />
                },
                
                {
                    path: 'about',
                    element: <About />
                },
                {
                    path: 'contact',
                    element: <Contact />
                },
            
               
                
            ]
        },
        {
            path: 'signin',
            element: <SignIn />
        },
        {
            path: 'signup',
            element: <SignUp />,
            children:[
                {
                    path:'learner',
                    element: <LerSignUp />
                },
                {
                    path:'educator',
                    element: <EduSignUp />
                }
            ]
        },
        {
          path: 'dashboard/admin',
          element: (
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          ),
          children:[
            <ProtectedRoute role="admin">
              <TopBar />
            </ProtectedRoute>
          ]
        },
        {
          path: 'dashboard/educator',
          element: (
            <ProtectedRoute role="educator">
              <EducatorDashboard />
            </ProtectedRoute>
          )
        },
        {
          path: 'dashboard/learner',
          element: (
            <ProtectedRoute role="learner">
              <LearnerDashboard />
            </ProtectedRoute>
          )
        },
        {
          path: 'schedule',
          element: (
              <SchedulePage />

          )
        }
        
    ]
)
export default routes;

