import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Show = () => {
	const params = useParams();
	const { id } = params;
	console.log(id);

	let [mailingList, setMailingList] = useState([]);

	useEffect(() => {
		const getData = async () => {
			try {
				// OPTION 1: use fetch for "index" route
				// const response = await fetch('https://localhost:5000/api/regs/:id')
				// const data = await response.json()

				// OPTION 2: use axios
				const response = await axios.get('/api/mails/' + id);
				console.log(response);
				setMailingList(response.data);
			} catch (err) {
				console.error(err);
			}
		};

		getData();
	}, []);

	async function deleteEntry(id) {
		try {
			// OPTION 1: use fetch for "delete" route

			// await fetch(`/api/todos/${id}`, {
			//   method: 'DELETE'
			// })

			// OPTION 2: use axios

			await axios.delete(`/api/mails/${id}`);
			res.redirect('/pages/Profile');
		} catch (err) {
			console.log(err);
		}
	}

	//   async function updatePerson(id) {

	//     try {

	//        // OPTION 1: use fetch for "delete" route

	//       // await fetch(`/api/todos/${id}`, {
	//       //   method: 'DELETE'
	//       // })

	//        // OPTION 2: use axios

	//        await axios.patch(`http://localhost:5000/api/regs/${id}`)

	//     } catch(err) {
	//       console.log(err)
	//     }

	//   }

	return (
		<div>
			<br/>
			{/* <h1> {mailingList.name} </h1> */}

			<div className='mailingOptions'>
				<div className='container'>
					<Link to={`/pages/edit/${mailingList._id}`}>
						<button className='item'> Edit Mailing List </button>
					</Link>
					<Link to={'/profile'} onClick={() => deleteEntry(mailingList._id)}>
						<button className='item'> Delete Mailing List </button>
					</Link>
					<br></br>
					<Link to={`/profile`}>
						<button className='item'> Full Mailing List </button>
					</Link>
				</div>
			</div>
			<br></br>
			<br></br>
			<div>
				<h1> Name : {mailingList.name} </h1>
				<br></br>
				<h1> Address: {mailingList.address} </h1>
				<br></br>
				<br></br>
				<h1> Zip : {mailingList.zip} </h1>
				<br></br>

				<br></br>
			</div>
		</div>
	);
};

export default Show;
