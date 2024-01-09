import React, { useState, useEffect } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

const CommentArea = ({ asin }) => {
	const [comments, setComments] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		const fetchComments = async () => {
			setIsLoading(true);
			try {
				let response = await fetch(
					"https://striveschool-api.herokuapp.com/api/comments/" + asin,
					{
						headers: {
							Authorization:
								"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc1ZjY4YzNkYWRhMDAwMThhNjlmOTgiLCJpYXQiOjE3MDQ4MTI0MDEsImV4cCI6MTcwNjAyMjAwMX0.ydG0TJSjh5cL5KKBHxs1E3fdDSzaODYWadEQiMiXM1g",
						},
					}
				);
				console.log(response);
				if (response.ok) {
					let fetchedComments = await response.json();
					setComments(fetchedComments);
					setIsLoading(false);
					setIsError(false);
				} else {
					setIsLoading(false);
					setIsError(true);
				}
			} catch (error) {
				console.log(error);
				setIsLoading(false);
				setIsError(true);
			}
		};
		fetchComments();
	}, [asin]);

	return (
		<div className="text-center">
			{isLoading && <Loading />}
			{isError && <Error />}
			<AddComment asin={asin} />
			<CommentList commentsToShow={comments} />
		</div>
	);
};

export default CommentArea;
