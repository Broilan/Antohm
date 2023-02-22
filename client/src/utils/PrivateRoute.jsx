import {Navigate} from 'react-router-dom'
import { useContext } from 'react'
import { DataContext } from '../App'


const PrivateRoute = ({children}) => {
    const {isAuthenticated} = useContext(DataContext)
            if(isAuthenticated == false) {
               return <Navigate to="/login"/>
            }
            else {
                return children
            }
            
            
}

export default PrivateRoute