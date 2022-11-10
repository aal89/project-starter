export const getImageUrl = (image?: string | null) => image && `${process.env.REACT_APP_BUCKET_URL}/${image}`;
