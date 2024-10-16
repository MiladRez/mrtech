import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import httpClient from "./httpClient";
import api from "./flaskEndpoint";

export default function ProtectedRoute(props: any) {
	const navigate = useNavigate();

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const checkUserToken = async () => {
			const response = await httpClient.get(`${api}/authorized`);
			if (response.data.authorized) {
				// console.log("User is authorized via Google")
				setIsLoggedIn(true);
			} else {
				// console.log("User is not authorized")
				setIsLoggedIn(false);
				return navigate("/login");
			}
		}
		checkUserToken();
	}, []);

	return (
		<>
			{isLoggedIn ? props.children : null}
		</>
	)
}