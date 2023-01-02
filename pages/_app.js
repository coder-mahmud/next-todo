import '../styles/globals.css'
import Layout from '../ui/Layout'
import { AuthContextProvider } from '../context/AuthContext'
import { TaskContextProvider } from '../context/TaskContext'

function MyApp({ Component, pageProps }) {
  return <AuthContextProvider> <TaskContextProvider> <Layout><Component {...pageProps} /></Layout></TaskContextProvider></AuthContextProvider> 
}

export default MyApp
