import { useGlobalContext } from '../context'

const Stories = () => {
	const { isLoading, hits, removeStory } = useGlobalContext()

	if (isLoading) return <div className="loading"></div>

	return (
		<section className="stories">
			{hits.map(story => {
				const { objectID, title, url, points, author, num_comments } =
					story

				return (
					<article className="story" key={objectID}>
						<h4 className="title">{title}</h4>
						<p className="info">
							{points} points<span> | By {author} | </span>
							<span>{num_comments} comments</span>
						</p>
						<div>
							<a
								href={url}
								className="read-link"
								target="_blank"
								rel="noopener noreferrer"
							>
								read more
							</a>
							<button
								className="remove-btn"
								onClick={() => removeStory(objectID)}
							>
								remove
							</button>
						</div>
					</article>
				)
			})}
		</section>
	)
}

export default Stories
