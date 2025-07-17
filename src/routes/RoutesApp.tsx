import { Route, Routes, BrowserRouter as Router } from "react-router-dom"

import Home from "../pages/Home"
import Raffles from "../pages/Raffles"

import Footer from "../components/Footer"
import NavBar from "../components/NavBar"
import RaffleDetail from "../pages/RaffleDetail"
import AdminRaffleForm from "../pages/AdminRaffleForm"

export default function RoutesApp() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/raffles" element={<Raffles />} />
				<Route path="/raffles/:id" element={<RaffleDetail />} />
				<Route path="/footer" element={<Footer />} />
				<Route path="/navbar" element={<NavBar />} />
				<Route path="/raffles/admin" element={<AdminRaffleForm />} />
			</Routes>
		</Router>
	)
}
