import { Route, Routes, BrowserRouter as Router } from "react-router-dom"

import Home from "../pages/Home"
import Raffles from "../pages/Raffles"

import Footer from "../components/Footer"
import RaffleDetail from "../pages/RaffleDetail"
import AdminRaffleForm from "../pages/AdminRaffleForm"
import AdminDashboard from "../pages/AdminDashboard"
import AdminRaffleEdit from "../pages/AdminRaffleEdit"

export default function RoutesApp() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/raffles" element={<Raffles />} />
				<Route path="/raffles/:id" element={<RaffleDetail />} />
				<Route path="/footer" element={<Footer />} />
				<Route path="/management/create" element={<AdminRaffleForm />} />
				<Route path="/management" element={<AdminDashboard />} />
				<Route path="/management/edit/:id" element={<AdminRaffleEdit />} />
			</Routes>
		</Router>
	)
}
