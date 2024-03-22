import React, { useContext } from "react";
import "../../styles/home.css";
import { Link, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhoneFlip, faEnvelope, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

import { Context } from "../store/appContext";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const location = useLocation();
	console.log(location.pathname);
	return <div className="container text-center mt-5">
		<div className="d-flex justify-content-end m-2">
			<Link to="/addContact" className="add btn btn-success">addContact</Link>
		</div>
		{
			store.contactList.map(contact => {
				return <div className="border">

					<div className="container contactInfo d-flex ">
						<div className="image">
							<img className="rounded-circle p-3" src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-774909.jpg&fm=jpg" alt="First Image" style={{ width: "7rem" }} />
						</div>

						<ul className="detailInfo d-flex flex-column align-items-start">
							<li>
								<h2>{contact.full_name}</h2>
							</li>
							<li className="d-flex align-items-center">
								<FontAwesomeIcon icon={faLocationDot} />
								<span className="contact-info">{contact.address}</span>
							</li>
							<li className="d-flex align-items-center">
								<FontAwesomeIcon icon={faPhoneFlip} />
								<span className="contact-info">{contact.phone}</span>
							</li>
							<li className="d-flex align-items-center">
								<FontAwesomeIcon icon={faEnvelope} />
								<span className="contact-info">{contact.email}</span>
							</li>
						</ul>
						<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
							<div class="modal-dialog">
								<div class="modal-content">
									<div class="modal-header">
										<h1 class="modal-title fs-5" id="exampleModalLabel">Are you sure you want to delete?</h1>
										<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
									</div>
									<div class="modal-body">
										{contact.full_name}
									</div>
									<div class="modal-footer">
										<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
										<button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={() => actions.deleteContact(contact.id)}>Confirm</button>
									</div>
								</div>
							</div>
						</div>
						<div className="ms-auto activity d-flex mt-4 column-gap-5">
							<Link to={"/editContact/" + contact.id}><FontAwesomeIcon icon={faPencil} /></Link>
							<h5 data-bs-toggle="modal" data-bs-target="#exampleModal"><FontAwesomeIcon icon={faTrash} />{console.log(contact)}
							</h5>
						</div>

					</div>
				</div>
			})
		}
	</div>

};
