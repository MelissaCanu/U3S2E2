import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

const AddComment = (props) => {
	const [comment, setComment] = useState({
		comment: "",
		rate: 1,
		elementId: props.asin,
	});

	useEffect(() => {
		setComment((prevComment) => ({ ...prevComment, elementId: props.asin }));
	}, [props.asin]);

	const sendComment = async (e) => {
		e.preventDefault();
		try {
			let response = await fetch(
				"https://striveschool-api.herokuapp.com/api/comments",
				{
					method: "POST",
					body: JSON.stringify(comment),
					headers: {
						"Content-type": "application/json",
						Authorization:
							"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc1ZjY4YzNkYWRhMDAwMThhNjlmOTgiLCJpYXQiOjE3MDQ4MTI0MDEsImV4cCI6MTcwNjAyMjAwMX0.ydG0TJSjh5cL5KKBHxs1E3fdDSzaODYWadEQiMiXM1g",
					},
				}
			);
			if (response.ok) {
				alert("Recensione inviata!");
				setComment({
					comment: "",
					rate: 1,
					elementId: props.asin,
				});
			} else {
				throw new Error("Qualcosa è andato storto");
			}
		} catch (error) {
			alert(error);
		}
	};

	return (
		<div className="my-3">
			<Form onSubmit={sendComment}>
				<Form.Group className="mb-2">
					<Form.Label>Recensione</Form.Label>
					<Form.Control
						type="text"
						placeholder="Inserisci qui il testo"
						value={comment.comment}
						onChange={(e) =>
							setComment((prevComment) => ({
								...prevComment,
								comment: e.target.value,
							}))
						}
					/>
				</Form.Group>
				<Form.Group className="mb-2">
					<Form.Label>Valutazione</Form.Label>
					<Form.Control
						as="select"
						value={comment.rate}
						onChange={(e) =>
							setComment((prevComment) => ({
								...prevComment,
								rate: e.target.value,
							}))
						}
					>
						{[1, 2, 3, 4, 5].map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</Form.Control>
				</Form.Group>
				<Button variant="primary" type="submit">
					Invia
				</Button>
			</Form>
		</div>
	);
};

export default AddComment;
