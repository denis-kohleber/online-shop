import starFull from '../assets/rating/star-full.svg';
import starHalf from '../assets/rating/star-half.svg';
import starEmpty from '../assets/rating/star-empty.svg';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface Props {
    rating: number;
    indexKey: string;
}

const RatingStars = ({ rating, indexKey }: Props) => {
    const generateRating = () => {
        const stars = [];

        for (let i = 0; i <= 8; i += 2) {
            const starValue = rating - i;

            if (starValue >= 2) {
                stars.push(generateStar(starFull, `${indexKey}${i}`));
                continue;
            }

            if (starValue === 1) {
                stars.push(generateStar(starHalf, `${indexKey}${i}`));
                continue;
            }

            if (starValue <= 0) {
                stars.push(generateStar(starEmpty, `${indexKey}${i}`));
            }
        }

        return stars;
    };

    const generateStar = (star: string, keyname: string) => {
        return <LazyLoadImage key={keyname} src={star} alt="" loading="lazy" />;
    };

    return (
        <figure className="rating">
            {generateRating()}
            {/* Caption only visible for screenreader */}
            <figcaption className="srOnly">{`Bewertung: ${
                rating / 2
            } Sterne von 5 Sternen`}</figcaption>
        </figure>
    );
};

export { RatingStars };
