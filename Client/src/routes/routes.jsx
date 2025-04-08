import {createBrowserRouter} from 'react-router-dom'

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
                    path: 'admin/dashboard',
                    element: <AdminDashboard />
                },
                {
                    path: 'educator/dashboard',
                    element: <EducatorDashboard />
                },
                {
                    path: 'learner/dashboard',
                    element: <LearnerDashboard/>
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
    ]
)
export default routes;

