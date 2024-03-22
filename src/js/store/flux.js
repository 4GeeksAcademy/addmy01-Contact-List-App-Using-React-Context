const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			contactList: [

			]

		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			addContact: (contact) => {
				setStore({ "contactList": [...getStore().contactList, contact] })
				fetch("https://playground.4geeks.com/apis/fake/contact/", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						// 'Content-Type': 'application/x-www-form-urlencoded',
					},
					body:
						JSON.stringify({
							"full_name": contact.full_name,
							"email": contact.email,
							"agenda_slug": "addmy01",
							"address": contact.address,
							"phone": contact.phone
						})
				}).then(Response => Response.json())
					.then(result => {
						console.log(result)
						getActions().loadSomeData()
					})
			},
			getContact: () => {
				fetch("https://playground.4geeks.com/apis/fake/contact/agenda/addmy01", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						// 'Content-Type': 'application/x-www-form-urlencoded',
					},

				}).then(Response => Response.json())
					.then(result => {
						console.log(result)
						setStore({ "contactList": result })
					})
			},
			editContact: (contact) => {
				fetch("https://playground.4geeks.com/apis/fake/contact/" + contact.id, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body:
						JSON.stringify({
							"full_name": contact.full_name,
							"email": contact.email,
							"agenda_slug": "addmy01",
							"address": contact.address,
							"phone": contact.phone
						})
				}).then(Response => Response.json())
					.then(result => {
						console.log(result)
						getActions().loadSomeData()
					})
			},
			deleteContact: (id) => {
				console.log(id)
				fetch("https://playground.4geeks.com/apis/fake/contact/" + id, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},					
				}).then(Response => Response.json())
					.then(result => {
						console.log(result)
						getActions().loadSomeData()
					})
			},
			
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
				getActions().getContact()
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}

		}
	};
};

export default getState;
