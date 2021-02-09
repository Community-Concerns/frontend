import { useEffect } from "react"
import { StyledDashboard } from "../styling/styling"
import axios from "axios"
import { Link } from "react-router-dom"

function Dashboard({ token, userId, email, username, zipcode, myTickets, allTickets, allUpvotes, setMyTickets, setAllTickets, setAllUpvotes }) {
	useEffect(() => {
		axios
			.get("https://community-concerns.herokuapp.com/api/tickets/my_tickets", { headers: { authorization: token } })
			.then((res) => {
				setMyTickets(res.data)
			})
		axios
			.get("https://community-concerns.herokuapp.com/api/tickets", { headers: { authorization: token } })
			.then((res) => {
				setAllTickets(res.data)
			})
		axios
			.get("https://community-concerns.herokuapp.com/api/upvotes", { headers: { authorization: token } })
			.then((res) => {
				setAllUpvotes(res.data)
			})
	}, [])

	const handleUpvote = (ticketId) => {
		//Check allupvotes for matching userID and ticket ID
		if(allUpvotes.some(upvote => upvote.user_id === userId && upvote.ticket_id === ticketId)) {
			const id = allUpvotes.find(item => item.user_id === userId && item.ticket_id === ticketId)
			axios
				.delete(`https://community-concerns.herokuapp.com/api/upvotes/${id.id}`, { headers: { authorization: token } })
				.then(() => {
					axios
						.get("https://community-concerns.herokuapp.com/api/upvotes", { headers: { authorization: token } })
						.then((res) => {
							setAllUpvotes(res.data)
						})
				})
		} else {
			axios
				.post("https://community-concerns.herokuapp.com/api/upvotes", {ticket_id: ticketId}, { headers: { authorization: token } })
				.then(() => {
					axios
						.get("https://community-concerns.herokuapp.com/api/upvotes", { headers: { authorization: token } })
						.then((res) => {
							setAllUpvotes(res.data)
						})
				})
		}
	}
	return (
		<StyledDashboard>
			<div className="dash-profile">
				<h3>USERNAME: <span className="font-weight-light">{username}</span></h3>
				<h3>EMAIL: <span className="font-weight-light">{email}</span></h3>
				<h3>ZIPCODE: <span className="font-weight-light">{zipcode}</span></h3>
			</div>
			<div className="dash-tickets-main">
				<div className="tickets-container dash-my-tickets">
					<h2>My Tickets</h2>
					<div className="dash-my-tickets-container">
						{myTickets.map(ticket => (
							<div className="single-ticket" key={ticket.id}>
								<div className="ticket-header">
									<h3 className="ticket-title">{ticket.title}</h3>
									<h3 className="ticket-title">zipcode: ({ticket.zipcode})</h3>
								</div>
								<p className="ticket-description">{ticket.description.substring(0, 220)}... <Link to={`/view-ticket/${ticket.id}`}>See Full Details</Link></p>
								<div className="single-ticket-footer">
									<p className={`upvotes ${allUpvotes.some(upvote => upvote.user_id === userId && upvote.ticket_id === ticket.id) ? "userUpvoted" : ""}`}>Upvotes ({allUpvotes.reduce((acc, cur) => cur.ticket_id === ticket.id ? acc + 1 : acc + 0, 0)})</p>
									<Link to={`/view-ticket/${ticket.id}`} className="comments">View Comments</Link>
								</div>
							</div>))}
					</div>
				</div>
				<div className="tickets-container dash-all-tickets">
					<h2>All Tickets</h2>
					<div className="dash-all-tickets-container">
						{allTickets.map(ticket => (
							<div className="single-ticket" key={ticket.id}>
								<div className="ticket-header">
									<h3 className="ticket-title">{ticket.title}</h3>
									<h3 className="ticket-title">zipcode: ({ticket.zipcode})</h3>
								</div>
								<p className="ticket-description">{ticket.description.substring(0, 220)}... <Link to={`/view-ticket/${ticket.id}`}>See Full Details</Link></p>
								<div className="single-ticket-footer">
									<p 
										onClick={() => handleUpvote(ticket.id)} 
										className={`upvotes ${allUpvotes.some(upvote => upvote.user_id === userId && upvote.ticket_id === ticket.id) ? "userUpvoted" : ""}`}>Upvotes ({allUpvotes.reduce((acc, cur) => cur.ticket_id === ticket.id ? acc + 1 : acc + 0, 0)})</p>
									<Link to={`/view-ticket/${ticket.id}`} className="comments">View Comments</Link>
								</div>
							</div>))}
					</div>
				</div>
			</div>
		</StyledDashboard>
	)
}

export default Dashboard
