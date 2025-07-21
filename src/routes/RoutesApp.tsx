import { Route, Routes, BrowserRouter as Router } from "react-router-dom"

import Home from "../pages/Home"
import Raffles from "../pages/Raffles"

import Footer from "../components/Footer"
import RaffleDetail from "../pages/RaffleDetail"
import AdminRaffleForm from "../pages/AdminRaffleForm"
import AdminDashboard from "../pages/AdminDashboard"

export default function RoutesApp() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/raffles" element={<Raffles />} />
				<Route path="/raffles/:id" element={<RaffleDetail />} />
				<Route path="/footer" element={<Footer />} />
				<Route path="/raffles/admin/create" element={<AdminRaffleForm />} />
				<Route path="/raffles/admin" element={<AdminDashboard />} />
			</Routes>
		</Router>
	)
}
