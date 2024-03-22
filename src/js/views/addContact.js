import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import { Context } from "../store/appContext";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/demo.css";


export const AddContact = () => {
	const { store, actions } = useContext(Context);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const navigate = useNavigate();
	const location = useLocation();
	console.log(location.pathname);
	const params = useParams();


	const contact = store.contactList.filter(contact => contact.id == params.id)
	console.log(contact)

	function handleSubmit(e) {
		e.preventDefault()
		if (location.pathname == ("/editContact/" + params.id)) {
			actions.editContact({
				full_name: name.length && name || contact[0].full_name,
				email: email.length && email || contact[0].email,
				phone: phone.length && phone || contact[0].phone,
				address: address.length && address || contact[0].address,
				id: params.id,
			})
		}
		else {
			actions.addContact({
				full_name: name,
				email: email,
				phone: phone,
				address: address
			})
		}
		navigate("/")
	}
	return (<>
		<h2 className="container text-center">Add a New Contact</h2>

		<form className="container justify-content-center d-flex flex-column gap-2" onSubmit={handleSubmit}>
			<label>Full Name
			</label>
			<input
				type="text"
				placeholder={contact.length && contact[0].full_name || "Enter full"}
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<label>Email

			</label>
			<input
				type="text"
				placeholder={contact.length && contact[0].email || "email"}
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<label>Phone
			</label>
			<input
				type="text"
				placeholder={contact.length && contact[0].phone || "phone"}
				value={phone}
				onChange={(e) => setPhone(e.target.value)}
			/>
			<label>Address
			</label>
			<input
				type="text"
				placeholder={contact.length && contact[0].address || "address"}
				value={address}
				onChange={(e) => setAddress(e.target.value)}
			/>
			<button className="btn btn-primary">Submit</button>
			<Link to="/">
				or get back to contact
			</Link>
		</form>
	</>
	)
}