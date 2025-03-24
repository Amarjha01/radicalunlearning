import {createBrowserRouter} from 'react-router-dom'

// import pages

import Home from '../pages/Home.jsx'
import AdminDashboard from '../pages/dashboards/AdminDashboard.jsx'
import EducatorDashboard from '../pages/dashboards/EducatorDashboard.jsx'
import LearnerDashboard from '../pages/dashboards/LearnerDashboard.jsx'
import App from '../App.jsx'

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
                
            ]
        }
    ]
)
export default routes;

