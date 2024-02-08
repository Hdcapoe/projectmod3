import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

const MailingList = () => {
	let [wholeMails, setWholeMails] = useState([]);
	let [name, setName] = useState('');
	let [address, setAddress] = useState('');
	let [zip, setZip] = useState('');

	useEffect(() => {
		const getData = async () => {
			try {
				const response = await axios.get('/api/mails');
				console.log(response);
				console.log(response.data);
				setWholeMails(response.data);
			} catch (err) {
				console.error(err);
			}
		};
		getData();
	}, []);

	async function addToList(e) {
		try {
			let wholeMail = {
				name: name,
				address: address,
				zip: zip,
			};

			console.log(wholeMail);

			const response = await axios.post('/api/mails', wholeMail);
			console.log(response.data);
			setWholeMails([...wholeMails, response.data]);
			console.log(wholeMails);

			setName('');
			setAddress('');
			setZip('');
		} catch (err) {
			console.log(err);
		}
	}

	function handleChangeN(event) {
		setName(event.target.value);
	}
	function handleChangeA(event) {
		setAddress(event.target.value);
	}
	function handleChangeZ(event) {
		setZip(event.target.value);
	}

	return (
		<div>
			<h1>Current Mailing List</h1>
			<ul>
				<li>
					{wholeMails.map((mail) => {
						return (
							<Link to={`/pages/Show/${mail._id}`} key={mail._id} mail={mail}>
								<h1>{mail.name} </h1>
							</Link>
						);
					})}
				</li>
			</ul>
			<br></br>
			<br></br>

			<h1> Add New Mailing List</h1>
			<br></br>
			<br></br>
			<form>
				<div>
					<h3>Mailing List Information</h3>
					<br></br>
					Name :
					<input value={name} onChange={handleChangeN} />
					<br></br>
					<br></br>
					Address :
					<input value={address} onChange={handleChangeA} />
					<br></br>
					<br></br>
					Zip :
					<input value={zip} onChange={handleChangeZ} />
				</div>
				<button onClick={addToList}>Submit</button>
			</form>
		</div>
	);
};

export default MailingList;
